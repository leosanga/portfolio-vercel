import { PROJECTS } from "@/content/portfolio-v2/content";

import { FeaturedProjectV2 } from "./FeaturedProjectV2";
import { ProjectRowV2 } from "./ProjectRowV2";

export function ProjectsV2() {
  const featured = PROJECTS.find((project) => project.featured);
  const remaining = PROJECTS.filter((project) => !project.featured);

  if (!featured) return null;

  return (
    <section
      className="pv2-section pv2-projects"
      id="projects"
      aria-labelledby="pv2-projects-title"
    >
      <div className="pv2-frame">
        <div className="pv2-section-heading">
          <p className="pv2-section-heading__index">01</p>
          <h2 id="pv2-projects-title">Projects</h2>
        </div>
        <FeaturedProjectV2 project={featured} />
        <div className="pv2-project-list">
          {remaining.map((project, index) => (
            <ProjectRowV2 project={project} index={index + 2} key={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
