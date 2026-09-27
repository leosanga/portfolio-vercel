import { useState, type MouseEvent } from "react";

import { CaseEvidenceDialogV2 } from "@/components/portfolio-v2/CaseEvidenceDialogV2";
import type { CaseEvidenceMedia } from "@/content/portfolio-v2/types";

type CaseEvidenceFigureV2Props = {
  evidence: CaseEvidenceMedia;
};

// The page shows the whole capture; the viewer magnifies it. Without JavaScript the buttons do
// nothing, but the image and caption are still server-rendered.
export function CaseEvidenceFigureV2({ evidence }: CaseEvidenceFigureV2Props) {
  // The opener outlives the open state, so the close handler can still return focus to it.
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openViewer = (event: MouseEvent<HTMLButtonElement>) => {
    setOpener(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <figure className="pv2-case-evidence">
      <p className="pv2-case-evidence__label">{evidence.label}</p>
      <button
        type="button"
        className="pv2-case-evidence__frame"
        aria-haspopup="dialog"
        onClick={openViewer}
      >
        <span className="pv2-visually-hidden">View larger: </span>
        <img
          src={evidence.src}
          alt={evidence.alt}
          width={evidence.width}
          height={evidence.height}
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption>
        <p>{evidence.caption}</p>
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
        evidence={evidence}
        isOpen={isOpen}
        opener={opener}
        onClose={() => setIsOpen(false)}
      />
    </figure>
  );
}
