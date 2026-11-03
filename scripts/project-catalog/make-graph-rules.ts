// Make graph rules for check-graphs.ts (execution.md Part C). They prove a Make graph is a
// well-formed chain for MakeDiagram; they cannot prove that any scenario runs.
import type { SpecimenLayout } from "../../src/components/project-catalog/workflow/specimenLayout";
import {
  MAKE_APP_NAMES,
  MAKE_PORT_OUTER,
  MAKE_RADIUS,
  layoutMakeScenario,
  makeHalfWidth,
  makeLabelDepth,
  type MakeModuleInput,
} from "../../src/content/project-catalog/makeLayout";
import type { MakeGraph, MakeLink, MakeModule } from "../../src/content/project-catalog/types";

const LABEL_LINE_MAX = 22;
const LABEL_LINES_MAX = 4;
const APP_LINE_MAX = 32;
const APP_LINES_MAX = 2;
const FILTER_MAX = 32;
/** The 370px phone canvas at the 85% opening scale, in canvas units (WorkflowCanvas). */
const PHONE_WINDOW = [419, 435] as const;

type Layout = Pick<SpecimenLayout, "bounds" | "readable">;
const flat = (refs: readonly (string | readonly string[])[]): string[] => refs.flat();

function chainProblems(graph: MakeGraph, modules: MakeModule[]): string[] {
  const problems: string[] = [];
  const ids = [...graph.nodes.map((node) => node.id), ...graph.edges.map((edge) => edge.id)];
  for (const id of new Set(ids.filter((id, index) => ids.indexOf(id) !== index)))
    problems.push(`duplicate id ${id}`);
  const isModule = new Set(modules.map((node) => node.id));
  const main = graph.edges.filter((edge) => edge.kind === "main");
  for (const edge of main) {
    if (!isModule.has(edge.from.node) || !isModule.has(edge.to.node))
      problems.push(`main link ${edge.id} must join two modules`);
  }
  modules.forEach((node, index) => {
    const incoming = main.filter((edge) => edge.to.node === node.id).length;
    const outgoing = main.filter((edge) => edge.from.node === node.id).length;
    if (incoming !== (index === 0 ? 0 : 1)) problems.push(`${node.id} breaks the chain on input`);
    if (outgoing !== (index === modules.length - 1 ? 0 : 1))
      problems.push(`${node.id} breaks the chain on output`);
  });
  graph.nodes.forEach((node, index) => {
    if (node.number !== index + 1) problems.push(`${node.id} is numbered ${node.number}`);
  });
  const firstHandler = graph.nodes.findIndex((node) => node.role === "handler");
  if (firstHandler !== -1 && firstHandler < modules.length) {
    problems.push("handlers must follow every module");
  }
  return problems;
}

function errorProblems(graph: MakeGraph, modules: MakeModule[]): string[] {
  const problems: string[] = [];
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const errors = graph.edges.filter((edge) => edge.kind === "error");
  for (const edge of errors) {
    if (byId.get(edge.from.node)?.role !== "module" || byId.get(edge.to.node)?.role !== "handler")
      problems.push(`error link ${edge.id} must run from a module to a handler`);
    if (edge.filter) problems.push(`error link ${edge.id} carries a filter`);
  }
  for (const node of graph.nodes.filter((item) => item.role === "handler")) {
    if (errors.filter((edge) => edge.to.node === node.id).length !== 1)
      problems.push(`handler ${node.id} needs exactly one incoming error link`);
    if (graph.edges.some((edge) => edge.from.node === node.id))
      problems.push(`handler ${node.id} has an outgoing link`);
  }
  for (const node of modules) {
    if (errors.filter((edge) => edge.from.node === node.id).length > 1)
      problems.push(`${node.id} has more than one error link`);
  }
  return problems;
}

