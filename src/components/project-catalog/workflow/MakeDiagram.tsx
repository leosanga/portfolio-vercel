import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  Clock,
  CodeXml,
  Contact,
  Funnel,
  Globe,
  Layers,
  LifeBuoy,
  Megaphone,
  MessagesSquare,
  Repeat,
  Sheet,
  StepForward,
  Tags,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { MakeApp, MakeGraph, MakeModule } from "@/content/project-catalog/types";
import {
  MAKE_APP_GAP,
  MAKE_APP_LINE,
  MAKE_BAND_HEIGHT,
  MAKE_LABEL_FIRST,
  MAKE_LABEL_LINE,
  MAKE_PLATE_HEIGHT,
  MAKE_PORT_DISTANCE,
  MAKE_PORT_OUTER,
  MAKE_RADIUS,
} from "@/content/project-catalog/makeLayout";
import type { PresentationState } from "./presentation";

/** Authored adaptations of each app's colour (execution.md Part A step 4); no logos.
 * `bridge` darkens a light bridge to 3:1 on Make's light field where the fill alone falls short. */
const APPS: Record<MakeApp, { fill: string; ink: string; glyph: LucideIcon; bridge?: string }> = {
  tools: { fill: "#9470b9", ink: "#fff", glyph: Wrench },
  hubspot: { fill: "#d9673f", ink: "#fff", glyph: Contact },
  googleAds: { fill: "#f2b230", ink: "#4a3700", glyph: Megaphone, bridge: "#a97d22" },
  http: { fill: "#4d82b9", ink: "#fff", glyph: Globe },
  flowControl: { fill: "#afcf73", ink: "#344825", glyph: Layers, bridge: "#7a9151" },
  makeCode: { fill: "#5b4fc4", ink: "#fff", glyph: CodeXml },
  slack: { fill: "#4a154b", ink: "#fff", glyph: MessagesSquare },
  zendesk: { fill: "#03363d", ink: "#fff", glyph: LifeBuoy },
  googleSheets: { fill: "#1e8e4f", ink: "#fff", glyph: Sheet },
  makeAi: { fill: "#7b3fd1", ink: "#fff", glyph: Tags },
  errorHandler: { fill: "#8a8a92", ink: "#8a8a92", glyph: StepForward },
};
/** The fixture's port: a semicircle from the port distance out to where links end. */
const PORT_RADIUS = MAKE_PORT_OUTER - MAKE_PORT_DISTANCE;
const PORT = `M${MAKE_PORT_DISTANCE}-${PORT_RADIUS}a${PORT_RADIUS} ${PORT_RADIUS} 0 0 1 0 ${2 * PORT_RADIUS}z`;
const NUMBER_SHIFT = -15;
const NUMBER_GAP = 8;

const glyphOf = (node: MakeModule) =>
  node.app === "flowControl" && !node.aggregates ? Repeat : APPS[node.app].glyph;

