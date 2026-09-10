import type { ProjectViewModel } from "@/content/portfolio-v2/types";

import { WorkflowDisclosureV2 } from "./WorkflowDisclosureV2";

export function FeaturedProjectV2({ project }: { project: ProjectViewModel }) {
  return (
    <article className="pv2-featured-project">
      <div className="pv2-featured-project__header">
        <p className="pv2-project-index">01 / Featured system</p>
        <h3>{project.title}</h3>
      </div>
      <div className="pv2-featured-project__body">
        <div className="pv2-project-field">
          <p className="pv2-project-field__label">Problem</p>
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
        <div className="pv2-project-stack" aria-label="Technologies">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      {project.flow ? <WorkflowDisclosureV2 flow={project.flow} /> : null}
    </article>
  );
}
