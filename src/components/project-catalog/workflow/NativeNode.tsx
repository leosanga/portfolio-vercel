import {
  Clock,
  CodeXml,
  ContactRound,
  Database,
  FileText,
  Folder,
  GitBranch,
  Link,
  Mail,
  Merge,
  MessageSquare,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { N8N_NODE_TYPES, type N8nNodeType } from "@/content/project-catalog/n8nNodeTypes";
import type { GraphNode } from "@/content/project-catalog/types";
import type { ItemState } from "./presentation";

/** Lucide 0.575 functional icons; licenses retained by the installed dependency and specimen source record. */
const GLYPHS: Record<N8nNodeType, { icon: LucideIcon; name: string; color?: string }> = {
  "n8n-nodes-base.webhook": { icon: Webhook, name: "Webhook", color: "webhook" },
  "n8n-nodes-base.scheduleTrigger": { icon: Clock, name: "Schedule Trigger" },
  "n8n-nodes-base.gmailTrigger": { icon: Mail, name: "Gmail Trigger" },
  "n8n-nodes-base.microsoftOutlookTrigger": { icon: Mail, name: "Microsoft Outlook Trigger" },
  "n8n-nodes-base.gmail": { icon: Mail, name: "Gmail" },
  "n8n-nodes-base.microsoftOutlook": { icon: Mail, name: "Microsoft Outlook" },
  "n8n-nodes-base.code": { icon: CodeXml, name: "Code", color: "code" },
  "n8n-nodes-base.postgres": { icon: Database, name: "Postgres", color: "database" },
  "n8n-nodes-base.if": { icon: GitBranch, name: "If", color: "if" },
  "n8n-nodes-base.hubspot": { icon: ContactRound, name: "HubSpot" },
  "n8n-nodes-base.salesforce": { icon: ContactRound, name: "Salesforce" },
  "n8n-nodes-base.highLevel": { icon: ContactRound, name: "GHL" },
  "n8n-nodes-base.googleDrive": { icon: Folder, name: "Google Drive" },
  "n8n-nodes-base.microsoftSharePoint": { icon: Folder, name: "Microsoft SharePoint" },
  "n8n-nodes-base.extractFromFile": { icon: FileText, name: "Extract from File" },
  "n8n-nodes-base.merge": { icon: Merge, name: "Merge" },
  "@n8n/n8n-nodes-langchain.chainLlm": { icon: Link, name: "Basic LLM Chain" },
  "@n8n/n8n-nodes-langchain.lmChatOpenAi": { icon: MessageSquare, name: "Chat model" },
};

export function NativeNode({
  node,
  state,
  lines,
  ending,
}: {
  node: GraphNode;
  state: ItemState;
  lines?: readonly string[] | undefined;
  ending: boolean;
}) {
  const definition = N8N_NODE_TYPES[node.type];
  const glyph = GLYPHS[node.type];
  const Glyph = glyph.icon;
  const wide = definition.shape === "wide";
  const circle = definition.shape === "circle";
  const trigger = definition.shape === "trigger";
  const width = wide ? 256 : circle ? 80 : 96;
  const height = circle ? 80 : 96;
  const labels = lines ?? [node.label];
  const textX = wide ? 76 : width / 2;
  const labelY = wide ? 44 - (labels.length - 1) * 11 : height + 28;
  const typeY = labelY + 21 + (labels.length - 1) * 22;
  const inputs =
    "inputCount" in node && node.inputCount
      ? node.inputCount
      : definition.inputs.filter((kind) => kind === "main").length;
  const outputs =
    definition.outputs.filter((kind) => kind === "main").length + (node.errorOutput ? 1 : 0);
  const portY = (index: number, count: number) =>
    count === 1 ? 48 : count === 2 ? 32 + index * 32 : ((index + 1) * height) / (count + 1);
  return (
    <g
      className={`pc-canvas-node${state.active ? " is-active" : ""}${state.covered ? " is-covered" : ""}${ending ? " is-ending" : ""}`}
      data-node={node.id}
      transform={`translate(${node.x} ${node.y})`}
    >
      <title>{`${node.label}; ${node.type} v${node.version}${node.alternatives ? `; alternatives: ${node.alternatives.join(", ")}` : ""}`}</title>
      <g opacity={state.reveal} transform={`translate(0 ${(1 - state.reveal) * 10})`}>
        {circle ? (
          <circle className="pc-canvas-native-node" cx="40" cy="40" r="40" />
        ) : (
          <rect
            className="pc-canvas-native-node"
            width={width}
            height={height}
            rx={trigger ? 24 : 8}
          />
        )}
        <Glyph
          className={`pc-canvas-glyph ${glyph.color ? `pc-canvas-glyph--${glyph.color}` : ""}`}
          x={wide ? 20 : width / 2 - 20}
          y={height / 2 - 20}
          width="40"
          height="40"
          strokeWidth="1.8"
          aria-hidden="true"
        />
        {!trigger &&
          !circle &&
          Array.from({ length: inputs }, (_, index) => (
            <rect
              key={index}
              className="pc-canvas-port"
              x="-5"
              y={portY(index, inputs) - 5}
              width="10"
              height="10"
              rx="1"
            />
          ))}
        {circle ? (
          <path className="pc-canvas-port" d="M40 -5 L45 0 L40 5 L35 0 Z" />
        ) : (
          Array.from({ length: outputs }, (_, index) => (
            <g key={index}>
              <circle className="pc-canvas-port" cx={width} cy={portY(index, outputs)} r="5" />
              <text className="pc-canvas-port-label" x={width + 10} y={portY(index, outputs) - 9}>
                {node.type === "n8n-nodes-base.if"
                  ? index
                    ? "false · 1"
                    : "true · 0"
                  : node.errorOutput
                    ? index
                      ? "error · 1"
                      : "success · 0"
                    : node.type === "n8n-nodes-base.webhook"
                      ? "POST · 0"
                      : ""}
              </text>
            </g>
          ))
        )}
        {wide && (
          <>
            <path className="pc-canvas-port" d="M128 91 L133 96 L128 101 L123 96 Z" />
            <text className="pc-canvas-port-label" x="143" y="90">
              Model
            </text>
          </>
        )}
        <text
          className="pc-canvas-node-label"
          x={textX}
          y={labelY}
          textAnchor={wide ? "start" : "middle"}
        >
          {labels.map((label, index) => (
            <tspan key={index} x={textX} dy={index ? 22 : 0}>
              {label}
            </tspan>
          ))}
        </text>
        <text
          className="pc-canvas-node-type"
          x={textX}
          y={typeY}
          textAnchor={wide ? "start" : "middle"}
        >
          {node.display?.category ?? glyph.name}
        </text>
        {node.display?.tools && (
          <text
            className="pc-canvas-node-type"
            x={textX}
            y={typeY + 21}
            textAnchor={wide ? "start" : "middle"}
          >
            ({node.display.tools.join("/")})
          </text>
        )}
      </g>
    </g>
  );
}