const angleOf = (from: MakeModule, to: MakeModule) =>
  (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;

/** Scenario Builder modules, bridges, error routes, filters and aggregator bands. */
export function MakeDiagram({
  graph,
  story,
  trace,
}: {
  graph: MakeGraph;
  story: PresentationState;
  trace: ReadonlySet<string>;
}) {
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const name = (id: string) => byId.get(id)!.label.join(" ");
  const firstLines = useRef(new Map<string, SVGTextElement>());
  const [widths, setWidths] = useState<Record<string, number>>({});
  useLayoutEffect(() => {
    // The number box follows the first label line, so it waits for that line's measured width.
    setWidths(
      Object.fromEntries(
        [...firstLines.current].map(([id, element]) => [id, element.getComputedTextLength()]),
      ),
    );
  }, [graph]);
  const ports = (node: MakeModule) =>
    graph.edges.flatMap((edge) => {
      if (edge.from.node === node.id) return [angleOf(node, byId.get(edge.to.node)!)];
      if (edge.to.node === node.id) return [angleOf(node, byId.get(edge.from.node)!)];
      return [];
    });

  return (
    <g className="pc-make">
      {graph.bands.map((band) => (
        <rect
          key={band.aggregator}
          className="pc-make-band"
          x={band.x}
          y={band.y}
          width={band.width}
          height={MAKE_BAND_HEIGHT}
          rx={MAKE_BAND_HEIGHT / 2}
          opacity={Math.min(story.nodes[band.source]!.reveal, story.nodes[band.aggregator]!.reveal)}
        />
      ))}
      {graph.edges.map((edge) => {
        const state = story.edges[edge.id]!;
        const title = <title>{`${name(edge.from.node)} to ${name(edge.to.node)}`}</title>;
        if (edge.kind === "error") {
          return (
            <g key={edge.id} className="pc-make-route" opacity={state.reveal}>
              {title}
              <path className="pc-make-route-ring" d={edge.path} />
              <path className="pc-make-route-hole" d={edge.path} />
            </g>
          );
        }
        const source = byId.get(edge.from.node)!;
        return (
          <path
            key={edge.id}
            className={`pc-make-link${state.covered ? " is-covered" : ""}`}
            style={
              { "--make-link": APPS[source.app].bridge ?? APPS[source.app].fill } as CSSProperties
            }
            d={edge.path}
            opacity={state.reveal}
          >
            {title}
          </path>
        );
      })}
      {[...trace].map((edgeId) => {
        const state = story.edges[edgeId]!;
        return (
          <path
            key={edgeId}
            className="pc-make-sweep"
            d={graph.edges.find((edge) => edge.id === edgeId)!.path}
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset={1 - state.sweep}
            opacity={state.sweep > 0 ? 1 : 0}
          />
        );
      })}
      {graph.plates.map((plate) => (
        <g
          key={plate.link}
          className="pc-make-plate"
          transform={`translate(${plate.x} ${plate.y})`}
          opacity={story.edges[plate.link]!.reveal}
        >
          <rect width={plate.width} height={MAKE_PLATE_HEIGHT} rx={MAKE_PLATE_HEIGHT / 2} />
          <Funnel x="12" y="7" width="18" height="18" strokeWidth="1.8" aria-hidden="true" />
          <text x="38" y="21">
            {plate.text}
          </text>
        </g>
      ))}
      {graph.nodes.map((node) => {
        const state = story.nodes[node.id]!;
        const app = APPS[node.app];
        const Glyph = glyphOf(node);
        const handler = node.role === "handler";
        const lastLabel = MAKE_LABEL_FIRST + (node.label.length - 1) * MAKE_LABEL_LINE;
        const width = widths[node.id];
        const emphasis =
          !handler && (state.active || story.ending === node.id)
            ? " is-active"
            : !handler && state.covered
              ? " is-covered"
              : "";
        return (
          <g
            key={node.id}
            data-module={node.id}
            className={`pc-make-module${handler ? " is-handler" : ""}${emphasis}`}
            style={{ "--make-fill": app.fill, "--make-glyph": app.ink } as CSSProperties}
            transform={`translate(${node.x} ${node.y + (1 - state.reveal) * 10})`}
            opacity={state.reveal}
          >
            {ports(node).map((angle, index) => (
              <path key={index} className="pc-make-port" transform={`rotate(${angle})`} d={PORT} />
            ))}
            <circle className="pc-make-ring" r={MAKE_RADIUS + 8} />
            <circle className="pc-make-body" r={MAKE_RADIUS} />
            <Glyph
              className="pc-make-glyph"
              x="-26"
              y="-26"
              width="52"
              height="52"
              strokeWidth="1.4"
              aria-hidden="true"
            />
            {node.schedule && (
              <g className="pc-make-badge">
                <circle cx="-51" cy="45" r="22" />
                <Clock x="-63" y="33" width="24" height="24" strokeWidth="2" aria-hidden="true" />
              </g>
            )}
            <text
              ref={(element) => {
                if (element) firstLines.current.set(node.id, element);
                else firstLines.current.delete(node.id);
              }}
              className="pc-make-name"
              x={NUMBER_SHIFT}
              y={MAKE_LABEL_FIRST}
              textAnchor="middle"
            >
              {node.label[0]}
            </text>
            {width !== undefined && (
              <g
                className="pc-make-number"
                transform={`translate(${NUMBER_SHIFT + width / 2 + NUMBER_GAP} ${MAKE_LABEL_FIRST - 16})`}
              >
                <rect width="22" height="22" rx="2" />
                <text x="11" y="16" textAnchor="middle">
                  {node.number}
                </text>
              </g>
            )}
            {node.label.slice(1).map((line, index) => (
              <text
                key={index}
                className="pc-make-name"
                y={MAKE_LABEL_FIRST + (index + 1) * MAKE_LABEL_LINE}
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
            {node.appLines.map((line, index) => (
              <text
                key={index}
                className="pc-make-action"
                y={lastLabel + MAKE_APP_GAP + index * MAKE_APP_LINE}
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </g>
  );
}
