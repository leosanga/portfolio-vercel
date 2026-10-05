import { BookingReliabilityProofV2 } from "@/components/portfolio-v2/BookingReliabilityProofV2";
import { SalesforceRoutingProofV2 } from "@/components/portfolio-v2/SalesforceRoutingProofV2";
import { HubSpotCoverageReconciliationV2 } from "@/components/portfolio-v2/HubSpotCoverageReconciliationV2";
import { EnterpriseIdentitySignatureV2 } from "@/components/portfolio-v2/EnterpriseIdentitySignatureV2";
import "@/styles/enterprise-identity.css";
import {
  BOOKING_AGENT_PROOF,
  SALESFORCE_ROUTING_PROOF,
  HUBSPOT_COVERAGE_RECONCILIATION_PROOF,
} from "@/content/portfolio-v2/case-study-content";
import type { CasePreviewKind } from "@/content/portfolio-v2/case-study-records";
import { useCatalogVisualMotion } from "./useCatalogVisualMotion";

export function CatalogCasePreview({
  preview,
  id,
  active,
}: {
  preview: CasePreviewKind;
  id: string;
  active: boolean;
}) {
  const { rootRef, playing } = useCatalogVisualMotion(active);
  const props = {
    playback: "repeat" as const,
    headingLevel: "h3" as const,
    headingId: `${id}-preview-title`,
    animationEnabled: playing,
  };
  const assertNever = (value: never): never => {
    throw new Error(`Unknown case preview: ${value}`);
  };
  const visual = (() => {
    switch (preview) {
      case "booking":
        return <BookingReliabilityProofV2 experience={BOOKING_AGENT_PROOF} {...props} />;
      case "salesforce":
        return <SalesforceRoutingProofV2 experience={SALESFORCE_ROUTING_PROOF} {...props} />;
      case "hubspot":
        return (
          <HubSpotCoverageReconciliationV2
            experience={HUBSPOT_COVERAGE_RECONCILIATION_PROOF}
            {...props}
          />
        );
      case "identity":
        return (
          <EnterpriseIdentitySignatureV2
            headingId={props.headingId}
            headingLevel="h3"
            animationEnabled={playing}
            playback="loop"
          />
        );
      default:
        return assertNever(preview);
    }
  })();
  return (
    <div className={`pc-case-preview pc-case-preview--${preview}`} ref={rootRef}>
      {visual}
    </div>
  );
}
