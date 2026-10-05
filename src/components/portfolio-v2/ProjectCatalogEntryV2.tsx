import { PROJECTS_CONTEXT } from "@/content/portfolio-v2/content";

type ProjectCatalogEntryV2Props = {
  headingLevel?: "h2" | "p";
};

export function ProjectCatalogEntryV2({ headingLevel = "p" }: ProjectCatalogEntryV2Props) {
  const { catalog } = PROJECTS_CONTEXT;
  const Title = headingLevel;

  return (
    <div className="pv2-catalog-entry">
      <div>
        <Title className="pv2-catalog-entry__title">{catalog.title}</Title>
        <p className="pv2-catalog-entry__description">{catalog.description}</p>
      </div>
      <a className="pv2-featured-project__case-link" href={catalog.href}>
        <span>{catalog.linkLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
          <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </a>
    </div>
  );
}
