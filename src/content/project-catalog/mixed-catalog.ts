import {
  PUBLIC_CASE_STUDIES,
  type PublicCaseStudyRecord,
} from "@/content/portfolio-v2/case-study-records";
import { PROJECTS } from "@/content/portfolio-v2/content";
import type { ProjectViewModel } from "@/content/portfolio-v2/types";
import { CATALOG_ENTRIES } from "./catalog";
import type { CatalogCategoryId, CatalogEntrySummary } from "./types";

export type CaseCatalogEntry = {
  kind: "case-study";
  id: string;
  title: string;
  purpose: string;
  category: CatalogCategoryId;
  toolsLine: string;
  problem: string;
  built: string;
  hardPart: string;
  record: PublicCaseStudyRecord;
};
export type WorkflowCatalogEntry = CatalogEntrySummary & { kind: "workflow" };
export type HomepageCatalogEntry = {
  kind: "homepage-project";
  id: string;
  title: string;
  category: CatalogCategoryId;
  toolsLine: string;
  problem: string;
  built: string;
  hardPart: string;
  project: ProjectViewModel;
};
export type CatalogPanelEntry = WorkflowCatalogEntry | HomepageCatalogEntry | CaseCatalogEntry;

function casePanel(record: PublicCaseStudyRecord): CaseCatalogEntry {
  return {
    kind: "case-study",
    id: record.slug,
    title: record.title,
    purpose: record.caseStudySummary,
    category: record.category,
    toolsLine: record.stack.join(" / "),
    problem: record.problem,
    built: record.solution,
    hardPart: record.hardPart,
    record,
  };
}

const cases = PUBLIC_CASE_STUDIES.map(casePanel);
const workflows: WorkflowCatalogEntry[] = CATALOG_ENTRIES.map((entry) => ({
  ...entry,
  kind: "workflow",
}));

const HOMEPAGE_CATEGORIES = {
  "automated-client-implementation-delivery": "operations",
  "ai-assisted-lead-qualification": "sales-leads",
  "ai-assisted-outbound-prospecting": "sales-leads",
  "support-ticket-pipeline-automation": "customer-support",
  "executive-reporting-dashboard-automation": "reporting",
} as const satisfies Record<string, CatalogCategoryId>;

const standardProjects = PROJECTS.filter((project) => project.homepageRole === "standard");
const homepageEntries: HomepageCatalogEntry[] = standardProjects.map((project) => {
  const category = HOMEPAGE_CATEGORIES[project.slug as keyof typeof HOMEPAGE_CATEGORIES];
  if (!category || !project.hardPart?.trim() || !(project.visualExperience || project.flow)) {
    throw new Error(`Incomplete homepage catalog project: ${project.slug}`);
  }
  return {
    kind: "homepage-project",
    id: project.slug,
    title: project.title,
    category,
    toolsLine: project.stack.join(" / "),
    problem: project.problem,
    built: project.solution,
    hardPart: project.hardPart,
    project,
  };
});
if (
  standardProjects.length !== Object.keys(HOMEPAGE_CATEGORIES).length ||
  new Set(standardProjects.map((project) => project.slug)).size !== standardProjects.length
) {
  throw new Error("Homepage catalog projects must cover the five approved standard records.");
}

// Explicit editorial order is independent of homepage placement and filters.
const editorialIds = [
  "customer-inquiry-routing",
  "quote-follow-up-reminders",
  "sales-call-notes-and-next-steps",
  "enterprise-identity-systems-operations",
  "n8n-booking-agent",
  "salesforce-trial-demo-routing",
  "hubspot-lead-routing",
  "automated-client-implementation-delivery",
  "ai-assisted-lead-qualification",
  "ai-assisted-outbound-prospecting",
  "support-ticket-pipeline-automation",
  "executive-reporting-dashboard-automation",
] as const;
const entries = [...cases, ...workflows, ...homepageEntries];
const byId = new Map(entries.map((entry) => [entry.id, entry]));
if (
  byId.size !== entries.length ||
  editorialIds.length !== entries.length ||
  new Set(editorialIds).size !== editorialIds.length ||
  editorialIds.some((id) => !byId.has(id))
) {
  throw new Error("Project Catalog editorial IDs must uniquely cover every published entry.");
}
if (PROJECTS.some((project) => !byId.has(project.slug))) {
  throw new Error("Project Catalog must include every current homepage project.");
}
export const PROJECT_CATALOG_ENTRIES: readonly CatalogPanelEntry[] = editorialIds.map((id) =>
  byId.get(id)!,
);

if (
  new Set(PROJECT_CATALOG_ENTRIES.map((entry) => entry.id)).size !== PROJECT_CATALOG_ENTRIES.length
) {
  throw new Error("Project Catalog entries must have unique IDs across reading formats.");
}
