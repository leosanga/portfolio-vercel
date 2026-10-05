import assert from "node:assert/strict";

import {
  CATALOG_BATCH_SIZE,
  matchingEntries,
  populatedCategories,
  selectCatalogView,
  serializeCatalogSelection,
  validateCatalogSearch,
} from "../../src/content/project-catalog/browsing";
import { PROJECTS } from "../../src/content/portfolio-v2/content";
import { PROJECT_CATALOG_ENTRIES } from "../../src/content/project-catalog/mixed-catalog";
import type {
  CatalogPanelEntry,
  WorkflowCatalogEntry,
} from "../../src/content/project-catalog/mixed-catalog";

assert.equal(PROJECT_CATALOG_ENTRIES.length, 13, "the public catalog contains thirteen records");
assert.deepEqual(
  PROJECT_CATALOG_ENTRIES.map((entry) => entry.id),
  [
    "customer-inquiry-routing",
    "quote-follow-up-reminders",
    "blog-post-approval-and-scheduling",
    "sales-call-notes-and-next-steps",
    "enterprise-identity-systems-operations",
    "n8n-booking-agent",
    "salesforce-trial-demo-routing",
    "hubspot-lead-routing",
    "automated-client-implementation-delivery",
    "ai-assisted-lead-qualification",
    "ai-assisted-outbound-prospecting",
    "support-ticket-pipeline-automation",
    "executive-reporting-dashboard-automation",
  ],
  "the approved opening and remaining homepage order are explicit",
);
assert.deepEqual(
  PROJECT_CATALOG_ENTRIES.reduce(
    (counts, entry) => ({ ...counts, [entry.kind]: counts[entry.kind] + 1 }),
    { "case-study": 0, workflow: 0, "homepage-project": 0 },
  ),
  { "case-study": 4, workflow: 4, "homepage-project": 5 },
  "the public catalog contains four cases and nine inline entries",
);
for (const project of PROJECTS) {
  const match = PROJECT_CATALOG_ENTRIES.find((entry) => entry.id === project.slug);
  assert.ok(match, `${project.slug} is represented`);
  if (match.kind === "homepage-project") {
    assert.equal(match.title, project.title);
    assert.equal(match.problem, project.problem);
    assert.equal(match.built, project.solution);
    assert.equal(match.hardPart, project.hardPart);
    assert.equal(match.toolsLine, project.stack.join(" / "));
    assert.ok(project.visualExperience || project.flow);
  }
}
assert.deepEqual(
  PROJECT_CATALOG_ENTRIES.filter((entry) => entry.kind === "homepage-project").map(
    (entry) => entry.category,
  ),
  ["operations", "sales-leads", "sales-leads", "customer-support", "reporting"],
  "homepage source projects use the approved category mapping",
);

assert.equal(matchingEntries({ view: "all", categories: [] }).length, 13);
assert.equal(matchingEntries({ view: "case-studies", categories: [] }).length, 4);
const workflows = matchingEntries({ view: "workflows", categories: [] });
assert.equal(workflows.length, 9);
assert.ok(
  workflows.every((entry) => entry.kind !== "case-study"),
  "Workflows excludes all cases",
);
assert.deepEqual(populatedCategories(), [
  "sales-leads",
  "marketing",
  "customer-support",
  "operations",
  "reporting",
]);
assert.deepEqual(
  matchingEntries({ view: "case-studies", categories: ["operations"] }).map((entry) => entry.id),
  ["enterprise-identity-systems-operations"],
);
assert.deepEqual(
  matchingEntries({ view: "all", categories: ["marketing"] }).map((entry) => entry.id),
  ["blog-post-approval-and-scheduling"],
);

assert.deepEqual(
  validateCatalogSearch({ view: "case-studies", category: "customer-support" }),
  { view: "case-studies", categories: ["customer-support"] },
  "a published category remains selected even when the chosen format has no matches",
);
assert.deepEqual(
  validateCatalogSearch({ view: "invalid", category: "not-a-category" }),
  { view: "all", categories: [] },
  "invalid query values use safe defaults",
);
assert.deepEqual(
  validateCatalogSearch({ view: ["case-studies"], category: 42 }),
  { view: "all", categories: [] },
  "query values with unexpected types use safe defaults",
);
assert.deepEqual(
  selectCatalogView({ view: "all", categories: ["customer-support"] }, "case-studies"),
  { view: "case-studies", categories: ["customer-support"] },
  "changing format retains selected categories",
);

