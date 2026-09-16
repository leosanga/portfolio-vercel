import type { BookingReliabilityProofExperience, ProjectViewModel } from "./types";

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
  featured: true,
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
  },
  protection: {
    heading: "How the workflow protects the booking",
    chapters: [
      {
        title: "The AI cannot book on its own.",
        body: "The AI identifies what the user wants. Tested JavaScript checks the request before the workflow can create or change a booking.",
        evidence: "Tested validation and source-to-workflow checks",
      },
      {
        title: "Two people cannot book the same time.",
        body: "PostgreSQL reserves the time before the calendar is changed. If another request arrives at the same moment, only one can continue. If a later step fails, the workflow releases the reservation safely.",
        evidence: "Database slot lock and recorded live conflict test",
      },
      {
        title: "The workflow checks what really changed.",
        body: "Meetings added outside the agent can be brought into its records without claiming that the agent created them. A missing calendar event does not automatically erase the booking history.",
        evidence: "Calendar adoption and booking-history checks",
      },
      {
        title: "Booking and calendar failures do not become success messages.",
        body: "On the verified failure paths, the workflow stops the requested change, tells the guest what happened, records the result, and alerts the people who need to respond.",
        evidence: "Explicit error routes and notification-delivery checks",
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
      },
      {
        title: "Business settings were centralized",
        body: "Hours, meeting rules, and business-specific settings live in one place so the workflow can be adapted without changing logic throughout the canvas.",
      },
      {
        title: "The agent was not the only way a meeting could be booked",
        body: "Most businesses already have a booking calendar where someone can choose a time directly. The workflow was designed to recognize those meetings without treating them as agent-created bookings.",
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
    support: "Map the failure modes before they become incidents.",
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
