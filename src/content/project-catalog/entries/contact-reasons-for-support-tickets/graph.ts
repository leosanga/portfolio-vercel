import type { MakeGraph } from "../../types";
import { layoutMakeScenario } from "../../makeLayout";

// Manifest: design.md B06. Phases: B03. Presentation: B07 and execution.md Part B.
const LAYOUT = layoutMakeScenario([
  {
    id: "M01",
    label: "Set last week and the four weeks before",
    app: "tools",
    module: "Set multiple variables",
    schedule: true,
  },
  {
    id: "M02",
    label: "Get the Contact reason field's options",
    app: "zendesk",
    module: "Make an API Call",
    handler: { id: "H02", label: "If the field read fails" },
  },
  {
    id: "M03",
    label: "Get the support manager's list of contact reasons",
    app: "googleSheets",
    module: "Search Rows",
    handler: { id: "H03", label: "If the list read fails" },
  },
  {
    id: "M04",
    label: "Collect the reasons for the model",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M03",
  },
  {
    id: "M05",
    label: "Get the last five weeks of tickets",
    app: "http",
    module: "Make a request",
    handler: { id: "H05", label: "If the tickets read fails" },
  },
  {
    id: "M06",
    label: "Collect the last five weeks of tickets",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M05",
  },
  {
    id: "M07",
    label: "Go through the tickets without a reason",
    app: "flowControl",
    module: "Iterator",
  },
  {
    id: "M08",
    label: "Choose the ticket's contact reason",
    app: "makeAi",
    module: "Categorize text",
    filter: "Only tickets without a reason",
    handler: { id: "H08", label: "If the model fails" },
  },
  {
    id: "M09",
    label: "Write the contact reason on the ticket",
    app: "zendesk",
    module: "Make an API Call",
    filter: "Only a reason on the field",
    handler: { id: "H09", label: "If the write is refused or fails" },
  },
  {
    id: "M10",
    label: "Collect the reasons given this run",
    app: "flowControl",
    module: "Array aggregator",
    aggregates: "M07",
  },
  {
    id: "M11",
    label: "Work out which contact reasons rose",
    app: "makeCode",
    module: "Run code",
  },
  {
    id: "M12",
    label: "Post the weekly contact reasons to the support channel",
    app: "slack",
    module: "Create a Message",
  },
]);

export const GRAPH: MakeGraph = {
  platform: "make",
  entryId: "contact-reasons-for-support-tickets",
  ...LAYOUT,
  annotations: [],
  phases: [
    { id: "P1", nodes: ["M01", "M02", "M03", "M04", "M05", "M06", "H02", "H03", "H05"] },
    { id: "P2", nodes: ["M07", "M08", "M09", "M10", "H08", "H09"] },
    { id: "P3", nodes: ["M11"] },
    { id: "P4", nodes: ["M12"] },
  ],
  presentation: {
    kind: "flow",
    // Four opening groups: the last starts at 3 x 260 and reveals over 380.
    openingMs: 1160,
    beats: [
      {
        durationMs: 2600,
        phases: ["P1"],
        nodes: ["M01", "M02", "M03", "M04", "M05", "M06"],
        edges: ["L01", "L02", "L03", "L04", "L05"],
      },
      {
        durationMs: 2000,
        phases: ["P2"],
        nodes: ["M07", "M08", "M09", "M10"],
        edges: ["L06", "L07", "L08", "L09"],
      },
      { durationMs: 1300, phases: ["P3"], nodes: ["M11"], edges: ["L10"] },
      { durationMs: 1200, phases: ["P4"], nodes: ["M12"], edges: ["L11"] },
    ],
    ending: "M12",
  },
};
