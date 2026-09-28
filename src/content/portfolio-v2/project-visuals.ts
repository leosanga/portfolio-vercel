import type { ProjectVisualExperience } from "./types";

export const PROJECT_VISUALS: Readonly<Record<string, ProjectVisualExperience>> = {
  "ai-assisted-lead-qualification": {
    kind: "lead-qualification-loop",
    eyebrow: "Qualification loop",
    disclosureLabel: "See how it works",
    scope:
      "This view shows how missing qualification data is completed. The qualification criteria and downstream routing paths are not shown.",
    nodes: {
      alert: {
        tag: "Slack notification",
        label: "Existing workflow posts a missing-information alert",
      },
      trigger: {
        tag: "Slack webhook",
        label: "Email address starts the n8n workflow",
      },
      contact: {
        tag: "HubSpot node",
        label: "Contact context is retrieved from HubSpot",
      },
      research: {
        tag: "n8n + LLM",
        label: "Research and qualification run outside HubSpot",
      },
      hubspotUpdate: {
        tag: "HubSpot update",
        label: "Qualification properties are written back",
      },
      hubspotOutcome: {
        tag: "Native automation",
        label: "Existing HubSpot workflows respond to the update",
      },
      slackReply: {
        tag: "Slack thread",
        label: "Outcome is posted in the original Slack thread",
      },
      slackOutcome: {
        tag: "Team visibility",
        label: "The team can review and coordinate follow-up",
      },
    },
  },
  "ai-assisted-outbound-prospecting": {
    kind: "outbound-draft-assembly",
    eyebrow: "Context to draft",
    disclosureLabel: "See how it works",
    scope:
      "This view shows how a limited visitor signal becomes a researched draft for review. The full research and qualification logic stays out of scope.",
    nodes: {
      notification: {
        tag: "Visitor signal",
        label: "Limited lead details and the page viewed arrive in Slack",
      },
      workflowStart: {
        tag: "Workflow start",
        label: "The Slack notification starts the n8n workflow",
      },
      crmCheck: {
        tag: "CRM context",
        label: "Existing HubSpot context is used when available",
      },
      companyContext: {
        tag: "Company context",
        label: "Public company sources build the research brief",
      },
      leadershipActivity: {
        tag: "Leadership and activity",
        label: "Current company signals add context",
      },
      painPointFit: {
        tag: "Pain-point fit",
        label: "Research identifies where the company may need support",
      },
      relevantProof: {
        tag: "Relevant proof",
        label: "Matching case studies support the angle",
      },
      pageIntent: {
        tag: "Page intent",
        label: "The visited page guides the angle",
      },
      qualification: {
        tag: "Research qualification",
        label: "The completed research determines whether the opportunity fits",
      },
      draft: {
        tag: "Grounded draft",
        label: "The evidence and relevant case studies shape the conversation starter",
      },
      review: {
        tag: "Slack thread",
        label: "The draft returns to the original notification for review",
        status: "Ready for review",
      },
    },
  },
};
