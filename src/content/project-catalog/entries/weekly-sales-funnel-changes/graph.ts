import type { MakeGraph } from "../../types";
import { layoutMakeScenario } from "../../makeLayout";

// Manifest: design.md B06. Phases: B03. Presentation: B07 and execution.md Part B.
const LAYOUT = layoutMakeScenario([
  {
    id: "M01",
    label: "Set the five weeks to compare",
    app: "tools",
    module: "Set multiple variables",
    schedule: true,
  },
  {
    id: "M02",
    label: "Get new leads for the five weeks",
    app: "hubspot",
    module: "Search for CRM Objects",
    handler: { id: "H02", label: "If the new leads read fails" },
  },
  {
    id: "M03",
    label: "Collect the new leads",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M02",
  },
  {
    id: "M04",
    label: "Get meetings booked for the five weeks",
    app: "hubspot",
    module: "Search for CRM Objects",
    handler: { id: "H04", label: "If the meetings read fails" },
  },
  {
    id: "M05",
    label: "Collect the meetings booked",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M04",
  },
  {
    id: "M06",
    label: "Get deals won for the five weeks",
    app: "hubspot",
    module: "Search for CRM Objects",
    handler: { id: "H06", label: "If the deals read fails" },
  },
  {
    id: "M07",
    label: "Collect the deals won",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M06",
  },
  {
    id: "M08",
    label: "Get Google Ads campaign changes for last week and the week before",
    app: "googleAds",
    module: "Make an API Call",
    handler: { id: "H08", label: "If the Google Ads read fails" },
  },
  {
    id: "M09",
    label: "Get Meta campaign changes for last week and the week before",
    app: "http",
    module: "Make a request",
    handler: { id: "H09", label: "If the Meta read fails" },
  },
  {
    id: "M10",
    label: "Find where each number moved and what changed with it",
    app: "makeCode",
    module: "Run code",
  },
  {
    id: "M11",
    label: "Post the explanation to the sales channel",
    app: "slack",
    module: "Create a Message",
  },
]);

export const GRAPH: MakeGraph = {
  platform: "make",
  entryId: "weekly-sales-funnel-changes",
  ...LAYOUT,
  annotations: [],
  phases: [
    { id: "P1", nodes: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "H02", "H04", "H06"] },
    { id: "P2", nodes: ["M08", "M09", "H08", "H09"] },
    { id: "P3", nodes: ["M10"] },
    { id: "P4", nodes: ["M11"] },
  ],
  presentation: {
    kind: "flow",
    // Four opening groups: the last starts at 3 x 260 and reveals over 380.
    openingMs: 1160,
    beats: [
      {
        durationMs: 2800,
        phases: ["P1"],
        nodes: ["M01", "M02", "M03", "M04", "M05", "M06", "M07"],
        edges: ["L01", "L02", "L03", "L04", "L05", "L06"],
      },
      { durationMs: 1600, phases: ["P2"], nodes: ["M08", "M09"], edges: ["L07", "L08"] },
      { durationMs: 1400, phases: ["P3"], nodes: ["M10"], edges: ["L09"] },
      { durationMs: 1200, phases: ["P4"], nodes: ["M11"], edges: ["L10"] },
    ],
    ending: "M11",
  },
};
