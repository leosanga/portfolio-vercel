// Authoring-time check for Project Catalog graphs: `bun scripts/project-catalog/check-graphs.ts`.
// It proves a graph is well formed for the shared renderer. It cannot prove that any
// workflow runs, that an API supports the design or that a business guarantee holds.
import { CATALOG_ENTRIES } from "../../src/content/project-catalog/catalog";
import { GRAPH_LOADERS } from "../../src/content/project-catalog/graphRegistry";
import {
  N8N_NODE_TYPES,
  type N8nNodeDefinition,
} from "../../src/content/project-catalog/n8nNodeTypes";
import type {
  AssemblyBeat,
  CatalogGraph,
  ConnectionKind,
  FlowBeat,
  GraphNode,
  PortRef,
} from "../../src/content/project-catalog/types";

type Side = "inputs" | "outputs";

/** A beat's groups run together, so every reference in them is checked like a single one. */
const flatten = (refs: readonly (string | readonly string[])[]): string[] => refs.flat();

function definitionOf(node: GraphNode): N8nNodeDefinition | undefined {
  return (N8N_NODE_TYPES as Record<string, N8nNodeDefinition>)[node.type];
}

const MAX_ALTERNATIVES = 2;
const MIN_INPUTS = 2;
const MAX_INPUTS = 10;

function portCount(node: GraphNode, side: Side, kind: ConnectionKind): number {
  const definition = definitionOf(node);
  const count = (definition?.[side] ?? []).filter((port) => port === kind).length;
  if (side === "outputs" && kind === "main" && node.errorOutput) return count + 1;
  if (side === "inputs" && kind === "main" && definition?.variableInputs) {
    return node.inputCount ?? count;
  }
  return count;
}

const samePorts = (a: N8nNodeDefinition, b: N8nNodeDefinition) =>
  a.inputs.join() === b.inputs.join() && a.outputs.join() === b.outputs.join();

function alternativeProblems(node: GraphNode): string[] {
  const { id, alternatives = [], display } = node;
  const problems: string[] = [];
  if (alternatives.length > MAX_ALTERNATIVES) problems.push(`${id} has more than two alternatives`);
  const own = definitionOf(node);
  const taken = new Set<string>([node.type]);
  for (const type of alternatives) {
    const definition = (N8N_NODE_TYPES as Record<string, N8nNodeDefinition>)[type];
    if (!definition) problems.push(`alternative ${type} on ${id} is not a pinned native type`);
    else if (own && !samePorts(own, definition)) {
      problems.push(`alternative ${type} on ${id} has different ports`);
    }
    if (taken.has(type)) problems.push(`alternative ${type} on ${id} duplicates another type`);
    taken.add(type);
  }
  if (display?.tools && display.tools.length !== alternatives.length + 1) {
    problems.push(`${id} names ${display.tools.length} tools for ${alternatives.length + 1} types`);
  }
  return problems;
}

function inputCountProblems(node: GraphNode): string[] {
  const definition = definitionOf(node);
  if (node.inputCount === undefined || !definition) return [];
  if (!definition.variableInputs) return [`inputCount on ${node.id} needs a variable-input type`];
  const valid =
    Number.isInteger(node.inputCount) &&
    node.inputCount >= MIN_INPUTS &&
    node.inputCount <= MAX_INPUTS;
  return valid ? [] : [`inputCount on ${node.id} must be ${MIN_INPUTS} to ${MAX_INPUTS}`];
}

function unconnectedInputProblems(graph: CatalogGraph): string[] {
  const problems: string[] = [];
  for (const node of graph.nodes) {
    if (!definitionOf(node)?.variableInputs || inputCountProblems(node).length) continue;
    const connected = new Set(
      graph.edges.filter((e) => e.kind === "main" && e.to.node === node.id).map((e) => e.to.index),
    );
    for (let index = 0; index < portCount(node, "inputs", "main"); index++) {
      if (!connected.has(index)) problems.push(`input ${index} on ${node.id} is not connected`);
    }
  }
  return problems;
}

