import alertCalendarReadFailed from "@/assets/portfolio-v2/booking-agent/alert-calendar-read-failed.webp";
import alertConfigProblem from "@/assets/portfolio-v2/booking-agent/alert-config-problem.webp";
import alertConfirmationEmailFailed from "@/assets/portfolio-v2/booking-agent/alert-confirmation-email-failed.webp";
import workflowAiReplyCheck from "@/assets/portfolio-v2/booking-agent/workflow-ai-reply-check.webp";
import workflowCheckAndHold from "@/assets/portfolio-v2/booking-agent/workflow-check-and-hold.webp";
import workflowNotify from "@/assets/portfolio-v2/booking-agent/workflow-notify.webp";
import workflowOutsideBookings from "@/assets/portfolio-v2/booking-agent/workflow-outside-bookings.webp";

import type {
  BookingReliabilityProofExperience,
  CaseEvidenceMedia,
  ProjectViewModel,
} from "./types";

const TEAM_RECEIVED = "What the team received";

// Captured from the booking agent's own instance, 2026-09-27, at n8n-booking-agent commit 196f442.
// The Slack alerts are trimmed of empty space on the right. Provenance, crop geometry, and hashes:
// src/assets/portfolio-v2/ASSET-SOURCES.md.
export const BOOKING_AGENT_EVIDENCE = {
  aiReplyCheck: {
    src: workflowAiReplyCheck,
    width: 1817,
    height: 528,
    label: "Stage 2 · Validation gate",
    alt: "n8n canvas: the AI Agent node with its chat model and memory, and the validation gate its reply passes through.",
    caption:
      "The AI Agent has no action tools. Its reply reaches Parse & Validation Gate before any booking branch can run. The gate's rules are covered by the automated tests.",
  },
  checkAndHold: {
    src: workflowCheckAndHold,
    width: 1363,
    height: 381,
    label: "Stage 5 · Calendar check and slot hold",
    alt: "n8n canvas: the booking stage that checks the calendar, then writes the booking to the database before the meeting is created.",
    caption:
      "The calendar check runs before Insert Booking attempts the database hold. The database accepts one booking per time, and a request that loses the race stops at If slot was locked before any calendar write.",
  },
  outsideBookings: {
    src: workflowOutsideBookings,
    width: 1363,
    height: 968,
    label: "Stage 3 · Outside-booking adoption",
    alt: "n8n canvas: the stage that reads the guest's calendar events and records meetings booked outside the chat.",
    caption:
      "List Guest Events, Match Guest Events, and Adopt Bookings record meetings created outside the chat as adopted. The repair branch preserves their origin and decides when a person needs to be told.",
  },
  calendarReadFailed: {
    src: alertCalendarReadFailed,
    width: 1262,
    height: 201,
    label: TEAM_RECEIVED,
    alt: "Slack alert from the booking agent saying it could not read the calendar, with what the guest asked, what they were told, and what to do next.",
    caption:
      "A controlled test used a calendar the workflow could not read. The alert asks the rep to contact the guest and tells the operator where the failure occurred. Leo holds both roles in this demo, and the guest's address is blurred.",
  },
  notify: {
    src: workflowNotify,
    width: 1235,
    height: 400,
    label: "Notify sub-workflow",
    alt: "n8n canvas: the Notify workflow that sends every alert by Slack and email, with a separate lane for runs that crash.",
    caption:
      "Every planned failure calls this shared workflow, which attempts Slack and email and returns a delivery result. The lower lane handles crashes outside the planned failure paths and looks up the affected guest.",
  },
  configProblem: {
    src: alertConfigProblem,
    width: 787,
    height: 160,
    label: TEAM_RECEIVED,
    alt: "Slack alert saying the booking agent's Config has a problem, naming the invalid setting and where to fix it.",
    caption:
      "An unsupported meeting platform triggered this operator notice once while guests could keep chatting. The notice names the setting and where to fix it.",
  },
  confirmationEmailFailed: {
    src: alertConfirmationEmailFailed,
    width: 1241,
    height: 387,
    label: TEAM_RECEIVED,
    alt: "Slack messages after a failed confirmation email: an alert about the email, then the rep's booking notice asking them to send the meeting link.",
    caption:
      "The confirmation email was forced to fail after the booking succeeded. The rep's booking notice still arrived and asked them to send the meeting link manually. Guest details are blurred.",
  },
} as const satisfies Record<string, CaseEvidenceMedia>;

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