function moduleProblems(graph: MakeGraph, modules: MakeModule[]): string[] {
  const problems: string[] = [];
  const order = new Map(modules.map((node, index) => [node.id, index]));
  modules.forEach((node, index) => {
    if (node.schedule && index !== 0) problems.push(`schedule on ${node.id}, not the first module`);
    if (node.aggregates === undefined) return;
    if (!((order.get(node.aggregates) ?? Infinity) < index))
      problems.push(`${node.id} aggregates ${node.aggregates}, not an earlier module`);
    if (node.app !== "flowControl") problems.push(`aggregator ${node.id} must be Flow control`);
  });
  const exceeds = (lines: readonly string[], count: number, length: number) =>
    lines.length > count || lines.some((line) => line.length > length);
  for (const node of graph.nodes) {
    if (exceeds(node.label, LABEL_LINES_MAX, LABEL_LINE_MAX))
      problems.push(`${node.id} label exceeds ${LABEL_LINES_MAX} lines of ${LABEL_LINE_MAX}`);
    if (exceeds(node.appLines, APP_LINES_MAX, APP_LINE_MAX))
      problems.push(`${node.id} app label exceeds ${APP_LINES_MAX} lines of ${APP_LINE_MAX}`);
  }
  for (const edge of graph.edges) {
    if (edge.filter && edge.filter.length > FILTER_MAX)
      problems.push(`filter on ${edge.id} exceeds ${FILTER_MAX} characters`);
  }
  const bands = [...graph.bands].sort((a, b) => a.x - b.x);
  bands.slice(1).forEach((band, index) => {
    const before = bands[index]!;
    if (band.x < before.x + before.width)
      problems.push(`band ${band.aggregator} overlaps ${before.aggregator}`);
  });
  return problems;
}

function phaseProblems(graph: MakeGraph, phaseIds: readonly string[]): string[] {
  const problems: string[] = [];
  const known = new Set(graph.nodes.map((node) => node.id));
  if (graph.phases.map((phase) => phase.id).join() !== phaseIds.join())
    problems.push("graph phases differ from the summary's");
  for (const phase of graph.phases)
    for (const id of phase.nodes)
      if (!known.has(id)) problems.push(`${phase.id} names unknown node ${id}`);
  for (const node of graph.nodes)
    if (!graph.phases.some((phase) => phase.nodes.includes(node.id)))
      problems.push(`${node.id} is in no phase`);
  return problems;
}

function beatProblems(graph: MakeGraph, modules: MakeModule[]): string[] {
  const presentation = graph.presentation;
  if (presentation.kind !== "flow") return ["a Make presentation must be a flow"];
  const problems: string[] = [];
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  const edges = new Map(graph.edges.map((edge) => [edge.id, edge]));
  if (!(presentation.openingMs >= 0)) problems.push("openingMs must not be negative");
  for (const [index, beat] of presentation.beats.entries()) {
    const label = `beat ${index + 1}`;
    if (!(beat.durationMs > 0)) problems.push(`${label} needs a positive duration`);
    const phases = beat.phases.map((id) => graph.phases.find((phase) => phase.id === id));
    if (phases.some((phase) => !phase)) problems.push(`${label} names an unknown phase`);
    const ids = flat(beat.nodes);
    const links = flat(beat.edges).map((id) => edges.get(id));
    for (const id of ids) {
      if (!nodes.has(id)) problems.push(`${label} names unknown node ${id}`);
      else if (nodes.get(id)!.role === "handler") problems.push(`${label} names handler ${id}`);
      if (!phases.some((phase) => phase?.nodes.includes(id)))
        problems.push(`${label} node ${id} is outside its phases`);
    }
    if (links.some((link) => !link)) problems.push(`${label} names an unknown link`);
    if (links.some((link) => link?.kind === "error"))
      problems.push(`${label} traces an error link`);
    const offset = ids.length - links.length;
    if (offset < 0) problems.push(`${label} traces more links than nodes`);
    links.forEach((link, at) => {
      if (link && link.to.node !== ids[at + offset])
        problems.push(`${label} link ${link.id} breaks the pairing`);
    });
  }
  if (presentation.ending !== modules.at(-1)?.id)
    problems.push("the ending must be the last module");
  return problems;
}

/** Rebuilds the layout input from the graph, so any hand-edited geometry shows as a difference. */
function inputsOf(graph: MakeGraph, modules: MakeModule[]): MakeModuleInput[] {
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  return modules.map((node) => {
    const into = graph.edges.find((edge) => edge.kind === "main" && edge.to.node === node.id);
    const error = graph.edges.find((edge) => edge.kind === "error" && edge.from.node === node.id);
    const handler = error && byId.get(error.to.node);
    const [first, second] = node.appLines;
    return {
      id: node.id,
      label: node.label.join(" "),
      app: node.app,
      module: second ?? first!.slice(MAKE_APP_NAMES[node.app].length + 3),
      ...(node.schedule ? { schedule: true as const } : {}),
      ...(node.aggregates ? { aggregates: node.aggregates } : {}),
      ...(into?.filter ? { filter: into.filter } : {}),
      ...(handler ? { handler: { id: handler.id, label: handler.label.join(" ") } } : {}),
    };
  });
}

