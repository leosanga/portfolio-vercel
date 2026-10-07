import { useEffect } from "react";
import { useLocation, useRouter } from "@tanstack/react-router";
import Lenis, { type VirtualScrollData } from "lenis";

const WHEEL_LERP = 0.14;
const NATIVE_SURFACE = [
  ".pc-canvas-frame",
  ".pc-workflow-modal-overlay",
  '[aria-modal="true"]',
  "input",
  "textarea",
  "select",
  '[contenteditable]:not([contenteditable="false"])',
  "[data-lenis-prevent]",
  "[data-lenis-prevent-wheel]",
  "[data-lenis-prevent-vertical]",
].join(",");
const SCROLLABLE_OVERFLOW = /^(auto|scroll|overlay)$/;
const LOCKED_OVERFLOW = /^(hidden|clip)$/;

function isNativeSurface(node: EventTarget) {
  if (!(node instanceof Element)) return false;
  if (node.matches(NATIVE_SURFACE)) return true;
  if (!(node instanceof HTMLElement)) return false;
  if (node.isContentEditable) return true;
  if (node === document.body || node === document.documentElement) return false;
  const style = getComputedStyle(node);
  return (
    (SCROLLABLE_OVERFLOW.test(style.overflowY) && node.scrollHeight > node.clientHeight) ||
    (SCROLLABLE_OVERFLOW.test(style.overflowX) && node.scrollWidth > node.clientWidth)
  );
}

function isScrollLocked() {
  const body = getComputedStyle(document.body);
  const root = getComputedStyle(document.documentElement);
  return (
    body.position === "fixed" ||
    LOCKED_OVERFLOW.test(body.overflowY) ||
    LOCKED_OVERFLOW.test(root.overflowY)
  );
}

/** Wheel enhancement only. Native navigation, focus and scroll position stay authoritative. */
export function PortfolioSmoothScrollV2() {
  const router = useRouter();
  const routeKey = useLocation({
    select: (location) => `${location.href}:${location.state.__TSR_key ?? "initial"}`,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    let instance: Lenis | null = null;
    let frame: number | null = null;
    let pageHidden = false;

    const cancelFrame = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };
    const cancelInertia = () => {
      cancelFrame();
      // stop/start invokes the public reset path without writing browser scroll.
      // scrollTo(actualScroll, immediate) can return early at an equal target.
      instance?.stop();
      instance?.start();
    };
    const destroy = () => {
      cancelFrame();
      instance?.stop();
      instance?.destroy();
      instance = null;
    };
    const isEligible = () =>
      !pageHidden && !document.hidden && !reduced.matches && !forced.matches && !isScrollLocked();

    const tick = (time: number) => {
      frame = null;
      if (!isEligible()) {
        destroy();
        return;
      }
      instance?.raf(time);
      if (instance?.isScrolling === "smooth") frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!instance || frame !== null) return;
      // A stopped RAF clock must not turn an idle interval into an animation step.
      instance.time = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const acceptWheel = ({ deltaX, deltaY, event }: VirtualScrollData) => {
      if (!isEligible()) {
        destroy();
        return false;
      }
      const nativeInput =
        event.type !== "wheel" ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(deltaX) >= Math.abs(deltaY) ||
        event.composedPath().some(isNativeSurface);
      if (nativeInput) cancelInertia();
      return !nativeInput;
    };
    const reconcile = () => {
      if (!isEligible()) {
        destroy();
        return;
      }
      if (instance) return;
      instance = new Lenis({
        autoRaf: false,
        autoToggle: false,
        anchors: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: WHEEL_LERP,
        wheelMultiplier: 1,
        virtualScroll: acceptWheel,
      });
      // Lenis emits before consuming the wheel; the queued frame sees its new state.
      instance.on("virtual-scroll", wake);
    };
    const onPageHide = () => {
      pageHidden = true;
      destroy();
    };
    const onPageShow = () => {
      pageHidden = false;
      reconcile();
    };
    const onHistoryChange = () => {
      destroy();
      reconcile();
    };
    const observer = new MutationObserver(reconcile);
    // Ignore Lenis class changes, and inspect modal styles before the next paint.
    const observation = { attributes: true, attributeFilter: ["style"] };
    observer.observe(document.body, observation);
    observer.observe(document.documentElement, observation);
    reduced.addEventListener("change", reconcile);
    forced.addEventListener("change", reconcile);
    document.addEventListener("visibilitychange", reconcile);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("hashchange", onHistoryChange);
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("pointerdown", cancelInertia, true);
    window.addEventListener("keydown", cancelInertia, true);
    window.addEventListener("click", cancelInertia, true);
    window.addEventListener("blur", cancelInertia);
    const unsubscribeNavigation = router.subscribe("onBeforeNavigate", cancelInertia);
    reconcile();

    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", reconcile);
      forced.removeEventListener("change", reconcile);
      document.removeEventListener("visibilitychange", reconcile);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("hashchange", onHistoryChange);
      window.removeEventListener("popstate", onHistoryChange);
      window.removeEventListener("pointerdown", cancelInertia, true);
      window.removeEventListener("keydown", cancelInertia, true);
      window.removeEventListener("click", cancelInertia, true);
      window.removeEventListener("blur", cancelInertia);
      unsubscribeNavigation();
      destroy();
    };
  }, [routeKey, router]);

  return null;
}
