// Read-only DOM collection. Serialize this function for the permitted browser evaluator.
// Navigation, viewport changes and scrolling belong to documented CUA actions.
export function captureReleaseLayout() {
  const dock = document.querySelector(".pv2-utility-dock");
  const rail = dock?.querySelector("nav");
  const rect = rail?.getBoundingClientRect();
  const steps = document.querySelector(".pv2-approach__steps");
  const section = document.querySelector("#approach");
  return {
    url: location.href,
    pathname: location.pathname,
    width: innerWidth,
    height: innerHeight,
    scrollY,
    atBottom: scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    dock: rect
      ? {
          position: getComputedStyle(dock).position,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          controls: [...rail.querySelectorAll("a,button")].map((control) => ({
            label: control.getAttribute("aria-label"),
            width: control.getBoundingClientRect().width,
            height: control.getBoundingClientRect().height,
          })),
        }
      : null,
    footerContentBottom: document
      .querySelector("footer")
      ?.firstElementChild?.getBoundingClientRect().bottom,
    approach:
      steps && section
        ? {
            count: steps.children.length,
            columns: getComputedStyle(steps).gridTemplateColumns.split(" ").length,
            transform: getComputedStyle(section).transform,
            transitionDuration: getComputedStyle(section).transitionDuration,
          }
        : null,
  };
}
