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
  "support-ticket-pipeline-automation": {
    kind: "support-ticket-lifecycle",
    eyebrow: "Ticket lifecycle",
    disclosureLabel: "See how it works",
    scope:
      "This view shows how a support request stays connected to the right ticket and next action through resolution. Internal routing rules and timing details are not shown.",
    finalStatus: "Lifecycle complete",
    nodes: {
      newRequest: {
        tag: "New request",
        label: "A new request creates a ticket",
      },
      existingReply: {
        tag: "Existing reply",
        label: "A reply returns work to the existing ticket",
      },
      ownership: {
        tag: "Ownership",
        label: "The team is notified and ownership becomes visible",
      },
      nextAction: {
        tag: "State-driven action",
        label: "The ticket state determines the next action",
      },
      followUp: {
        tag: "Follow-up",
        label: "Waiting work keeps its follow-up",
      },
      replyLoop: {
        tag: "Reply received",
        label: "A reply returns the ticket to active work",
      },
      resolution: {
        tag: "Resolution",
        label: "Resolved work moves toward closure",
      },
    },
  },
  "executive-reporting-dashboard-automation": {
    kind: "executive-reporting-architecture",
    eyebrow: "Metric architecture",
    disclosureLabel: "See how it works",
    scope:
      "Reporting that once required manual analysis stays available on demand because each complex metric gets the architecture it needs.",
    evidenceNote:
      "Representative pattern. Client data, metric definitions, and implementation details are not shown.",
    finalStatus: "Available on demand",
    paths: [
      {
        key: "native",
        tag: "Native path",
        label: "Platform reporting supports the metric",
        blueprint: "Native reporting",
      },
      {
        key: "modeled",
        tag: "Modeled path",
        label: "External modeling completes the metric",
        blueprint: "External model",
      },
      {
        key: "integrated",
        tag: "Integrated path",
        label: "A connector or custom API supplies the data",
        blueprint: "Connector or API",
      },
    ],
    architectureLabel: "The reporting path changes with the metric",
    dashboardLabel: "The completed metric stays available on demand",
  },
};
