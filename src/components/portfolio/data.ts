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

/**
 * A step in a project's system diagram. `kind` is the whole point of the
 * diagram: it records which layer owns the step, so the picture shows a
 * design decision rather than just a sequence.
 */
export type FlowNode = {
  label: string;
  detail: string;
  /**
   * Which layer owns the step. Drives the node's colour, and its printed tag
   * unless `tag` overrides it. The three are consistent across projects:
   * `native` is the platform's own automation engine, `service` is
   * hand-written code, `manual` is a person, and `constraint` is a platform
   * limit that shaped the design without being a step the system performs.
   */
  kind: "native" | "service" | "manual" | "constraint";
  /**
   * Printed instead of the default tag for this `kind`. The vocabulary is
   * per-platform: HubSpot's engine is a "native workflow", n8n's is a node.
   */
  tag?: string;
};

/**
 * One node is a step on the spine. Two nodes are a branch that merges back
 * into the spine on the next row. Nothing else is drawable, on purpose.
 */
export type Flow = {
  /**
   * Prose version of the whole path, rendered above the figure. Optional: a
   * card whose problem and solution already carry the path does not need it
   * restated over the diagram, so it is left off there.
   */
  summary?: string;
  rows: FlowNode[][];
};

type Project = {
  title: string;
  /**
   * Every project reads problem first, then solution, at both tiers.
   *
   * **`solution` leads with what Leo built, then closes with a short outcome
   * clause.** The portfolio card exists to say what he built, so the solution
   * names the system and its main moving parts, then a trailing "so ..." says
   * what changed. It is still a compact build summary, not a walkthrough: it
   * does not open on a trigger and follow the data step by step through the
   * system (the `flow` diagram is the detailed version where there is one, and
   * `stack` names the tools). Naming the category over enumerating its members
   * still holds. This reverses the earlier "impact, not mechanism" rule on
   * Leo's instruction (2026-08-21); the step-by-step walkthrough it warned
   * against is still wrong.
   *
   * Both fields are present tense throughout. A problem in the present reads as
   * the standing situation the system answers, and it keeps every card in one
   * voice. Do not put a card back into the past because its problem is solved.
   *
   * The `overview` and `impact[]` fields this replaced are gone. There is no
   * longer a one-line "what this is" above the problem either: it restated the
   * solution two paragraphs before the solution.
   */
  problem: string;
  solution: string;
  stack: string[];
  /** Rendered at greater visual weight. Exactly one project should carry this. */
  featured?: boolean;
  /**
   * Renders a system diagram under the card, and is what sorts a project into
   * a tier: a project with a `flow` is a case study, one without is an
   * "also built" entry. There is no separate tier flag, because a project that
   * can show its topology is exactly the project that has evidence to show.
   */
  flow?: Flow;
  /**
   * The constraint that shaped the build, for an "also built" entry that has
   * one. It is the one thing such an entry can say that is specific and
   * memorable while staying safe, since a platform's limitation is not the
   * employer's business process.
   *
   * Optional on purpose, and only three of the five have one. Outbound
   * prospecting's problem was time spent per prospect and onboarding's was
   * repetition. Both are reasons to automate, neither is a constraint that
   * shaped a design, so neither gets a line invented for it.
   */
  hardPart?: string;
};

/**
 * The only project on this site with no NDA surface: it is Leo's own HubSpot
 * sandbox build, so the diagram can name real properties and workflows. Live
 * portal object ids stay out of it regardless, they are real identifiers with
 * no reason to be published. Source of record for the topology is
 * `../../hubspot-revops-architecture/docs/pipeline-diagram.md`.
 */
