// Meaningful derivation and loop-boundary checks; no browser or elapsed-time simulation.
import assert from "node:assert/strict";
import { GRAPH as sales } from "../../src/content/project-catalog/entries/sales-call-notes-and-next-steps/graph";
import { GRAPH as quotes } from "../../src/content/project-catalog/entries/quote-follow-up-reminders/graph";
import { SPECIMEN_LAYOUTS } from "../../src/components/project-catalog/workflow/specimenLayout";
import {
  advancePresentation,
  derivePresentation,
  PRESENTATION_ENDING_HOLD_MS,
  presentationDuration,
} from "../../src/components/project-catalog/workflow/presentation";

const salesLayout = SPECIMEN_LAYOUTS[sales.entryId]!;
const salesAt = (elapsed: number, staticView = false) =>
  derivePresentation(
    sales,
    elapsed,
    staticView,
    salesLayout.openingGroups,
    salesLayout.openingAssembly,
  );

for (const [index, group] of salesLayout.openingGroups.entries()) {
  const start = index * 480;
  const initial = salesAt(start);
  assert(
    group.every((id) => initial.nodes[id]!.reveal === 0),
    `layer ${index} starts hidden`,
  );
  const settled = salesAt(start + 400);
  assert(
    group.every((id) => settled.nodes[id]!.reveal === 1),
    `layer ${index} reaches complete reveal`,
  );
  assert.deepEqual(salesAt(start + 200).activePhases, [`P${index + 1}`]);
}
const configuration = salesAt(1160);
assert.equal(configuration.nodes["AM1"]!.active, false);
assert.equal(configuration.nodes["AM1"]!.covered, false);
assert.equal(configuration.edges["C01"]!.sweep, 0);
assert.equal(
  configuration.edges["C01"]!.reveal,
  Math.min(configuration.nodes["AM1"]!.reveal, configuration.nodes["A06"]!.reveal),
);
const configOnlyGroups = [["AM1"]];
assert.deepEqual(
  derivePresentation(sales, 100, false, configOnlyGroups, {
    stepMs: 480,
    revealMs: 400,
    emphasizePhases: true,
  }).activePhases,
  ["P3"],
);
assert.equal(salesAt(0).edges["E01"]!.reveal, 0);
assert(salesAt(200).edges["E01"]!.reveal > 0);
const openingHold = salesAt(2500);
assert(Object.values(openingHold.nodes).every((node) => node.reveal === 1 && !node.active));
assert(Object.values(openingHold.edges).every((edge) => edge.reveal === 1 && edge.sweep === 0));
assert.deepEqual(openingHold.activePhases, []);
assert.deepEqual(salesAt(2800).activePhases, ["P1"]);
const staticStory = salesAt(0, true);
assert(Object.values(staticStory.nodes).every((node) => node.reveal === 1 && !node.active));
assert(Object.values(staticStory.edges).every((edge) => edge.reveal === 1 && edge.sweep === 0));
assert.deepEqual(staticStory.activePhases, []);

const duration = presentationDuration(sales);
const endpoint = salesAt(duration);
assert.equal(endpoint.complete, true);
assert.equal(endpoint.ending, "N3");
assert.deepEqual(salesAt(duration + PRESENTATION_ENDING_HOLD_MS - 1), endpoint);
assert.equal(PRESENTATION_ENDING_HOLD_MS, 4000);
const cycle = duration + PRESENTATION_ENDING_HOLD_MS;
assert.equal(advancePresentation(duration, 3999, duration), cycle - 1);
assert.equal(advancePresentation(duration, 4000, duration), 0);
assert.equal(advancePresentation(cycle - 10, 35, duration), 25);
assert.equal(advancePresentation(10, cycle * 5 + 45, duration), 55);
assert.equal(advancePresentation(duration + 1200, 0, duration), duration + 1200);
assert.equal(advancePresentation(10, -100, duration), 10);

const quoteGroups = SPECIMEN_LAYOUTS[quotes.entryId]!.openingGroups;
const legacy = derivePresentation(quotes, 260, false, quoteGroups);
assert.equal(legacy.nodes["R01"]!.reveal, 1 - Math.pow(1 - 260 / 380, 3));
assert.equal(legacy.nodes["R03"]!.reveal, 1 - Math.pow(1 - 130 / 380, 3));
assert.equal(legacy.nodes["R05"]!.reveal, 0);
assert.deepEqual(legacy.activePhases, []);
console.log(
  "presentation checks passed: layers, phases, config, edges, static fallback, hold, wrapping and legacy opening",
);
