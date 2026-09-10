import type { ProjectViewModel } from "@/content/portfolio-v2/types";

type ProjectRowV2Props = {
  project: ProjectViewModel;
  index: number;
};

export function ProjectRowV2({ project, index }: ProjectRowV2Props) {
  return (
    <article className="pv2-project-row">
      <div className="pv2-project-row__index" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </div>
      <div className="pv2-project-row__main">
        <h3>{project.title}</h3>
        <div className="pv2-project-row__copy">
          <div className="pv2-project-field">
            <p className="pv2-project-field__label">The problem</p>
            <p>{project.problem}</p>
          </div>
          <div className="pv2-project-field">
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
        <div className="pv2-project-stack" aria-label="Technologies">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <span className="pv2-project-row__cue" aria-hidden="true" />
    </article>
  );
}