const REVOPS_PIPELINE: Project = {
  featured: true,
  title: "HubSpot Revenue Pipeline Architecture (Sandbox Build)",
  problem:
    "Inbound leads either sit in a queue nobody owns or get routed by rules nobody can reconstruct later, so there is no record of why a given lead went where it did.",
  // Assembled from this card's own overview and impact bullets when the section
  // moved to problem/solution, so the card is not broken if it is restored. It
  // has still not had the copy pass described under "How the node copy is
  // written" in PIPELINE_DIAGRAM_PLAN.md, and it shows: named test counts and
  // branch internals.
  solution:
    "Every routing decision writes its own reason to the deal, so why a lead went where it did is still answerable weeks later. The scoring is pinned by tests that fail if a change quietly makes a dead branch reachable, and SLA measurement now sees every path rather than the one it happened to sit inside.",
  stack: [
    "HubSpot Workflows",
    "FastAPI",
    "Python",
    "Webhooks",
    "HubSpot API",
    "pytest",
  ],
  flow: {
    summary:
      "A lead lands on a form, gets scored by a Python service, is routed by a native workflow to either an AE or the SDR queue, sits under a 4 hour SLA watch on either path, and is handed into the sales pipeline once an SDR qualifies it.",
    rows: [
      [
        {
          kind: "native",
          label: "Form submission",
          detail:
            "HubSpot creates the contact and opens the deal in New Lead on the SDR pipeline.",
        },
      ],
      [
        {
          kind: "service",
          label: "Scoring service writes lead_score",
          detail:
            "A property change webhook hits a FastAPI service, which scores the contact on seniority and intent signals and writes the score back to the contact, never to the deal, so no copy of it can go stale.",
        },
      ],
      [
        {
          kind: "native",
          label: "Score clears the tier, straight to an AE",
          detail:
            "Assigned by the contact's region, or rotated across AEs when the account is SMB sized. Skips the SDR queue entirely.",
        },
        {
          kind: "native",
          label: "Below the tier, round-robin the SDR queue",
          detail:
            "Rotated across the SDRs, and reassigned to the SDR team lead if it is still sitting in New Lead 4 hours later.",
        },
      ],
      [
        {
          kind: "native",
          label: "SLA Watch measures both paths",
          detail:
            "A separate workflow enrolls on every New Lead deal and sets sla_status after 4 hours, so a breach shows up whichever way the lead was routed.",
        },
      ],
      [
        {
          kind: "manual",
          label: "SDR qualifies and hands off",
          detail:
            "Contacted, Qualified, Meeting Booked and the handoff itself stay manual, because they are sales judgment rather than signals a system should read.",
        },
      ],
      [
        {
          kind: "native",
          label: "Handoff workflow opens the sales deal",
          detail:
            "Creates the Sales Pipeline deal at Sales Accepted, carrying the contact association and a snapshot of lead_score.",
        },
      ],
      [
        {
          kind: "service",
          label: "First value flips the deal to Onboarded",
          detail:
            "The rep closes the deal manually. A usage event then hits the service, which sets first_value_reached_at and advances the stage.",
        },
      ],
    ],
  },
};

/**
 * `REVOPS_PIPELINE` is deliberately absent. The card and its diagram are built
 * and type-check clean, they are just not shown while the demo recording and
 * the copy pass are outstanding. Restoring it is putting it back in this array
 * and deciding which card carries `featured`, since there is only one wide
 * slot and the two would compete for it.
 */