function layoutProblems(graph: MakeGraph, modules: MakeModule[], layout?: Layout): string[] {
  const problems: string[] = [];
  const fresh = layoutMakeScenario(inputsOf(graph, modules));
  const parts = ["nodes", "edges", "plates", "bands", "bounds"] as const;
  for (const part of parts) {
    if (JSON.stringify(graph[part]) !== JSON.stringify(fresh[part]))
      problems.push(`stored ${part} differ from a fresh makeLayout run`);
  }
  if (!layout) return [...problems, "registered graph has no specimen layout"];
  if (layout.bounds.join() !== graph.bounds.join())
    problems.push("layout bounds differ from the graph's");
  const first = modules[0];
  if (first) {
    const [x, y] = layout.readable;
    const [width, height] = PHONE_WINDOW;
    const reach = Math.max(makeHalfWidth(first), MAKE_PORT_OUTER);
    const across = x <= first.x - reach && x + width >= first.x + reach;
    const down = y <= first.y - MAKE_RADIUS && y + height >= first.y + makeLabelDepth(first);
    const inside = across && down;
    if (!inside) problems.push("readable window does not hold the first module and its label");
  }
  return problems;
}

export function makeGraphProblems(
  graph: MakeGraph,
  phaseIds: readonly string[],
  layout?: Layout,
): string[] {
  const modules = graph.nodes.filter((node) => node.role === "module");
  return [
    ...chainProblems(graph, modules),
    ...errorProblems(graph, modules),
    ...moduleProblems(graph, modules),
    ...phaseProblems(graph, phaseIds),
    ...beatProblems(graph, modules),
    ...layoutProblems(graph, modules, layout),
  ];
}

// Fixtures: one valid graph, then one invalid variant per rule, each with the message it must raise.
const FIXTURE_LAYOUT = layoutMakeScenario([
  {
    id: "M01",
    label: "Set the week",
    app: "tools",
    module: "Set multiple variables",
    schedule: true,
  },
  {
    id: "M02",
    label: "Get the tickets",
    app: "http",
    module: "Make a request",
    handler: { id: "H02", label: "If the read fails" },
  },
  {
    id: "M03",
    label: "Collect the tickets",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M02",
  },
  {
    id: "M04",
    label: "Post the report",
    app: "slack",
    module: "Create a Message",
    filter: "Only new tickets",
  },
]);
export const MAKE_PHASES = ["P1", "P2"] as const;
export const MAKE_VALID: MakeGraph = {
  platform: "make",
  entryId: "make-fixture",
  ...FIXTURE_LAYOUT,
  annotations: [],
  phases: [
    { id: "P1", nodes: ["M01", "M02", "H02"] },
    { id: "P2", nodes: ["M03", "M04"] },
  ],
  presentation: {
    kind: "flow",
    openingMs: 640,
    beats: [
      { durationMs: 1000, phases: ["P1"], nodes: ["M01", "M02"], edges: ["L01"] },
      { durationMs: 1000, phases: ["P2"], nodes: ["M03", "M04"], edges: ["L02", "L03"] },
    ],
    ending: "M04",
  },
};
export const MAKE_VALID_LAYOUT: Layout = { bounds: MAKE_VALID.bounds, readable: [64, 266] };

const V = MAKE_VALID;
const node = (id: string, changes: Partial<MakeModule>): MakeGraph => ({
  ...V,
  nodes: V.nodes.map((item) => (item.id === id ? { ...item, ...changes } : item)),
});
const edge = (id: string, changes: Partial<MakeLink>): MakeGraph => ({
  ...V,
  edges: V.edges.map((item) => (item.id === id ? { ...item, ...changes } : item)),
});
type Flow = Extract<MakeGraph["presentation"], { kind: "flow" }>;
const FLOW = V.presentation as Flow;
const flow = (changes: Partial<Flow>): MakeGraph => ({
  ...V,
  presentation: { ...FLOW, ...changes },
});
/** Replaces the second beat's fields. */
const beats = (second: Partial<Flow["beats"][number]>): MakeGraph =>
  flow({ beats: [FLOW.beats[0]!, { ...FLOW.beats[1]!, ...second }] });
