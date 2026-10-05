import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02 revision 2026-10-04. Change it there first.
export const QUOTE_FOLLOW_UP_REMINDERS: CatalogEntrySummary = {
  id: "quote-follow-up-reminders",
  title: "Quote follow-up reminders",
  purpose: "Prepare a clear next step for quotes awaiting a reply.",
  category: "sales-leads",
  toolsLine: "n8n / CRM / SQL database",
  problem:
    "A quote can go unanswered while the salesperson manages other conversations. A reminder can also arrive after the customer has replied or the quote has changed.",
  built:
    "An interactive workflow model for checking unanswered quotes and preparing follow-up tasks in the CRM. The task carries the quote and conversation reference so the salesperson has the context for the next step.",
  hardPart:
    "Checking for a recent reply and preventing a second task when the first task's confirmation was not saved.",
  phases: [
    {
      id: "P1",
      title: "Find waiting quotes",
      description: "Look for open quotes whose follow-up date has arrived.",
    },
    {
      id: "P2",
      title: "Check the next step",
      description: "Check for a reply, a responsible salesperson and a complete quote record.",
    },
    {
      id: "P3",
      title: "Avoid a second task",
      description: "Save the follow-up first and reuse any task already added for it.",
    },
    {
      id: "P4",
      title: "Add the task",
      description: "Add the follow-up task to the salesperson's tasks in the CRM and record it.",
    },
  ],
};
