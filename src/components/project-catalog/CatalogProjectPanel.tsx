import { ArrowRight, ArrowUp } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";

import type { CatalogPanelEntry } from "@/content/project-catalog/mixed-catalog";
import { CATALOG_CATEGORY_LABELS } from "@/content/project-catalog/types";
import { CatalogCasePreview } from "./CatalogCasePreview";
import { CatalogHomepagePreview } from "./CatalogHomepagePreview";

const WorkflowExperience = lazy(() =>
  import("./workflow/CatalogWorkflowExperience").then((module) => ({
    default: module.CatalogWorkflowExperience,
  })),
);

function StaticPhases({ entry }: { entry: CatalogPanelEntry }) {
  if (entry.kind !== "workflow") return null;
  return (
    <ol className="pc-static-phases">
      {entry.phases.map((phase, index) => (
        <li key={phase.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{phase.title}</h3>
          <p>{phase.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function CatalogProjectPanel({
  entry,
  open,
  active,
  hydrated,
  previewMotionEnabled,
  onToggle,
  onActivate,
  onModalChange,
}: {
  entry: CatalogPanelEntry;
  open: boolean;
  active: boolean;
  hydrated: boolean;
  previewMotionEnabled: boolean;
  onToggle: (open: boolean) => void;
  onActivate: () => void;
  onModalChange: (open: boolean) => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [generation, setGeneration] = useState(0);
  const id = `catalog-${entry.id}`;
  const collapse = () => {
    if (detailsRef.current) detailsRef.current.open = false;
    onToggle(false);
    summaryRef.current?.focus({ preventScroll: true });
    summaryRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "instant",
    });
  };

  return (
    <article className="pc-project" aria-labelledby={`${id}-title`}>
      <div className="pc-project-heading">
        <p className="pc-eyebrow">
          {CATALOG_CATEGORY_LABELS[entry.category]}
          {entry.kind === "case-study" ? " · Case study" : ""}
        </p>
        <h2 id={`${id}-title`}>{entry.title}</h2>
        {"purpose" in entry ? <p className="pc-purpose">{entry.purpose}</p> : null}
      </div>
      <div className="pc-overview">
        {[
          ["The problem", entry.problem],
          ["What I built", entry.built],
          ["The hard part", entry.hardPart],
        ].map(([label, copy]) => (
          <div key={label}>
            <h3>{label}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
      <p className="pc-tools">
        <span className="pv2-visually-hidden">Tools: </span>
        {entry.toolsLine}
      </p>
      <details
        id={id}
        ref={detailsRef}
        open={open}
        onToggle={(event) => {
          const next = event.currentTarget.open;
          if (next === open) return;
          if (next) setGeneration((current) => current + 1);
          onToggle(next);
        }}
      >
        <summary ref={summaryRef} aria-label={`See how ${entry.title} works`}>
          <span>See how it works</span>
          <span className="pc-disclosure-symbol" aria-hidden="true" />
        </summary>
        <div className="pc-expanded">
          {entry.kind === "case-study" ? (
            <CatalogCasePreview
              key={generation}
              preview={entry.record.preview}
              id={id}
              active={open && previewMotionEnabled}
            />
          ) : entry.kind === "homepage-project" ? (
            <CatalogHomepagePreview
              key={generation}
              entry={entry}
              active={open && previewMotionEnabled}
            />
          ) : open && hydrated ? (
            <Suspense fallback={<StaticPhases entry={entry} />}>
              <WorkflowExperience
                entry={entry}
                active={active}
                onRequestPlay={onActivate}
                onModalChange={onModalChange}
              />
            </Suspense>
          ) : (
            <StaticPhases entry={entry} />
          )}
          <div className="pc-explanation-actions">
            {hydrated ? (
              <button
                type="button"
                className="pc-collapse"
                onClick={collapse}
                aria-label={`Collapse ${entry.title}`}
                aria-controls={id}
              >
                Collapse <ArrowUp aria-hidden="true" />
              </button>
            ) : null}
            {entry.kind === "case-study" ? (
              <a className="pc-read-case" href={entry.record.caseStudyPath}>
                Read case study <ArrowRight aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </details>
    </article>
  );
}