const port = (id: string) => ({ node: id, index: 0 });
const link = (id: string, kind: MakeLink["kind"], from: string, to: string): MakeLink => ({
  id,
  kind,
  from: port(from),
  to: port(to),
  path: "M0 0",
});
const withEdges = (...extra: MakeLink[]): MakeGraph => ({ ...V, edges: [...V.edges, ...extra] });
const without = (id: string): MakeGraph => ({
  ...V,
  edges: V.edges.filter((item) => item.id !== id),
});
const h05: MakeModule = { ...V.nodes.find((item) => item.id === "H02")!, id: "H05", number: 6 };
const twoRoutes: MakeGraph = {
  ...withEdges(link("E05", "error", "M02", "H05")),
  nodes: [...V.nodes, h05],
};
const BAND = V.bands[0]!;
const overlapping: MakeGraph = {
  ...V,
  bands: [BAND, { ...BAND, aggregator: "M04", x: BAND.x + 10 }],
};
const unphased: MakeGraph = {
  ...V,
  phases: [{ id: "P1", nodes: ["M01", "M02"] }, V.phases[1]!],
};
const movedPlate: MakeGraph = {
  ...V,
  plates: V.plates.map((plate) => ({ ...plate, x: plate.x + 1 })),
};
const handlerBeat = flow({ beats: [{ ...FLOW.beats[0]!, nodes: ["M01", "M02", "H02"] }] });
const LONG_FILTER = "Only the tickets that arrived last week";
const LONG_APP = "Tools · Set multiple variables at once";

export const MAKE_INVALID: [string, MakeGraph, string, Layout?][] = [
  ["duplicate id", { ...V, nodes: [...V.nodes, V.nodes[0]!] }, "duplicate id M01"],
  ["wrong number", node("M02", { number: 7 }), "M02 is numbered 7"],
  ["link to a handler", edge("L03", { to: port("H02") }), "must join two modules"],
  ["broken chain", without("L02"), "M03 breaks the chain on input"],
  ["fan-out", withEdges(link("L09", "main", "M01", "M03")), "M01 breaks the chain on output"],
  ["error link to a module", edge("E02", { to: port("M03") }), "from a module to a handler"],
  ["handler without its route", without("E02"), "handler H02 needs exactly one"],
  ["handler output", withEdges(link("E09", "error", "H02", "H02")), "has an outgoing link"],
  ["two error links", twoRoutes, "M02 has more than one error link"],
  ["filter on an error link", edge("E02", { filter: "Only some" }), "E02 carries a filter"],
  ["long filter", edge("L03", { filter: LONG_FILTER }), "exceeds 32 characters"],
  ["schedule on a later module", node("M02", { schedule: true }), "schedule on M02"],
  ["aggregates a later module", node("M03", { aggregates: "M04" }), "not an earlier module"],
  ["aggregator outside Flow control", node("M03", { app: "http" }), "must be Flow control"],
  ["overlapping bands", overlapping, "overlaps"],
  ["long label line", node("M01", { label: ["Set the week and the four"] }), "M01 label exceeds"],
  ["five label lines", node("M01", { label: ["a", "b", "c", "d", "e"] }), "M01 label exceeds"],
  ["long app line", node("M01", { appLines: [LONG_APP] }), "M01 app label exceeds"],
  ["node in no phase", unphased, "H02 is in no phase"],
  ["phases unlike the summary", { ...V, phases: [V.phases[0]!] }, "differ from the summary"],
  ["unknown beat node", beats({ nodes: ["M03", "M09"] }), "names unknown node M09"],
  ["node outside its beat", beats({ nodes: ["M02", "M04"], edges: ["L03"] }), "M02 is outside"],
  ["unknown beat link", beats({ edges: ["L02", "L09"] }), "names an unknown link"],
  ["unknown beat phase", beats({ phases: ["P9"] }), "names an unknown phase"],
  ["zero duration", beats({ durationMs: 0 }), "needs a positive duration"],
  ["negative opening", flow({ openingMs: -1 }), "must not be negative"],
  ["assembly", { ...V, presentation: { kind: "assembly", beats: [] } }, "must be a flow"],
  ["links out of pairing", beats({ edges: ["L03", "L02"] }), "breaks the pairing"],
  ["more links than nodes", beats({ nodes: ["M04"] }), "more links than nodes"],
  ["traced error link", beats({ edges: ["E02", "L03"] }), "traces an error link"],
  ["handler in a beat", handlerBeat, "names handler H02"],
  ["early ending", flow({ ending: "M03" }), "the ending must be the last module"],
  ["hand-moved module", node("M02", { x: V.nodes[1]!.x + 1 }), "stored nodes differ"],
  ["hand-moved plate", movedPlate, "stored plates differ"],
  ["layout bounds", V, "layout bounds differ", { ...MAKE_VALID_LAYOUT, bounds: [0, 0, 1, 1] }],
  ["phone window", V, "readable window", { ...MAKE_VALID_LAYOUT, readable: [600, 266] }],
];
