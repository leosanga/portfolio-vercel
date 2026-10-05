import type { ProjectViewModel } from "./types";

type HomepageCaseSummary = Required<Pick<ProjectViewModel, "problem" | "solution" | "hardPart">>;

// Accepted homepage introductions. Shared case and catalog records retain full detail.
export const HOMEPAGE_CASE_SUMMARIES: Readonly<
  Partial<Record<ProjectViewModel["slug"], HomepageCaseSummary>>
> = {
  "n8n-booking-agent": {
    problem:
      "Unclear requests and failures between connected systems can leave a booking wrong or unfinished.",
    solution:
      "I built an n8n agent where AI handles the conversation and tested code checks each action before the calendar changes.",
    hardPart:
      "Keeping the booking consistent when one system succeeded and another failed, so the next request could continue safely.",
  },
  "salesforce-trial-demo-routing": {
    problem:
      "Trial and demo requests can create unnecessary leads or reach the wrong owner when existing Salesforce relationships are ignored.",
    solution:
      "I built a Salesforce system that routes requests using existing CRM records and holds uncertain matches for review.",
    hardPart:
      "Deciding which matches were safe to act on, and giving reviewers a clear reason when identity or company details conflicted.",
  },
  "hubspot-lead-routing": {
    problem: "A lead can be assigned but still be missing from the response-time report.",
    solution:
      "I built a HubSpot system that connects lead assignment and response-time reporting through sales handoff.",
    hardPart:
      "Testing the workflow against its reports exposed a missing assignment path and a scoring rule that blocked small-company routing.",
  },
};
