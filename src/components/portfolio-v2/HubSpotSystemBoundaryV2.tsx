import { HUBSPOT_LEAD_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/hubspot-lead-routing";

export function HubSpotSystemBoundaryV2() {
  const { systemBoundary } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;

  return (
    <section className="pv2-case-section pv2-hubspot-boundary" aria-labelledby="boundary-title">
      <div className="pv2-frame">
        <header className="pv2-case-section__header">
          <p className="pv2-case-section__index" aria-hidden="true">
            05
          </p>
          <h2 id="boundary-title">{systemBoundary.heading}</h2>
          <p>{systemBoundary.intro}</p>
        </header>

        <div className="pv2-hubspot-boundary__zones">
          {systemBoundary.zones.map((zone) => (
            <section data-tone={zone.tone} key={zone.label}>
              <h3>{zone.label}</h3>
              <ul>
                {zone.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="pv2-hubspot-boundary__proof">
          <p>{systemBoundary.evidenceLabel}</p>
          <p>{systemBoundary.boundary}</p>
        </div>
      </div>
    </section>
  );
}
