import { HUBSPOT_LEAD_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/hubspot-lead-routing";

import { HubSpotDecisionTrailV2 } from "./HubSpotDecisionTrailV2";
import { HubSpotEvidenceFigureV2 } from "./HubSpotEvidenceFigureV2";

export function HubSpotLeadJourneyV2() {
  const { journey } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;

  return (
    <section className="pv2-case-section pv2-hubspot-journey" aria-labelledby="journey-title">
      <div className="pv2-frame">
        <header className="pv2-case-section__header">
          <p className="pv2-case-section__index" aria-hidden="true">
            02
          </p>
          <h2 id="journey-title">{journey.heading}</h2>
          <p>{journey.intro}</p>
        </header>

        <div className="pv2-hubspot-journey__visual">
          <HubSpotDecisionTrailV2 />
        </div>

        <header className="pv2-hubspot-journey__evidence-header">
          <p>{journey.evidenceLabel}</p>
          <p>{journey.evidenceIntro}</p>
        </header>
        <div className="pv2-hubspot-journey__evidence">
          {journey.evidence.map((evidence) => (
            <HubSpotEvidenceFigureV2 evidence={evidence} key={evidence.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