export const PROJECTS: Project[] = [
  {
    featured: true,
    title: "Automated Client Implementation Delivery System (n8n)",
    problem:
      "Every new client requires a set of customized implementation deliverables, creating more than 8 hours of repetitive manual work each week and delaying the start of onboarding.",
    solution:
      "An n8n workflow builds each client's deliverables from the onboarding intake sheet, creating real copies in whichever workspace the client uses and replacing their specific details inside each file, so onboarding can start right away instead of waiting on manual setup.",
    stack: [
      "n8n",
      "JavaScript",
      "Google Drive API",
      "Microsoft SharePoint API",
      "Google Sheets",
    ],
    hardPart:
      "Each file is unique and needs specific changes in specific areas inside it, so a shared loop could not do the work. Each one gets its own chain and custom code that finds the exact place to change and edits it there.",
    flow: {
      rows: [
        [
          {
            kind: "native",
            tag: "n8n node",
            label: "Client info is entered in a spreadsheet tracker",
            detail:
              "Adding the row triggers the run, and the automation uses that information from there on. The fields are plain enough that anyone on the team can fill them in.",
          },
        ],
        [
          {
            kind: "native",
            tag: "n8n node",
            label: "Incomplete info means nothing executes",
            detail:
              "The information is checked before anything is created, so a half-filled row is caught up front rather than partway through. Whoever entered it knows straight away that it is incomplete.",
          },
        ],
        [
          {
            kind: "native",
            tag: "n8n node",
            label: "Google Drive",
            detail:
              "From the information given in the first step, the automation identifies where to build the deliverables, based on which workspace the client prefers.",
          },
          {
            kind: "native",
            tag: "n8n node",
            label: "Microsoft SharePoint",
            detail:
              "The same chain exists for SharePoint. The templates live in both, and a client only ever uses one of them.",
          },
        ],
        [
          {
            kind: "service",
            tag: "custom code",
            label: "Each file gets its own branch",
            detail:
              "Every file needs different changes in different places, so each one carries its own chain rather than passing through a shared loop. Projects vary in size, and the largest runs to 70 files.",
          },
        ],
        [
          {
            kind: "constraint",
            label: "Manual duplication does not produce real copies",
            detail:
              "Manually duplicating a folder in Google Drive creates file shortcuts, not duplicates, so edits land on the original templates.",
          },
        ],
        [
          {
            kind: "service",
            tag: "custom code",
            label: "Real copies, renamed for the client",
            detail:
              "Each file is copied properly, then renamed for the client.",
          },
        ],
        [
          {
            kind: "service",
            tag: "custom code",
            label: "Client-specific info replaced inside each file",
            detail:
              "Client-specific details are replaced in set places across the files. No node does this, so it is JavaScript and JSON.",
          },
        ],
        [
          {
            kind: "service",
            tag: "custom code",
            label: "Share link per file, collected in the project overview",
            detail:
              "Each finished file returns a share link, scoped either to anyone holding it or to the client's own email addresses. The project overview lists what each file is and when it matters during the rollout.",
          },
        ],
        [
          {
            kind: "manual",
            tag: "human",
            label: "Reviewed before it reaches the client",
            detail:
              "The finished files and the project overview are checked by hand before anything is sent over.",
          },
        ],
      ],
    },
  },
  {
    title: "AI-Assisted Lead Qualification (HubSpot + n8n)",
    problem:
      "Complex lead qualification criteria involve manual research. That takes long enough that a lead's priority depends on who gets to it and when.",
    solution:
      "An n8n workflow runs the qualification research automatically and writes the result back into HubSpot for its native workflow to act on, so a lead's priority no longer depends on who opens it or when.",
    hardPart:
      "The workflow required n8n to integrate with HubSpot without disrupting its native execution, using webhooks and the HubSpot API to write custom properties the existing workflow could recognize and use to proceed. This qualification step is one portion of a much larger workflow.",
    stack: ["HubSpot API", "Webhooks", "n8n", "LLM", "Custom Properties"],
  },
  {
    title: "AI-Assisted Outbound Prospecting Workflow (n8n)",
    problem:
      "Reps research each prospect by hand before writing to them, so outreach goes out long after the visit that prompted it.",
    solution:
      "An n8n workflow researches each prospect automatically, and an LLM turns that research into a personalized draft delivered to the rep in Slack, so outreach goes out while the visit is still recent.",
    hardPart:
      "The LLM needed enough business context to connect each prospect's researched data to relevant capabilities and proof points, then turn that context into a personalized draft that demonstrated value.",
    stack: ["n8n", "JavaScript", "LLM", "Slack API", "HubSpot API"],
  },
  {
    title: "Executive Reporting & Dashboard Automation (Fully custom)",
    problem:
      "The platform supports extensive reporting, but some enterprise metrics are too complex for its built-in capabilities. Producing them requires combining platform functionality, external data modeling, or custom integrations.",
    solution:
      "Each metric the platform could not report on directly gets its own pipeline feeding a live dashboard, so reporting that used to require manual analysis is available to clients on demand.",
    hardPart:
      "Each metric required a different architecture: combining native functionality, data connectors, external modeling, or custom APIs to produce reporting the platform could not provide directly.",
    stack: ["Google Sheets/Excel", "Power BI", "Jira", "Tableau", "API data pull"],
  },
  {
    title: "Support Ticket Pipeline Automation (HubSpot)",
    problem:
      "The team needs a standardized way to manage support tickets from intake through resolution, but HubSpot's native ticket functionality cannot support the required lifecycle and routing logic directly.",
    solution:
      "Custom properties and HubSpot workflows model the ticket lifecycle and routing that native tickets could not, so every ticket follows the same path from intake to resolution no matter who picks it up.",
    hardPart:
      "The required lifecycle and routing had to be modeled around HubSpot's confirmed platform limitations, combining custom properties and workflows to reproduce the desired behavior without native support.",
    stack: ["HubSpot", "Workflow Automation", "Custom Properties", "Process Mapping"],
  },
];

export const CONTACT = {
  email: "leo.j.sanga@gmail.com",
  linkedin: "linkedin.com/in/leo-sanga",
  linkedinUrl: "https://linkedin.com/in/leo-sanga",
  bookingUrl: "https://calendar.app.google/YgudwUd16Y1ztDf17",
};
