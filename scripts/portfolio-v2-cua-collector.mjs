import { releaseCoverage } from "./portfolio-v2-release-evidence.mjs";
import { captureReleaseLayout } from "./portfolio-v2-release-measurement.mjs";
import { writeFileSync } from "node:fs";

// Generated QA artifact, not an authored source edit. Refuse to overwrite existing evidence.
export function saveReleaseEvidence(pathname, evidence) {
  writeFileSync(pathname, `${JSON.stringify(evidence, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
}

// Accept documented CUA handles. No browser process, CDP endpoint or page mutation.
export async function collectReleaseEvidence({
  tab,
  viewport,
  baseUrl,
  candidateSha,
  evidence,
  start = 0,
  end = releaseCoverage.length,
  onProgress = () => {},
}) {
  const result = evidence ?? {
    schemaVersion: 1,
    collector: "cua",
    baseUrl,
    candidateSha,
    collectedAt: new Date().toISOString(),
    measurements: [],
  };
  if (result.baseUrl !== baseUrl || result.candidateSha !== candidateSha) {
    throw new Error("Cannot resume evidence for a different release");
  }
  const expression = `(${captureReleaseLayout.toString()})()`;
  const settledCapture = async (point, selector) => {
    const started = Date.now();
    let previous;
    let stable = 0;
    let endpointRetries = 0;
    let lastEndpointRetry = started;
    while (Date.now() - started < 10_000) {
      // Check readiness first: hydration only moves forward, so a later capture cannot be stale.
      const ready = await tab.playwright.evaluate(
        () =>
          document.fonts.status === "loaded" &&
          document.querySelector(".pv2-utility-dock__rail button")?.getAttribute("aria-label") !==
            "Change color theme",
      );
      const next = await tab.playwright.evaluate(expression);
      let reached = point === "top" ? next.scrollY <= 1 : point === "footer" && next.atBottom;
      if (selector) {
        reached = await tab.playwright
          .locator(selector)
          .first()
          .evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= innerHeight;
          });
      }
      if (
        previous &&
        next.url === previous.url &&
        next.width === previous.width &&
        next.height === previous.height &&
        Math.abs(next.scrollY - previous.scrollY) < 0.5 &&
        Math.abs(next.footerContentBottom - previous.footerContentBottom) < 0.5
      )
        stable++;
      else stable = 0;
      if (ready && reached && stable >= 2 && Date.now() - started >= 250) return next;
      // Hydration can lengthen the document after End chose its destination.
      // Retry only after observing settled geometry still short of the endpoint.
      if (
        ready &&
        !reached &&
        point === "footer" &&
        stable >= 2 &&
        Date.now() - lastEndpointRetry >= 750 &&
        endpointRetries < 2
      ) {
        await tab.playwright.locator(".pv2-utility-dock__rail a").first().press("Control+End");
        endpointRetries++;
        lastEndpointRetry = Date.now();
        stable = 0;
      }
      previous = next;
    }
    throw new Error(`Required scroll position did not settle: ${point}`);
  };

  try {
    for (const row of releaseCoverage.slice(start, end)) {
      await viewport.set({ width: row.width, height: row.height });
      await tab.goto(new URL(row.pathname, baseUrl).href);
      // A visible, focusable control receives the page-scrolling key. Body is not focusable.
      await tab.playwright.locator(".pv2-utility-dock__rail a").first().press("Control+Home");
      const first = await settledCapture("top");
      const sample = {
        ...first,
        requestedWidth: row.width,
        requestedHeight: row.height,
        isHomepage: row.pathname === "/",
        scrollSamples: [{ name: "top", ...first }],
      };
      const targets = sample.isHomepage
        ? [
            ["projects", "#projects h2"],
            ["approach", "#approach h2"],
          ]
        : [
            [
              "middle",
              row.pathname === "/project-catalog"
                ? ".pc-project h2"
                : "main > section.pv2-case-section h2",
            ],
          ];
      for (const [name, selector] of targets) {
        await tab.playwright.locator(selector).first().click();
        sample.scrollSamples.push({ name, ...(await settledCapture(name, selector)) });
      }
      await tab.playwright.locator(".pv2-footer__grid > p").click();
      await tab.playwright.locator(".pv2-utility-dock__rail a").first().press("Control+End");
      sample.scrollSamples.push({ name: "footer", ...(await settledCapture("footer")) });
      result.measurements.push(sample);
      onProgress({
        pathname: row.pathname,
        width: first.width,
        height: first.height,
        rows: result.measurements.length,
      });
    }
    return result;
  } finally {
    await viewport.reset();
  }
}
