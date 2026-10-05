import type { ConnectionKind } from "./types";

export interface N8nNodeDefinition {
  version: number;
  /** Native body: trigger (rounded left edge), ordinary square, wide root node or circular sub-node. */
  shape: "trigger" | "square" | "wide" | "circle";
  inputs: readonly ConnectionKind[];
  outputs: readonly ConnectionKind[];
  /** Number of Inputs is configurable (Merge): `inputs` lists the default ports. */
  variableInputs?: boolean;
}

// Pinned at n8n-io/n8n@cbaea9852139ceabdd629d582291965f924d9de1; see each design's native
// mapping (Schedule Trigger: quote follow-up reminders B08; blog post approval and scheduling B08).
// Add a type only after verifying its ports.
export const N8N_NODE_TYPES = {
  "n8n-nodes-base.webhook": { version: 2.1, shape: "trigger", inputs: [], outputs: ["main"] },
  "n8n-nodes-base.scheduleTrigger": {
    version: 1.4,
    shape: "trigger",
    inputs: [],
    outputs: ["main"],
  },
  "n8n-nodes-base.gmailTrigger": {
    version: 1.4,
    shape: "trigger",
    inputs: [],
    outputs: ["main"],
  },
  "n8n-nodes-base.microsoftOutlookTrigger": {
    version: 1,
    shape: "trigger",
    inputs: [],
    outputs: ["main"],
  },
  "n8n-nodes-base.gmail": { version: 2.2, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.microsoftOutlook": {
    version: 2,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.code": { version: 2, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.postgres": { version: 2.6, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.if": {
    version: 2.2,
    shape: "square",
    inputs: ["main"],
    outputs: ["main", "main"],
  },
  "n8n-nodes-base.hubspot": { version: 2.2, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.salesforce": {
    version: 1.1,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.highLevel": { version: 2, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.googleDrive": {
    version: 3,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.microsoftSharePoint": {
    version: 2,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.airtable": { version: 2.2, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.googleSheets": {
    version: 4.7,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.googleDocs": {
    version: 2,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.slack": { version: 2.7, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.microsoftTeams": {
    version: 2,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.wordpress": { version: 1, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.ghost": { version: 1, shape: "square", inputs: ["main"], outputs: ["main"] },
  "n8n-nodes-base.extractFromFile": {
    version: 1.1,
    shape: "square",
    inputs: ["main"],
    outputs: ["main"],
  },
  "n8n-nodes-base.merge": {
    version: 3.2,
    shape: "square",
    inputs: ["main", "main"],
    outputs: ["main"],
    variableInputs: true,
  },
  "@n8n/n8n-nodes-langchain.chainLlm": {
    version: 1.7,
    shape: "wide",
    inputs: ["main", "ai_languageModel"],
    outputs: ["main"],
  },
  "@n8n/n8n-nodes-langchain.lmChatOpenAi": {
    version: 1.2,
    shape: "circle",
    inputs: [],
    outputs: ["ai_languageModel"],
  },
} as const satisfies Record<string, N8nNodeDefinition>;

export type N8nNodeType = keyof typeof N8N_NODE_TYPES;
