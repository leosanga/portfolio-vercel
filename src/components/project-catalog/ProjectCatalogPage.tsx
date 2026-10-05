import { useEffect, useRef, useState } from "react";
import { FooterV2 } from "@/components/portfolio-v2/FooterV2";
import { PortfolioHeaderV2 } from "@/components/portfolio-v2/PortfolioHeaderV2";
import { PortfolioUtilityDockV2 } from "@/components/portfolio-v2/PortfolioUtilityDockV2";
import {
  CATALOG_BATCH_SIZE,
  matchingEntries,
  populatedCategories,
  selectCatalogView,
  type CatalogSelection,
} from "@/content/project-catalog/browsing";
import { CATALOG_CATEGORY_LABELS } from "@/content/project-catalog/types";
import { CatalogProjectPanel } from "./CatalogProjectPanel";
import { useCatalogReadingState } from "./useCatalogReadingState";

export function ProjectCatalogPage({
  selection,
  historyKey,
  onSelectionChange,
}: {
  selection: CatalogSelection;
  historyKey: string;
  onSelectionChange: (selection: CatalogSelection) => void;
}) {
  const selectionKey = `${selection.view}:${selection.categories.join(",")}`;
  const reading = useCatalogReadingState(selectionKey, historyKey);
  const [modalOpen, setModalOpen] = useState(false);
  const modalEntryRef = useRef<string | null>(null);
  const backRef = useRef<HTMLAnchorElement>(null);
  const allProjectsRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pendingFeedback = useRef<{ selectionKey: string; historyKey: string } | null>(null);
  const resultAnimation = useRef<Animation | null>(null);
  const entries = matchingEntries(selection);
  const categories = populatedCategories();
  const filtered = selection.view !== "all" || selection.categories.length > 0;
  const shown = entries.slice(0, reading.count);
  useEffect(() => {
    const invalidate = () => {
      pendingFeedback.current = null;
      resultAnimation.current?.cancel();
      resultAnimation.current = null;
    };
    window.addEventListener("popstate", invalidate);
    return () => {
      window.removeEventListener("popstate", invalidate);
      invalidate();
    };
  }, []);
  useEffect(() => {
    const pending = pendingFeedback.current;
    pendingFeedback.current = null;
    if (!pending || pending.selectionKey !== selectionKey || pending.historyKey === historyKey)
      return;
    const list = listRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    if (
      !list ||
      typeof list.animate !== "function" ||
      document.hidden ||
      reduced.matches ||
      forced.matches
    )
      return;
    let animation: Animation;
    try {
      animation = list.animate(
        [
          { opacity: 0.72, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 240, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    } catch {
      return;
    }
    resultAnimation.current = animation;
    const cancelIfIneligible = () => {
      if (document.hidden || reduced.matches || forced.matches) animation.cancel();
    };
    document.addEventListener("visibilitychange", cancelIfIneligible);
    reduced.addEventListener("change", cancelIfIneligible);
    forced.addEventListener("change", cancelIfIneligible);
    void animation.finished.then(
      () => {
        if (resultAnimation.current === animation) resultAnimation.current = null;
      },
      () => {
        if (resultAnimation.current === animation) resultAnimation.current = null;
      },
    );
    return () => {
      animation.cancel();
      if (resultAnimation.current === animation) resultAnimation.current = null;
      document.removeEventListener("visibilitychange", cancelIfIneligible);
      reduced.removeEventListener("change", cancelIfIneligible);
      forced.removeEventListener("change", cancelIfIneligible);
    };
  }, [selectionKey, historyKey]);
  useEffect(() => {
    if (modalOpen || !modalEntryRef.current) return;
    const opener = document
      .getElementById(`catalog-${modalEntryRef.current}`)
      ?.querySelector<HTMLButtonElement>(".pc-workflow-canvas-heading button");
    modalEntryRef.current = null;
    opener?.focus({ preventScroll: true });
  }, [modalOpen]);
  const changeSelection = (next: CatalogSelection) => {
    if (
      next.view === selection.view &&
      next.categories.join(",") === selection.categories.join(",")
    )
      return;
    resultAnimation.current?.cancel();
    resultAnimation.current = null;
    pendingFeedback.current = {
      selectionKey: `${next.view}:${next.categories.join(",")}`,
      historyKey,
    };
    reading.save();
    reading.setActive(null);
    reading.setOpen([]);
    reading.setCount(CATALOG_BATCH_SIZE);
    onSelectionChange(next);
  };
  const clearFilters = () => {
    changeSelection({ view: "all", categories: [] });
    allProjectsRef.current?.focus({ preventScroll: true });
  };
  const toggleEntry = (id: string, next: boolean) => {
    reading.setOpen((current) =>
      next ? [...new Set([...current, id])] : current.filter((item) => item !== id),
    );
    if (next) reading.setActive(id);
    else reading.setActive((current) => (current === id ? null : current));
  };

  return (
    <div className="portfolio-v2 pc-page" id="top">
      <div className="pc-page-shell" inert={modalOpen}>
        <a className="pv2-skip-link" href="#catalog-content">
          Skip to projects
        </a>
        <PortfolioHeaderV2 context="catalog" />
        <main id="catalog-content" className="pv2-frame pc-main">
          <header className="pc-intro">
            <h1>Project Catalog</h1>
            <p>Systems and workflows, organized around everyday business problems.</p>
          </header>
          <div className="pc-filters" aria-label="Filter projects">
            <div className="pc-filter-group" role="radiogroup" aria-labelledby="catalog-show-label">
              <p id="catalog-show-label">Show</p>
              <div className="pc-filter-buttons">
                {(
                  [
                    ["all", "All projects"],
                    ["workflows", "Workflows"],
                    ["case-studies", "Case studies"],
                  ] as const
                ).map(([view, label]) => (
                  <label className="pc-filter-choice" key={view}>
                    <input
                      type="radio"
                      name="catalog-view"
                      ref={view === "all" ? allProjectsRef : undefined}
                      value={view}
                      checked={selection.view === view}
                      onChange={() => changeSelection(selectCatalogView(selection, view))}
                    />
                    <span className="pc-filter-choice-label">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              className="pc-filter-group"
              role="group"
              aria-labelledby="catalog-category-label"
              aria-describedby="catalog-category-hint"
            >
              <p id="catalog-category-label">Categories</p>
              <div className="pc-filter-options">
                <div className="pc-filter-buttons">
                  <button
                    type="button"
                    aria-pressed={selection.categories.length === 0}
                    onClick={() => changeSelection({ ...selection, categories: [] })}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <label className="pc-filter-choice pc-filter-category" key={category}>
                      <input
                        type="checkbox"
                        name="catalog-category"
                        value={category}
                        checked={selection.categories.includes(category)}
                        onChange={(event) => {
                          const selected = new Set(selection.categories);
                          if (event.target.checked) selected.add(category);
                          else selected.delete(category);
                          changeSelection({
                            ...selection,
                            categories: categories.filter((id) => selected.has(id)),
                          });
                        }}
                      />
                      <span className="pc-filter-choice-label">
                        <span className="pc-filter-check" aria-hidden="true">
                          {selection.categories.includes(category) ? "✓" : null}
                        </span>
                        {CATALOG_CATEGORY_LABELS[category]}
                      </span>
                    </label>
                  ))}
                  {filtered && entries.length > 0 ? (
                    <button className="pc-clear-filters" type="button" onClick={clearFilters}>
                      Clear filters
                    </button>
                  ) : null}
                </div>
                <p className="pc-filter-hint" id="catalog-category-hint">
                  Choose one or more.
                </p>
              </div>
            </div>
          </div>
          <p className="pv2-visually-hidden" aria-live="polite" aria-atomic="true">
            {entries.length} {entries.length === 1 ? "project" : "projects"}. Showing {shown.length}
            .
          </p>
          <div className="pc-project-list" ref={listRef}>
            {entries.length === 0 ? (
              <div className="pc-empty">
                <p>No projects match these filters.</p>
                <button className="pc-clear-filters" type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : null}
            {shown.map((entry) => (
              <CatalogProjectPanel
                key={`${selectionKey}:${entry.id}`}
                entry={entry}
                open={reading.open.includes(entry.id)}
                active={reading.active === entry.id}
                hydrated={reading.hydrated}
                previewMotionEnabled={reading.hydrated && !modalOpen}
                onToggle={(next) => toggleEntry(entry.id, next)}
                onActivate={() => reading.setActive(entry.id)}
                onModalChange={(next) => {
                  if (next) modalEntryRef.current = entry.id;
                  setModalOpen(next);
                }}
              />
            ))}
          </div>
          <div className="pc-more">
            {reading.hydrated && shown.length < entries.length ? (
              <button
                className="pc-more-button"
                type="button"
                onClick={() => {
                  const next = reading.count + CATALOG_BATCH_SIZE;
                  reading.setCount(next);
                  if (next >= entries.length) backRef.current?.focus({ preventScroll: true });
                }}
              >
                Show more projects
              </button>
            ) : null}
            <a href="#top" ref={backRef}>
              Back to filters
            </a>
          </div>
        </main>
        <FooterV2 />
        <PortfolioUtilityDockV2 homeHref="/" />
      </div>
    </div>
  );
}
