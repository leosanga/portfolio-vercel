import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02. Change it there first.
export const CONTACT_REASONS_FOR_SUPPORT_TICKETS: CatalogEntrySummary = {
  id: "contact-reasons-for-support-tickets",
  title: "Contact reasons for support tickets",
  purpose: "Every Monday, show which reasons customers contacted support for more often last week.",
  category: "reporting",
  toolsLine: "Make / Helpdesk / Spreadsheet / AI model / Team chat",
  problem:
    "A ticket's contact reason exists only when an agent picks one, and under load agents pick the first that roughly fits, or skip it. On the helpdesk's base plan, reports cannot count tickets by reason at all, and the AI that sorts tickets by reason is sold on higher plans.",
  built:
    "An interactive workflow model that gives each ticket without a reason one from the support manager's list, or Unclear, and writes it on the ticket. Every Monday it posts which reasons rose against the four weeks before, with example tickets and a sample for the manager to check.",
  hardPart:
    "Keeping each reason meaning the same thing every week: the model chooses only from the manager's list, a ticket that fits none is Unclear, and a reason an agent set is never replaced.",
  phases: [
    {
      id: "P1",
      title: "Read the reason list and five weeks of tickets",
      description:
        "Every Monday, read the support manager's list of contact reasons, what each one means, and the tickets created last week and in the four weeks before.",
    },
    {
      id: "P2",
      title: "Give each ticket without a reason one from the list",
      description:
        "The model chooses one reason from the list, or Unclear, and it is written on the ticket. A reason an agent set stays.",
    },
    {
      id: "P3",
      title: "Work out which contact reasons rose",
      description:
        "Count each reason last week against the four weeks before, and pick example tickets and a sample to check.",
    },
    {
      id: "P4",
      title: "Post the weekly contact reasons to the support channel",
      description:
        "One message with last week's total, the reasons that rose, examples, the Unclear count and the sample.",
    },
  ],
};
