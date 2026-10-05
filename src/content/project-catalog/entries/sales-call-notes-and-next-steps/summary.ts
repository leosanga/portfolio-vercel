import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02 revision 2026-10-04. Change it there first.
export const SALES_CALL_NEXT_STEPS: CatalogEntrySummary = {
  id: "sales-call-notes-and-next-steps",
  title: "Next steps from sales calls",
  purpose: "Propose follow-up work from finished call notes and the account's context.",
  category: "sales-leads",
  toolsLine: "n8n / CRM / Document storage / SQL database / AI analysis",
  problem:
    "A notes tool captures each sales call, but the right next step also depends on the account's history and the sales playbook. Checking both after every call takes time, so follow-up often ends up generic or missed.",
  built:
    "An interactive workflow model that combines finished call notes, account history and the sales playbook to propose follow-up work. It shows each proposal with the information a salesperson needs to review it.",
  hardPart:
    "Keeping each proposed action tied to the call and account context that supports it, without filling missing owners or dates with AI guesses.",
  phases: [
    {
      id: "P1",
      title: "Receive the call notes",
      description: "Save the finished notes and transcript with the account and salesperson.",
    },
    {
      id: "P2",
      title: "Gather the account context",
      description:
        "Look up the account's history and what the sales playbook expects at the deal's stage.",
    },
    {
      id: "P3",
      title: "Decide the next steps",
      description: "Compare the call with that context and propose what should happen next.",
    },
    {
      id: "P4",
      title: "Check the next steps",
      description:
        "Confirm each step points to the call or its context, and flag details to confirm.",
    },
    {
      id: "P5",
      title: "Save for review",
      description: "Keep the proposed steps with the call for the salesperson.",
    },
  ],
};
