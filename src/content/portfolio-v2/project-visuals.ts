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
};
