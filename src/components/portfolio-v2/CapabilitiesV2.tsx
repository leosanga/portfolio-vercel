import { CAPABILITIES } from "@/content/portfolio-v2/content";

export function CapabilitiesV2() {
  return (
    <section
      className="pv2-section pv2-capabilities"
      id="capabilities"
      aria-labelledby="pv2-capabilities-title"
    >
      <div className="pv2-frame">
        <div className="pv2-section-heading">
          <p className="pv2-section-heading__index">02</p>
          <h2 id="pv2-capabilities-title">Capabilities</h2>
        </div>
        <div className="pv2-capabilities__grid">
          {CAPABILITIES.map((capability, index) => (
            <article className="pv2-capability" key={capability.title}>
              <p className="pv2-capability__index">0{index + 1}</p>
              <h3>{capability.title}</h3>
              <p className="pv2-capability__statement">{capability.statement}</p>
              <ul>
                {capability.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
