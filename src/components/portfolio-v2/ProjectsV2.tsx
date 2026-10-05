import { PROJECTS, PROJECTS_CONTEXT } from "@/content/portfolio-v2/content";
import { groupHomepageProjects } from "@/content/portfolio-v2/project-navigation";

import { CompactCaseStackV2 } from "./CompactCaseStackV2";
import { ProjectCatalogEntryV2 } from "./ProjectCatalogEntryV2";
import { EnterpriseIdentityEntryV2 } from "./EnterpriseIdentityEntryV2";
import { ProjectRowV2 } from "./ProjectRowV2";

export function ProjectsV2() {
  const { lead: featured, caseStudies, standard: remaining } = groupHomepageProjects(PROJECTS);

  if (!featured) return null;

  return (
    <section
      className="pv2-section pv2-projects"
      id="projects"
      aria-labelledby="pv2-projects-title"
    >
      <div className="pv2-frame">
        <div className="pv2-section-heading pv2-projects-heading">
          <p className="pv2-section-heading__index">01</p>
          <h2 id="pv2-projects-title">Projects</h2>
          <p className="pv2-projects-heading__introduction">{PROJECTS_CONTEXT.introduction}</p>
        </div>
        <div className="pv2-projects-context" data-pv2-observe>
          <dl className="pv2-projects-credibility" aria-label="Experience and delivery scale">
            {PROJECTS_CONTEXT.credibility.map((item) => (
              <div className="pv2-projects-credibility__item" key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CompactCaseStackV2 featured={featured} caseStudies={caseStudies} />
        <div className="pv2-project-list">
          {remaining.map((project, index) => (
            <ProjectRowV2
              project={project}
              index={index + caseStudies.length + 2}
              key={project.slug}
            />
          ))}
        </div>
        <EnterpriseIdentityEntryV2 />
        <ProjectCatalogEntryV2 />
      </div>
    </section>
  );
}
