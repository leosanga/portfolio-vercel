import type { ProjectProofExperience } from "@/content/portfolio-v2/types";

import { BookingReliabilityProofV2 } from "./BookingReliabilityProofV2";
import { HubSpotCoverageReconciliationV2 } from "./HubSpotCoverageReconciliationV2";
import { SalesforceRoutingProofV2 } from "./SalesforceRoutingProofV2";

export function ProjectProofExperienceV2({ experience }: { experience: ProjectProofExperience }) {
  switch (experience.kind) {
    case "booking-reliability":
      return (
        <div className="pv2-project-proof-experience">
          <BookingReliabilityProofV2 experience={experience} />
        </div>
      );
    case "hubspot-coverage-reconciliation":
      return (
        <div className="pv2-project-proof-experience">
          <HubSpotCoverageReconciliationV2 experience={experience} />
        </div>
      );
    case "salesforce-routing":
      return (
        <div className="pv2-project-proof-experience">
          <SalesforceRoutingProofV2 experience={experience} />
        </div>
      );
  }
}