// Variable-input nodes (Merge) reachable along main edges, the start node included.
function mergesReachableFrom(graph: CatalogGraph, start: string): Set<string> {
  const reached = new Set<string>();
  const pending = [start];
  while (pending.length) {
    const id = pending.pop()!;
    if (reached.has(id)) continue;
    reached.add(id);
    for (const edge of graph.edges) {
      if (edge.kind === "main" && edge.from.node === id) pending.push(edge.to.node);
    }
  }
  const merges = graph.nodes.filter((node) => definitionOf(node)?.variableInputs);
  return new Set(merges.map((node) => node.id).filter((id) => reached.has(id)));
}

// Parallel branches must meet again at one Merge, or a later step runs once per branch.
function fanOutProblems(graph: CatalogGraph): string[] {
  const targets = new Map<string, string[]>();
  for (const edge of graph.edges.filter((e) => e.kind === "main")) {
    const key = `${edge.from.node} output ${edge.from.index}`;
    targets.set(key, [...(targets.get(key) ?? []), edge.to.node]);
  }
  return [...targets]
    .filter(([, to]) => to.length > 1)
    .filter(([, to]) => {
      const reachable = to.map((id) => mergesReachableFrom(graph, id));
      return ![...reachable[0]!].some((merge) => reachable.every((set) => set.has(merge)));
    })
    .map(([key]) => `fan-out from ${key} does not rejoin at one Merge`);
}

export function graphProblems(graph: CatalogGraph, phaseIds: readonly string[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const { id } of [...graph.nodes, ...graph.edges, ...graph.annotations]) {
    if (seen.has(id)) problems.push(`duplicate id ${id}`);
    seen.add(id);
  }

  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  for (const node of graph.nodes) {
    const definition = definitionOf(node);
    if (!definition) problems.push(`unknown type ${node.type} on ${node.id}`);
    else if (definition.version !== node.version) {
      problems.push(`${node.id} version ${node.version} differs from pinned ${definition.version}`);
    }
    problems.push(...alternativeProblems(node), ...inputCountProblems(node));
  }

  const checkPort = (ref: PortRef, side: Side, kind: ConnectionKind, owner: string) => {
    const node = nodes.get(ref.node);
    if (!node) {
      problems.push(`${owner} references missing node ${ref.node}`);
      return;
    }
    if (!definitionOf(node)) return;
    if (!Number.isInteger(ref.index) || ref.index < 0 || ref.index >= portCount(node, side, kind)) {
      problems.push(
        `${owner} uses illegal ${kind} ${side.slice(0, -1)} ${ref.index} on ${ref.node}`,
      );
    }
  };

  const connectedOutputs = new Set<string>();
  for (const edge of graph.edges) {
    checkPort(edge.from, "outputs", edge.kind, edge.id);
    checkPort(edge.to, "inputs", edge.kind, edge.id);
    if (edge.kind === "main") connectedOutputs.add(`${edge.from.node}:${edge.from.index}`);
  }
  problems.push(...unconnectedInputProblems(graph), ...fanOutProblems(graph));
  for (const annotation of graph.annotations) {
    checkPort(annotation.at, "outputs", "main", annotation.id);
    if (connectedOutputs.has(`${annotation.at.node}:${annotation.at.index}`)) {
      problems.push(`${annotation.id} sits on a connected output`);
    }
  }

  const phases = new Set(phaseIds);
  const graphPhaseIds = graph.phases.map((phase) => phase.id);
  if (graphPhaseIds.length !== phases.size || graphPhaseIds.some((id) => !phases.has(id))) {
    problems.push(`graph phases [${graphPhaseIds}] do not match summary phases [${phaseIds}]`);
  }
  for (const phase of graph.phases) {
    for (const id of phase.nodes) {
      if (!nodes.has(id)) problems.push(`phase ${phase.id} references missing node ${id}`);
    }
  }

  const edges = new Map(graph.edges.map((edge) => [edge.id, edge]));
  const { presentation } = graph;
  const beats: readonly (FlowBeat | AssemblyBeat)[] = presentation.beats;
  beats.forEach((beat, index) => {
    const where = `beat ${index + 1}`;
    if (!(beat.durationMs > 0)) problems.push(`${where} needs a positive duration`);
    for (const id of beat.phases) {
      if (!phases.has(id)) problems.push(`${where} references unknown phase ${id}`);
    }
    for (const id of flatten(beat.nodes)) {
      const node = nodes.get(id);
      if (!node) problems.push(`${where} references missing node ${id}`);
      // Configuration (such as a chat model) is never shown as executed work.
      else if (
        presentation.kind === "flow" &&
        definitionOf(node) &&
        portCount(node, "inputs", "main") + portCount(node, "outputs", "main") === 0
      ) {
        problems.push(`${where} emphasizes configuration node ${id} as execution`);
      }
    }
    if (!("edges" in beat)) return;
    for (const id of flatten(beat.edges)) {
      const edge = edges.get(id);
      if (!edge) problems.push(`${where} references missing edge ${id}`);
      else if (edge.kind !== "main")
        problems.push(`${where} sends a signal along non-execution edge ${id}`);
    }
  });
  if (presentation.kind === "flow") {
    if (presentation.openingMs < 0) problems.push("opening needs a duration of zero or more");
    if (!graph.annotations.some((annotation) => annotation.id === presentation.ending)) {
      problems.push(`ending ${presentation.ending} is not an annotation`);
    }
  }
  return problems;
}

