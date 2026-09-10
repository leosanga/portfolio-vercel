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

export const PROJECTS: readonly ProjectViewModel[] = LEGACY_PROJECTS.map(
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
      featured: project.featured === true,
      ...(project.hardPart ? { hardPart: project.hardPart } : {}),
      ...(project.flow ? { flow: project.flow } : {}),
    };
  },
);

if (PROJECTS.length !== 5) {
  throw new Error(
    `Portfolio version 2 expects exactly 5 current projects, received ${PROJECTS.length}.`,
  );
}

if (PROJECTS.filter((project) => project.featured).length !== 1) {
  throw new Error("Portfolio version 2 expects exactly one featured project.");
}

export const APPROACH = LEGACY_APPROACH;

export const CONVERSATION: ConversationContent = {
  heading: "Start with a conversation.",
  support:
    "The best systems start with understanding how the business actually works. Schedule 30 minutes to discuss a role or a systems problem. I can walk you through my work, or you can show me how the work gets done today. We'll identify where the system can improve.",
  callLabel: "Schedule a Call",
  duration: "30 minutes · Google Calendar",
};

export const CONTACT = LEGACY_CONTACT;

export const METADATA: MetadataContent = {
  title: "Leo Sanga | Systems Engineer, Integration & Automation",
  description:
    "Portfolio of Leo Sanga, a Systems Engineer focused on reliable systems integration and automation for business operations and enterprise platforms.",
};
