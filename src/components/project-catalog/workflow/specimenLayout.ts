/** Presentation-only geometry retained from the approved standalone specimen. */
interface AnnotationLayout {
  x: number;
  y: number;
  width: number;
  detail?: string;
  path?: string;
}
export interface OpeningAssembly {
  stepMs: number;
  revealMs: number;
  emphasizePhases: boolean;
}
export interface SpecimenLayout {
  openingGroups: readonly (readonly string[])[];
  openingAssembly?: OpeningAssembly;
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
    openingAssembly: { stepMs: 480, revealMs: 400, emphasizePhases: true },
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
  "blog-post-approval-and-scheduling": {
    openingGroups: [
      ["M01", "M02", "M03"],
      ["M04", "M05", "M06", "M07", "M15", "M16"],
      ["M08", "M09", "M10"],
      ["M11", "M12", "M13", "M14"],
    ],
    bounds: [24, 0, 1488, 848],
    readable: [28, 4],
    labels: {
      M01: ["Check content", "calendar"],
      M02: ["Get blog posts", "ready for review"],
      M03: ["Get blog", "post draft"],
      M04: ["Save blog post", "review request"],
      M05: ["New blog post", "version to review?"],
      M06: ["Ask reviewer to", "approve blog post"],
      M07: ["Reviewer approved", "blog post?"],
      M08: ["Get blog post", "draft again"],
      M09: ["Record blog", "post approval"],
      M10: ["Approved blog post", "still current?"],
      M11: ["Format blog post", "for website"],
      M12: ["Schedule", "blog post"],
      M13: ["Save scheduled", "blog post link"],
      M14: ["Mark blog post", "scheduled"],
      M15: ["Record blog post", "not approved"],
      M16: ["Return blog post", "to writer"],
    },
    annotations: {
      N1: { x: 992, y: 12, width: 244, detail: "No second request is sent" },
      N2: {
        x: 1264,
        y: 616,
        width: 224,
        detail: "Scheduled for the planned time",
        path: "M1408 448 H1456 Q1472 448 1472 464 V616",
      },
      N3: { x: 600, y: 580, width: 200, path: "M576 464 H632 V580" },
      N4: {
        x: 616,
        y: 634,
        width: 240,
        detail: "Reason shown in the content calendar",
        path: "M576 656 H616",
      },
    },
    lanes: [],
    description:
      "Sixteen execution nodes in three rows read left to right. The first row checks the content calendar, reads the blog post draft, records the review request and waits for the reviewer's decision. The second row reads the draft again, records the approval, checks that the approved blog post is still current, formats it, schedules it on the website, saves its link and marks it scheduled in the content calendar. A blog post that is not approved is recorded on the third row and returned to its writer. A draft that changed after approval ends at Blog post not scheduled, and a repeat check ends without a new review request." +
      NAVIGATION,
  },
};
