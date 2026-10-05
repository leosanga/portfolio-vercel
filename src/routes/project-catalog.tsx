import { createFileRoute, useLocation } from "@tanstack/react-router";
import { ProjectCatalogPage } from "@/components/project-catalog/ProjectCatalogPage";
import {
  serializeCatalogSelection,
  validateCatalogSearch,
  type CatalogSearch,
} from "@/content/project-catalog/browsing";
import catalogCss from "@/styles/project-catalog.css?url";
import workflowCss from "@/styles/project-catalog-workflow.css?url";

export const Route = createFileRoute("/project-catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const selection = validateCatalogSearch(search);
    return serializeCatalogSelection(selection);
  },
  head: () => ({
    meta: [
      { title: "Project Catalog | Leo Sanga" },
      {
        name: "description",
        content: "Systems and workflows, organized around everyday business problems.",
      },
      { property: "og:title", content: "Project Catalog | Leo Sanga" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://leosanga.vercel.app/project-catalog",
      },
    ],
    links: [
      { rel: "canonical", href: "https://leosanga.vercel.app/project-catalog" },
      { rel: "stylesheet", href: catalogCss },
      { rel: "stylesheet", href: workflowCss },
    ],
  }),
  component: CatalogRoute,
});

function CatalogRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const historyKey = useLocation({
    select: (location) => location.state.__TSR_key,
  });
  return (
    <ProjectCatalogPage
      selection={validateCatalogSearch(search)}
      historyKey={historyKey ?? "initial"}
      onSelectionChange={(selection) => {
        void navigate({
          search: serializeCatalogSelection(selection),
          resetScroll: false,
        });
      }}
    />
  );
}
