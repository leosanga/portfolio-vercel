import { PROJECT_CATALOG_ENTRIES, type CatalogPanelEntry } from "./mixed-catalog";
import { CATALOG_CATEGORY_LABELS, type CatalogCategoryId } from "./types";

export const CATALOG_BATCH_SIZE = 6;
export type CatalogView = "all" | "workflows" | "case-studies";
export type CatalogSelection = {
  view: CatalogView;
  categories: readonly CatalogCategoryId[];
};
export type CatalogSearch = {
  view?: Exclude<CatalogView, "all">;
  category?: string;
};

export function scopedEntries(view: CatalogView, entries = PROJECT_CATALOG_ENTRIES) {
  return entries.filter(
    (entry) =>
      view === "all" ||
      (view === "case-studies" ? entry.kind === "case-study" : entry.kind !== "case-study"),
  );
}

export function populatedCategories(entries = PROJECT_CATALOG_ENTRIES) {
  const available = new Set(entries.map((entry) => entry.category));
  return (Object.keys(CATALOG_CATEGORY_LABELS) as CatalogCategoryId[]).filter((id) =>
    available.has(id),
  );
}

export function validateCatalogSearch(search: Record<string, unknown>): CatalogSelection {
  const view: CatalogView =
    search["view"] === "case-studies" || search["view"] === "workflows" ? search["view"] : "all";
  const requested = typeof search["category"] === "string" ? search["category"].split(",") : [];
  const categories = populatedCategories().filter((id) => requested.includes(id));
  return { view, categories };
}

export function serializeCatalogSelection(selection: CatalogSelection): CatalogSearch {
  const categories = populatedCategories().filter((id) => selection.categories.includes(id));
  return {
    ...(selection.view !== "all" ? { view: selection.view } : {}),
    ...(categories.length ? { category: categories.join(",") } : {}),
  };
}

export function selectCatalogView(
  selection: CatalogSelection,
  view: CatalogView,
): CatalogSelection {
  return { ...selection, view };
}

export function matchingEntries(
  selection: CatalogSelection,
  entries: readonly CatalogPanelEntry[] = PROJECT_CATALOG_ENTRIES,
) {
  return scopedEntries(selection.view, entries).filter(
    (entry) => selection.categories.length === 0 || selection.categories.includes(entry.category),
  );
}
