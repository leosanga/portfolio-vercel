import type { MakeAggregatorBand, MakeApp, MakeFilterPlate, MakeLink, MakeModule } from "./types";

/** Geometry from Codex's Make fixture (templates/make/index.html), in canvas units. */
export const MAKE_RADIUS = 64;
export const MAKE_PORT_DISTANCE = 70;
export const MAKE_PORT_OUTER = 88;
export const MAKE_LABEL_FIRST = 99;
export const MAKE_LABEL_LINE = 22;
export const MAKE_APP_GAP = 24;
export const MAKE_APP_LINE = 18;
export const MAKE_PLATE_HEIGHT = 32;
export const MAKE_BAND_HEIGHT = 152;
const ROW_Y = 440;
const START_X = 200;
const SPACING = 300;
const HANDLER_SPACING = 500;
const PLATE_CLEARANCE = 200;
const PLATE_GAP = 14;
const PLATE_CHAR = 7.4;
const PLATE_PADDING = 50;
/** Error routes rise at about 29 degrees to a handler 600 right and 330 above its module;
 * at 550 a route passed 12 units from its own handler's first label line (review 2026-11-03). */
export const HANDLER_DX = 600;
export const HANDLER_DY = -330;
const LABEL_WRAP = 22;
const APP_WRAP = 32;
const LABEL_CHAR = 9.7;
const APP_CHAR = 7.4;
const NUMBER_BOX = 30;
const BADGE_REACH = 73;
const DESCENDER = 6;
const MARGIN = 32;

/** Make's own app names, shown with the module name under a renamed module. */
export const MAKE_APP_NAMES: Record<MakeApp, string> = {
  tools: "Tools",
  hubspot: "HubSpot CRM",
  googleAds: "Google Ads Campaign Management",
  http: "HTTP",
  flowControl: "Flow control",
  makeCode: "Make Code",
  slack: "Slack",
  zendesk: "Zendesk",
  googleSheets: "Google Sheets",
  makeAi: "Make AI Toolkit",
  errorHandler: "Error handler",
};

export interface MakeModuleInput {
  id: string;
  label: string;
  app: MakeApp;
  /** Make's module name, such as "Search for CRM Objects". */
  module: string;
  schedule?: true;
  aggregates?: string;
  /** The filter on the link into this module. */
  filter?: string;
  /** A Resume error handler on this module. */
  handler?: { id: string; label: string };
}

export interface MakeLayout {
  nodes: MakeModule[];
  edges: MakeLink[];
  plates: MakeFilterPlate[];
  bands: MakeAggregatorBand[];
  bounds: [number, number, number, number];
}

/** Greedy word wrap; a single word longer than the limit keeps its own line. */
export function wrapWords(text: string, limit: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines.at(-1);
    if (last !== undefined && last.length + 1 + word.length <= limit) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else lines.push(word);
  }
  return lines;
}

export function makeAppLines(app: MakeApp, module: string): string[] {
  const joined = `${MAKE_APP_NAMES[app]} · ${module}`;
  return joined.length <= APP_WRAP ? [joined] : [MAKE_APP_NAMES[app], module];
}

export const makePlateWidth = (text: string) =>
  Math.round(text.length * PLATE_CHAR + PLATE_PADDING);

const round = (value: number) => Math.round(value * 100) / 100;

/** Distance from a module's centre to the bottom of its label block. */
export const makeLabelDepth = (module: Pick<MakeModule, "label" | "appLines">) =>
  MAKE_LABEL_FIRST +
  MAKE_LABEL_LINE * (module.label.length - 1) +
  MAKE_APP_GAP +
  MAKE_APP_LINE * (module.appLines.length - 1) +
  DESCENDER;

/** Half the widest of a module's circle, label lines (first with its number box) and app lines. */
export const makeHalfWidth = (module: Pick<MakeModule, "label" | "appLines">) =>
  Math.max(
    MAKE_PORT_OUTER,
    ...module.label.map((line, index) => (line.length * LABEL_CHAR + (index ? 0 : NUMBER_BOX)) / 2),
    ...module.appLines.map((line) => (line.length * APP_CHAR) / 2),
  );

/** Lays out one Make scenario without a router: one row read left to right, as Auto-align
 * arranges a chain, with each Resume handler above and to the right of its module. */
