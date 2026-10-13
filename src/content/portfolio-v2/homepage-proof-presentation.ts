import type {
  BookingReliabilityProofExperience,
  HubSpotCoverageReconciliationProofExperience,
} from "@/content/portfolio-v2/types";

type HomepageProofPresentations = {
  "n8n-booking-agent": { kind: "booking-reliability" } & Pick<
    BookingReliabilityProofExperience,
    "heading" | "boundary" | "outcomeHeading"
  >;
  "hubspot-lead-routing": { kind: "hubspot-coverage-reconciliation" } & Pick<
    HubSpotCoverageReconciliationProofExperience,
    "heading"
  >;
};

export const HOMEPAGE_PROOF_PRESENTATION = {
  "n8n-booking-agent": {
    kind: "booking-reliability",
    heading: "A failed booking stops confirmation.",
    boundary: "",
    outcomeHeading: "",
  },
  "hubspot-lead-routing": {
    kind: "hubspot-coverage-reconciliation",
    heading: "14 assigned. Only 8 measured.",
  },
} as const satisfies HomepageProofPresentations;

export function getHomepageProofPresentation(slug: string) {
  if (!Object.prototype.hasOwnProperty.call(HOMEPAGE_PROOF_PRESENTATION, slug)) return undefined;
  return HOMEPAGE_PROOF_PRESENTATION[slug as keyof typeof HOMEPAGE_PROOF_PRESENTATION];
}
