import dashboard from "@/assets/portfolio-v2/salesforce/dashboard.webp";
import dealTask from "@/assets/portfolio-v2/salesforce/deal-task.webp";
import inboundEvents from "@/assets/portfolio-v2/salesforce/inbound-events.webp";
import needsReview from "@/assets/portfolio-v2/salesforce/needs-review.webp";
import resolvedEvent from "@/assets/portfolio-v2/salesforce/resolved-event.webp";

import type { ProjectViewModel } from "./types";
import {
  SALESFORCE_ROUTING_STACK,
  SALESFORCE_ROUTING_OVERVIEW,
  SALESFORCE_ROUTING_PROOF,
} from "./case-study-content";
export {
  SALESFORCE_ROUTING_STACK,
  SALESFORCE_ROUTING_OVERVIEW,
  SALESFORCE_ROUTING_PROOF,
} from "./case-study-content";
import { SALESFORCE_ROUTING_CASE_RECORD } from "./case-study-records";

export const SALESFORCE_ROUTING_PROJECT = {
  ...SALESFORCE_ROUTING_CASE_RECORD,
  homepageRole: "case-study",
  caseStudyLabel: "See how Salesforce decides where each request belongs",
  proofExperience: SALESFORCE_ROUTING_PROOF,
} as const satisfies ProjectViewModel;

const INBOUND_EVENTS_EVIDENCE = {
  src: inboundEvents,
  width: 1165,
  height: 1030,
  label: "Routing decisions across the run",
  alt: "Salesforce Inbound Events list showing all 18 records with status, outcome, source, company, and reason columns. The last three rows are Growing Company S: New Lead, Open Opportunity, and Customer Expansion.",
  caption:
    "Eighteen inbound events with their status, outcome, and decision reason. The final three records show the same company reaching a different path as its CRM relationship changes.",
} as const;

const RESOLVED_EVENT_EVIDENCE = {
  src: resolvedEvent,
  width: 767,
  height: 1248,
  label: "One decision, fully traceable",
  alt: "Salesforce Inbound Event IE-000016, status Resolved, outcome Open Opportunity, linked to the Growing Company S account, contact Buyer S2, and the Growing Company S - New business opportunity, with its decision reason, arrival fields, raw request payload, and Inbound Integration as the creating user.",
  caption:
    "One demo request linked to the account, contact, and open deal it matched, with the decision reason and original request retained on the event.",
} as const;

const REVIEW_LIST_EVIDENCE = {
  src: needsReview,
  width: 1440,
  height: 560,
  label: "Inbound Review queue",
  alt: "Salesforce Needs Review list of five Inbound Event records, each showing an email, company, and review reason.",
  caption:
    "Five requests held for review, each with a reason that identifies the conflict and the step needed to resolve it.",
} as const;

const DEAL_TASK_EVIDENCE = {
  src: dealTask,
  width: 1200,
  height: 1000,
  label: "What the deal owner received",
  alt: "Salesforce opportunity Growing Company S - New business, owned by Demo Account Executive and now at Closed Won, with the upcoming task Demo request: Buyer S2 for Demo Account Executive and Buyer S2 listed as an Evaluator contact role.",
  caption:
    "The follow-up task created for the deal owner, with the person added to the deal as an Evaluator contact role. The opportunity was open when the request arrived and was moved to Closed Won later in the test story.",
} as const;

const DASHBOARD_EVIDENCE = {
  src: dashboard,
  width: 1200,
  height: 680,
  label: "Reporting over the run",
  alt: "Salesforce Inbound Resolution dashboard with a donut chart of 12 resolved requests by outcome, 5 requests waiting for review, and 1 rejected or failed request.",
  caption:
    "The dashboard groups resolved requests by outcome and keeps requests waiting for review or rejected visible beside them.",
} as const;

