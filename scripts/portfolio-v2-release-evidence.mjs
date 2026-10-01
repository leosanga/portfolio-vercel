import { validateReleaseLayout } from "./portfolio-v2-release-contract.mjs";

export const releaseCoverage = [
  ...[
    [1262, 900],
    [1279, 900],
    [1280, 900],
    [1023, 768],
    [1024, 768],
    [390, 844],
    [359, 650],
    [359, 651],
    [360, 650],
  ].map(([width, height]) => ({ pathname: "/", width, height })),
  ...[
    "/projects/ai-booking-agent",
    "/projects/lead-routing-pipeline-health-system",
    "/projects/trial-demo-routing-by-customer-relationship",
  ].flatMap((pathname) => [
    { pathname, width: 1262, height: 900 },
    { pathname, width: 390, height: 844 },
  ]),
];

export function validateReleaseEvidence(evidence, expectedUrl, expectedSha, now = Date.now()) {
  const failures = [];
  const require = (condition, message) => {
    if (!condition) failures.push(message);
  };
  let origin;
  try {
    origin = new URL(expectedUrl).origin;
  } catch {
    return ["Expected site URL is invalid"];
  }
  if (!evidence || typeof evidence !== "object") return ["Evidence must be an object"];
  require(evidence.schemaVersion === 1, "Evidence schema version must be 1");
  require(evidence.collector === "cua", "Evidence must identify the permitted CUA collector");
  require(/^[a-f0-9]{40}$/.test(expectedSha) &&
    evidence.candidateSha ===
      expectedSha, "Evidence candidate SHA does not match the expected release");
  require(evidence.baseUrl ===
    expectedUrl, "Evidence site URL does not match the expected release");
  const collected = Date.parse(evidence.collectedAt);
  require(Number.isFinite(collected) &&
    collected <= now + 60_000 &&
    now - collected <=
      86_400_000, "Evidence must have a valid collection time within the past 24 hours");
  if (!Array.isArray(evidence.measurements)) return [...failures, "Measurements must be an array"];

  const seen = new Set();
  for (const sample of evidence.measurements) {
    if (!sample || typeof sample !== "object") {
      failures.push("Malformed measurement");
      continue;
    }
    const key = `${sample.pathname}:${sample.requestedWidth}x${sample.requestedHeight}`;
    require(!seen.has(key), `Duplicate coverage: ${key}`);
    seen.add(key);
    let url;
    try {
      url = new URL(sample.url);
    } catch {
      failures.push(`${key}: Invalid measured URL`);
    }
    require(url?.origin === origin &&
      url?.pathname ===
        sample.pathname, `${key}: Measured URL does not match the expected route/site`);
    require(releaseCoverage.some(
      (row) => row.pathname === sample.pathname,
    ), `${key}: Unknown route`);
    require(sample.isHomepage === (sample.pathname === "/"), `${key}: Homepage identity mismatch`);
    failures.push(...validateReleaseLayout(sample).map((failure) => `${key}: ${failure}`));
    const points = Array.isArray(sample.scrollSamples) ? sample.scrollSamples : [];
    const names = sample.isHomepage
      ? ["top", "projects", "approach", "footer"]
      : ["top", "middle", "footer"];
    require(points.length === names.length &&
      names.every(
        (name) => points.filter((point) => point?.name === name).length === 1,
      ), `${key}: Required named scroll positions are missing or duplicated`);
    for (const point of points) {
      require(point?.url === sample.url &&
        point?.pathname === sample.pathname, `${key}: Scroll sample route/site mismatch`);
      require(point?.width === sample.requestedWidth &&
        point?.height === sample.requestedHeight, `${key}: Scroll sample viewport mismatch`);
      require(point?.horizontalOverflow ===
        false, `${key}: Scroll sample has missing or overflowing geometry`);
    }
    require(points.find((point) => point?.name === "top")?.scrollY <=
      1, `${key}: Top was not measured at page start`);
    require(points.find((point) => point?.name === "footer")?.atBottom ===
      true, `${key}: Footer was not measured at the document end`);
  }
  for (const { pathname, width, height } of releaseCoverage) {
    const key = `${pathname}:${width}x${height}`;
    require(seen.has(key), `Missing required coverage: ${key}`);
  }
  return failures;
}
