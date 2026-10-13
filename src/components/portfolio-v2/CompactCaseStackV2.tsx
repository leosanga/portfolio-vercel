import { Fragment, useCallback, useLayoutEffect, type CSSProperties } from "react";
import type { ProjectProofExperience, ProjectViewModel } from "@/content/portfolio-v2/types";
import { HOMEPAGE_CASE_SUMMARIES } from "@/content/portfolio-v2/homepage-case-summaries";
import { getHomepageProofPresentation } from "@/content/portfolio-v2/homepage-proof-presentation";

import { CaseStudyProjectV2 } from "./CaseStudyProjectV2";
import { FeaturedProjectV2 } from "./FeaturedProjectV2";
import { useCompactCaseStack } from "./useCompactCaseStack";
import { useCasePresentation } from "./useCasePresentation";

function applyCompactProofPresentation(project: ProjectViewModel): ProjectViewModel {
  const experience = project.proofExperience;
  const override = getHomepageProofPresentation(project.slug);
  if (!experience || !override) return project;

  let proofExperience: ProjectProofExperience = experience;
  if (experience.kind === "booking-reliability" && override.kind === experience.kind) {
    proofExperience = { ...experience, ...override };
  } else if (
    experience.kind === "hubspot-coverage-reconciliation" &&
    override.kind === experience.kind
  ) {
    proofExperience = { ...experience, ...override };
  }

  return { ...project, proofExperience };
}

export function CompactCaseStackV2({
  featured,
  caseStudies,
}: {
  featured: ProjectViewModel;
  caseStudies: readonly ProjectViewModel[];
}) {
  const { rootRef: stackRootRef, state } = useCompactCaseStack();
  const { rootRef: presentationRootRef, mode, settled } = useCasePresentation();
  const projects = [featured, ...caseStudies];

  // Both selectors measure the same project stack.
  const setRoot = useCallback(
    (element: HTMLDivElement | null) => {
      stackRootRef.current = element;
      presentationRootRef.current = element;
    },
    [stackRootRef, presentationRootRef],
  );

  // Correct focus after the original/compact trial settles and the stack hook
  // has measured its final geometry.
  useLayoutEffect(() => {
    const root = stackRootRef.current;
    const focused = document.activeElement;
    if (
      !settled ||
      state.enhanced ||
      !state.ready ||
      !root ||
      !(focused instanceof HTMLElement) ||
      !root.contains(focused) ||
      !focused.matches(":focus-visible")
    )
      return;

    const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
    const bottom =
      window.innerHeight - Math.max(88, (dock?.getBoundingClientRect().height ?? 0) + 32);
    const rect = focused.getBoundingClientRect();
    const delta =
      rect.top < state.top ? rect.top - state.top : rect.bottom > bottom ? rect.bottom - bottom : 0;
    if (delta) window.scrollBy({ top: delta, behavior: "instant" });
  }, [stackRootRef, state.enhanced, state.ready, state.top, settled, mode]);

  return (
    <div
      className={"pv2-case-stack" + (mode === "compact" ? " pv2-case-stack--compact" : "")}
      ref={setRoot}
      data-enhanced={settled && state.enhanced}
      data-presentation={mode}
      data-presentation-settled={settled}
      style={
        {
          "--pv2-case-stack-top": state.top + "px",
          "--pv2-case-stack-step": state.edgeStep + "px",
        } as CSSProperties
      }
    >
      {projects.map((project, index) => {
        const summaryProject = { ...project, ...HOMEPAGE_CASE_SUMMARIES[project.slug] };
        const presentationProject =
          mode === "compact" ? applyCompactProofPresentation(summaryProject) : summaryProject;
        const proofAnimationEnabled =
          !settled || !state.ready || state.staticProofs
            ? false
            : state.enhanced
              ? state.owner === index
              : undefined;

        return (
          <Fragment key={project.slug}>
            <div
              className="pv2-case-stack__slot"
              data-covered={settled && state.enhanced && index < state.coveredPrefix}
              style={{ "--pv2-case-stack-index": index } as CSSProperties}
            >
              {index === 0 ? (
                <FeaturedProjectV2
                  project={presentationProject}
                  proofAnimationEnabled={proofAnimationEnabled}
                />
              ) : (
                <CaseStudyProjectV2
                  project={presentationProject}
                  index={index + 1}
                  proofAnimationEnabled={proofAnimationEnabled}
                />
              )}
            </div>
            <div
              className="pv2-case-stack__hold"
              aria-hidden="true"
              style={{ "--pv2-case-stack-hold": (state.holds[index] ?? 0) + "px" } as CSSProperties}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
