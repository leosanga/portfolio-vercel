import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02 revision 2026-10-04. Change it there first.
export const CUSTOMER_INQUIRY_ROUTING: CatalogEntrySummary = {
  id: "customer-inquiry-routing",
  title: "Customer inquiry routing",
  purpose: "Turn incoming customer questions into reply drafts or clear handoffs.",
  category: "customer-support",
  toolsLine: "n8n / Email / Document storage / SQL database / AI drafting",
  problem:
    "A shared inbox mixes routine questions with requests that need a specialist. Sorting messages and finding the right information takes time, and a question can be left without a clear owner.",
  built:
    "An interactive workflow model for preparing reply drafts from approved support information. It shows the draft returning to the customer's email thread, with unresolved questions assigned for review.",
  hardPart:
    "Keeping the original message, the information used and the reply draft connected when messages repeat or the support document changes.",
  phases: [
    {
      id: "P1",
      title: "Receive the question",
      description: "Keep the original message and where it came from.",
    },
    {
      id: "P2",
      title: "Find useful information",
      description: "Look for approved support information that can help answer it.",
    },
    {
      id: "P3",
      title: "Prepare a reply draft",
      description: "Create a draft when there is enough information to work with.",
    },
    {
      id: "P4",
      title: "Assign the review",
      description: "Give the draft or unresolved question a responsible person.",
    },
    {
      id: "P5",
      title: "Keep the next step clear",
      description: "Save the message, supporting information and responsible person together.",
    },
  ],
};
