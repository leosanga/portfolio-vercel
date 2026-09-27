import { useState, type MouseEvent } from "react";

import type { CaseEvidenceMedia } from "@/content/portfolio-v2/types";

import { CaseEvidenceDialogV2 } from "./CaseEvidenceDialogV2";

type HubSpotEvidenceFigureV2Props = {
  evidence: CaseEvidenceMedia;
  layout?: "workflow" | "report";
  priority?: boolean;
};

export function HubSpotEvidenceFigureV2({
  evidence,
  layout = "workflow",
  priority = false,
}: HubSpotEvidenceFigureV2Props) {
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openViewer = (event: MouseEvent<HTMLButtonElement>) => {
    setOpener(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <div className="pv2-hubspot-evidence" data-layout={layout}>
      <figure>
        <button
          type="button"
          className="pv2-hubspot-evidence__frame"
          aria-haspopup="dialog"
          onClick={openViewer}
        >
          <span className="pv2-visually-hidden">View larger: </span>
          <img
            src={evidence.src}
            alt={evidence.alt}
            width={evidence.width}
            height={evidence.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </button>
        <figcaption>
          <span>{evidence.caption}</span>
          <button
            type="button"
            className="pv2-case-evidence__open"
            aria-haspopup="dialog"
            onClick={openViewer}
          >
            View larger
          </button>
        </figcaption>
      </figure>
      <CaseEvidenceDialogV2
        evidence={evidence}
        isOpen={isOpen}
        opener={opener}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
