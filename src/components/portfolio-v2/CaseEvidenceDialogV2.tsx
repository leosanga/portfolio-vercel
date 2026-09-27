import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";

import type { CaseEvidenceMedia } from "@/content/portfolio-v2/types";

type CaseEvidenceDialogV2Props = {
  evidence: CaseEvidenceMedia;
  isOpen: boolean;
  opener: HTMLElement | null;
  onClose: () => void;
};

// Below this scale a canvas's node labels stop being readable, so the viewer opens no smaller and
// lets the reader scroll instead.
const MIN_READABLE_SCALE = 0.75;

type AreaSize = { width: number; height: number };

// Opens magnified: the image fills the viewer's height, never above its natural size and never below
// the readable floor, so a wide capture scrolls sideways. Clicking the image toggles to a fit-to-screen
// overview and back. Returns the open and fitted scales for the measured viewer area.
function viewerScales(evidence: CaseEvidenceMedia, area: AreaSize) {
  const fit = Math.min(1, area.width / evidence.width, area.height / evidence.height);
  const open = Math.min(1, Math.max(area.height / evidence.height, MIN_READABLE_SCALE));
  return { open, fit };
}

// The viewer portals into the page's .portfolio-v2 root rather than body, because the theme tokens
// are scoped to that root. The figure has two openers, so focus returns to whichever one was used.
export function CaseEvidenceDialogV2({
  evidence,
  isOpen,
  opener,
  onClose,
}: CaseEvidenceDialogV2Props) {
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [area, setArea] = useState<AreaSize>({ width: 0, height: 0 });

  const measureArea = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setArea({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleOpenChange = (isOpenNext: boolean) => {
    if (isOpenNext) return;
    setIsZoomedOut(false);
    onClose();
  };

  const scales = viewerScales(evidence, area);
  const canZoom = scales.fit < scales.open;
  const scale = isZoomedOut && canZoom ? scales.fit : scales.open;
  const zoomState = !canZoom ? "fixed" : isZoomedOut ? "out" : "in";

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal container={opener?.closest<HTMLElement>(".portfolio-v2") ?? undefined}>
        <Dialog.Overlay className="pv2-evidence-viewer__overlay" />
        <Dialog.Content
          className="pv2-evidence-viewer"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener?.focus();
          }}
        >
          <div className="pv2-evidence-viewer__bar">
            <Dialog.Title className="pv2-evidence-viewer__title">{evidence.label}</Dialog.Title>
            <Dialog.Close className="pv2-evidence-viewer__close">Close</Dialog.Close>
          </div>
          <div className="pv2-evidence-viewer__image" ref={measureArea}>
            <button
              type="button"
              className="pv2-evidence-viewer__zoom"
              data-zoom={zoomState}
              disabled={!canZoom}
              onClick={() => setIsZoomedOut((zoomedOut) => !zoomedOut)}
            >
              {canZoom && (
                <span className="pv2-visually-hidden">
                  {isZoomedOut ? "Zoom in: " : "Zoom out: "}
                </span>
              )}
              <img
                src={evidence.src}
                alt={evidence.alt}
                width={evidence.width}
                height={evidence.height}
                style={{ width: Math.round(evidence.width * scale) }}
              />
            </button>
          </div>
          <Dialog.Description className="pv2-evidence-viewer__caption">
            {evidence.caption}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