// Internal semantic fixtures: they show the contract is not tied to the first
// project's sequential five-phase story. Never published or counted as entries.
const main = (id: string, from: string, output: number, to: string, input = 0) => ({
  id,
  kind: "main" as const,
  from: { node: from, index: output },
  to: { node: to, index: input },
  path: "M0 0",
});
const beat = (phases: string[], nodes: FlowBeat["nodes"], edges: FlowBeat["edges"]): FlowBeat => ({
  durationMs: 1000,
  phases,
  nodes,
  edges,
});
const THREE = ["P1", "P2", "P3"];
const BASE: CatalogGraph = {
  entryId: "fixture",
  nodes: [
    { id: "T", label: "Trigger", type: "n8n-nodes-base.webhook", version: 2.1, x: 0, y: 0 },
    { id: "A", label: "Check", type: "n8n-nodes-base.code", version: 2, x: 0, y: 0 },
    { id: "B", label: "Branch", type: "n8n-nodes-base.if", version: 2.2, x: 0, y: 0 },
    { id: "C", label: "Save", type: "n8n-nodes-base.postgres", version: 2.6, x: 0, y: 0 },
    {
      id: "D",
      label: "Draft",
      type: "@n8n/n8n-nodes-langchain.chainLlm",
      version: 1.7,
      x: 0,
      y: 0,
      errorOutput: true,
    },
    {
      id: "M",
      label: "Model",
      type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      version: 1.2,
      x: 0,
      y: 0,
    },
  ],
  edges: [
    main("e1", "T", 0, "A"),
    main("e2", "A", 0, "B"),
    main("e3", "B", 0, "C"),
    main("e4", "B", 1, "D"),
    {
      id: "m1",
      kind: "ai_languageModel",
      from: { node: "M", index: 0 },
      to: { node: "D", index: 0 },
      path: "M0 0",
    },
  ],
  annotations: [
    { id: "a1", text: "Saved", at: { node: "C", index: 0 } },
    { id: "a2", text: "Drafted", at: { node: "D", index: 0 } },
  ],
  phases: [
    { id: "P1", nodes: ["T", "A"] },
    { id: "P2", nodes: ["B"] },
    { id: "P3", nodes: ["C", "D"] },
  ],
  presentation: {
    kind: "flow",
    openingMs: 0,
    beats: [
      beat(["P1"], ["T", "A"], ["e1"]),
      beat(["P2"], ["B"], ["e2"]),
      beat(["P3"], ["C"], ["e3"]),
    ],
    ending: "a1",
  },
};
const variant = (changes: Partial<CatalogGraph>): CatalogGraph => ({ ...BASE, ...changes });
const flow = (beats: FlowBeat[], ending = "a1"): CatalogGraph["presentation"] => ({
  kind: "flow",
  openingMs: 0,
  beats,
  ending,
});

