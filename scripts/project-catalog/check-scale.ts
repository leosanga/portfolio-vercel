import assert from "node:assert/strict";
import { mock } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PROJECT_CATALOG_ENTRIES } from "../../src/content/project-catalog/mixed-catalog";
import type { CatalogPanelEntry } from "../../src/content/project-catalog/mixed-catalog";
import type { CatalogSelection } from "../../src/content/project-catalog/browsing";

// Process-local fixtures only. No public content or browser data is replaced.
const FIXTURE_SIZE = 100;
const publicSource = PROJECT_CATALOG_ENTRIES;
const publicIds = PROJECT_CATALOG_ENTRIES.map((entry) => entry.id);
const fixtures: readonly CatalogPanelEntry[] = Array.from({ length: FIXTURE_SIZE }, (_, index) => ({
  ...PROJECT_CATALOG_ENTRIES[index % PROJECT_CATALOG_ENTRIES.length]!,
  id: `qa-scale-${String(index + 1).padStart(3, "0")}`,
  title: `Local QA fixture ${index + 1}`,
}));
mock.module("../../src/content/project-catalog/mixed-catalog", () => ({
  PROJECT_CATALOG_ENTRIES: fixtures,
}));
const {
  CATALOG_BATCH_SIZE,
  matchingEntries,
  populatedCategories,
  selectCatalogView,
  serializeCatalogSelection,
  validateCatalogSearch,
} = await import("../../src/content/project-catalog/browsing");
assert.equal(CATALOG_BATCH_SIZE, 6);
assert.equal(matchingEntries({ view: "all", categories: [] }).length, FIXTURE_SIZE);
assert.deepEqual(populatedCategories(), [
  "sales-leads",
  "marketing",
  "customer-support",
  "operations",
  "reporting",
]);

// Independent expected results, not a second call to the selector under test.
function expectedEntries(selection: CatalogSelection) {
  return fixtures.filter((entry) => {
    const matchesType =
      selection.view === "all" ||
      (selection.view === "case-studies" && entry.kind === "case-study") ||
      (selection.view === "workflows" && entry.kind !== "case-study");
    const matchesCategory =
      !selection.categories.length ||
      selection.categories.some((category) => category === entry.category);
    return matchesType && matchesCategory;
  });
}

const selections: CatalogSelection[] = [];
const categories = populatedCategories();
for (const view of ["all", "workflows", "case-studies"] as const) {
  // Every subset checks OR within category selections and AND with format.
  for (let mask = 0; mask < 2 ** categories.length; mask++) {
    selections.push({ view, categories: categories.filter((_, index) => mask & (1 << index)) });
  }
}
for (const selection of selections) {
  const matches = matchingEntries(selection);
  assert.deepEqual(
    matches.map((entry) => entry.id),
    expectedEntries(selection).map((entry) => entry.id),
  );
  assert.deepEqual(validateCatalogSearch(serializeCatalogSelection(selection)), selection);
  assert.deepEqual(selectCatalogView(selection, "workflows").categories, selection.categories);
}
const canonical = validateCatalogSearch({
  view: "workflows",
  category: "reporting,invalid,sales-leads,reporting,finance",
});
assert.deepEqual(canonical, { view: "workflows", categories: ["sales-leads", "reporting"] });
assert.deepEqual(serializeCatalogSelection(canonical), {
  view: "workflows",
  category: "sales-leads,reporting",
});
for (const invalid of [
  { view: ["workflows"], category: 42 },
  { view: "invalid", category: {} },
]) {
  assert.deepEqual(validateCatalogSearch(invalid), { view: "all", categories: [] });
}
assert.deepEqual(matchingEntries({ view: "all", categories: [] }, []), []);

// SSR exercises the actual page and panel markup. Reading state is injected;
// effects, event handlers, history restoration and browser interaction are not run.
let readingCount = CATALOG_BATCH_SIZE;
let hydrated = false;
mock.module("../../src/components/project-catalog/useCatalogReadingState", () => ({
  useCatalogReadingState: () => ({
    count: readingCount,
    hydrated,
    open: [],
    active: null,
    setCount() {},
    setOpen() {},
    setActive() {},
    save() {},
  }),
}));
const { ProjectCatalogPage } =
  await import("../../src/components/project-catalog/ProjectCatalogPage");
