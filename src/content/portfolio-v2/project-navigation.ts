import type { ProjectViewModel } from "./types";

export type HomepageProjectGroups = {
  lead: ProjectViewModel | undefined;
  caseStudies: readonly ProjectViewModel[];
  standard: readonly ProjectViewModel[];
};

export function groupHomepageProjects(
  projects: readonly ProjectViewModel[],
): HomepageProjectGroups {
  const slugs = new Set<string>();
  const paths = new Set<string>();

  for (const project of projects) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);

    if (project.caseStudyPath) {
      if (paths.has(project.caseStudyPath)) {
        throw new Error(`Duplicate case study path: ${project.caseStudyPath}`);
      }
      paths.add(project.caseStudyPath);
    }
  }

  const leads = projects.filter((project) => project.homepageRole === "lead");
  if (leads.length > 1) {
    throw new Error(`Expected at most one lead project, received ${leads.length}.`);
  }

  return {
    lead: leads[0],
    caseStudies: projects.filter((project) => project.homepageRole === "case-study"),
    standard: projects.filter((project) => project.homepageRole === "standard"),
  };
}

type CaseReference = Pick<ProjectViewModel, "slug" | "caseStudyPath">;

export function getEligibleCaseStudies<T extends CaseReference>(
  projects: readonly T[],
): readonly T[] {
  const cases = projects.filter((project) => project.caseStudyPath?.startsWith("/projects/"));
  const slugs = new Set<string>();
  const paths = new Set<string>();
  for (const item of cases) {
    if (slugs.has(item.slug)) throw new Error(`Duplicate project slug: ${item.slug}`);
    if (paths.has(item.caseStudyPath!)) {
      throw new Error(`Duplicate case study path: ${item.caseStudyPath}`);
    }
    slugs.add(item.slug);
    paths.add(item.caseStudyPath!);
  }
  return cases;
}

export function getNextCaseStudy<T extends CaseReference>(
  projects: readonly T[],
  currentSlug: string,
): T | undefined {
  const cases = getEligibleCaseStudies(projects);
  if (cases.length === 0) return undefined;

  const currentIndex = cases.findIndex((project) => project.slug === currentSlug);
  if (currentIndex < 0) {
    throw new Error(`Unknown current case study: ${currentSlug}`);
  }
  if (cases.length === 1) return undefined;

  return cases[(currentIndex + 1) % cases.length];
}
