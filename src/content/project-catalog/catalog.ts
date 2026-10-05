import type { CatalogEntrySummary } from "./types";
import { CUSTOMER_INQUIRY_ROUTING } from "./entries/customer-inquiry-routing/summary";
import { QUOTE_FOLLOW_UP_REMINDERS } from "./entries/quote-follow-up-reminders/summary";
import { SALES_CALL_NEXT_STEPS } from "./entries/sales-call-notes-and-next-steps/summary";
import { BLOG_POST_APPROVAL_AND_SCHEDULING } from "./entries/blog-post-approval-and-scheduling/summary";

/** Published entries in catalog order. Drafts and private source evidence never go here. */
export const CATALOG_ENTRIES: readonly CatalogEntrySummary[] = [
  CUSTOMER_INQUIRY_ROUTING,
  QUOTE_FOLLOW_UP_REMINDERS,
  SALES_CALL_NEXT_STEPS,
  BLOG_POST_APPROVAL_AND_SCHEDULING,
];

if (new Set(CATALOG_ENTRIES.map((entry) => entry.id)).size !== CATALOG_ENTRIES.length) {
  throw new Error("Project Catalog entries must have unique IDs.");
}
