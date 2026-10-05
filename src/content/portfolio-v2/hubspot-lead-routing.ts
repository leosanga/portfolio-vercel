import closedDealsScoreReport from "@/assets/portfolio-v2/hubspot/closed-deals-score-report.webp";
import responseTimeReport from "@/assets/portfolio-v2/hubspot/response-time-report.webp";
import responseTimeWorkflow from "@/assets/portfolio-v2/hubspot/response-time-workflow.webp";
import routingPathReport from "@/assets/portfolio-v2/hubspot/routing-path-report.webp";
import routingWorkflow from "@/assets/portfolio-v2/hubspot/routing-workflow.webp";

import type { ProjectViewModel } from "./types";
import {
  HUBSPOT_LEAD_ROUTING_STACK,
  HUBSPOT_LEAD_ROUTING_OVERVIEW,
  HUBSPOT_COVERAGE_RECONCILIATION_PROOF,
} from "./case-study-content";
export {
  HUBSPOT_LEAD_ROUTING_STACK,
  HUBSPOT_LEAD_ROUTING_OVERVIEW,
  HUBSPOT_COVERAGE_RECONCILIATION_PROOF,
} from "./case-study-content";
import { HUBSPOT_LEAD_ROUTING_CASE_RECORD } from "./case-study-records";

export const HUBSPOT_LEAD_ROUTING_PROJECT = {
  ...HUBSPOT_LEAD_ROUTING_CASE_RECORD,
  homepageRole: "case-study",
  caseStudyLabel: "Follow a lead through the system",
  proofExperience: HUBSPOT_COVERAGE_RECONCILIATION_PROOF,
} as const satisfies ProjectViewModel;

const ROUTING_WORKFLOW_EVIDENCE = {
  src: routingWorkflow,
  width: 1365,
  height: 1322,
  label: "Routing Workflow",
  alt: "HubSpot Routing Workflow showing the assignment branches.",
  caption:
    "Routing Workflow. Each new lead is assigned to sales development or a regional sales owner using the current routing rules.",
} as const;

const RESPONSE_TIME_WORKFLOW_EVIDENCE = {
  src: responseTimeWorkflow,
  width: 1365,
  height: 1327,
  label: "Response-time Workflow",
  alt: "HubSpot response-time workflow showing the four-hour check.",
  caption:
    "Response-time workflow. Every new lead receives the same four-hour check, regardless of its assignment path.",
} as const;

const RESPONSE_TIME_REPORT_EVIDENCE = {
  src: responseTimeReport,
  width: 548,
  height: 366,
  label: "Weekly Response-time Report",
  alt: "Weekly response-time report using test data.",
  caption:
    "The report shows 48 missed targets in one test group and 12 in another. The groups are different sizes, so no percentage improvement is claimed.",
} as const;

const ROUTING_REPORT_EVIDENCE = {
  src: routingPathReport,
  width: 540,
  height: 365,
  label: "Routing Path Report",
  alt: "Routing report with no small-company assignments.",
  caption:
    "No small-company assignments appear in this 14-lead test group. That missing route led to the rule review.",
} as const;

const SCORE_REPORT_EVIDENCE = {
  src: closedDealsScoreReport,
  width: 547,
  height: 365,
  label: "Closed Deals by Score Report",
  alt: "Closed test deals grouped by their current score.",
  caption:
    "Closed deals by current score group. The test data verifies the report setup and does not show real sales performance.",
} as const;

