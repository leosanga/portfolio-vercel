export const NAV_LINKS = [
  { id: "skills", label: "Skills" },
  { id: "approach", label: "Approach" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];




/**
 * `tools` is ordered by weight, heaviest first: named platforms and languages
 * ahead of the descriptive phrases. The rendered separator is a CSS-generated
 * middot, so never put commas or separators in these strings.
 */
export const COMPETENCIES = [
  {
    title: "Systems Integration + Automation",
    claim:
      "Owning the layer that moves data between the systems a business depends on, and the automation built on top of it.",
    tools: [
      "n8n",
      "Zapier",
      "Make.com",
      "Python",
      "JavaScript",
      "REST API",
      "Webhooks",
      "CRM workflow automation",
      "cross-functional systems integration",
    ],
  },
  {
    title: "Business Systems & Process Architecture",
    claim:
      "Translating how a team actually works into the way its systems are structured.",
    tools: [
      "CRM architecture",
      "routing logic",
      "data models",
      "workflow design",
      "process mapping",
      "reporting",
      "dashboards",
      "business systems administration",
      "operational workflows",
    ],
  },
  {
    title: "AI & Intelligent Automation",
    claim:
      "Building AI into the operational workflows that need judgment, with human checkpoints on the decisions that carry risk.",
    tools: [
      "AI Agents",
      "LLM integration",
      "MCP connectors",
      "prompt-driven automation",
      "AI-driven workflows",
      "intelligent routing",
      "data enrichment",
      "human-in-the-loop workflows",
    ],
  },
  {
    title: "Enterprise Systems & Technical Engineering",
    claim:
      "Running identity and access across enterprise deployments, and the reliability of the integrations underneath them.",
    tools: [
      "SSO/SAML",
      "SCIM provisioning",
      "Entra ID/Azure AD",
      "Okta",
      "API troubleshooting",
      "root-cause analysis",
      "enterprise deployments",
      "systems reliability",
      "documentation & governance",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    body: "I look at how the process runs today: is there an SOP, what tools touch it, who's involved, and what files and approvals it needs.",
  },
  {
    number: "02",
    title: "Plan",
    body: "I write it down: how the systems connect and how the automation works, detailed enough that someone else could rebuild it without me.",
  },
  {
    number: "03",
    title: "Build",
    body: "I build it: fully custom, AI-assisted, or whatever tool fits, whichever's simplest and cheapest.",
  },
  {
    number: "04",
    title: "Validate",
    body: "I review and improve: test it against real scenarios, watch how it performs, fix any issues, and identify improvements.",
  },
];

type Project = {
  title: string;
  overview: string;
  problem: string;
  impact: string[];
  stack: string[];
  /** Rendered at greater visual weight. Exactly one project should carry this. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    featured: true,
    title: "Automated Client Implementation Delivery System (n8n)",
    overview:
      "Generates client-specific implementation deliverables and updates a live project-tracking spreadsheet automatically.",
    problem:
      "Manual creation of onboarding/implementation materials consumed 8+ hrs/week and delayed new-client starts.",
    impact: [
      "Saved an estimated 8+ hours per week",
      "Accelerated onboarding start time",
      "Standardized deliverables across all clients",
    ],
    stack: ["n8n", "Webhooks", "JavaScript", "Google Drive API"],
  },
  {
    title: "Lead Qualification & Routing System (HubSpot)",
    overview:
      "Evaluates inbound leads using defined qualification criteria and routes them to the appropriate priority or sales sequence.",
    problem:
      "Leads from many sources were manually reviewed and routed, causing inconsistent follow-up and missed or mismatched leads.",
    impact: [
      "Improved routing accuracy and consistency",
      "Reduced manual intervention",
      "Faster targeted follow-up",
    ],
    stack: [
      "HubSpot Workflows",
      "Custom Properties",
      "Spreadsheet Mapping",
      "Slack API",
    ],
  },
  {
    title: "AI-Assisted Outbound Prospecting Workflow (n8n)",
    overview:
      "Identifies website visitors via RB2B, pulls company/LinkedIn data, and drafts personalized outreach with ChatGPT delivered straight to Slack.",
    problem:
      "Reps spent significant time manually researching prospects before outreach, slowing response time.",
    impact: [
      "Eliminated manual prospect research",
      "Increased personalization and speed of outreach",
      "Delivered ready-to-send drafts into the sales workflow",
    ],
    stack: ["n8n", "RB2B", "ChatGPT", "Slack API", "HubSpot API"],
  },
  {
    title: "Executive Reporting & Dashboard Automation (Fully custom)",
    overview:
      "Combines platform data exports, spreadsheet modeling/pivot tables, and external sources (Power BI, Jira, Tableau) into one live dashboard.",
    problem:
      "The primary platform's built-in reporting lacked the versatility enterprise clients needed.",
    impact: [
      "Live interactive dashboard",
      "Multiple data sources unified",
      "Reduced manual data-gathering effort",
    ],
    stack: ["Claude Code", "Google Sheets/Excel", "Power BI", "Jira", "Tableau", "API data pull"],
  },
  {
    title: "Support Ticket Pipeline Automation (HubSpot)",
    overview:
      "Full ticket-lifecycle system built inside HubSpot despite confirmed platform limitations.",
    problem:
      "The team needed a standardized way to manage support tickets end to end, but HubSpot's platform limitations made it difficult to configure the desired workflow and routing.",
    impact: [
      "Standardized intake and resolution tracking",
      "Reduced misrouting and response delays",
      "Enabled full-lifecycle reporting",
    ],
    stack: ["HubSpot", "Workflow Automation", "Custom Properties", "Process Mapping"],
  },
  {
    title: "Employee Onboarding Automation (Make.com)",
    overview:
      "Triggered by a new-hire form, generates employee-specific folders/files in Google Drive, updates records, and sends a welcome email.",
    problem: "This process was repetitive and manually time-consuming.",
    impact: [
      "Reduced manual onboarding tasks",
      "Eliminated manual record updates",
      "Optimized the onboarding process",
    ],
    stack: ["Make.com", "Google Sheets", "Google Drive", "Google Forms", "Gmail"],
  },
];

export const CONTACT = {
  email: "leo.j.sanga@gmail.com",
  linkedin: "linkedin.com/in/leo-sanga",
  linkedinUrl: "https://linkedin.com/in/leo-sanga",
  bookingUrl: "https://calendar.app.google/YgudwUd16Y1ztDf17",
};
