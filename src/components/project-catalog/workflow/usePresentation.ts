import { useCallback, useEffect, useRef, useState } from "react";
import type { CatalogGraph } from "@/content/project-catalog/types";
import { advancePresentation, derivePresentation, presentationDuration } from "./presentation";
import { SPECIMEN_LAYOUTS } from "./specimenLayout";

type Status = "idle" | "playing" | "paused";

export function usePresentation(
  graph: CatalogGraph | null,
  active: boolean,
  modal: boolean,
  onRequestPlay: () => void,
) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const autoPending = useRef(true);
  const requested = useRef(false);
  const duration = graph ? presentationDuration(graph) : 0;
  const openingMs = graph?.presentation.kind === "flow" ? graph.presentation.openingMs : 0;
  const eligible = !!graph && active && !reduced && !hidden && (visible || modal);

  const pause = useCallback(() => {
    autoPending.current = false;
    requested.current = false;
    setStatus((current) => (current === "playing" ? "paused" : current));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => {
      setReduced(query.matches);
      if (query.matches) pause();
    };
    const visibility = () => {
      setHidden(document.hidden);
    };
    preference();
    visibility();
    query.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? false),
    );
    if (holderRef.current) observer.observe(holderRef.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [pause]);

  useEffect(() => {
    if (!eligible) return;
    if (requested.current || (autoPending.current && !modal)) {
      requested.current = false;
      autoPending.current = false;
      setStatus("playing");
    }
  }, [eligible, modal]);

  useEffect(() => {
    if (status !== "playing" || !eligible) return;
    let frame = 0;
    let previous: number | null = null;
    let position = elapsed;
    const tick = (time: number) => {
      if (previous !== null) position = advancePresentation(position, time - previous, duration);
      previous = time;
      setElapsed(position);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // The frame owns its starting position until playback stops; elapsed updates must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, eligible, duration]);

  // A frame paused inside the opening reveal shows half-faded or invisible nodes (View larger
  // pauses right after autoplay starts). Hold it at the fully revealed canvas; resume continues there.
  useEffect(() => {
    if (status === "paused" && elapsed < openingMs) setElapsed(openingMs);
  }, [status, elapsed, openingMs]);

  const toggle = () => {
    autoPending.current = false;
    if (status === "playing" && eligible) {
      pause();
      return;
    }
    if (reduced || hidden || (!visible && !modal)) return;
    if (status === "idle") setElapsed(0);
    onRequestPlay();
    if (eligible) setStatus("playing");
    else requested.current = true;
  };
  const story = graph
    ? derivePresentation(
        graph,
        elapsed,
        reduced || status === "idle",
        SPECIMEN_LAYOUTS[graph.entryId]?.openingGroups,
        SPECIMEN_LAYOUTS[graph.entryId]?.openingAssembly,
      )
    : null;
  return {
    holderRef,
    pause,
    toggle,
    story,
    reduced,
    label:
      status === "playing" && eligible ? "Pause" : status !== "idle" ? "Resume flow" : "Play flow",
    feedback:
      status === "paused"
        ? "Presentation paused."
        : status === "playing"
          ? "Presentation playing."
          : "",
  };
}