export const BOOKING_AGENT_PROJECT = {
  slug: "n8n-booking-agent",
  title: "AI Booking Agent (n8n)",
  problem: BOOKING_AGENT_OVERVIEW.problem,
  solution: BOOKING_AGENT_OVERVIEW.solution,
  hardPart: BOOKING_AGENT_OVERVIEW.hardPart,
  stack: BOOKING_AGENT_STACK,
  homepageRole: "lead",
  caseStudyPath: "/projects/n8n-booking-agent",
  caseStudyLabel: "See how the safeguards work",
  proofExperience: BOOKING_AGENT_PROOF,
} as const satisfies ProjectViewModel;

export const BOOKING_AGENT_CASE_STUDY = {
  hero: {
    title: BOOKING_AGENT_PROJECT.title,
    support:
      "An AI booking agent designed to keep booking decisions accurate when a request is unclear or part of the process fails. The AI handles the conversation, while tested code controls whether anything can change.",
  },
  overview: BOOKING_AGENT_OVERVIEW,
  architecture: {
    heading: "What changes in a production-safe build",
    intro:
      "This build separates the conversation from the actions and checks each proposed change against the systems that hold the booking.",
    visualLabel: "Who controls the booking",
    chapters: [
      {
        title: "Prompt-led build",
        body: "The AI is expected to understand the request, decide what should happen, and carry it out. Instructions are the main safeguard.",
      },
      {
        title: "The AI becomes a proposer",
        body: "The AI identifies what the guest wants, but it no longer decides whether a booking can change.",
      },
      {
        title: "Tested rules take control",
        body: "Tested JavaScript checks the proposed action against the booking rules before anything can continue.",
      },
      {
        title: "Only an approved action continues",
        body: "The workflow checks the current booking state. Only a valid, verified change can reach the connected system.",
      },
    ],
    lanes: [
      {
        label: "Prompt-led build",
        copy: "The AI is connected directly to the booking tools. It is expected to understand the request, decide what should happen, and carry it out. Instructions are the main safeguard.",
        nodes: ["Guest request", "AI decision", "Booking tools"],
        tone: "naive",
      },
      {
        label: "Production-safe build",
        copy: "The AI proposes a booking action. Tested code validates it and checks the booking state before a connected system can change.",
        nodes: [
          "Guest request",
          "AI proposal",
          "Tested validation",
          "Booking state check",
          "Connected action",
        ],
        tone: "safe",
      },
    ],
    // Mirrors the stage titles drawn in workflow-overview-map.svg. Re-copying the SVG means
    // re-checking this list.
    map: {
      label: "Workflow map",
      // The drawing's viewBox, which the viewer scales from.
      width: 1220,
      height: 566,
      alt: "Diagram of the booking agent's workflow in 12 stages. The same stages are listed as text on this page.",
      caption:
        "The booking agent's workflow, grouped into 12 stages. Every conversation ends at stage 11, which replies to the guest and tells the team. The stages behind each safeguard appear below.",
      stages: [
        "Check settings and look up the guest",
        "AI reply, checked by code",
        "Catch meetings booked outside the chat",
        "Route the request",
        "Check the time is free and hold it",
        "Handle a time that is already taken",
        "Create the meeting",
        "Reschedule: check the request",
        "Reschedule: move the meeting",
        "Cancel",
        "Reply to the guest and tell the team",
        "Nightly cleanup",
      ],
    },
  },
  protection: {
    heading: "What happens when...",
    intro: "Each situation shows what the agent does and how that behavior was checked.",
    chapters: [
      {
        situation: "The AI suggests a booking",
        outcome: "The AI cannot make the booking decision on its own.",
        body: "Tested rules check the request before a booking action can proceed.",
        checked:
          "Automated tests cover the booking rules and confirm the tested code is included in the workflow.",
        evidence: BOOKING_AGENT_EVIDENCE.aiReplyCheck,
      },
      {
        situation: "Two people request the same time",
        outcome: "Only one request can continue.",
        body: "The time is reserved before the calendar is changed.",
        checked: "A live test sent competing requests for the same time. Only one could continue.",
        evidence: BOOKING_AGENT_EVIDENCE.checkAndHold,
      },
      {
        situation: "A guest asks about a meeting booked elsewhere",
        outcome: "The agent can recognize the meeting without claiming it created it.",
        body: "It checks for a matching meeting and preserves where that booking came from.",
        checked: "Tests cover matching outside meetings and keeping their origin intact.",
        evidence: BOOKING_AGENT_EVIDENCE.outsideBookings,
      },
      {
        situation: "The booking calendar cannot be read",
        outcome: "The agent stops before sending a false confirmation.",
        body: "On the tested failure paths, it tells the guest what happened and attempts to alert the people responsible.",
        checked:
          "Live failure tests check that an unreadable calendar never appears available. Separate tests check alert delivery.",
        evidence: BOOKING_AGENT_EVIDENCE.calendarReadFailed,
      },
    ],
  },
  evolution: {
    heading: "How the architecture changed",
    chapters: [
      {
        title: "The AI originally had too much responsibility",
        body: "Testing showed that instructions alone could not guarantee correct behavior. Booking decisions were moved into tested JavaScript.",
      },
      {
        title: "Notifications became shared infrastructure",
        body: "Notifications started as part of the main workflow. They moved into a separate workflow when several parts of the system needed the same behavior and needed to know whether delivery succeeded.",
        evidence: BOOKING_AGENT_EVIDENCE.notify,
      },
      {
        title: "Business settings were centralized",
        body: "Hours, meeting rules, and business-specific settings live in one place so the workflow can be adapted without changing logic throughout the canvas.",
        evidence: BOOKING_AGENT_EVIDENCE.configProblem,
      },
      {
        title: "The agent was not the only way a meeting could be booked",
        body: "Most businesses already have a booking calendar where someone can choose a time directly. The workflow was designed to recognize those meetings without treating them as agent-created bookings.",
      },
      {
        title: "One failure could hide a successful booking",
        body: "In n8n, an unhandled failure in one branch stops the branches that run after it. A check found that a failed confirmation email could have stopped the rep from hearing about a booking that had gone through. Those branches are now isolated, and the check fails the build when a new one is added without that protection.",
        evidence: BOOKING_AGENT_EVIDENCE.confirmationEmailFailed,
      },
    ],
  },
  adaptability: {
    heading: "Designed to adapt without rebuilding the core",
    items: [
      {
        title: "Calendar connections are replaceable",
        body: "The current implementation connects to Google Calendar, but booking decisions are kept separate from the calendar connection. Another calendar platform can be added without rewriting the core workflow.",
      },
      {
        title: "Meeting providers can change",
        body: "Google Meet is connected today. Zoom or Microsoft Teams can be substituted at the integration layer without changing how booking decisions are validated.",
      },
      {
        title: "Business rules live in one place",
        body: "Hours, meeting rules, and business settings are centralized, so the workflow can be adapted for another business without changing logic throughout the canvas.",
      },
      {
        title: "Unclear requests go to a person",
        body: "When a request falls outside the actions the workflow can safely complete, it routes the request to a person instead of guessing.",
      },
    ],
  },
  close: {
    heading: "Build a workflow that survives production.",
    support: "Design the response to failure before it becomes an incident.",
    callLabel: "Schedule a Call",
    duration: "30 minutes · Google Calendar",
  },
  metadata: {
    title: "AI Booking Agent Case Study | Leo Sanga",
    description:
      "An n8n booking agent case study showing how tested code controls booking decisions and keeps connected-system failures from becoming false success.",
    canonicalUrl: "https://leosanga.vercel.app/projects/n8n-booking-agent",
  },
} as const;
