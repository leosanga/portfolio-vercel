import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { CatalogGraph } from "@/content/project-catalog/types";
import { N8N_NODE_TYPES } from "@/content/project-catalog/n8nNodeTypes";
import { NativeNode } from "./NativeNode";
import type { PresentationState } from "./presentation";
import type { SpecimenLayout } from "./specimenLayout";

interface Viewport {
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
}
interface Props {
  graph: CatalogGraph;
  title: string;
  layout: SpecimenLayout;
  story: PresentationState;
  caption: string;
  playbackLabel: string;
  reduced: boolean;
  onPlayback: () => void;
  onExplore: () => void;
  modal?: boolean;
  transitionActive?: boolean;
}
const MIN_SCALE = 0.15;
const MAX_SCALE = 2;
const ZOOM_FACTOR = 1.2;

function fit(view: Viewport, layout: SpecimenLayout): Viewport {
  const [x, y, width, height] = layout.bounds;
  const scale = Math.min(view.width / width, view.height / height) * 0.97;
  return {
    ...view,
    scale,
    x: x - (view.width / scale - width) / 2,
    y: y - (view.height / scale - height) / 2,
  };
}

export function WorkflowCanvas({
  graph,
  title,
  layout,
  story,
  caption,
  playbackLabel,
  reduced,
  onPlayback,
  onExplore,
  modal = false,
  transitionActive = false,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const id = useId();
  const drag = useRef<{ pointer: number; x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState<Viewport>({
    x: layout.bounds[0],
    y: layout.bounds[1],
    scale: 1,
    width: layout.bounds[2],
    height: layout.bounds[3],
  });
  const initialized = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(() => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      setView((current) => {
        const resized = { ...current, width: box.width, height: box.height };
        if (initialized.current) return resized;
        initialized.current = true;
        return window.matchMedia("(max-width: 700px)").matches
          ? { ...resized, scale: 0.85, x: layout.readable[0], y: layout.readable[1] }
          : fit(resized, layout);
      });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, [layout]);

  const zoom = (factor: number) => {
    onExplore();
    setView((current) => {
      const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, current.scale * factor));
      return {
        ...current,
        scale,
        x: current.x + current.width / current.scale / 2 - current.width / scale / 2,
        y: current.y + current.height / current.scale / 2 - current.height / scale / 2,
      };
    });
  };
  const pan = (x: number, y: number) =>
    setView((current) => ({
      ...current,
      x: current.x + x / current.scale,
      y: current.y + y / current.scale,
    }));
  const fitView = () => {
    onExplore();
    setView((current) => fit(current, layout));
  };
  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-90, 0],
      ArrowRight: [90, 0],
      ArrowUp: [0, -90],
      ArrowDown: [0, 90],
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      onExplore();
      pan(...move);
      return;
    }
    if (["+", "=", "-", "0"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "0") fitView();
      else zoom(event.key === "-" ? 1 / ZOOM_FACTOR : ZOOM_FACTOR);
    }
  };
  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    onExplore();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const start = drag.current;
    if (!start || start.pointer !== event.pointerId) return;
    pan(start.x - event.clientX, start.y - event.clientY);
    drag.current = { ...start, x: event.clientX, y: event.clientY };
  };
  const finishPointer = () => {
    drag.current = null;
    setDragging(false);
  };
  const interpolation = Math.pow(Math.max(0, Math.min(1, (1 - view.scale) / 0.8)), 2.2);
  const palette = Object.fromEntries(
    [
      ["edge-light", 0.84, 0.6],
      ["edge-dark", 0.42, 0.66],
      ["port-light", 0.68, 0.3],
      ["port-dark", 0.5, 0.7],
      ["node-alpha-light", 0.1, 0.7],
      ["node-alpha-dark", 0.2, 0.7],
    ].map(([role, base, end]) => [
      `--zoom-${role}`,
      Number(base) + (Number(end) - Number(base)) * interpolation,
    ]),
  ) as CSSProperties;
  const trace = new Set(
    graph.presentation.kind === "flow"
      ? graph.presentation.beats.flatMap((beat) => beat.edges.flat())
      : [],
  );
  const endingNode = graph.annotations.find((annotation) => annotation.id === story.ending)?.at
    .node;

  return (
    <div className="pc-canvas-frame" style={palette} data-pc-transition-active={transitionActive}>
      <div className="pc-canvas-toolbar">
        {!modal && (
          <div className="pc-canvas-name">
            {title}
            <span className="pc-canvas-phase-caption">{caption}</span>
          </div>
        )}
        <div
          className="pc-canvas-controls"
          role="group"
          aria-label="Flow playback and canvas viewport"
        >
          {!reduced && (
            <button className="pc-canvas-play" type="button" onClick={onPlayback}>
              {playbackLabel}
            </button>
          )}
          <button type="button" onClick={() => zoom(1 / ZOOM_FACTOR)} aria-label="Zoom out">
            −
          </button>
          <span className="pc-canvas-zoom">{Math.round(view.scale * 100)}%</span>
          <button type="button" onClick={() => zoom(ZOOM_FACTOR)} aria-label="Zoom in">
            +
          </button>
          <button type="button" onClick={fitView}>
            Fit
          </button>
        </div>
      </div>
      <div className="pc-canvas-holder">
        <svg
          ref={svgRef}
          className={`pc-canvas-svg${dragging ? " is-dragging" : ""}`}
          tabIndex={0}
          role="img"
          aria-labelledby={`${id}-title ${id}-description`}
          viewBox={`${view.x} ${view.y} ${view.width / view.scale} ${view.height / view.scale}`}
          preserveAspectRatio="none"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          onLostPointerCapture={finishPointer}
        >
          <title id={`${id}-title`}>{title} workflow</title>
          <desc id={`${id}-description`}>{layout.description}</desc>
          <defs>
            <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle className="pc-canvas-grid-dot" cx="1" cy="1" r="1" />
            </pattern>
          </defs>
          <rect x="-6000" y="-6000" width="12000" height="12000" fill={`url(#${id}-dots)`} />
          {graph.edges.map((edge) => {
            const state = story.edges[edge.id]!;
            const source = graph.nodes.find((node) => node.id === edge.from.node)!;
            const configuration = edge.kind === "ai_languageModel";
            const error =
              source.errorOutput &&
              edge.from.index ===
                N8N_NODE_TYPES[source.type].outputs.filter((kind) => kind === "main").length;
            return (
              <path
                key={edge.id}
                data-edge={edge.id}
                className={`pc-canvas-edge${configuration || error ? " is-dashed" : ""}${!trace.has(edge.id) ? " is-static" : ""}${state.covered ? " is-covered" : ""}`}
                d={edge.path}
                opacity={state.reveal}
              >
                <title>{`${source.label} output ${edge.from.index} to ${graph.nodes.find((node) => node.id === edge.to.node)!.label} ${edge.kind} input ${edge.to.index}`}</title>
              </path>
            );
          })}
          {[...trace].map((edgeId) => (
            <path
              key={edgeId}
              className="pc-canvas-edge-sweep"
              d={graph.edges.find((edge) => edge.id === edgeId)!.path}
              pathLength="1"
              strokeDasharray="1 1"
              strokeDashoffset={1 - story.edges[edgeId]!.sweep}
              opacity={story.edges[edgeId]!.sweep > 0 ? 1 : 0}
            />
          ))}
          {layout.lanes.map((lane) => (
            <text key={lane.text} className="pc-canvas-lane-label" x={lane.x} y={lane.y}>
              {lane.text}
            </text>
          ))}
          {graph.nodes.map((node) => (
            <NativeNode
              key={node.id}
              node={node}
              state={story.nodes[node.id]!}
              lines={layout.labels[node.id]}
              ending={endingNode === node.id}
            />
          ))}
          {graph.annotations.map((annotation) => {
            const item = layout.annotations[annotation.id];
            if (!item) return null;
            return (
              <g
                key={annotation.id}
                opacity={story.nodes[annotation.at.node]!.reveal}
                className={
                  story.ending === annotation.id
                    ? "pc-canvas-outcome is-ending"
                    : "pc-canvas-outcome"
                }
              >
                {item.path && <path className="pc-canvas-edge is-static" d={item.path} />}
                <g transform={`translate(${item.x} ${item.y})`}>
                  <rect
                    className="pc-canvas-annotation"
                    width={item.width}
                    height={item.detail ? 68 : 44}
                    rx="5"
                  />
                  <text className="pc-canvas-annotation-title" x="14" y="27">
                    {annotation.text}
                  </text>
                  {item.detail && (
                    <text className="pc-canvas-annotation-text" x="14" y="49">
                      {item.detail}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="pc-canvas-legend">
        <span>Execution route</span>
        {graph.edges.some((edge) => edge.kind === "ai_languageModel") && (
          <span className="is-dashed">Static model / error relationship</span>
        )}
      </div>
    </div>
  );
}