const combined = validateCatalogSearch({
  view: "workflows",
  category: "customer-support,invalid,sales-leads,customer-support,finance",
});
assert.deepEqual(
  combined,
  {
    view: "workflows",
    categories: ["sales-leads", "customer-support"],
  },
  "validation discards unknown/unpopulated categories and orders/deduplicates selections",
);
assert.deepEqual(serializeCatalogSelection(combined), {
  view: "workflows",
  category: "sales-leads,customer-support",
});
assert.deepEqual(validateCatalogSearch(serializeCatalogSelection(combined)), combined);
assert.deepEqual(
  serializeCatalogSelection({ view: "all", categories: [] }),
  {},
  "defaults are omitted",
);
assert.deepEqual(
  validateCatalogSearch({ category: "sales-leads" }),
  {
    view: "all",
    categories: ["sales-leads"],
  },
  "legacy single-category URLs remain supported",
);
assert.deepEqual(
  serializeCatalogSelection({
    view: "all",
    categories: ["customer-support", "sales-leads", "customer-support"],
  }),
  { category: "sales-leads,customer-support" },
  "serialization itself canonicalizes category order",
);
assert.equal(matchingEntries(combined).length, 6, "category union intersects workflow format");
assert.equal(matchingEntries(selectCatalogView(combined, "case-studies")).length, 3);
assert.equal(matchingEntries({ view: "all", categories: combined.categories }).length, 9);
assert.equal(
  matchingEntries({ view: "case-studies", categories: ["customer-support"] }).length,
  0,
  "empty intersections stay empty rather than broadening to All",
);
assert.equal(matchingEntries({ view: "workflows", categories: ["customer-support"] }).length, 2);
assert.equal(matchingEntries({ view: "workflows", categories: ["sales-leads"] }).length, 4);
assert.equal(matchingEntries({ view: "workflows", categories: ["reporting"] }).length, 1);

function workflow(id: string, category: WorkflowCatalogEntry["category"]): WorkflowCatalogEntry {
  return {
    id,
    title: id,
    purpose: "Purpose",
    category,
    toolsLine: "Tools",
    problem: "Problem",
    built: "Built",
    hardPart: "Hard part",
    phases: [],
    kind: "workflow",
  };
}

const firstCase = PROJECT_CATALOG_ENTRIES.find((entry) => entry.kind === "case-study");
assert.ok(firstCase, "the public collection has a case-study fixture source");
const longCollection: readonly CatalogPanelEntry[] = [
  firstCase,
  workflow("other-1", "sales-leads"),
  workflow("other-2", "sales-leads"),
  workflow("other-3", "sales-leads"),
  workflow("other-4", "sales-leads"),
  workflow("other-5", "sales-leads"),
  workflow("other-6", "sales-leads"),
  workflow("late-support-match", "customer-support"),
];
assert.ok(longCollection.length >= 8);

const supportSelection = {
  view: "all",
  categories: ["customer-support"],
} as const;
const filteredPage = matchingEntries(supportSelection, longCollection).slice(0, CATALOG_BATCH_SIZE);
assert.deepEqual(
  filteredPage.map((entry) => entry.id),
  ["late-support-match"],
  "filtering the full collection before the six-row batch includes a later matching record",
);
assert.deepEqual(
  matchingEntries(selectCatalogView(supportSelection, "workflows"), longCollection)
    .slice(0, CATALOG_BATCH_SIZE)
    .map((entry) => entry.id),
  ["late-support-match"],
  "combined filtering finds a late workflow match before batching",
);
const unionFixture = [
  ...longCollection.slice(0, -1).map((entry) => ({ ...entry, category: "operations" as const })),
  workflow("late-support-match", "customer-support"),
  workflow("late-sales-match", "sales-leads"),
];
assert.deepEqual(
  matchingEntries(
    { view: "workflows", categories: ["sales-leads", "customer-support"] },
    unionFixture,
  )
    .slice(0, CATALOG_BATCH_SIZE)
    .map((entry) => entry.id),
  ["late-support-match", "late-sales-match"],
  "category union filters the complete collection before batching",
);

console.log("Project catalog browsing checks passed.");