// A parallel read: A fans out to a CRM and a database read that rejoin at one Merge.
const PARALLEL: CatalogGraph = {
  entryId: "fixture",
  nodes: [
    { id: "T", label: "Trigger", type: "n8n-nodes-base.webhook", version: 2.1, x: 0, y: 0 },
    { id: "A", label: "Check", type: "n8n-nodes-base.code", version: 2, x: 0, y: 0 },
    {
      id: "H",
      label: "Get deal",
      type: "n8n-nodes-base.hubspot",
      version: 2.2,
      x: 0,
      y: 0,
      alternatives: ["n8n-nodes-base.salesforce", "n8n-nodes-base.highLevel"],
      display: { category: "CRM", tools: ["HubSpot", "Salesforce", "GHL"] },
    },
    {
      id: "C",
      label: "Get history",
      type: "n8n-nodes-base.postgres",
      version: 2.6,
      x: 0,
      y: 0,
      display: { category: "SQL database" },
    },
    {
      id: "G",
      label: "Combine",
      type: "n8n-nodes-base.merge",
      version: 3.2,
      x: 0,
      y: 0,
      inputCount: 2,
    },
    { id: "S", label: "Save", type: "n8n-nodes-base.postgres", version: 2.6, x: 0, y: 0 },
  ],
  edges: [
    main("e1", "T", 0, "A"),
    main("e2", "A", 0, "H"),
    main("e3", "A", 0, "C"),
    main("e4", "H", 0, "G"),
    main("e5", "C", 0, "G", 1),
    main("e6", "G", 0, "S"),
  ],
  annotations: [{ id: "a1", text: "Saved", at: { node: "S", index: 0 } }],
  phases: [
    { id: "P1", nodes: ["T", "A"] },
    { id: "P2", nodes: ["H", "C", "G"] },
    { id: "P3", nodes: ["S"] },
  ],
  presentation: {
    kind: "flow",
    openingMs: 0,
    beats: [
      beat(["P1"], ["T", "A"], ["e1"]),
      beat(
        ["P2"],
        [["H", "C"], "G"],
        [
          ["e2", "e3"],
          ["e4", "e5"],
        ],
      ),
      beat(["P3"], ["S"], ["e6"]),
    ],
    ending: "a1",
  },
};
const parallel = (changes: Partial<CatalogGraph>): CatalogGraph => ({ ...PARALLEL, ...changes });
const withNode = (id: string, changes: Partial<GraphNode>): CatalogGraph =>
  parallel({
    nodes: PARALLEL.nodes.map((node) => (node.id === id ? { ...node, ...changes } : node)),
  });
const withoutEdge = (id: string) => PARALLEL.edges.filter((edge) => edge.id !== id);

