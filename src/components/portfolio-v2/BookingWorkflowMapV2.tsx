import workflowMapSvg from "@/assets/portfolio-v2/booking-agent/workflow-overview-map.svg?raw";
import { BOOKING_AGENT_CASE_STUDY } from "@/content/portfolio-v2/booking-agent";

// The SVG is the booking agent repo's map, copied byte for byte so its source test still vouches for
// it. It is inlined rather than loaded as an image so the theme can recolor it through CSS attribute
// selectors, and its labels stay real text. The ordered list is its text equivalent: announced to
// assistive technology everywhere, and shown in place of the drawing on narrow screens, where the
// 1200-unit drawing would shrink its labels past reading size.
export function BookingWorkflowMapV2() {
  const { map } = BOOKING_AGENT_CASE_STUDY.architecture;

  return (
    <figure className="pv2-workflow-map" aria-labelledby="workflow-map-label">
      <p className="pv2-case-evidence__label" id="workflow-map-label">
        {map.label}
      </p>
      <div
        className="pv2-workflow-map__drawing"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: workflowMapSvg }}
      />
      <ol className="pv2-workflow-map__stages">
        {map.stages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>
      <figcaption>
        <p>{map.caption}</p>
      </figcaption>
    </figure>
  );
}
