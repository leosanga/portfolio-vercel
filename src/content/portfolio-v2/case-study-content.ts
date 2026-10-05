import type {
  BookingReliabilityProofExperience,
  SalesforceRoutingProofExperience,
  HubSpotCoverageReconciliationProofExperience,
} from "./types";

// Shared approved facts for summaries and signature figures. No media or controller imports.
export const BOOKING_AGENT_STACK = [
  "n8n",
  "JavaScript",
  "PostgreSQL",
  "Groq",
  "Google Calendar API",
  "Gmail API",
  "Slack API",
] as const;

export const BOOKING_AGENT_OVERVIEW = {
  problem:
    "A booking workflow becomes unreliable when it assumes every request is clear and every connected system will respond as expected.",
  solution:
    "I built an n8n booking agent where the AI handles the conversation and tested code checks every proposed action before the calendar can change.",
  hardPart:
    "The hard part was keeping the booking accurate when one system succeeded and another failed. Each failure needed a clear outcome so the next request would not inherit a broken or unfinished booking.",
} as const;

export const BOOKING_AGENT_PROOF = {
  kind: "booking-reliability",
  eyebrow: "Failure-safe booking",
  heading: "When the booking calendar fails, the agent stops before it sends a false confirmation.",
  boundary: "AI proposes. Tested code decides.",
  rows: [
    {
      label: "Request",
      pendingValue: "Received",
      resolvedValue: "Tuesday, 3:00 PM",
      resolvedAt: 0,
      tone: "verified",
    },
    {
      label: "Rule check",
      pendingValue: "Checking",
      resolvedValue: "Passed",
      resolvedAt: 1,
      tone: "verified",
    },
    {
      label: "Time",
      pendingValue: "Temporarily held",
      resolvedValue: "Released",
      resolvedAt: 3,
      tone: "recovered",
    },
    {
      label: "Booking calendar",
      pendingValue: "Connecting",
      resolvedValue: "Connection failed",
      resolvedAt: 2,
      tone: "failed",
    },
    {
      label: "Booking status",
      pendingValue: "Pending",
      resolvedValue: "Not confirmed",
      resolvedAt: 3,
      tone: "failed",
    },
    {
      label: "Follow-up",
      pendingValue: "Waiting",
      resolvedValue: "Team alerted",
      resolvedAt: 4,
      tone: "recovered",
    },
  ],
  outcomeHeading: "No false confirmation is sent.",
  outcomeBody:
    "The guest gets a clear response. The temporary hold is released and the team is alerted.",
} as const satisfies BookingReliabilityProofExperience;

export const SALESFORCE_ROUTING_STACK = [
  "Salesforce",
  "Apex",
  "Flow",
  "Apex REST",
  "Salesforce DX",
  "Node.js",
] as const;

export const SALESFORCE_ROUTING_OVERVIEW = {
  problem:
    "Inbound requests can become unnecessary Leads or reach the wrong owner when the intake process ignores the customer and pipeline context already in Salesforce.",
  solution:
    "I built a Salesforce-native system that uses existing CRM records to decide where each trial sign-up or demo request belongs. Known relationships reach the responsible owner, unknown companies enter the inbound queue, and uncertain matches wait for review.",
  hardPart:
    "The hard part was deciding when the CRM evidence was strong enough to act. Conflicting identity and company signals had to stop the automation and tell a reviewer what needed resolving.",
} as const;

export const SALESFORCE_ROUTING_PROOF = {
  kind: "salesforce-routing",
  eyebrow: "Routing by relationship",
  heading: "A known customer should not become a new lead.",
  request: "The same company as its CRM relationship changes",
  columns: ["Relationship in Salesforce", "Responsible owner", "System action"],
  outcomes: [
    {
      context: "Unknown company",
      destination: "Inbound queue",
      followUp: "Create a new lead",
    },
    {
      context: "Open opportunity",
      destination: "Deal owner",
      followUp: "Create a task and contact role",
    },
    {
      context: "Customer",
      destination: "Account owner",
      followUp: "Create an expansion task",
    },
    {
      context: "Conflicting evidence",
      destination: "Inbound review",
      followUp: "Stop before creating a sales record",
      isReview: true,
    },
  ],
} as const satisfies SalesforceRoutingProofExperience;

export const HUBSPOT_LEAD_ROUTING_STACK = ["HubSpot", "Python", "FastAPI", "pytest"] as const;

export const HUBSPOT_LEAD_ROUTING_OVERVIEW = {
  problem:
    "Lead routing becomes hard to trust when the workflow assigns a lead but the report leaves that lead out.",
  solution:
    "I built a HubSpot system that keeps lead assignment and response-time reporting connected from first owner through sales handoff. Separate tests cover repeated updates and temporary HubSpot failures.",
  hardPart:
    "The hard part was proving that the workflow and the report told the same story. That check found one assignment path missing from response-time coverage and a small-company route blocked by its own scoring rules.",
} as const;

export const HUBSPOT_COVERAGE_RECONCILIATION_PROOF = {
  kind: "hubspot-coverage-reconciliation",
  eyebrow: "Report coverage check",
  heading: "Six assigned leads were missing from the response-time report.",
  totalAssigned: 14,
  earlierMeasured: 8,
  missingFromReport: 6,
  currentMeasured: 14,
  routes: [
    { label: "Sales development", count: 8 },
    { label: "Regional sales owners", count: 6 },
  ],
  labels: {
    assigned: "Assigned",
    assignedUnit: "new test leads",
    earlierReport: "Earlier report",
    measuredUnit: "measured",
    missingUnit: "assigned leads missing",
    correction: "Correction",
    currentCoverage: "Current coverage",
    currentSupport: "Both routes included",
  },
  correction: "Response-time check moved outside routing",
  outcomeHeading: "14 assigned. 14 measured.",
  outcomeBody: "The report now covers both assignment paths.",
} as const satisfies HubSpotCoverageReconciliationProofExperience;
