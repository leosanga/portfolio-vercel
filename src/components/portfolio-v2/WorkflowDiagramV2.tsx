import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { Flow, FlowNode } from "@/components/portfolio/data";

type Point = { x: number; y: number };
type Connection = { path: string; start: Point; end: Point };

const KIND_LABEL: Record<FlowNode["kind"], string> = {
  native: "native workflow",
  service: "custom service",
  manual: "human decision",
  constraint: "platform limitation",
};

function connectorPath(start: Point, end: Point) {
  const distance = Math.max(28, (end.y - start.y) * 0.5);
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + distance}, ${end.x} ${end.y - distance}, ${end.x} ${end.y}`;
}

type WorkflowDiagramV2Props = {
  flow: Flow;
  open: boolean;
  playbackKey: number;
};

export function WorkflowDiagramV2({ flow, open, playbackKey }: WorkflowDiagramV2Props) {
  const containerRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !open) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const containerRect = container.getBoundingClientRect();
      const nextConnections: Connection[] = [];

      for (let rowIndex = 1; rowIndex < flow.rows.length; rowIndex += 1) {
        const previous = flow.rows[rowIndex - 1] ?? [];
        const current = flow.rows[rowIndex] ?? [];

        previous.forEach((_, previousIndex) => {
          current.forEach((__, currentIndex) => {
            const previousNode = nodeRefs.current.get(`${rowIndex - 1}-${previousIndex}`);
            const currentNode = nodeRefs.current.get(`${rowIndex}-${currentIndex}`);
            if (!previousNode || !currentNode) return;

            const previousRect = previousNode.getBoundingClientRect();
            const currentRect = currentNode.getBoundingClientRect();
            const start = {
              x: previousRect.left - containerRect.left + previousRect.width / 2,
              y: previousRect.bottom - containerRect.top,
            };
            const end = {
              x: currentRect.left - containerRect.left + currentRect.width / 2,
              y: currentRect.top - containerRect.top,
            };
            nextConnections.push({ path: connectorPath(start, end), start, end });
          });
        });
      }

      setConnections(nextConnections);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [flow.rows, open]);

  return (
    <figure className="pv2-workflow">
      <figcaption className={flow.summary ? "pv2-workflow__summary" : "pv2-visually-hidden"}>
        {flow.summary ?? "Implementation delivery workflow"}
      </figcaption>
      <ol className="pv2-workflow__rows" ref={containerRef}>
        {connections.length ? (
          <svg className="pv2-workflow__connectors" aria-hidden="true" focusable="false">
            <g className="pv2-workflow__static-paths">
              {connections.map((connection, index) => (
                <path d={connection.path} key={`static-${index}`} />
              ))}
            </g>
            <g className="pv2-workflow__signals" key={playbackKey}>
              {connections.map((connection, index) => (
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  key={`signal-${index}`}
                  style={
                    {
                      "--pv2-path-delay": `${index * 70}ms`,
                      "--pv2-start-x": `${connection.start.x}px`,
                      "--pv2-start-y": `${connection.start.y}px`,
                      "--pv2-end-x": `${connection.end.x}px`,
                      "--pv2-end-y": `${connection.end.y}px`,
                    } as CSSProperties
                  }
                />
              ))}
            </g>
          </svg>
        ) : null}
        {flow.rows.map((row, rowIndex) => (
          <li
            className={`pv2-workflow__row ${row.length > 1 ? "pv2-workflow__row--branch" : ""}`}
            key={row.map((node) => node.label).join("-")}
          >
            {row.map((node, nodeIndex) => (
              <div
                className={`pv2-workflow-node pv2-workflow-node--${node.kind}`}
                key={node.label}
                ref={(element) => {
                  const key = `${rowIndex}-${nodeIndex}`;
                  if (element) nodeRefs.current.set(key, element);
                  else nodeRefs.current.delete(key);
                }}
              >
                <p className="pv2-workflow-node__kind">{node.tag ?? KIND_LABEL[node.kind]}</p>
                <p className="pv2-workflow-node__label">{node.label}</p>
                <p className="pv2-workflow-node__detail">{node.detail}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </figure>
  );
}
