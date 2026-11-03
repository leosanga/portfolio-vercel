import type { CatalogEntrySummary } from "./types";
import { CUSTOMER_INQUIRY_ROUTING } from "./entries/customer-inquiry-routing/summary";
import { QUOTE_FOLLOW_UP_REMINDERS } from "./entries/quote-follow-up-reminders/summary";
import { SALES_CALL_NEXT_STEPS } from "./entries/sales-call-notes-and-next-steps/summary";
import { BLOG_POST_APPROVAL_AND_SCHEDULING } from "./entries/blog-post-approval-and-scheduling/summary";
import { INTERNAL_KNOWLEDGE_ASSISTANT } from "./entries/internal-knowledge-assistant/summary";
import { WEEKLY_SALES_FUNNEL_CHANGES } from "./entries/weekly-sales-funnel-changes/summary";
import { CONTACT_REASONS_FOR_SUPPORT_TICKETS } from "./entries/contact-reasons-for-support-tickets/summary";

/** Published entries in catalog order. Drafts and private source evidence never go here. */
export const CATALOG_ENTRIES: readonly CatalogEntrySummary[] = [
  INTERNAL_KNOWLEDGE_ASSISTANT,
  CUSTOMER_INQUIRY_ROUTING,
  QUOTE_FOLLOW_UP_REMINDERS,
  SALES_CALL_NEXT_STEPS,
  BLOG_POST_APPROVAL_AND_SCHEDULING,
  WEEKLY_SALES_FUNNEL_CHANGES,
  CONTACT_REASONS_FOR_SUPPORT_TICKETS,
];

if (new Set(CATALOG_ENTRIES.map((entry) => entry.id)).size !== CATALOG_ENTRIES.length) {
  throw new Error("Project Catalog entries must have unique IDs.");
}
