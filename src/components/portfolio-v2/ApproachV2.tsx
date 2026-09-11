import { APPROACH } from "@/content/portfolio-v2/content";
import type { CSSProperties } from "react";

export function ApproachV2() {
  return (
    <section
      className="pv2-section pv2-approach"
      id="approach"
      aria-labelledby="pv2-approach-title"
    >
      <div className="pv2-frame" data-pv2-observe>
        <div className="pv2-section-heading">
          <p className="pv2-section-heading__index">03</p>
          <h2 id="pv2-approach-title">My Approach</h2>
        </div>
        <ol className="pv2-approach__steps">
          {APPROACH.map((step, index) => (
            <li
              className="pv2-approach-step"
              key={step.number}
              style={{ "--pv2-step": index } as CSSProperties}
            >
              <div className="pv2-approach-step__route" aria-hidden="true">
                <span className="pv2-approach-step__node" />
                <span className="pv2-approach-step__line" />
              </div>
              <p className="pv2-approach-step__number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
