import type { CatalogEntrySummary } from "../../types";

// Approved copy: design.md B02. Change it there first.
export const WEEKLY_SALES_FUNNEL_CHANGES: CatalogEntrySummary = {
  id: "weekly-sales-funnel-changes",
  title: "Weekly sales funnel changes",
  purpose:
    "Every Monday, show where last week's leads, meetings and won deals moved, and what changed in the ad accounts at the same time.",
  category: "reporting",
  toolsLine: "Make / CRM / Ad accounts / Team chat",
  problem:
    "The CRM's dashboard shows that last week's new leads, meetings or deals won moved, not what changed with them. The ad accounts record changes to their own campaigns, and none of these tools connects a drop in leads to a campaign paused that week.",
  built:
    "An interactive workflow model that compares each number with the four weeks before and finds which lead source, form or sales rep accounts for the move. It checks the ad accounts' change history and posts the explanation to the sales channel every Monday.",
  hardPart:
    "Naming an ad change only when it matches the source that moved and falls in the same week, and saying no matching change was found when none does.",
  phases: [
    {
      id: "P1",
      title: "Count leads, meetings and deals for five weeks",
      description:
        "Every Monday, read the new leads, meetings booked and deals won in the CRM for last week and the four weeks before.",
    },
    {
      id: "P2",
      title: "Read the ad accounts' campaign changes",
      description:
        "Read the campaign and budget changes both ad accounts recorded last week and the week before.",
    },
    {
      id: "P3",
      title: "Find where each number moved and what changed with it",
      description:
        "Compare last week with the four weeks before, find which source, form or rep moved, and match an ad change only when its source and week agree.",
    },
    {
      id: "P4",
      title: "Post the explanation to the sales channel",
      description:
        "Post one message with each number, where it moved and any matching change, or that no matching change was found.",
    },
  ],
};
