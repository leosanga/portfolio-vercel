import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { LeadQualificationLoopExperience } from "@/content/portfolio-v2/types";

type Point = { x: number; y: number };
type NodeKey = keyof LeadQualificationLoopExperience["nodes"];
type NodeState = "pending" | "active" | "complete";

type ConnectionDefinition = {
  from: NodeKey;
  to: NodeKey;
  activeAt: number;
};

type MeasuredConnection = ConnectionDefinition & {
  path: string;
  start: Point;
  end: Point;
};

const FINAL_STAGE = 6;
const LOOP_DURATION_MS = 8000;
const STAGE_TIMING = [
  { at: 720, stage: 1 },
  { at: 1420, stage: 2 },
  { at: 2200, stage: 3 },
  { at: 3180, stage: 4 },
  { at: 4100, stage: 5 },
  { at: 4920, stage: FINAL_STAGE },
] as const;

const CONNECTIONS: readonly ConnectionDefinition[] = [
  { from: "alert", to: "trigger", activeAt: 1 },
  { from: "trigger", to: "contact", activeAt: 2 },
  { from: "contact", to: "research", activeAt: 3 },
  { from: "research", to: "hubspotUpdate", activeAt: 4 },
  { from: "research", to: "slackReply", activeAt: 4 },
  { from: "hubspotUpdate", to: "hubspotOutcome", activeAt: 5 },
  { from: "slackReply", to: "slackOutcome", activeAt: 5 },
];

function connectorAnchors(
  startRect: DOMRect,
  endRect: DOMRect,
  containerRect: DOMRect,
): { start: Point; end: Point } {
  const startCenter = {
    x: startRect.left - containerRect.left + startRect.width / 2,
    y: startRect.top - containerRect.top + startRect.height / 2,
  };
  const endCenter = {
    x: endRect.left - containerRect.left + endRect.width / 2,
    y: endRect.top - containerRect.top + endRect.height / 2,
  };
  const deltaX = endCenter.x - startCenter.x;
  const deltaY = endCenter.y - startCenter.y;

  if (Math.abs(deltaY) >= Math.abs(deltaX)) {
    const direction = Math.sign(deltaY) || 1;
    return {
      start: {
        x: startCenter.x,
        y: startCenter.y + (startRect.height / 2) * direction,
      },
      end: {
        x: endCenter.x,
        y: endCenter.y - (endRect.height / 2) * direction,
      },
    };
  }

  const direction = Math.sign(deltaX) || 1;
  return {
    start: {
      x: startCenter.x + (startRect.width / 2) * direction,
      y: startCenter.y,
    },
    end: {
      x: endCenter.x - (endRect.width / 2) * direction,
      y: endCenter.y,
    },
  };
}

function connectorPath(start: Point, end: Point) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  if (Math.abs(deltaY) >= Math.abs(deltaX)) {
    return `M ${start.x} ${start.y} C ${start.x} ${start.y + deltaY * 0.5}, ${end.x} ${end.y - deltaY * 0.5}, ${end.x} ${end.y}`;
  }

  return `M ${start.x} ${start.y} C ${start.x + deltaX * 0.5} ${start.y}, ${end.x - deltaX * 0.5} ${end.y}, ${end.x} ${end.y}`;
}

function stateForStage(stage: number, activeAt: number): NodeState {
  if (stage === FINAL_STAGE || stage > activeAt) return "complete";
  if (stage === activeAt) return "active";
  return "pending";
}

