import { useState } from "react";

import type { Flow } from "@/components/portfolio/data";

import { WorkflowDiagramV2 } from "./WorkflowDiagramV2";

export function WorkflowDisclosureV2({ flow }: { flow: Flow }) {
  const [open, setOpen] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);

  return (
    <details
      className="pv2-workflow-disclosure"
      onToggle={(event) => {
        const nextOpen = event.currentTarget.open;
        setOpen(nextOpen);
        if (nextOpen) setPlaybackKey((current) => current + 1);
      }}
    >
      <summary>
        <span>
          <span className="pv2-workflow-disclosure__eyebrow">System path</span>
          <span className="pv2-workflow-disclosure__label">See how it works</span>
        </span>
        <span className="pv2-workflow-disclosure__control" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path d="M4 10h12M10 4v12" />
          </svg>
        </span>
      </summary>
      <div className="pv2-workflow-disclosure__content">
        <WorkflowDiagramV2 flow={flow} open={open} playbackKey={playbackKey} />
      </div>
    </details>
  );
}
