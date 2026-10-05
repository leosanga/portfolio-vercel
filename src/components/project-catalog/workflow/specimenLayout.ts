/** Presentation-only geometry retained from the approved standalone specimen. */
interface AnnotationLayout {
  x: number;
  y: number;
  width: number;
  detail?: string;
  path?: string;
}
export interface SpecimenLayout {
  openingGroups: readonly (readonly string[])[];
  bounds: readonly [number, number, number, number];
  readable: readonly [number, number];
  labels: Record<string, readonly string[]>;
  annotations: Record<string, AnnotationLayout>;
  lanes: readonly { x: number; y: number; text: string }[];
  description: string;
}
const NAVIGATION =
  " Focus this canvas to pan with arrows, zoom with plus and minus, or Fit with zero. The business phases accompany each view.";
export const SPECIMEN_LAYOUTS: Record<string, SpecimenLayout> = {
  "customer-inquiry-routing": {
    openingGroups: [
      ["Q01", "Q02", "Q03", "Q04"],
      ["Q05", "Q12", "Q06"],
      ["Q07", "QM1"],
      ["Q08", "Q09", "Q11"],
      ["Q10", "Q13", "Q14"],
    ],
    bounds: [24, 0, 1488, 816],
    readable: [28, 4],
    labels: {
      Q01: ["Receive", "customer email"],
      Q04: ["New inquiry", "to process?"],
      Q05: ["Get approved", "support information"],
      Q12: ["Read support", "information text"],
      Q06: ["Support information", "found?"],
      Q13: ["Add draft to", "email thread"],
      Q11: ["Record human", "handoff"],
    },
    annotations: {
      N1: { x: 784, y: 12, width: 244, detail: "Repeat output ends here" },
      N2: {
        x: 1264,
        y: 600,
        width: 224,
        detail: "Awaiting the responsible person",
        path: "M1360 448 H1392 Q1408 448 1408 464 V600",
      },
      N3: {
        x: 1024,
        y: 600,
        width: 224,
        detail: "Awaiting the responsible person",
        path: "M944 656 H1024",
      },
    },
    lanes: [
      { x: 64, y: 57, text: "RECEIVE AND FIND INFORMATION" },
      { x: 64, y: 363, text: "PREPARE AND ASSIGN REVIEW" },
      { x: 848, y: 571, text: "HUMAN FOLLOW-UP" },
    ],
    description:
      "Fourteen execution nodes and one static chat-model configuration node, in three rows read left to right. The first row receives the customer email, saves the inquiry and reads the approved support information. The second row prepares, checks and saves the reply draft, adds it to the customer's email thread and saves the draft link. Questions without usable support information or a usable draft record a human handoff on the third row; repeat emails keep their existing case." +
      NAVIGATION,
  },
  "quote-follow-up-reminders": {
    openingGroups: [
      ["R01", "R02"],
      ["R03", "R04", "R07"],
      ["R05", "R06"],
      ["R08", "R09"],
    ],
    bounds: [56, 72, 1448, 536],
    readable: [56, 72],
    labels: {
      R01: ["Check quote", "follow-ups"],
      R02: ["Get quotes", "awaiting reply"],
      R03: ["Check quote", "and reply"],
      R04: ["Ready to", "follow up?"],
      R05: ["Save follow-up", "record"],
      R06: ["New task", "needed?"],
      R08: ["Create", "follow-up task"],
    },
    annotations: {
      N1: { x: 1304, y: 540, width: 168, path: "M1424 416 H1448 Q1464 416 1464 432 V540" },
      N2: { x: 1088, y: 320, width: 168, path: "M1216 160 H1232 Q1248 160 1248 176 V320" },
      N3: { x: 1048, y: 394, width: 168, path: "M1008 416 H1048" },
    },
    lanes: [],
    description:
      "Nine execution nodes. The main row reads left to right from a scheduled check to the follow-up task created in the CRM, and the task's link is saved on the row below. Quotes that are not ready record the check on the lower row, and a follow-up that already has a task ends at No new task." +
      NAVIGATION,
  },
  "sales-call-notes-and-next-steps": {
    openingGroups: [
      ["A01", "A02", "A03", "A04"],
      ["A12", "A05", "A13", "A14", "A15"],
      ["A06", "AM1"],
      ["A07", "A08"],
      ["A09", "A10", "A11"],
    ],
    bounds: [32, 0, 1476, 968],
    readable: [28, 4],
    labels: {
      A04: ["New notes", "to process?"],
      A14: ["Read sales", "playbook text"],
      A15: ["Combine account", "context"],
      A08: ["Next steps", "usable?"],
    },
    annotations: {
      N1: { x: 800, y: 12, width: 192 },
      N2: { x: 1040, y: 826, width: 168, path: "M960 848 H1040" },
      N3: { x: 1240, y: 602, width: 240, path: "M1168 624 H1240" },
      N4: { x: 1240, y: 702, width: 192, path: "M1168 656 H1216 V724 H1240" },
    },
    lanes: [],
    description:
      "Fifteen execution nodes and one static chat-model configuration node, in three rows read left to right. The first row checks and saves the notes, then starts two branches that run at the same time: the deal stage and sales playbook along the first row, and the earlier next steps below. They rejoin in the second row, and the combined account context returns to the third row for the proposal step, its checks and the save for review. Unusable proposals record a manual review; repeat notes keep their existing call record." +
      NAVIGATION,
  },
};
