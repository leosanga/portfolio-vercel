import {
  CONTACT as LEGACY_CONTACT,
  PROCESS_STEPS as LEGACY_APPROACH,
  PROJECTS as LEGACY_PROJECTS,
} from "@/components/portfolio/data";

import type {
  Capability,
  ConversationContent,
  HeroContent,
  MetadataContent,
  NavigationItem,
  ProjectViewModel,
} from "./types";
import { BOOKING_AGENT_PROJECT } from "./booking-agent";
import { HUBSPOT_LEAD_ROUTING_PROJECT } from "./hubspot-lead-routing";
import { PROJECT_VISUALS } from "./project-visuals";
import { SALESFORCE_ROUTING_PROJECT } from "./salesforce-trial-demo-routing";

export const NAVIGATION = [
  { id: "projects", label: "Projects" },
  { id: "capabilities", label: "Capabilities" },
  { id: "approach", label: "Approach" },
] as const satisfies readonly NavigationItem[];

export const HERO: HeroContent = {
  role: "Systems Engineer: Integration + Automation",
  headline: "I build systems that run the business",
  support:
    "I design and build the systems a business relies on. My background across operations and technical delivery helps me see how the work gets done before I decide how the system should support it.",
  callLabel: "Schedule a Call",
};

export const PROJECTS_CONTEXT = {
  introduction:
    "These are some of the systems I’ve built. Each one started with a different business problem and shows how I solved it.",
  credibility: [
    {
      value: "5+ years",
      label: "Business operations",
    },
    {
      value: "3+ years",
      label: "Systems engineering",
    },
    {
      value: "Nearly 200",
      label: "B2B clients supported through technical delivery",
    },
    {
      value: "Hundreds",
      label: "Production solutions owned through deployment",
    },
  ],
} as const;

export const CAPABILITIES = [
  {
    title: "Systems Integration + Automation",
    statement:
      "I build the layer that moves information between the systems a business depends on, then automate the work that sits across them.",
    terms: [
      "REST APIs and webhooks",
      "n8n, Zapier, and Make",
      "Python and JavaScript",
      "CRM workflow automation",
      "Cross-functional systems integration",
    ],
  },
  {
    title: "AI + Intelligent Automation",
    statement:
      "I build AI into operational workflows that need judgment, with human checkpoints on the decisions that carry risk.",
    terms: [
      "AI agents",
      "LLM integration",
      "MCP connectors",
      "AI-assisted workflows",
      "Intelligent routing",
      "Lead enrichment",
      "Human-in-the-loop workflows",
    ],
  },
  {
    title: "Business Systems + Process Architecture",
    statement:
      "I translate an operating process into a system structure and workflow that people can keep using as the work changes.",
    terms: [
      "CRM architecture",
      "Data models and routing logic",
      "Workflow design",
      "Process mapping",
      "Reporting and dashboards",
      "Business systems administration",
    ],
  },
  {
    title: "Enterprise Systems + Reliability",
    statement:
      "I handle enterprise identity and the reliability problems that appear between connected platforms.",
    terms: [
      "SSO and SAML",
      "SCIM provisioning",
      "Entra ID and Okta",
      "API troubleshooting",
      "Root-cause analysis",
      "Documentation and governance",
    ],
  },
] as const satisfies readonly Capability[];

const PROJECT_SLUGS: Record<string, string> = {
  "Automated Client Implementation Delivery System (n8n)":
    "automated-client-implementation-delivery",
  "AI-Assisted Lead Qualification (HubSpot + n8n)": "ai-assisted-lead-qualification",
  "AI-Assisted Outbound Prospecting Workflow (n8n)": "ai-assisted-outbound-prospecting",
  "Executive Reporting & Dashboard Automation (Fully custom)":
    "executive-reporting-dashboard-automation",
  "Support Ticket Pipeline Automation (HubSpot)": "support-ticket-pipeline-automation",
};

const LEGACY_PROJECT_VIEW_MODELS: readonly ProjectViewModel[] = LEGACY_PROJECTS.map(
  (project): ProjectViewModel => {
    const slug = PROJECT_SLUGS[project.title];
    if (!slug) {
      throw new Error(`Missing approved project slug for: ${project.title}`);
    }

    return {
      slug,
      title: project.title,
      problem: project.problem,
      solution: project.solution,
      stack: project.stack,
      homepageRole: "standard",
      ...(project.hardPart ? { hardPart: project.hardPart } : {}),
      ...(project.flow ? { flow: project.flow } : {}),
      ...(PROJECT_VISUALS[slug] ? { visualExperience: PROJECT_VISUALS[slug] } : {}),
    };
  },
);

const STANDARD_PROJECT_ORDER = [
  "automated-client-implementation-delivery",
  "ai-assisted-lead-qualification",
  "ai-assisted-outbound-prospecting",
  "support-ticket-pipeline-automation",
  "executive-reporting-dashboard-automation",
] as const;

const STANDARD_PROJECTS = STANDARD_PROJECT_ORDER.map((slug) => {
  const project = LEGACY_PROJECT_VIEW_MODELS.find((candidate) => candidate.slug === slug);
  if (!project) {
    throw new Error(`Missing live homepage project: ${slug}`);
  }
  return project;
});

export const PROJECTS: readonly ProjectViewModel[] = [
  BOOKING_AGENT_PROJECT,
  SALESFORCE_ROUTING_PROJECT,
  HUBSPOT_LEAD_ROUTING_PROJECT,
  ...STANDARD_PROJECTS,
];

if (PROJECTS.length !== 8) {
  throw new Error(
    `Portfolio version 2 expects exactly 8 current projects, received ${PROJECTS.length}.`,
  );
}

if (PROJECTS.filter((project) => project.homepageRole === "lead").length !== 1) {
  throw new Error("Portfolio version 2 expects exactly one lead project.");
}

if (PROJECTS.filter((project) => project.homepageRole === "case-study").length !== 2) {
  throw new Error("Portfolio version 2 expects exactly two secondary case studies.");
}

export const APPROACH = LEGACY_APPROACH;

export const CONVERSATION: ConversationContent = {
  heading: "Start with a conversation.",
  supportLines: [
    "The best solutions start with understanding how the business actually works.",
    "Schedule 30 minutes to discuss a role or a systems problem.",
    "I can walk you through my work, or you can show me how the work gets done today.",
    "We'll identify where the system can improve.",
  ],
  callLabel: "Schedule a Call",
  duration: "30 minutes · Google Calendar",
};

export const CONTACT = LEGACY_CONTACT;

export const METADATA: MetadataContent = {
  title: "Leo Sanga | Systems Engineer, Integration & Automation",
  description:
    "Portfolio of Leo Sanga, a Systems Engineer focused on reliable systems integration and automation for business operations and enterprise platforms.",
};
