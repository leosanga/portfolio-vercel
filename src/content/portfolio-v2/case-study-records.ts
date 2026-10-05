import {
  BOOKING_AGENT_OVERVIEW,
  BOOKING_AGENT_STACK,
  HUBSPOT_LEAD_ROUTING_OVERVIEW,
  HUBSPOT_LEAD_ROUTING_STACK,
  SALESFORCE_ROUTING_OVERVIEW,
  SALESFORCE_ROUTING_STACK,
} from "./case-study-content";
import type { CatalogCategoryId } from "../project-catalog/types";
import { ENTERPRISE_IDENTITY } from "./enterprise-identity";

export type CasePreviewKind = "booking" | "salesforce" | "hubspot" | "identity";
export type PublicCaseStudyRecord = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  hardPart: string;
  stack: readonly string[];
  caseStudyPath: `/projects/${string}`;
  caseStudySummary: string;
  preview: CasePreviewKind;
  category: CatalogCategoryId;
};

export const BOOKING_AGENT_CASE_RECORD = {
  slug: "n8n-booking-agent",
  title: "AI Booking Agent (n8n)",
  ...BOOKING_AGENT_OVERVIEW,
  stack: BOOKING_AGENT_STACK,
  caseStudyPath: "/projects/ai-booking-agent",
  caseStudySummary:
    "AI handles the booking conversation while tested code checks proposed actions before the calendar changes.",
  preview: "booking",
  category: "sales-leads",
} as const satisfies PublicCaseStudyRecord;

export const SALESFORCE_ROUTING_CASE_RECORD = {
  slug: "salesforce-trial-demo-routing",
  title: "Trial & Demo Routing by Customer Relationship (Salesforce)",
  ...SALESFORCE_ROUTING_OVERVIEW,
  stack: SALESFORCE_ROUTING_STACK,
  caseStudyPath: "/projects/trial-demo-routing-by-customer-relationship",
  caseStudySummary:
    "The system routes trial and demo requests using Salesforce records, with unclear matches held for review.",
  preview: "salesforce",
  category: "sales-leads",
} as const satisfies PublicCaseStudyRecord;

export const HUBSPOT_LEAD_ROUTING_CASE_RECORD = {
  slug: "hubspot-lead-routing",
  title: "Lead Routing & Pipeline Health System (HubSpot)",
  ...HUBSPOT_LEAD_ROUTING_OVERVIEW,
  stack: HUBSPOT_LEAD_ROUTING_STACK,
  caseStudyPath: "/projects/lead-routing-pipeline-health-system",
  caseStudySummary: "Testing uncovered assigned leads missing from response-time reports.",
  preview: "hubspot",
  category: "sales-leads",
} as const satisfies PublicCaseStudyRecord;

export const ENTERPRISE_IDENTITY_CASE_RECORD = {
  slug: "enterprise-identity-systems-operations",
  title: ENTERPRISE_IDENTITY.hero.title,
  caseStudyPath: ENTERPRISE_IDENTITY.href,
  caseStudySummary:
    "Customer sign-in and account provisioning, alongside separate ownership of internal company systems.",
  problem:
    "Customer identity data did not always match what the receiving application expected. The company also needed ownership of its own cloud and SaaS systems.",
  solution:
    "I configured Single Sign On (SSO) and Automated User Provisioning (SCIM) across customer environments, worked through identity mappings and handled identity troubleshooting. Separately, I managed internal accounts, access and systems.",
  hardPart:
    "Each system could represent the same person or account data differently. I had to establish which values to trust and what the receiving application could support.",
  stack: ENTERPRISE_IDENTITY.hero.stack,
  preview: "identity",
  category: "operations",
} as const satisfies PublicCaseStudyRecord;

// Public case order is independent of homepage placement and catalog filters.
export const PUBLIC_CASE_STUDIES: readonly PublicCaseStudyRecord[] = [
  BOOKING_AGENT_CASE_RECORD,
  SALESFORCE_ROUTING_CASE_RECORD,
  HUBSPOT_LEAD_ROUTING_CASE_RECORD,
  ENTERPRISE_IDENTITY_CASE_RECORD,
];

const identities = new Set<string>();
const paths = new Set<string>();
for (const record of PUBLIC_CASE_STUDIES) {
  if (identities.has(record.slug) || paths.has(record.caseStudyPath)) {
    throw new Error(`Duplicate public case study: ${record.slug}`);
  }
  if (!record.caseStudySummary.trim() || !record.hardPart.trim()) {
    throw new Error(`Incomplete public case study: ${record.slug}`);
  }
  identities.add(record.slug);
  paths.add(record.caseStudyPath);
}
