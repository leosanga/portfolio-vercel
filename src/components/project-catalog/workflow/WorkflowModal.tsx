import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onModalChange: (open: boolean) => void;
  opener: HTMLButtonElement | null;
}

export function WorkflowModal({ title, children, onClose, onModalChange, opener }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const callbacks = useRef({ onClose, onModalChange });
  useEffect(() => {
    callbacks.current = { onClose, onModalChange };
  }, [onClose, onModalChange]);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const x = window.scrollX;
    const y = window.scrollY;
    const bodyStyle = body.getAttribute("style");
    const rootStyle = root.getAttribute("style");
    const gap = Math.max(0, window.innerWidth - root.clientWidth);
    const padding = getComputedStyle(body).paddingRight;
    root.style.overflow = "hidden";
    root.style.scrollBehavior = "auto";
    body.style.position = "fixed";
    body.style.top = `${-y}px`;
    body.style.left = `${-x}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = `calc(${padding} + ${gap}px)`;
    callbacks.current.onModalChange(true);
    closeRef.current?.focus({ preventScroll: true });
    const keydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        callbacks.current.onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialogRef.current!.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],[tabindex="0"]',
        ),
      ].filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const focusin = (event: FocusEvent) => {
      if (!dialogRef.current?.contains(event.target as Node))
        closeRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("focusin", focusin);
    const overlay = overlayRef.current;
    const wheel = (event: WheelEvent) => {
      const dialog = dialogRef.current;
      if (
        !dialog ||
        dialog.scrollHeight <= dialog.clientHeight ||
        (event.deltaY < 0 && dialog.scrollTop <= 0) ||
        (event.deltaY > 0 && dialog.scrollTop + dialog.clientHeight >= dialog.scrollHeight)
      )
        event.preventDefault();
      event.stopPropagation();
    };
    overlay?.addEventListener("wheel", wheel, { passive: false });
    return () => {
      overlay?.removeEventListener("wheel", wheel);
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("focusin", focusin);
      if (bodyStyle === null) body.removeAttribute("style");
      else body.setAttribute("style", bodyStyle);
      if (rootStyle === null) root.removeAttribute("style");
      else root.setAttribute("style", rootStyle);
      root.style.setProperty("scroll-behavior", "auto", "important");
      window.scrollTo(x, y);
      if (rootStyle === null) root.removeAttribute("style");
      else root.setAttribute("style", rootStyle);
      callbacks.current.onModalChange(false);
      // Wait for the parent's inert update to commit before returning focus.
      requestAnimationFrame(() => {
        if (opener?.isConnected) opener.focus({ preventScroll: true });
      });
    };
  }, [opener]);

  return createPortal(
    <div className="portfolio-v2 pc-workflow-modal-overlay" ref={overlayRef}>
      <div
        className="pc-workflow-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        ref={dialogRef}
      >
        <div className="pc-workflow-modal-header">
          <h2 id={`${id}-title`}>{title}</h2>
          <button type="button" ref={closeRef} onClick={onClose}>
            Close
          </button>
        </div>
        <div className="pc-workflow-modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