const VALID: [string, CatalogGraph, readonly string[]][] = [
  ["parallel read, Merge, alternatives and a grouped beat", PARALLEL, THREE],
  [
    "two business phases",
    variant({
      phases: [
        { id: "P1", nodes: ["T", "A"] },
        { id: "P2", nodes: ["B", "C", "D"] },
      ],
      presentation: flow([
        beat(["P1"], ["T", "A"], ["e1"]),
        beat(["P2"], ["B", "C"], ["e2", "e3"]),
      ]),
    }),
    ["P1", "P2"],
  ],
  [
    "P2 skipped",
    variant({
      presentation: flow([
        beat(["P1"], ["T", "A"], ["e1"]),
        beat(["P3"], ["B", "C"], ["e2", "e3"]),
      ]),
    }),
    THREE,
  ],
  [
    "P1 returns after P2",
    variant({
      presentation: flow([
        beat(["P1"], ["T", "A"], ["e1"]),
        beat(["P2"], ["B"], ["e2"]),
        beat(["P1"], ["A"], []),
      ]),
    }),
    THREE,
  ],
  [
    "concurrent P1 and P2",
    variant({
      presentation: flow([
        beat(["P1", "P2"], ["T", "A", "B"], ["e1", "e2"]),
        beat(["P3"], ["C"], ["e3"]),
      ]),
    }),
    THREE,
  ],
  [
    "selected output 1",
    variant({
      presentation: flow(
        [
          beat(["P1"], ["T", "A"], ["e1"]),
          beat(["P2"], ["B"], ["e2"]),
          beat(["P3"], ["D"], ["e4"]),
        ],
        "a2",
      ),
    }),
    THREE,
  ],
  [
    "architecture assembly with a shared node",
    variant({
      presentation: {
        kind: "assembly",
        beats: [
          { durationMs: 1200, phases: ["P1"], nodes: ["T", "A", "B"] },
          { durationMs: 1200, phases: ["P2", "P3"], nodes: ["B", "C", "D", "M"] },
        ],
      },
    }),
    THREE,
  ],
];

const INVALID: [string, CatalogGraph, string, (readonly string[])?][] = [
  [
    "duplicate id",
    variant({ nodes: [...BASE.nodes, { ...BASE.nodes[1]!, x: 1 }] }),
    "duplicate id A",
  ],
  [
    "unknown native type",
    variant({
      nodes: [
        ...BASE.nodes,
        { id: "S", label: "Slack", type: "n8n-nodes-base.slack", version: 2, x: 0, y: 0 },
      ],
    } as unknown as Partial<CatalogGraph>),
    "unknown type",
  ],
  [
    "missing endpoint",
    variant({ edges: [...BASE.edges, main("e5", "C", 0, "Z")] }),
    "missing node Z",
  ],
  [
    "illegal port",
    variant({ edges: [...BASE.edges, main("e5", "B", 2, "C")] }),
    "illegal main output 2 on B",
  ],
  [
    "version mismatch",
    variant({
      nodes: BASE.nodes.map((node) => (node.id === "C" ? { ...node, version: 2.5 } : node)),
    }),
    "differs from pinned",
  ],
  [
    "unknown phase",
    variant({ presentation: flow([beat(["P9"], ["T"], ["e1"])]) }),
    "unknown phase P9",
  ],
  [
    "signal on a configuration edge",
    variant({ presentation: flow([beat(["P3"], ["D"], ["m1"])]) }),
    "non-execution edge m1",
  ],
  [
    "configuration emphasized as execution",
    variant({ presentation: flow([beat(["P3"], ["M"], [])]) }),
    "configuration node M",
  ],
  [
    "annotation on a connected output",
    variant({
      annotations: [...BASE.annotations, { id: "a3", text: "Bad", at: { node: "A", index: 0 } }],
    }),
    "connected output",
  ],
  [
    "ending that is not an annotation",
    variant({ presentation: flow([beat(["P1"], ["T"], ["e1"])], "e3") }),
    "is not an annotation",
  ],
  ["phases differ from the summary", BASE, "do not match", ["P1", "P2"]],
  [
    "alternative that is not a native type",
    withNode("H", { alternatives: ["n8n-nodes-base.slack"] } as unknown as Partial<GraphNode>),
    "alternative n8n-nodes-base.slack on H is not a pinned native type",
  ],
  [
    "alternative with different ports",
    withNode("H", { alternatives: ["n8n-nodes-base.if"] }),
    "alternative n8n-nodes-base.if on H has different ports",
  ],
  [
    "three alternatives",
    withNode("H", {
      alternatives: [
        "n8n-nodes-base.salesforce",
        "n8n-nodes-base.highLevel",
        "n8n-nodes-base.microsoftSharePoint",
      ],
    }),
    "H has more than two alternatives",
  ],
  [
    "alternative repeated",
    withNode("H", { alternatives: ["n8n-nodes-base.salesforce", "n8n-nodes-base.salesforce"] }),
    "alternative n8n-nodes-base.salesforce on H duplicates another type",
  ],
  [
    "alternative equal to the node's own type",
    withNode("H", { alternatives: ["n8n-nodes-base.hubspot"] }),
    "alternative n8n-nodes-base.hubspot on H duplicates another type",
  ],
  [
    "fewer tools than types",
    withNode("H", { display: { category: "CRM", tools: ["HubSpot", "Salesforce"] } }),
    "H names 2 tools for 3 types",
  ],
  [
    "tools without alternatives",
    withNode("C", { display: { category: "SQL database", tools: ["Postgres", "MySQL"] } }),
    "C names 2 tools for 1 types",
  ],
  [
    "inputCount on a fixed-input type",
    withNode("A", { inputCount: 2 }),
    "inputCount on A needs a variable-input type",
  ],
  ["inputCount below 2", withNode("G", { inputCount: 1 }), "inputCount on G must be 2 to 10"],
  ["inputCount above 10", withNode("G", { inputCount: 11 }), "inputCount on G must be 2 to 10"],
  [
    "raised inputCount leaves an input unconnected",
    withNode("G", { inputCount: 3 }),
    "input 2 on G is not connected",
  ],
  [
    "default Merge input unconnected",
    parallel({ edges: withoutEdge("e5") }),
    "input 1 on G is not connected",
  ],
  [
    "fan-out that never rejoins",
    variant({ edges: [...BASE.edges, main("e5", "B", 0, "D")] }),
    "fan-out from B output 0 does not rejoin at one Merge",
  ],
  [
    "fan-out where one branch skips the Merge",
    parallel({ edges: [...withoutEdge("e5"), main("e7", "C", 0, "S")] }),
    "fan-out from A output 0 does not rejoin at one Merge",
  ],
  [
    "missing node inside a group",
    parallel({ presentation: flow([beat(["P2"], [["H", "Z"]], [])]) }),
    "missing node Z",
  ],
  [
    "missing edge inside a group",
    parallel({ presentation: flow([beat(["P2"], ["H"], [["e2", "e9"]])]) }),
    "missing edge e9",
  ],
];

