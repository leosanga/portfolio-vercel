import { useState, type MouseEvent } from "react";

import workflowMapSvg from "@/assets/portfolio-v2/booking-agent/workflow-overview-map.svg?raw";
import { BOOKING_AGENT_CASE_STUDY } from "@/content/portfolio-v2/booking-agent";

import { CaseEvidenceDialogV2 } from "./CaseEvidenceDialogV2";

// The SVG is the booking agent repo's map, copied byte for byte so its source test still vouches for
// it. It is inlined rather than loaded as an image so the theme can recolor it through CSS attribute
// selectors, and its labels stay real text. The ordered list is its text equivalent for assistive
// technology. On narrow screens the drawing shrinks past reading size, so, like the screenshots, it
// opens in the evidence viewer at a readable scale.
export function BookingWorkflowMapV2() {
  const { map } = BOOKING_AGENT_CASE_STUDY.architecture;
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openViewer = (event: MouseEvent<HTMLButtonElement>) => {
    setOpener(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <figure className="pv2-workflow-map" aria-labelledby="workflow-map-label">
      <p className="pv2-case-evidence__label" id="workflow-map-label">
        {map.label}
      </p>
      <button
        type="button"
        className="pv2-workflow-map__drawing"
        aria-haspopup="dialog"
        onClick={openViewer}
      >
        <span className="pv2-visually-hidden">View larger: {map.label}</span>
        <span
          className="pv2-workflow-map__svg"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: workflowMapSvg }}
        />
      </button>
      <ol className="pv2-workflow-map__stages">
        {map.stages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>
      <figcaption>
        <p>{map.caption}</p>
        <button
          type="button"
          className="pv2-case-evidence__open"
          aria-haspopup="dialog"
          onClick={openViewer}
        >
          View larger
        </button>
      </figcaption>
      <CaseEvidenceDialogV2
        evidence={{
          svgMarkup: workflowMapSvg,
          width: map.width,
          height: map.height,
          alt: map.alt,
          label: map.label,
          caption: map.caption,
        }}
        isOpen={isOpen}
        opener={opener}
        onClose={() => setIsOpen(false)}
      />
    </figure>
  );
}