const renderPage = (selection: CatalogSelection) =>
  renderToStaticMarkup(
    createElement(ProjectCatalogPage, {
      selection,
      historyKey: "local-scale-qa",
      onSelectionChange() {},
    }),
  );
const panelIds = (html: string) =>
  [...html.matchAll(/<details id="catalog-(qa-scale-\d+)"/g)].map((match) => match[1]);
const all: CatalogSelection = { view: "all", categories: [] };
const initial = renderPage(all);
assert.deepEqual(
  panelIds(initial),
  fixtures.slice(0, CATALOG_BATCH_SIZE).map((entry) => entry.id),
);
assert.ok(initial.includes("100 projects. Showing 6."));
assert.ok(
  !initial.includes("Show more projects"),
  "SSR has no inert show-more control before hydration",
);
hydrated = true;
let renderedStates = 1;
let appendedRows = 0;
for (const selection of selections) {
  const expected = expectedEntries(selection);
  let previous: string[] = [];
  for (
    readingCount = CATALOG_BATCH_SIZE;
    readingCount < expected.length + CATALOG_BATCH_SIZE;
    readingCount += CATALOG_BATCH_SIZE
  ) {
    const html = renderPage(selection);
    const actual = panelIds(html) as string[];
    assert.deepEqual(
      actual,
      expected.slice(0, readingCount).map((entry) => entry.id),
    );
    assert.deepEqual(
      actual.slice(0, previous.length),
      previous,
      "appending preserves existing order",
    );
    assert.equal(new Set(actual).size, actual.length, "no duplicate panels");
    assert.ok(
      html.includes(
        `${expected.length} ${expected.length === 1 ? "project" : "projects"}. Showing ${actual.length}.`,
      ),
    );
    assert.equal(html.includes("Show more projects"), actual.length < expected.length);
    assert.equal(html.includes("No projects match these filters."), expected.length === 0);
    assert.ok(
      !html.includes("pc-workflow-canvas"),
      "closed workflows do not render interactive graph canvases",
    );
    appendedRows += actual.length - previous.length;
    previous = actual;
    renderedStates++;
  }
}
readingCount = 102;
const exhausted = renderPage(all);
const proofMounts = {
  casePreviews: (exhausted.match(/class="pc-case-preview /g) ?? []).length,
  homepagePreviews: (exhausted.match(/class="pc-home-preview"/g) ?? []).length,
};
assert.equal(
  proofMounts.casePreviews,
  fixtures.filter((entry) => entry.kind === "case-study").length,
);
assert.equal(
  proofMounts.homepagePreviews,
  fixtures.filter((entry) => entry.kind === "homepage-project").length,
);
assert.ok(!/<details[^>]*\sopen(?:[=>\s])/.test(exhausted), "all fixture disclosures are closed");
assert.deepEqual(
  publicIds,
  publicSource.map((entry) => entry.id),
  "original public array was not mutated",
);
console.log(
  JSON.stringify(
    {
      result: "PASS",
      fixtureEntries: FIXTURE_SIZE,
      batchSize: CATALOG_BATCH_SIZE,
      selectionCombinations: selections.length,
      renderedStates,
      appendedRows,
      formatTotals: Object.fromEntries(
        ["all", "workflows", "case-studies"].map((view) => [
          view,
          matchingEntries({ view: view as CatalogSelection["view"], categories: [] }).length,
        ]),
      ),
      collapsedProofMountsAtExhaustion: proofMounts,
      limits: [
        "Reading hook mocked for pagination states; no browser interaction or effects executed",
        "Collapsed case/homepage static proofs remain mounted; closed workflow canvases are absent",
        "No wall-clock benchmark, memory profiling, keyboard/focus/history or 100-entry browser acceptance",
      ],
    },
    null,
    2,
  ),
);
