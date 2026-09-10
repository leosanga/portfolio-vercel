import { useEffect, useRef, useState } from "react";

import type { Flow } from "@/components/portfolio/data";

import { WorkflowDiagramV2 } from "./WorkflowDiagramV2";

const WORKFLOW_REPLAY_DELAY_MS = 3200;

export function WorkflowDisclosureV2({ flow }: { flow: Flow }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details || !open) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let replayTimer = 0;
    let inView = true;

    const clearReplay = () => {
      if (!replayTimer) return;
      window.clearTimeout(replayTimer);
      replayTimer = 0;
    };

    const scheduleReplay = () => {
      clearReplay();
      if (reducedMotion.matches || document.hidden || !inView) return;

      replayTimer = window.setTimeout(() => {
        setPlaybackKey((current) => current + 1);
        scheduleReplay();
      }, WORKFLOW_REPLAY_DELAY_MS);
    };

    const handleVisibilityChange = () => scheduleReplay();
    const handleMotionPreferenceChange = () => scheduleReplay();
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              scheduleReplay();
            },
            { rootMargin: "120px 0px" },
          )
        : null;

    observer?.observe(details);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    scheduleReplay();

    return () => {
      clearReplay();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [open]);

  return (
    <details
      className="pv2-workflow-disclosure"
      ref={detailsRef}
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
