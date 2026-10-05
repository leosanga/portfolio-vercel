import assert from "node:assert/strict";

import { PUBLIC_CASE_STUDIES } from "../src/content/portfolio-v2/case-study-records";
import {
  getEligibleCaseStudies,
  getNextCaseStudy,
  groupHomepageProjects,
} from "../src/content/portfolio-v2/project-navigation";
import type { ProjectViewModel } from "../src/content/portfolio-v2/types";

const actualCases = getEligibleCaseStudies(PUBLIC_CASE_STUDIES);
assert.deepEqual(
  actualCases.map((project) => project.slug),
  [
    "n8n-booking-agent",
    "salesforce-trial-demo-routing",
    "hubspot-lead-routing",
    "enterprise-identity-systems-operations",
  ],
  "the actual case-study cycle follows the authoritative public record order, independent of homepage placement",
);
assert.equal(
  getNextCaseStudy(PUBLIC_CASE_STUDIES, "hubspot-lead-routing")?.slug,
  "enterprise-identity-systems-operations",
  "HubSpot leads to Identity",
);
assert.equal(
  getNextCaseStudy(PUBLIC_CASE_STUDIES, "enterprise-identity-systems-operations")?.slug,
  "n8n-booking-agent",
  "Identity wraps to the first public case",
);

function project(
  slug: string,
  homepageRole: ProjectViewModel["homepageRole"],
  caseStudyPath?: string,
): ProjectViewModel {
  return {
    slug,
    title: slug,
    problem: "Problem",
    solution: "Solution",
    stack: [],
    homepageRole,
    ...(caseStudyPath ? { caseStudyPath } : {}),
  };
}

const fixture = [
  project("secondary-a", "case-study", "/projects/secondary-a"),
  project("regular", "standard"),
  project("lead", "lead", "/projects/lead"),
  project("secondary-b", "case-study", "/projects/secondary-b"),
];
const groups = groupHomepageProjects(fixture);
assert.equal(groups.lead?.slug, "lead");
assert.deepEqual(
  groups.caseStudies.map((item) => item.slug),
  ["secondary-a", "secondary-b"],
);
assert.deepEqual(
  groups.standard.map((item) => item.slug),
  ["regular"],
);
assert.deepEqual(
  getEligibleCaseStudies(fixture).map((item) => item.slug),
  ["secondary-a", "lead", "secondary-b"],
  "eligible cases retain input order and standard projects without a case path are excluded",
);
assert.equal(getNextCaseStudy(fixture, "secondary-a")?.slug, "lead");
assert.equal(getNextCaseStudy(fixture, "lead")?.slug, "secondary-b");
assert.equal(getNextCaseStudy(fixture, "secondary-b")?.slug, "secondary-a");

const inserted = [...fixture, project("new-case", "case-study", "/projects/new-case")];
assert.equal(getNextCaseStudy(inserted, "secondary-b")?.slug, "new-case");
assert.equal(getNextCaseStudy(inserted, "new-case")?.slug, "secondary-a");
const reordered = [fixture[2], fixture[3], fixture[0], fixture[1]];
assert.deepEqual(
  getEligibleCaseStudies(reordered).map((item) => item.slug),
  ["lead", "secondary-b", "secondary-a"],
);
assert.equal(getNextCaseStudy(reordered, "secondary-b")?.slug, "secondary-a");

const standardPlacementCase = project(
  "standard-placement-case",
  "standard",
  "/projects/standard-placement-case",
);
assert.deepEqual(
  getEligibleCaseStudies([standardPlacementCase]).map((item) => item.slug),
  ["standard-placement-case"],
  "a public case remains in the cycle when its homepage project has standard placement",
);

assert.equal(getNextCaseStudy([], "missing"), undefined, "zero cases render no next link");
assert.equal(
  getNextCaseStudy([project("one", "lead", "/projects/one")], "one"),
  undefined,
  "one case renders no self-link",
);
assert.throws(() => getNextCaseStudy(fixture, "missing"), /Unknown current case study: missing/);
assert.throws(
  () => getNextCaseStudy([project("one", "lead", "/projects/one")], "missing"),
  /Unknown current case study: missing/,
);
assert.throws(
  () => groupHomepageProjects([project("same", "lead"), project("same", "standard")]),
  /Duplicate project slug: same/,
);
assert.throws(
  () =>
    groupHomepageProjects([
      project("first", "lead", "/projects/shared"),
      project("second", "case-study", "/projects/shared"),
    ]),
  /Duplicate case study path: \/projects\/shared/,
);

console.log("Case-study navigation checks passed.");
