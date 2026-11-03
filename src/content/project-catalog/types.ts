import type { N8nNodeType } from "./n8nNodeTypes";

/** Approved taxonomy, in display order. Filters show only categories that have entries. */
export const CATALOG_CATEGORY_LABELS = {
  "sales-leads": "Sales & Leads",
  marketing: "Marketing",
  "customer-support": "Customer Support",
  operations: "Operations",
  finance: "Finance",
  reporting: "Reporting",
} as const;

export type CatalogCategoryId = keyof typeof CATALOG_CATEGORY_LABELS;

export interface CatalogPhase {
  id: string;
  title: string;
  description: string;
}

/** n8n connection kinds the catalog draws. Only `main` carries execution. */
export type ConnectionKind = "main" | "ai_languageModel" | "ai_tool" | "ai_embedding";

/** A port as n8n numbers it: the index among that node's ports of the same kind. */
export interface PortRef {
  node: string;
  index: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: N8nNodeType;
  /** Pinned native version; validation rejects a mismatch with the type table. */
  version: number;
  /** Top-left of the native body, in canvas units. */
  x: number;
  y: number;
  /** `onError: continueErrorOutput` adds n8n's error output after the normal ones. */
  errorOutput?: boolean;
  /** Interchangeable tools with this node's ports, at most two. `type` is the representative. */
  alternatives?: readonly N8nNodeType[];
  /** The type line shown instead of the native type name, and the tool names under it. */
  display?: { category: string; tools?: readonly string[] };
  /** Number of Inputs on a variable-input node such as Merge: 2 to 10. */
  inputCount?: number;
}

export interface GraphEdge {
  id: string;
  kind: ConnectionKind;
  from: PortRef;
  to: PortRef;
  /** Authored SVG route in canvas units. Explicit layout, never auto-routed. */
  path: string;
}

/** Outcome text beside an unused main output. Not a node and never executed. */
export interface GraphAnnotation {
  id: string;
  text: string;
  at: PortRef;
}

/** Nodes a public phase covers. Many-to-many: a node may belong to several phases. */
export interface GraphPhase {
  /** Matches a `CatalogPhase.id` in the entry's summary. */
  id: string;
  nodes: readonly string[];
}

export interface FlowBeat {
  durationMs: number;
  /** Several phases form an authored concurrent group; a later beat may return to a phase. */
  phases: readonly string[];
  /** An inner array is a group that works at the same time; groups run in order. */
  nodes: readonly (string | readonly string[])[];
  /** Traversed in order, a group together. Execution (`main`) edges only. */
  edges: readonly (string | readonly string[])[];
}

export interface AssemblyBeat {
  durationMs: number;
  phases: readonly string[];
  nodes: readonly string[];
}

/** One authored presentation. Durations are storytelling time, not workflow runtime. */
export type GraphPresentation =
  | { kind: "flow"; openingMs: number; beats: readonly FlowBeat[]; ending: string }
  | { kind: "assembly"; beats: readonly AssemblyBeat[] };

/** Explanatory n8n graph for one entry. Loaded on demand, never imported by the catalog list. */
export interface N8nGraph {
  platform?: "n8n";
  entryId: string;
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  annotations: readonly GraphAnnotation[];
  phases: readonly GraphPhase[];
  presentation: GraphPresentation;
}

/** Make apps the catalog draws: one fill and one functional glyph each, no logos. */
export type MakeApp =
  | "tools"
  | "hubspot"
  | "googleAds"
  | "http"
  | "flowControl"
  | "makeCode"
  | "slack"
  | "zendesk"
  | "googleSheets"
  | "makeAi"
  | "errorHandler";

/** A Scenario Builder module or error handler. Field names match GraphNode where the engine reads them. */
export interface MakeModule {
  id: string;
  number: number;
  /** The renamed module's business label, wrapped into lines. */
  label: readonly string[];
  app: MakeApp;
  /** "App · Module" on one line, or the app then the module. */
  appLines: readonly string[];
  role: "module" | "handler";
  /** The clock badge of a scheduled scenario's first module. */
  schedule?: true;
  /** An aggregator's source module; Make draws the band between them. */
  aggregates?: string;
  /** Centre, in canvas units. */
  x: number;
  y: number;
}

/** A dotted bridge (`main`) or an error handler route (`error`). */
export interface MakeLink {
  id: string;
  kind: "main" | "error";
  from: PortRef;
  to: PortRef;
  /** A filter's label on a main link; Make draws a filter on the link, not as a module. */
  filter?: string;
  path: string;
}

/** The label plate of a filtered link, above the link. */
export interface MakeFilterPlate {
  link: string;
  text: string;
  x: number;
  y: number;
  width: number;
}

/** The grey band Make draws behind an aggregator's span. */
export interface MakeAggregatorBand {
  aggregator: string;
  source: string;
  x: number;
  y: number;
  width: number;
}

/** A Make scenario without a router. `presentation.ending` names a module ID. */
export interface MakeGraph {
  platform: "make";
  entryId: string;
  nodes: readonly MakeModule[];
  edges: readonly MakeLink[];
  plates: readonly MakeFilterPlate[];
  bands: readonly MakeAggregatorBand[];
  annotations: readonly GraphAnnotation[];
  phases: readonly GraphPhase[];
  presentation: GraphPresentation;
  bounds: readonly [number, number, number, number];
}

/** Explanatory graph for one entry. Loaded on demand, never imported by the catalog list. */
export type CatalogGraph = N8nGraph | MakeGraph;

/** Public, lightweight entry copy. Graph and controller code never import through here. */
export interface CatalogEntrySummary {
  id: string;
  title: string;
  purpose: string;
  category: CatalogCategoryId;
  toolsLine: string;
  problem: string;
  built: string;
  hardPart: string;
  phases: readonly CatalogPhase[];
}
