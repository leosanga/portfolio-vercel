import type { ProjectViewModel } from "@/content/portfolio-v2/types";

import { ProjectProofExperienceV2 } from "./ProjectProofExperienceV2";

export function CaseStudyProjectV2({
  project,
  index,
  proofAnimationEnabled,
}: {
  project: ProjectViewModel;
  index: number;
  proofAnimationEnabled?: boolean | undefined;
}) {
  return (
    <article className="pv2-case-study-project" data-project={project.slug}>
      <div className="pv2-case-study-project__header">
        <p className="pv2-project-index">{String(index).padStart(2, "0")} / Case study</p>
        {/* Native pagereveal temporarily owns this title’s attributes before hydration. */}
        <h3 suppressHydrationWarning data-case-destination={project.caseStudyPath}>
          {project.title}
        </h3>
      </div>
      <div className="pv2-case-study-project__body">
        <div className="pv2-case-study-project__summary">
          <div className="pv2-project-field">
            <p className="pv2-project-field__label">The problem</p>
            <p>{project.problem}</p>
          </div>
          <div className="pv2-project-field pv2-project-field--emphasis">
            <p className="pv2-project-field__label">What I built</p>
            <p>{project.solution}</p>
          </div>
          {project.hardPart ? (
            <div className="pv2-project-field">
              <p className="pv2-project-field__label">The hard part</p>
              <p>{project.hardPart}</p>
            </div>
          ) : null}
        </div>
        {project.proofExperience ? (
          <ProjectProofExperienceV2
            experience={project.proofExperience}
            proofAnimationEnabled={proofAnimationEnabled}
          />
        ) : null}
      </div>
      <div className="pv2-case-study-project__footer">
        <div className="pv2-project-stack" aria-label="Technologies">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {project.caseStudyPath ? (
          <a className="pv2-featured-project__case-link" href={project.caseStudyPath}>
            <span>{project.caseStudyLabel ?? "Read the case study"}</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
              <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
            </svg>
          </a>
        ) : null}
      </div>
    </article>
  );
}