export function layoutMakeScenario(modules: readonly MakeModuleInput[]): MakeLayout {
  const nodes: MakeModule[] = [];
  const edges: MakeLink[] = [];
  const plates: MakeFilterPlate[] = [];
  const bands: MakeAggregatorBand[] = [];
  let x = START_X;
  modules.forEach((input, index) => {
    const previous = modules[index - 1];
    if (previous) {
      let gap = SPACING;
      if (input.filter) gap = Math.max(gap, makePlateWidth(input.filter) + PLATE_CLEARANCE);
      if (previous.handler && input.handler) gap = Math.max(gap, HANDLER_SPACING);
      x += gap;
    }
    nodes.push({
      id: input.id,
      number: index + 1,
      label: wrapWords(input.label, LABEL_WRAP),
      app: input.app,
      appLines: makeAppLines(input.app, input.module),
      role: "module",
      ...(input.schedule ? { schedule: true as const } : {}),
      ...(input.aggregates ? { aggregates: input.aggregates } : {}),
      x,
      y: ROW_Y,
    });
  });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  nodes.slice(1).forEach((node, index) => {
    const from = nodes[index]!;
    const filter = modules[index + 1]!.filter;
    edges.push({
      id: `L${String(index + 1).padStart(2, "0")}`,
      kind: "main",
      from: { node: from.id, index: 0 },
      to: { node: node.id, index: 0 },
      ...(filter ? { filter } : {}),
      path: `M${from.x + MAKE_PORT_OUTER} ${ROW_Y}H${node.x - MAKE_PORT_OUTER}`,
    });
    if (filter) {
      const width = makePlateWidth(filter);
      plates.push({
        link: edges.at(-1)!.id,
        text: filter,
        x: round((from.x + node.x) / 2 - width / 2),
        y: ROW_Y - PLATE_GAP - MAKE_PLATE_HEIGHT,
        width,
      });
    }
  });
  for (const node of [...nodes]) {
    if (!node.aggregates) continue;
    const source = byId.get(node.aggregates)!;
    bands.push({
      aggregator: node.id,
      source: source.id,
      x: source.x - MAKE_BAND_HEIGHT / 2,
      y: ROW_Y - MAKE_BAND_HEIGHT / 2,
      width: node.x - source.x + MAKE_BAND_HEIGHT,
    });
  }
  const length = Math.hypot(HANDLER_DX, HANDLER_DY);
  const [ux, uy] = [HANDLER_DX / length, HANDLER_DY / length];
  let number = nodes.length;
  modules.forEach((input) => {
    if (!input.handler) return;
    const module = byId.get(input.id)!;
    const handler: MakeModule = {
      id: input.handler.id,
      number: ++number,
      label: wrapWords(input.handler.label, LABEL_WRAP),
      app: "errorHandler",
      appLines: makeAppLines("errorHandler", "Resume"),
      role: "handler",
      x: module.x + HANDLER_DX,
      y: module.y + HANDLER_DY,
    };
    nodes.push(handler);
    edges.push({
      id: `E${module.id.replace(/^M/, "")}`,
      kind: "error",
      from: { node: module.id, index: 0 },
      to: { node: handler.id, index: 0 },
      path:
        `M${round(module.x + ux * MAKE_PORT_OUTER)} ${round(module.y + uy * MAKE_PORT_OUTER)}` +
        `L${round(handler.x - ux * MAKE_PORT_OUTER)} ${round(handler.y - uy * MAKE_PORT_OUTER)}`,
    });
  });
  const left = Math.min(
    ...nodes.map((node) => node.x - makeHalfWidth(node)),
    START_X - BADGE_REACH,
  );
  const right = Math.max(...nodes.map((node) => node.x + makeHalfWidth(node)));
  const top = Math.min(
    ...nodes.map((node) => node.y - MAKE_RADIUS),
    ...plates.map((plate) => plate.y),
  );
  const bottom = Math.max(...nodes.map((node) => node.y + makeLabelDepth(node)));
  return {
    nodes,
    edges,
    plates,
    bands,
    bounds: [
      round(left - MARGIN),
      round(top - MARGIN),
      round(right - left + 2 * MARGIN),
      round(bottom - top + 2 * MARGIN),
    ],
  };
}