export const HUBSPOT_LEAD_ROUTING_CASE_STUDY = {
  hero: {
    title: HUBSPOT_LEAD_ROUTING_PROJECT.title,
    support:
      "A HubSpot lead-routing and pipeline reporting system designed to keep ownership decisions visible and response-time reporting complete from first assignment through sales handoff. The workflows run in HubSpot, while separate tests cover repeated updates and temporary failures.",
    environment:
      "Built in a HubSpot developer sandbox account using test data, with no customer data.",
    builtWithLabel: "BUILT WITH",
  },
  decisionTrail: {
    label: "CRM decision trail",
    heading: "Current fields change. The decision history remains.",
    currentStateLabel: "Current CRM state",
    currentStateSupport: "What the team sees now",
    currentStates: [
      {
        label: "New lead",
        phase: 0,
      },
      {
        label: "Assigned owner",
        phase: 1,
      },
      {
        label: "Owner updated",
        phase: 2,
      },
      {
        label: "Sales handoff",
        phase: 4,
      },
    ],
    historyLabel: "Decision history",
    historySupport: "What the CRM keeps",
    historyItems: [
      {
        label: "Assignment reason saved",
        detail: "The first routing decision stays available after the owner changes.",
        phase: 1,
        persistent: true,
      },
      {
        label: "Response-time result saved",
        detail: "Every eligible lead receives the same check.",
        phase: 3,
        persistent: false,
      },
      {
        label: "Handoff context saved",
        detail: "The record keeps the score used when responsibility changed.",
        phase: 4,
        persistent: false,
      },
    ],
    reportingLabel: "Reporting check",
    reportingSupport: "The report checks the same stored history.",
    reportingSource: "Eligible records",
    reportingTarget: "Recorded outcomes",
    reportingResult: "Coverage confirmed",
  },
  journey: {
    heading: "How does a CRM keep its decisions traceable?",
    intro:
      "A later update can change the current record without erasing why the lead was routed or what happened afterward.",
    evidenceLabel: "Implemented in HubSpot",
    evidenceIntro:
      "These complete workflow views show how the routing decision and the shared response-time check were built in this project.",
    evidence: [ROUTING_WORKFLOW_EVIDENCE, RESPONSE_TIME_WORKFLOW_EVIDENCE],
  },
  safeguards: {
    heading: "What problems does the design prevent?",
    intro:
      "A workflow can finish successfully and still leave the business with the wrong record or an incomplete report. These safeguards cover the failures that were easiest to miss.",
    items: [
      {
        title: "Keep the original routing reason",
        body: "A later owner change does not erase why the lead was first assigned.",
        evidence: "Verified in HubSpot",
      },
      {
        title: "Measure every assignment path",
        body: "A valid route cannot disappear from the response-time report.",
        evidence: "14 of 14 test leads measured",
      },
      {
        title: "Link the correct deal and contact",
        body: "Records returning in a different order cannot connect a deal to the wrong person.",
        evidence: "Checked with a reordered test",
      },
      {
        title: "Complete an update only after HubSpot accepts it",
        body: "A timeout can be tried again without treating a failed update as complete.",
        evidence: "Checked with automated tests",
      },
    ],
  },
  discoveries: {
    heading: "What did the reports uncover?",
    intro:
      "The reports did more than summarize test data. They exposed gaps that looked correct inside the workflows.",
    evidenceContext: [
      "Evidence from RevOps Pipeline Health",
      "Test data from a HubSpot developer sandbox account",
    ],
    items: [
      {
        heading: "Six leads were missing from the response-time check",
        explanation:
          "Fourteen test leads entered the same starting stage. The earlier design measured the eight sent to sales development and skipped the six sent to regional sales owners.",
        resolution:
          "Moving the check into a separate HubSpot workflow gave every new lead the same four-hour check.",
        result: "Current result: all 14 test leads receive a response-time status.",
        limit: "The timer uses calendar hours, including time outside the working day.",
        evidence: RESPONSE_TIME_REPORT_EVIDENCE,
      },
      {
        heading: "The small-company route could not be reached under the current rules",
        explanation:
          "The empty report first led to an old company-size field in the workflow. Fixing that field exposed a second problem: the scoring model could not produce the score required by the route.",
        resolution:
          "A temporary test score sent a small-company lead through the route and assigned the expected owner.",
        result:
          "The route works, but the current scoring rules still keep normal small-company leads out.",
        limit: "Sales leadership must decide whether to change the route or the score requirement.",
        evidence: ROUTING_REPORT_EVIDENCE,
      },
    ],
    supportingEvidence: {
      label: "Supporting report",
      heading: "How were the score groups checked?",
      body: "This report confirms that the sandbox can group closed test deals by their current score. It checks the report setup and does not show real sales performance.",
      evidence: SCORE_REPORT_EVIDENCE,
    },
  },
  systemBoundary: {
    heading: "What runs in HubSpot, and what was tested separately?",
    intro:
      "The day-to-day process runs in HubSpot, where an operations team can review and change it. Separate code tests the failure handling that a screenshot cannot prove.",
    zones: [
      {
        label: "Runs in HubSpot",
        tone: "live",
        items: [
          "Assign the owner",
          "Save the routing reason",
          "Check response time",
          "Hand qualified leads to sales",
          "Build the reports",
        ],
      },
      {
        label: "Tested separately",
        tone: "tested",
        items: [
          "Calculate the score",
          "Verify incoming updates",
          "Try temporary failures again",
          "Stop the same update from running twice",
          "Keep the intended records linked",
        ],
      },
      {
        label: "Business decisions",
        tone: "decision",
        items: [
          "Set the working-hours rule",
          "Choose the regional escalation owner",
          "Decide the small-company route",
          "Complete the process after Sales Accepted",
        ],
      },
    ],
    boundary:
      "The tested service is not deployed in the working sandbox workflow. Before using it with customer data, it would need a managed production setup and storage that survives a restart.",
    evidenceLabel: "69 automated tests passed · September 2026",
  },
  rollout: {
    heading: "From sandbox testing to live CRM",
    intro:
      "Sandbox testing is the first stage of a responsible CRM rollout. It gives the team a safe place to verify the system before customer data and daily operations depend on it.",
    stages: [
      {
        title: "Test in the sandbox",
        support: "Validate the system with controlled test data before live teams depend on it.",
        state: "Current project stage",
        items: [
          "Validate the HubSpot workflows",
          "Check reports against source records",
          "Test failure handling separately",
          "Confirm the sales handoff",
          "Use controlled test data",
        ],
      },
      {
        title: "Configure for the business",
        support:
          "Replace the test assumptions with the company's real ownership and sales process.",
        state: "Configured per business",
        items: [
          "Set the real team and owner structure",
          "Apply territory and routing rules",
          "Set response-time and working-hours rules",
          "Decide escalation and small-company policy",
          "Complete the later sales process",
        ],
      },
      {
        title: "Deploy with live controls",
        support: "Add the technical controls needed to operate and recover the system safely.",
        state: "Required before customer data",
        items: [
          "Store processed updates permanently",
          "Alert the team when an update fails",
          "Protect live HubSpot access",
          "Provide a safe release and recovery process",
          "Test the data migration before rollout",
        ],
      },
    ],
    close:
      "This project demonstrates the sandbox validation stage and identifies what must be configured before deployment.",
  },
  close: {
    heading: "Build a CRM your team can trust.",
    support:
      "I can help you find where a CRM process and its reports stop agreeing, then design a system your team can operate and explain.",
    duration: "30 minutes · Google Calendar",
  },
  metadata: {
    title: "HubSpot Lead Routing and CRM Accountability | Leo Sanga",
    description:
      "See how Leo Sanga built and tested a HubSpot lead-routing system, then used its reports to uncover gaps before deployment.",
    canonicalUrl: "https://leosanga.vercel.app/projects/lead-routing-pipeline-health-system",
  },
} as const;
