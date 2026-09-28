import type { Flow } from "@/components/portfolio/data";

export type SectionId = "projects" | "capabilities" | "approach";

export type HomepageProjectRole = "lead" | "case-study" | "standard";

export type NavigationItem = {
  id: SectionId;
  label: string;
};

export type Capability = {
  title: string;
  statement: string;
  terms: readonly string[];
};

export type BookingReliabilityProofExperience = {
  kind: "booking-reliability";
  eyebrow: string;
  heading: string;
  boundary: string;
  rows: readonly {
    label: string;
    pendingValue: string;
    resolvedValue: string;
    resolvedAt: number;
    tone: "verified" | "failed" | "recovered";
  }[];
  outcomeHeading: string;
  outcomeBody: string;
};

export type HubSpotCoverageReconciliationProofExperience = {
  kind: "hubspot-coverage-reconciliation";
  eyebrow: string;
  heading: string;
  totalAssigned: 14;
  earlierMeasured: 8;
  missingFromReport: 6;
  currentMeasured: 14;
  routes: readonly {
    label: string;
    count: number;
  }[];
  labels: {
    assigned: string;
    assignedUnit: string;
    earlierReport: string;
    measuredUnit: string;
    missingUnit: string;
    correction: string;
    currentCoverage: string;
    currentSupport: string;
  };
  correction: string;
  outcomeHeading: string;
  outcomeBody: string;
};

export type ProjectProofExperience =
  BookingReliabilityProofExperience | HubSpotCoverageReconciliationProofExperience;

export type LeadQualificationLoopExperience = {
  kind: "lead-qualification-loop";
  eyebrow: string;
  disclosureLabel: string;
  scope: string;
  nodes: {
    alert: { tag: string; label: string };
    trigger: { tag: string; label: string };
    contact: { tag: string; label: string };
    research: { tag: string; label: string };
    hubspotUpdate: { tag: string; label: string };
    hubspotOutcome: { tag: string; label: string };
    slackReply: { tag: string; label: string };
    slackOutcome: { tag: string; label: string };
  };
};

export type OutboundDraftAssemblyExperience = {
  kind: "outbound-draft-assembly";
  eyebrow: string;
  disclosureLabel: string;
  scope: string;
  nodes: {
    notification: { tag: string; label: string };
    workflowStart: { tag: string; label: string };
    crmCheck: { tag: string; label: string };
    companyContext: { tag: string; label: string };
    leadershipActivity: { tag: string; label: string };
    painPointFit: { tag: string; label: string };
    relevantProof: { tag: string; label: string };
    pageIntent: { tag: string; label: string };
    qualification: { tag: string; label: string };
    draft: { tag: string; label: string };
    review: { tag: string; label: string; status: string };
  };
};

export type SupportTicketLifecycleExperience = {
  kind: "support-ticket-lifecycle";
  eyebrow: string;
  disclosureLabel: string;
  scope: string;
  finalStatus: string;
  nodes: {
    newRequest: { tag: string; label: string };
    existingReply: { tag: string; label: string };
    ownership: { tag: string; label: string };
    nextAction: { tag: string; label: string };
    followUp: { tag: string; label: string };
    replyLoop: { tag: string; label: string };
    resolution: { tag: string; label: string };
  };
};

export type ExecutiveReportingArchitectureExperience = {
  kind: "executive-reporting-architecture";
  eyebrow: string;
  disclosureLabel: string;
  scope: string;
  evidenceNote: string;
  finalStatus: string;
  paths: readonly [
    {
      key: "native";
      tag: string;
      label: string;
      blueprint: string;
    },
    {
      key: "modeled";
      tag: string;
      label: string;
      blueprint: string;
    },
    {
      key: "integrated";
      tag: string;
      label: string;
      blueprint: string;
    },
  ];
  architectureLabel: string;
  dashboardLabel: string;
};

export type ProjectVisualExperience =
  | LeadQualificationLoopExperience
  | OutboundDraftAssemblyExperience
  | SupportTicketLifecycleExperience
  | ExecutiveReportingArchitectureExperience;

export type ProjectViewModel = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  homepageRole: HomepageProjectRole;
  caseStudyPath?: string;
  caseStudyLabel?: string;
  proofExperience?: ProjectProofExperience;
  visualExperience?: ProjectVisualExperience;
  hardPart?: string;
  flow?: Flow;
};

export type HeroContent = {
  role: string;
  headline: string;
  support: string;
  callLabel: string;
};

export type ConversationContent = {
  heading: string;
  supportLines: readonly string[];
  callLabel: string;
  duration: string;
};

export type MetadataContent = {
  title: string;
  description: string;
};

// A real screenshot placed under the claim it proves. The caption is live text and states what the
// image shows and where its proof stops, per the case-study evidence rule.
export type CaseEvidenceMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  caption: string;
};
