import type { CSSProperties } from "react";
import type { CatalogPhase } from "@/content/project-catalog/types";
import type { PresentationState } from "./presentation";

export function WorkflowPhases({
  phases,
  story,
  modal = false,
}: {
  phases: readonly CatalogPhase[];
  story: PresentationState | null;
  modal?: boolean;
}) {
  return (
    <>
      <ol
        className={`pc-phases${modal ? " pc-phases--modal" : ""}`}
        style={{ "--phase-count": phases.length } as CSSProperties}
        aria-label="Business phases"
      >
        {phases.map((phase, index) => {
          const state = story?.phases[phase.id];
          return (
            <li
              key={phase.id}
              className={`${state?.active ? "is-active" : ""} ${state?.covered ? "is-covered" : ""}`}
            >
              <div
                className="pc-phases-inner"
                style={{ transform: `translateY(${state?.lift ?? 0}px)` }}
              >
                <span className="pc-phases-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{phase.title}</strong>
                <p>{phase.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {modal && (
        <div className="pc-phases-current-description" aria-hidden="true">
          {phases
            .filter((phase) => story?.activePhases.includes(phase.id))
            .map((phase) => phase.description)
            .join(" ")}
        </div>
      )}
    </>
  );
}