export const SALESFORCE_ROUTING_CASE_STUDY = {
  hero: {
    title: SALESFORCE_ROUTING_PROJECT.title,
    support:
      "Known customers and active deals should not re-enter Salesforce as disconnected leads. This system checks the relationship already in the CRM, routes clear matches to the responsible owner, and stops uncertain requests for review.",
    builtWithLabel: "Built with",
  },
  decision: {
    heading: "How does Salesforce decide where the request belongs?",
    label: "Design principle",
    principle:
      "Every inbound request should enter the customer and pipeline context the business already has.",
    body: [
      "A person is identified by email address and a company by the email's domain. Addresses from personal email providers never match a company by domain.",
      "Uncertain matches are checked first, so a doubtful request never creates or routes follow-up work. An open deal outranks customer status because the deal is the most time-sensitive relationship.",
    ],
    boundary:
      "The decision pattern can transfer to another CRM. The objects, automation, and permissions shown here are specific to Salesforce.",
    evidenceContext:
      "Evidence context: the screenshots use controlled records in Salesforce Developer Edition. No customer or client data is shown.",
    primaryEvidence: INBOUND_EVENTS_EVIDENCE,
    detailEvidence: RESOLVED_EVENT_EVIDENCE,
  },
  action: {
    heading: "When does Salesforce act, and when does it stop?",
    intro:
      "Apex makes the matching decision so subtle cases can be tested explicitly and repeatably. Flow carries out the follow-up in visible, admin-managed Salesforce automation.",
    act: {
      label: "Act on clear evidence",
      heading: "The open deal stays with its owner.",
      body: "Salesforce creates a follow-up task for the deal owner and adds the person to the opportunity as a contact role. A known account receives follow-up work instead of collecting a stray lead.",
      evidence: DEAL_TASK_EVIDENCE,
    },
    stop: {
      label: "Stop on conflicting evidence",
      heading: "Uncertain identity waits for a person.",
      body: "When the evidence is incomplete or points to different relationships, Salesforce creates no Lead, Contact, or follow-up task. The inbound event waits in the review queue with the reason and next step. The system never merges, converts, or deletes a record.",
      evidence: REVIEW_LIST_EVIDENCE,
    },
  },
  safeguards: {
    heading: "How does the build stay safe and traceable?",
    intro:
      "An integration can report success while it repeats work or loses a rejected request. These safeguards cover the failures that are easiest to miss.",
    checkLabel: "How this was checked",
    items: [
      {
        title: "Successful replays do not repeat business actions.",
        body: "A request that was already resolved or held returns as a duplicate. A rejected request can be corrected and resent later with the same ID.",
        check:
          "A resolved request was resent in automated tests. The event and Lead counts remained one.",
      },
      {
        title: "Rejected and failed requests remain visible.",
        body: "Resolved, held, rejected, and failed requests are stored with a status and a reason. A repeat within the same delivery returns a result without a second record.",
        check: "Covered by automated tests.",
      },
      {
        title: "The sending credential cannot read accounts.",
        body: "The credential that submits requests has access to the inbound API only. It cannot read the account records the matching runs against.",
        check: "Checked with an automated access test.",
      },
    ],
    evidence: DASHBOARD_EVIDENCE,
    verification:
      "58 Apex tests passed at 99% org coverage. Nine sender tests passed. The fresh-org run and the credentialed run each matched 16 of 16 expected results.",
    scope:
      "These results verify the implementation and reporting setup. They are not production business metrics.",
    limitsLabel: "Known limits",
    limits: [
      "Exact-domain matching does not automatically match a subsidiary to its parent.",
      "A correction under the same ID inside one delivery is a duplicate, while a later corrected resend works.",
    ],
  },
  status: {
    heading: "What is working now?",
    workingLabel: "Working now",
    working: [
      "Implemented and exercised in Salesforce Developer Edition through the inbound credential.",
      "Rebuilt from the repository in a fresh org with the expected routing results.",
    ],
    environmentLabel: "Environment-specific before operational use",
    environment: [
      "Connect the real intake sources, owners, queues, review policy, and domain policy.",
      "Add the release, monitoring, and recovery controls required by the operating environment.",
    ],
  },
  closing: {
    heading: "One intake process, from prospect to customer",
    body: [
      "The next action follows the relationship already recorded in Salesforce. Requests from new companies enter the inbound queue. Requests tied to open deals go to the deal owner, and requests from existing customers go to the account owner.",
      "The record keeps the original request details, the decision and its outcome. If the information conflicts, the request stays visible for review with a reason and next step. A reviewer can trace why a request was handled or held.",
    ],
  },
  metadata: {
    title: "Salesforce Trial and Demo Routing Case Study | Leo Sanga",
    description:
      "See how Leo Sanga built a Salesforce system that matches trial sign-ups and demo requests to existing customers and deals, and holds uncertain ones for review.",
    canonicalUrl:
      "https://leosanga.vercel.app/projects/trial-demo-routing-by-customer-relationship",
  },
} as const;
