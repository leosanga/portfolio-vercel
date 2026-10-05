// Pure checks over rendered measurements. Browser collection and visual acceptance are separate.
const DOCK_LINK_LABELS = ["Home", "Email", "LinkedIn", "Back to top"];
const THEME_LABELS = ["Use light theme", "Use dark theme"];

function hasApprovedDockControls(controls) {
  return Array.isArray(controls) &&
    controls.length === DOCK_LINK_LABELS.length + 1 &&
    DOCK_LINK_LABELS.every((label, index) => controls[index]?.label === label) &&
    THEME_LABELS.includes(controls[DOCK_LINK_LABELS.length]?.label);
}

export function validateReleaseLayout(sample) {
  const failures = [];
  if (!sample || typeof sample !== "object") return ["Layout sample must be an object"];
  const require = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const { width, height, requestedWidth, requestedHeight, dock, scrollSamples, approach } = sample;
  require(Number.isFinite(width) &&
    width > 0 &&
    Number.isFinite(height) &&
    height > 0, "Viewport dimensions must be positive finite numbers");
  require(width === requestedWidth &&
    height === requestedHeight, "Actual viewport differs from requested viewport");
  require(sample.horizontalOverflow === false, "Document has horizontal overflow");
  require(dock &&
    Array.isArray(scrollSamples) &&
    scrollSamples.length >= 2, "Dock measurements at multiple scroll positions are required");
  if (!dock || !Array.isArray(scrollSamples) || !scrollSamples.length) return failures;

  const documentFlow = width < 360 && height <= 650;
  const expectedPosition = documentFlow ? "static" : "fixed";
  require(dock.position ===
    expectedPosition, `Dock must be ${expectedPosition} at ${width}x${height}`);
  require([dock.top, dock.bottom, dock.left, dock.right].every(
    Number.isFinite,
  ), "Initial dock geometry is missing");
  require(hasApprovedDockControls(dock.controls),
    "Dock must contain Home, Email, LinkedIn, Back to top and a hydrated theme control");
  for (const control of Array.isArray(dock.controls) ? dock.controls : []) {
    require(Number.isFinite(control?.width) &&
      control.width >= 44 &&
      Number.isFinite(control?.height) &&
      control.height >= 44 &&
      typeof control?.label === "string" &&
      control.label.trim().length > 0, "Dock controls need labels and 44px targets");
  }
  require(scrollSamples.some(
    (point) => Number.isFinite(point?.scrollY) && point.scrollY > scrollSamples[0]?.scrollY + 100,
  ), "Scroll persistence was not exercised");
  for (const point of scrollSamples) {
    if (!point?.dock || !Number.isFinite(point.scrollY)) {
      failures.push("Scroll samples require a dock and finite scroll position");
      continue;
    }
    require([point.dock.top, point.dock.bottom, point.dock.left, point.dock.right].every(
      Number.isFinite,
    ), `Dock geometry is missing at ${point.name}`);
    require(hasApprovedDockControls(point.dock.controls) &&
      point.dock.controls.every(
        (control) =>
          Number.isFinite(control?.width) &&
          control.width >= 44 &&
          Number.isFinite(control?.height) &&
          control.height >= 44 &&
          typeof control?.label === "string" &&
          control.label.trim().length > 0,
      ), `Dock controls need approved labels and 44px targets at ${point.name}`);
    require(point.dock.position === expectedPosition, `Dock changed positioning at ${point.name}`);
    if (!documentFlow || point.name === "footer") {
      require(point.dock.top >= 0 &&
        point.dock.bottom <= height + 1 &&
        point.dock.left >= 0 &&
        point.dock.right <= width + 1, `Dock is outside the viewport at ${point.name}`);
    }
    if (!documentFlow) {
      require(Math.abs(point.dock.top - dock.top) <= 1 &&
        Math.abs(point.dock.bottom - dock.bottom) <=
          1, `Dock moved with document scroll at ${point.name}`);
    }
    if (point.name === "footer") {
      require(Number.isFinite(point.footerContentBottom) &&
        point.footerContentBottom <= point.dock.top, "Dock obscures footer content");
    }
  }
  require(scrollSamples.some(
    (point) => point?.name === "footer",
  ), "Footer clearance was not measured");

  if (sample.isHomepage) {
    require(approach?.count === 5, "Approach must contain five approved steps");
    require(approach?.columns ===
      (width >= 1024 ? 5 : 1), "Approach orientation violates the approved breakpoint");
    require(approach?.transform === "none" &&
      approach?.transitionDuration ===
        "0s", "Measured Approach section must remain untransformed and untransitioned");
  }
  return failures;
}
