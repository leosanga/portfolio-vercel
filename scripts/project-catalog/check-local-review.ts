import assert from "node:assert/strict";

const base = (process.argv[2] ?? "http://127.0.0.1:8099").replace(/\/$/, "");
const response = await fetch(`${base}/project-catalog`);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/class="pc-project"/g) ?? []).length, 6);
assert.equal((html.match(/<details /g) ?? []).length, 6);
assert.equal((html.match(/Read case study/g) ?? []).length, 2);
assert.equal((html.match(/class="pc-static-phases"/g) ?? []).length, 4);
for (const signature of ["pv2-booking-proof", "pv2-identity-signature"]) {
  assert.ok(html.includes(signature), `${signature} is present before JavaScript`);
}
assert.ok(!html.includes("<iframe"), "the catalog consumes actual React components");
assert.equal((html.match(/type="radio"/g) ?? []).length, 3, "Show uses three native radios");
assert.equal((html.match(/type="checkbox"/g) ?? []).length, 5, "categories use native checkboxes");
assert.ok(html.includes("Choose one or more."));
assert.ok(!html.includes("Clear filters"), "default browsing does not show a reset control");

const cases = await fetch(`${base}/project-catalog?view=case-studies`);
assert.equal((await cases.text()).match(/class="pc-project"/g)?.length, 4);
for (const [query, count, caseCount, workflowCount, homepageCount] of [
  ["view=workflows", 6, 0, 4, 2],
  ["category=customer-support", 2, 0, 1, 1],
  ["category=marketing", 1, 0, 1, 0],
  ["view=workflows&category=sales-leads", 4, 0, 2, 2],
  ["view=workflows&category=customer-support,sales-leads", 6, 0, 3, 3],
  ["view=case-studies&category=customer-support,sales-leads", 3, 3, 0, 0],
  ["view=case-studies&category=customer-support", 0, 0, 0, 0],
  ["category=operations", 2, 1, 0, 1],
  ["view=case-studies&category=operations", 1, 1, 0, 0],
  ["view=workflows&category=operations", 1, 0, 0, 1],
  ["category=reporting", 1, 0, 0, 1],
  ["view=invalid&category=unknown", 6, 2, 4, 0],
  ["view=workflows&category=invalid,customer-support", 2, 0, 1, 1],
] as const) {
  const filtered = await fetch(`${base}/project-catalog?${query}`);
  assert.equal(filtered.status, 200);
  const body = await filtered.text();
  assert.equal((body.match(/class="pc-project"/g) ?? []).length, count, query);
  assert.equal((body.match(/Read case study/g) ?? []).length, caseCount, query);
  assert.equal((body.match(/class="pc-static-phases"/g) ?? []).length, workflowCount, query);
  assert.equal((body.match(/class="pc-home-preview"/g) ?? []).length, homepageCount, query);
  assert.equal(
    (body.match(/<details /g) ?? []).length,
    count,
    `${query}: one disclosure per entry`,
  );
  assert.equal(
    (body.match(/type="checkbox"/g) ?? []).length,
    5,
    `${query}: all collection categories remain visible across formats`,
  );
  if (count === 0) {
    assert.ok(body.includes("No projects match these filters."));
    assert.equal(
      (body.match(/Clear filters/g) ?? []).length,
      1,
      "empty state has one reset control",
    );
    if (query.includes("customer-support")) {
      const retainedCategory = body
        .match(/<input\b[^>]*>/g)
        ?.find(
          (input) =>
            input.includes('type="checkbox"') && input.includes('value="customer-support"'),
        );
      assert.ok(retainedCategory?.includes('checked=""'), "unmatched category remains checked");
    }
  }
  if (query === "category=operations") {
    assert.ok(body.includes("enterprise-identity-systems-operations"));
    assert.ok(body.includes("pv2-identity-signature"), "Identity signature is present in SSR");
    assert.ok(body.includes("Customer identity data did not always match"));
  }
  if (query === "category=reporting") {
    assert.ok(body.includes("pv2-reporting-architecture"));
    assert.ok(!body.includes('class="pc-purpose"'), "standard projects omit unsupported purpose");
  }
}
const alias = await fetch(`${base}/projects?view=case-studies&category=sales-leads`, {
  redirect: "manual",
});
assert.ok(alias.status >= 300 && alias.status < 400);
assert.equal(
  alias.headers.get("location"),
  "/project-catalog?view=case-studies&category=sales-leads",
);
for (const path of [
  "/",
  "/projects/ai-booking-agent",
  "/projects/trial-demo-routing-by-customer-relationship",
  "/projects/lead-routing-pipeline-health-system",
  "/projects/enterprise-identity-systems-operations",
]) {
  assert.equal((await fetch(base + path)).status, 200, `${path} remains available`);
}
const home = await (await fetch(base)).text();
assert.ok(
  home.indexOf("pv2-identity-entry") < home.indexOf("pv2-catalog-entry") &&
    home.indexOf("pv2-identity-entry") > home.indexOf("pv2-project-list"),
  "Identity capsule follows existing projects and precedes the catalog bar",
);
const identity = await (
  await fetch(`${base}/projects/enterprise-identity-systems-operations`)
).text();
assert.ok(identity.includes("pv2-case-continuation"));
assert.ok(identity.includes("/projects/ai-booking-agent"), "Identity wraps to Booking");
console.log("Local catalog SSR, alias and existing page checks passed.");
