import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import type { CaseEvidenceMedia } from "@/content/portfolio-v2/types";

type CaseEvidenceDialogV2Props = {
  evidence: CaseEvidenceMedia;
  isOpen: boolean;
  opener: HTMLElement | null;
  onClose: () => void;
};

// The viewer always shows the full master, never the page's cropped preview. It portals into the
// page's .portfolio-v2 root rather than body, because the theme tokens are scoped to that root. The
// figure has two openers, so focus returns to whichever one was used instead of a single trigger.
export function CaseEvidenceDialogV2({
  evidence,
  isOpen,
  opener,
  onClose,
}: CaseEvidenceDialogV2Props) {
  const [isActualSize, setIsActualSize] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) return;
    setIsActualSize(false);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal container={opener?.closest<HTMLElement>(".portfolio-v2") ?? undefined}>
        <Dialog.Overlay className="pv2-evidence-viewer__overlay" />
        <Dialog.Content
          className="pv2-evidence-viewer"
          data-size={isActualSize ? "actual" : "fit"}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener?.focus();
          }}
        >
          <div className="pv2-evidence-viewer__bar">
            <Dialog.Title className="pv2-evidence-viewer__title">{evidence.label}</Dialog.Title>
            <div className="pv2-evidence-viewer__controls">
              <button
                type="button"
                aria-pressed={!isActualSize}
                onClick={() => setIsActualSize(false)}
              >
                Fit
              </button>
              <button
                type="button"
                aria-pressed={isActualSize}
                onClick={() => setIsActualSize(true)}
              >
                Actual size
              </button>
              <a href={evidence.src} target="_blank" rel="noopener">
                Open original image
                <span className="pv2-visually-hidden"> (opens in a new tab)</span>
              </a>
              <Dialog.Close>Close</Dialog.Close>
            </div>
          </div>
          {/* Focusable only at actual size, where it scrolls, so arrow keys can pan it. */}
          <div
            className="pv2-evidence-viewer__image"
            tabIndex={isActualSize ? 0 : undefined}
            role={isActualSize ? "region" : undefined}
            aria-label={isActualSize ? "Image at actual size, scrollable" : undefined}
          >
            <img
              src={evidence.src}
              alt={evidence.alt}
              width={evidence.width}
              height={evidence.height}
            />
          </div>
          <Dialog.Description className="pv2-evidence-viewer__caption">
            {evidence.caption}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
