import { Fragment, type CSSProperties } from "react";
import type { ProjectViewModel } from "@/content/portfolio-v2/types";
import { HOMEPAGE_CASE_SUMMARIES } from "@/content/portfolio-v2/homepage-case-summaries";

import { CaseStudyProjectV2 } from "./CaseStudyProjectV2";
import { FeaturedProjectV2 } from "./FeaturedProjectV2";
import { useCompactCaseStack } from "./useCompactCaseStack";

export function CompactCaseStackV2({
  featured,
  caseStudies,
}: {
  featured: ProjectViewModel;
  caseStudies: readonly ProjectViewModel[];
}) {
  const { rootRef, state } = useCompactCaseStack();
  const projects = [featured, ...caseStudies];
  return (
    <div
      className="pv2-case-stack"
      ref={rootRef}
      data-enhanced={state.enhanced}
      style={
        {
          "--pv2-case-stack-top": `${state.top}px`,
          "--pv2-case-stack-step": `${state.edgeStep}px`,
        } as CSSProperties
      }
    >
      {projects.map((project, index) => {
        const presentationProject = { ...project, ...HOMEPAGE_CASE_SUMMARIES[project.slug] };
        const proofAnimationEnabled =
          !state.ready || state.staticProofs
            ? false
            : state.enhanced
              ? state.owner === index
              : undefined;
        return (
          <Fragment key={project.slug}>
            <div
              className="pv2-case-stack__slot"
              data-covered={state.enhanced && index < state.coveredPrefix}
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
              style={{ "--pv2-case-stack-hold": `${state.holds[index] ?? 0}px` } as CSSProperties}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
