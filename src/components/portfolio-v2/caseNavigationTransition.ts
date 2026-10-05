import { PUBLIC_CASE_STUDIES } from "@/content/portfolio-v2/case-study-records";

const casePaths = PUBLIC_CASE_STUDIES.map((record) => record.caseStudyPath);

// Only fixed authored paths enter this script. Native events retain navigation ownership.
export const CASE_NAVIGATION_TRANSITION_SCRIPT = `(() => {
  const cases = new Set(${JSON.stringify(casePaths).replace(/</g, "\\u003c")});
  const owner = "data-pv2-case-title-owner";
  const previous = new WeakMap();
  let generation = 0;
  const clear = () => {
    generation += 1;
    document.querySelectorAll("[" + owner + "]").forEach((element) => {
      const saved = previous.get(element);
      if (saved && saved.value) element.style.setProperty("view-transition-name", saved.value, saved.priority);
      else element.style.removeProperty("view-transition-name");
      element.removeAttribute(owner);
      previous.delete(element);
    });
  };
  const pathOf = (value) => {
    if (!value) return null;
    try {
      const url = new URL(value, location.href);
      return url.origin === location.origin ? url.pathname : null;
    } catch { return null; }
  };
  const surface = (path) => cases.has(path) || path === "/" || path === "/project-catalog";
  const visible = (element) => {
    if (!element || !element.isConnected) return false;
    if (typeof element.checkVisibility === "function" && !element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
    const style = getComputedStyle(element);
    if (style.visibility !== "visible" || style.opacity === "0") return false;
    const rect = element.getBoundingClientRect();
    const left = Math.max(0, rect.left), right = Math.min(innerWidth, rect.right);
    const top = Math.max(0, rect.top), bottom = Math.min(innerHeight, rect.bottom);
    if (right <= left || bottom <= top) return false;
    return [0.25, 0.5, 0.75].some((x) => [0.25, 0.5, 0.75].some((y) => {
      const hit = document.elementFromPoint(left + (right - left) * x, top + (bottom - top) * y);
      return hit === element || (hit && element.contains(hit));
    }));
  };
  const destinationTitle = (path) => Array.from(document.querySelectorAll("[data-case-destination]"))
    .find((element) => element.getAttribute("data-case-destination") === path && visible(element));
  const assign = (element, transition) => {
    if (!visible(element)) return;
    previous.set(element, {
      value: element.style.getPropertyValue("view-transition-name"),
      priority: element.style.getPropertyPriority("view-transition-name")
    });
    element.setAttribute(owner, "true");
    element.style.setProperty("view-transition-name", "pv2-case-title");
    const current = generation;
    const finish = () => { if (current === generation) clear(); };
    Promise.resolve(transition.finished).then(finish, finish);
  };
  const prepare = (event, reveal) => {
    const transition = event.viewTransition;
    if (!transition) return;
    Promise.resolve(transition.ready).catch(() => {});
    try {
      clear();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(forced-colors: active)").matches) {
        if (typeof transition.skipTransition === "function") transition.skipTransition();
        return;
      }
      const from = pathOf(reveal ? window.navigation?.activation?.from?.url : location.href);
      const to = pathOf(reveal ? location.href : event.activation?.entry?.url);
      if (!surface(from) || !surface(to)) return;
      let element;
      if (reveal) {
        if (cases.has(to)) element = document.getElementById("case-study-title");
        else if (cases.has(from)) element = destinationTitle(from);
      } else {
        if (cases.has(to)) element = destinationTitle(to);
        else if (cases.has(from)) element = document.getElementById("case-study-title");
      }
      assign(element, transition);
    } catch {
      try { clear(); } catch { /* Navigation remains native if visual cleanup is unavailable. */ }
    }
  };
  window.addEventListener("pageswap", (event) => prepare(event, false));
  window.addEventListener("pagereveal", (event) => prepare(event, true));
})();`;
