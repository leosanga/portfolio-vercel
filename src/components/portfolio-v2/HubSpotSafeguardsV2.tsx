import { HUBSPOT_LEAD_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/hubspot-lead-routing";

export function HubSpotSafeguardsV2() {
  const { safeguards } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;

  return (
    <section className="pv2-case-section pv2-hubspot-safeguards" aria-labelledby="safeguards-title">
      <div className="pv2-frame">
        <header className="pv2-case-section__header">
          <p className="pv2-case-section__index" aria-hidden="true">
            03
          </p>
          <h2 id="safeguards-title">{safeguards.heading}</h2>
          <p>{safeguards.intro}</p>
        </header>

        <ul className="pv2-hubspot-safeguards__list">
          {safeguards.items.map((item) => (
            <li key={item.title}>
              <i aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <p>{item.evidence}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
