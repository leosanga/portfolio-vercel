import assert from "node:assert/strict";
import test from "node:test";
import { collectReleaseEvidence } from "./portfolio-v2-cua-collector.mjs";
import { releaseCoverage } from "./portfolio-v2-release-evidence.mjs";

const caseRow = releaseCoverage.findIndex((row) => row.pathname !== "/");
const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

// Hydration finishes between a layout capture and the readiness check that follows it.
function hydratingTab(hydrateOnReadyCheck) {
  const page = { hydrated: false, readyChecks: 0 };
  const capture = () => ({
    url: "https://example.vercel.app/case",
    width: 1262,
    height: 900,
    scrollY: 0,
    atBottom: true,
    footerContentBottom: 800,
    dock: {
      controls: [{ label: page.hydrated ? "Use dark theme" : "Change color theme" }],
    },
  });
  const element = { press: pause, click: pause, evaluate: async () => true };
  return {
    goto: pause,
    playwright: {
      evaluate: async (expression) => {
        await pause();
        if (typeof expression === "string") return capture();
        page.readyChecks++;
        if (page.readyChecks === hydrateOnReadyCheck) page.hydrated = true;
        return page.hydrated;
      },
      locator: () => ({ ...element, first: () => element }),
    },
  };
}

test("a settled capture is never taken before the page reports ready", async () => {
  const evidence = await collectReleaseEvidence({
    tab: hydratingTab(3),
    viewport: { set: pause, reset: pause },
    baseUrl: "https://example.vercel.app",
    candidateSha: "a".repeat(40),
    start: caseRow,
    end: caseRow + 1,
  });
  const [top] = evidence.measurements[0].scrollSamples;
  assert.equal(top.dock.controls[0].label, "Use dark theme");
});
