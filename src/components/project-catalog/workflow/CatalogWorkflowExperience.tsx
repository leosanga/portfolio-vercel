import { useEffect, useRef, useState } from "react";
import type { CatalogEntrySummary, CatalogGraph } from "@/content/project-catalog/types";
import { GRAPH_LOADERS } from "@/content/project-catalog/graphRegistry";
import { SPECIMEN_LAYOUTS } from "./specimenLayout";
import { usePresentation } from "./usePresentation";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowPhases } from "./WorkflowPhases";
import { WorkflowModal } from "./WorkflowModal";
import { useCanvasTransition } from "./useCanvasTransition";

interface Props {
  entry: CatalogEntrySummary;
  active: boolean;
  onRequestPlay: () => void;
  onModalChange: (open: boolean) => void;
}

export function CatalogWorkflowExperience({ entry, active, onRequestPlay, onModalChange }: Props) {
  const [graph, setGraph] = useState<CatalogGraph | null>(null);
  const [failure, setFailure] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [modal, setModal] = useState(false);
  const { changeModal, transitioning, cancel } = useCanvasTransition(entry.id, setModal);
  const openerRef = useRef<HTMLButtonElement>(null);
  const presentation = usePresentation(graph, active, modal, onRequestPlay);
  const layout = SPECIMEN_LAYOUTS[entry.id];

  useEffect(() => {
    let current = true;
    setFailure(false);
    const loader = GRAPH_LOADERS[entry.id];
    if (!loader || !layout) {
      setFailure(true);
      return;
    }
    loader()
      .then((loaded) => {
        if (current) setGraph(loaded);
      })
      .catch(() => {
        if (current) setFailure(true);
      });
    return () => {
      current = false;
    };
  }, [entry.id, attempt, layout]);

  useEffect(() => {
    if (!active) {
      cancel();
      setModal(false);
    }
  }, [active, cancel]);
  const closeModal = () => {
    presentation.pause();
    changeModal(false);
  };
  const activePhases = entry.phases.filter((phase) =>
    presentation.story?.activePhases.includes(phase.id),
  );
  const caption = activePhases
    .map(
      (phase) =>
        `${String(entry.phases.indexOf(phase) + 1).padStart(2, "0")} / ${String(entry.phases.length).padStart(2, "0")}: ${phase.title}`,
    )
    .join(" · ");
  const canvas = (enlarged = false) =>
    graph && presentation.story && layout ? (
      <WorkflowCanvas
        graph={graph}
        title={entry.title}
        layout={layout}
        story={presentation.story}
        caption={caption}
        playbackLabel={presentation.label}
        reduced={presentation.reduced}
        onPlayback={presentation.toggle}
        onExplore={presentation.pause}
        modal={enlarged}
        transitionActive={transitioning && (enlarged || !modal)}
      />
    ) : null;

  return (
    <div className="pc-workflow">
      <WorkflowPhases phases={entry.phases} story={presentation.story} />
      <div className="pc-workflow-canvas-heading">
        <p>Illustrative workflow design.</p>
        <button
          type="button"
          ref={openerRef}
          disabled={!graph}
          onClick={() => {
            presentation.pause();
            onRequestPlay();
            changeModal(true);
          }}
        >
          View larger
        </button>
      </div>
      <div className="pc-workflow-canvas" ref={presentation.holderRef}>
        {graph ? (
          canvas()
        ) : (
          <div className="pc-workflow-loading" role="status">
            {failure ? (
              <>
                <p>The workflow couldn't load.</p>
                <button type="button" onClick={() => setAttempt((current) => current + 1)}>
                  Retry
                </button>
              </>
            ) : (
              <p>Loading workflow…</p>
            )}
          </div>
        )}
      </div>
      <p className="pc-workflow-viewport-hint">
        Drag to pan. Focus the canvas to use arrows, + / − to zoom, and 0 to Fit.
      </p>
      {!modal && (
        <p className="pc-workflow-feedback" role="status">
          {presentation.feedback}
        </p>
      )}
      {modal && graph && (
        <WorkflowModal
          title={entry.title}
          onClose={closeModal}
          onModalChange={onModalChange}
          opener={openerRef.current}
        >
          <WorkflowPhases phases={entry.phases} story={presentation.story} modal />
          {canvas(true)}
          <p className="pc-workflow-feedback" role="status">
            {presentation.feedback}
          </p>
        </WorkflowModal>
      )}
    </div>
  );
}