let failed = false;
const fail = (message: string) => {
  failed = true;
  console.error(`FAIL ${message}`);
};

for (const [name, graph, ids] of VALID) {
  const problems = graphProblems(graph, ids);
  if (problems.length) fail(`valid fixture "${name}": ${problems.join("; ")}`);
}
for (const [name, graph, expected, ids = THREE] of INVALID) {
  const problems = graphProblems(graph, ids);
  if (!problems.some((problem) => problem.includes(expected))) {
    fail(
      `invalid fixture "${name}" was not rejected with "${expected}" (got: ${problems.join("; ") || "nothing"})`,
    );
  }
}
console.log(`fixtures: ${VALID.length} valid accepted, ${INVALID.length} invalid rejected`);

for (const entry of CATALOG_ENTRIES) {
  const load = GRAPH_LOADERS[entry.id];
  if (!load) {
    console.log(`${entry.id}: no graph registered yet`);
    continue;
  }
  const graph = await load();
  const problems =
    graph.entryId === entry.id
      ? graphProblems(
          graph,
          entry.phases.map((phase) => phase.id),
        )
      : [`graph belongs to ${graph.entryId}`];
  if (problems.length) fail(`${entry.id}: ${problems.join("; ")}`);
  else console.log(`${entry.id}: graph valid`);
}
for (const id of Object.keys(GRAPH_LOADERS)) {
  if (!CATALOG_ENTRIES.some((entry) => entry.id === id))
    fail(`graph ${id} has no published summary`);
}

process.exit(failed ? 1 : 0);
