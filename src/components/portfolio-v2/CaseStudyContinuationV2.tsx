import { PROJECTS_CONTEXT } from "@/content/portfolio-v2/content";
import { PUBLIC_CASE_STUDIES } from "@/content/portfolio-v2/case-study-records";
import { getNextCaseStudy } from "@/content/portfolio-v2/project-navigation";

import { ProjectContinuationCardV2 } from "./ProjectContinuationCardV2";

type CaseStudyContinuationV2Props = {
  currentSlug: string;
};

export function CaseStudyContinuationV2({ currentSlug }: CaseStudyContinuationV2Props) {
  const nextCase = getNextCaseStudy(PUBLIC_CASE_STUDIES, currentSlug);
  if (nextCase?.caseStudyPath && !nextCase.caseStudySummary?.trim()) {
    throw new Error(`Missing case study summary for: ${nextCase.slug}`);
  }

  return (
    <nav className="pv2-case-continuation" aria-label="More projects">
      <div className="pv2-frame pv2-case-continuation__choices">
        {nextCase?.caseStudyPath && nextCase.caseStudySummary && (
          <ProjectContinuationCardV2
            title={nextCase.title}
            description={nextCase.caseStudySummary}
            href={nextCase.caseStudyPath}
            linkLabel="Next case study"
          />
        )}
        <ProjectContinuationCardV2 {...PROJECTS_CONTEXT.catalog} />
      </div>
    </nav>
  );
}
