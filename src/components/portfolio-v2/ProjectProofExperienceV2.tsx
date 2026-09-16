import type { ProjectProofExperience } from "@/content/portfolio-v2/types";

import { BookingReliabilityProofV2 } from "./BookingReliabilityProofV2";

export function ProjectProofExperienceV2({ experience }: { experience: ProjectProofExperience }) {
  switch (experience.kind) {
    case "booking-reliability":
      return (
        <div className="pv2-project-proof-experience">
          <BookingReliabilityProofV2 experience={experience} />
        </div>
      );
  }
}