function QualificationNode({
  node,
  nodeKey,
  activeAt,
  stage,
  system,
  register,
}: {
  node: { tag: string; label: string };
  nodeKey: NodeKey;
  activeAt: number;
  stage: number;
  system: "hubspot" | "n8n" | "slack" | "team";
  register: (key: NodeKey, element: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={`pv2-qualification-node pv2-qualification-node--${system}`}
      data-state={stateForStage(stage, activeAt)}
      ref={(element) => register(nodeKey, element)}
    >
      <p className="pv2-qualification-node__tag">{node.tag}</p>
      <p className="pv2-qualification-node__label">{node.label}</p>
    </div>
  );
}

export function LeadQualificationLoopV2({
  experience,
  open,
  shouldAnimate,
  playback = "loop",
}: {
  experience: LeadQualificationLoopExperience;
  open: boolean;
  shouldAnimate: boolean;
  playback?: "loop" | "once";
}) {
  const scopeId = useId();
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<NodeKey, HTMLDivElement>());
  const [stage, setStage] = useState(FINAL_STAGE);
  const [connections, setConnections] = useState<MeasuredConnection[]>([]);

  useEffect(() => {
    if (!shouldAnimate) {
      setStage(FINAL_STAGE);
      return;
    }

    let stageTimers: number[] = [];
    let cycleTimer = 0;

    const runCycle = () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      setStage(0);
      stageTimers = STAGE_TIMING.map(({ at, stage: nextStage }) =>
        window.setTimeout(() => setStage(nextStage), at),
      );
      if (playback === "loop") cycleTimer = window.setTimeout(runCycle, LOOP_DURATION_MS);
    };

    runCycle();
    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(cycleTimer);
    };
  }, [shouldAnimate, playback]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !open) {
      setConnections([]);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const canvasRect = canvas.getBoundingClientRect();
      const nextConnections = CONNECTIONS.flatMap((definition) => {
        const startNode = nodeRefs.current.get(definition.from);
        const endNode = nodeRefs.current.get(definition.to);
        if (!startNode || !endNode) return [];

        const { start, end } = connectorAnchors(
          startNode.getBoundingClientRect(),
          endNode.getBoundingClientRect(),
          canvasRect,
        );
        return [
          {
            ...definition,
            path: connectorPath(start, end),
            start,
            end,
          },
        ];
      });
      setConnections(nextConnections);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    schedule();
    const observer = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    observer?.observe(canvas);
    if (!observer) window.addEventListener("resize", schedule);
    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open]);

  const register = (key: NodeKey, element: HTMLDivElement | null) => {
    if (element) nodeRefs.current.set(key, element);
    else nodeRefs.current.delete(key);
  };

  return (
    <figure className="pv2-lead-qualification-loop" aria-describedby={scopeId}>
      <figcaption className="pv2-lead-qualification-loop__scope" id={scopeId}>
        {experience.scope}
      </figcaption>
      <div className="pv2-lead-qualification-loop__canvas" ref={canvasRef}>
        {connections.length ? (
          <svg
            className="pv2-lead-qualification-loop__connectors"
            aria-hidden="true"
            focusable="false"
          >
            {connections.map((connection) => {
              const connectionState = stateForStage(stage, connection.activeAt);
              return (
                <g key={`${connection.from}-${connection.to}`} data-state={connectionState}>
                  <path d={connection.path} />
                  {connectionState === "active" ? (
                    <circle
                      cx="0"
                      cy="0"
                      r="4"
                      key={`${stage}-${connection.from}-${connection.to}`}
                      style={
                        {
                          "--pv2-start-x": `${connection.start.x}px`,
                          "--pv2-start-y": `${connection.start.y}px`,
                          "--pv2-end-x": `${connection.end.x}px`,
                          "--pv2-end-y": `${connection.end.y}px`,
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>
        ) : null}

        <ol className="pv2-lead-qualification-loop__sequence" role="list">
          <li className="pv2-lead-qualification-loop__step pv2-lead-qualification-loop__step--alert">
            <QualificationNode
              node={experience.nodes.alert}
              nodeKey="alert"
              activeAt={0}
              stage={stage}
              system="slack"
              register={register}
            />
          </li>
          <li className="pv2-lead-qualification-loop__step pv2-lead-qualification-loop__step--trigger">
            <QualificationNode
              node={experience.nodes.trigger}
              nodeKey="trigger"
              activeAt={1}
              stage={stage}
              system="slack"
              register={register}
            />
          </li>
          <li className="pv2-lead-qualification-loop__step pv2-lead-qualification-loop__step--contact">
            <QualificationNode
              node={experience.nodes.contact}
              nodeKey="contact"
              activeAt={2}
              stage={stage}
              system="hubspot"
              register={register}
            />
          </li>
          <li className="pv2-lead-qualification-loop__step pv2-lead-qualification-loop__step--research">
            <QualificationNode
              node={experience.nodes.research}
              nodeKey="research"
              activeAt={3}
              stage={stage}
              system="n8n"
              register={register}
            />
          </li>
          <li className="pv2-lead-qualification-loop__outputs">
            <span className="pv2-visually-hidden">
              The completed qualification reaches HubSpot and the original Slack thread.
            </span>
            <ul role="list">
              <li className="pv2-lead-qualification-loop__branch pv2-lead-qualification-loop__branch--hubspot">
                <QualificationNode
                  node={experience.nodes.hubspotUpdate}
                  nodeKey="hubspotUpdate"
                  activeAt={4}
                  stage={stage}
                  system="hubspot"
                  register={register}
                />
                <QualificationNode
                  node={experience.nodes.hubspotOutcome}
                  nodeKey="hubspotOutcome"
                  activeAt={5}
                  stage={stage}
                  system="hubspot"
                  register={register}
                />
              </li>
              <li className="pv2-lead-qualification-loop__branch pv2-lead-qualification-loop__branch--slack">
                <QualificationNode
                  node={experience.nodes.slackReply}
                  nodeKey="slackReply"
                  activeAt={4}
                  stage={stage}
                  system="slack"
                  register={register}
                />
                <QualificationNode
                  node={experience.nodes.slackOutcome}
                  nodeKey="slackOutcome"
                  activeAt={5}
                  stage={stage}
                  system="team"
                  register={register}
                />
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </figure>
  );
}
