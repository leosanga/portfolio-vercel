import assert from "node:assert/strict";
import test from "node:test";
import { validateReleaseLayout } from "./portfolio-v2-release-contract.mjs";
import { releaseCoverage, validateReleaseEvidence } from "./portfolio-v2-release-evidence.mjs";

const evidenceUrl = "https://example.vercel.app";
const evidenceSha = "a".repeat(40);
const evidenceTime = Date.UTC(2026, 9, 1, 12);

function completeEvidence() {
  return {
    schemaVersion: 1,
    collector: "cua",
    baseUrl: evidenceUrl,
    candidateSha: evidenceSha,
    collectedAt: new Date(evidenceTime).toISOString(),
    measurements: releaseCoverage.map(({ pathname, width, height }) => {
      const sample = measured(width, height);
      sample.pathname = pathname;
      sample.url = `${evidenceUrl}${pathname}`;
      sample.isHomepage = pathname === "/";
      const names = sample.isHomepage
        ? ["top", "projects", "approach", "footer"]
        : ["top", "middle", "footer"];
      sample.scrollSamples = names.map((name, index) => ({
        name,
        width,
        height,
        url: sample.url,
        pathname,
        horizontalOverflow: false,
        atBottom: name === "footer",
        scrollY: index * 1000,
        dock: sample.dock,
        footerContentBottom: height - 96,
      }));
      return sample;
    }),
  };
}

function measured(width = 390, height = 844) {
  const position = width < 360 && height <= 650 ? "static" : "fixed";
  const dock = {
    position,
    top: height - 78,
    bottom: height - 16,
    left: 80,
    right: 280,
    controls: Array.from({ length: 4 }, () => ({ width: 44, height: 44, label: "Control" })),
  };
  return {
    width,
    height,
    requestedWidth: width,
    requestedHeight: height,
    horizontalOverflow: false,
    isHomepage: true,
    dock,
    scrollSamples: [
      { name: "top", scrollY: 0, dock: { ...dock } },
      { name: "footer", scrollY: 5000, dock: { ...dock }, footerContentBottom: height - 96 },
    ],
    approach: {
      count: 5,
      columns: width >= 1024 ? 5 : 1,
      transform: "none",
      transitionDuration: "0s",
    },
  };
}

test("approved fixed phones, tiny exception and laptop boundaries pass", () => {
  for (const [width, height] of [
    [320, 568],
    [359, 650],
    [359, 651],
    [360, 650],
    [390, 844],
    [430, 932],
    [767, 844],
    [768, 844],
    [1023, 800],
    [1024, 800],
    [1262, 900],
    [1279, 900],
    [1280, 900],
  ]) {
    assert.deepEqual(validateReleaseLayout(measured(width, height)), [], `${width}x${height}`);
  }
});

test("the released all-phone static dock regression fails", () => {
  const sample = measured();
  sample.dock.position = "static";
  sample.dock.top = 15000;
  sample.dock.bottom = 15062;
  sample.scrollSamples[0].dock = { ...sample.dock };
  assert.ok(validateReleaseLayout(sample).some((failure) => failure.includes("must be fixed")));
  assert.ok(
    validateReleaseLayout(sample).some((failure) => failure.includes("outside the viewport")),
  );
});

test("the released laptop collapse fails even without overflow", () => {
  const sample = measured(1262, 900);
  sample.approach.columns = 1;
  assert.ok(validateReleaseLayout(sample).some((failure) => failure.includes("orientation")));
});

test("missing scroll coverage and stale viewport evidence fail", () => {
  const sample = measured();
  sample.requestedWidth = 1262;
  sample.scrollSamples[1].scrollY = 0;
  const failures = validateReleaseLayout(sample);
  assert.ok(failures.some((failure) => failure.includes("Actual viewport")));
  assert.ok(failures.some((failure) => failure.includes("persistence was not exercised")));
});

test("footer obstruction, undersized targets and moved rail fail", () => {
  const sample = measured();
  sample.scrollSamples[1].footerContentBottom = sample.dock.top + 15;
  sample.scrollSamples[1].dock.top -= 30;
  sample.dock.controls[0].width = 30;
  const failures = validateReleaseLayout(sample);
  assert.ok(failures.some((failure) => failure.includes("obscures footer")));
  assert.ok(failures.some((failure) => failure.includes("44px")));
  assert.ok(failures.some((failure) => failure.includes("moved with document scroll")));
});

test("complete release evidence passes and omitted route or boundary fails", () => {
  const evidence = completeEvidence();
  assert.deepEqual(validateReleaseEvidence(evidence, evidenceUrl, evidenceSha, evidenceTime), []);
  evidence.measurements.pop();
  assert.ok(
    validateReleaseEvidence(evidence, evidenceUrl, evidenceSha, evidenceTime).some((failure) =>
      failure.includes("Missing required coverage"),
    ),
  );
});

test("wrong release identity, stale evidence and unvisited footer fail", () => {
  const evidence = completeEvidence();
  evidence.candidateSha = "b".repeat(40);
  evidence.collectedAt = new Date(evidenceTime - 86_400_001).toISOString();
  evidence.measurements[0].url = "https://wrong.vercel.app/";
  evidence.measurements[0].scrollSamples.at(-1).atBottom = false;
  const failures = validateReleaseEvidence(evidence, evidenceUrl, evidenceSha, evidenceTime);
  for (const message of ["candidate SHA", "past 24 hours", "expected route/site", "document end"]) {
    assert.ok(
      failures.some((failure) => failure.includes(message)),
      message,
    );
  }
});

test("malformed measurements and missing named scroll coverage return failures", () => {
  for (const value of [
    null,
    {},
    { scrollSamples: "invalid" },
    { dock: {}, scrollSamples: [null, {}] },
  ]) {
    assert.ok(validateReleaseLayout(value).length > 0);
  }
  const evidence = completeEvidence();
  evidence.measurements[0].scrollSamples[1] = { name: "top", width: 999, height: 999 };
  assert.ok(validateReleaseEvidence(evidence, evidenceUrl, evidenceSha, evidenceTime).length > 0);
});
