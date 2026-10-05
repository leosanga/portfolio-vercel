import type { CatalogGraph } from "@/content/project-catalog/types";

export interface ItemState {
  reveal: number;
  active: boolean;
  covered: boolean;
  sweep: number;
  lift: number;
}

export interface PresentationState {
  nodes: Record<string, ItemState>;
  edges: Record<string, ItemState>;
  phases: Record<string, ItemState>;
  activePhases: string[];
  complete: boolean;
  ending: string | null;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const initialItem = (): ItemState => ({
  reveal: 1,
  active: false,
  covered: false,
  sweep: 0,
  lift: 0,
});
const ids = (slot: string | readonly string[]) => (typeof slot === "string" ? [slot] : slot);

export function presentationDuration(graph: CatalogGraph) {
  const opening = graph.presentation.kind === "flow" ? graph.presentation.openingMs : 0;
  return opening + graph.presentation.beats.reduce((sum, beat) => sum + beat.durationMs, 0);
}

/** Every visual role is calculated from the same elapsed position, including paused frames. */
export function derivePresentation(
  graph: CatalogGraph,
  elapsed: number,
  staticView = false,
  openingGroups?: readonly (readonly string[])[],
): PresentationState {
  const result: PresentationState = {
    nodes: Object.fromEntries(graph.nodes.map((node) => [node.id, initialItem()])),
    edges: Object.fromEntries(graph.edges.map((edge) => [edge.id, initialItem()])),
    phases: Object.fromEntries(graph.phases.map((phase) => [phase.id, initialItem()])),
    activePhases: [],
    complete: false,
    ending: null,
  };
  if (staticView) return result;
  const presentation = graph.presentation;
  const duration = presentationDuration(graph);
  const position = Math.min(duration, Math.max(0, elapsed));
  let cursor = presentation.kind === "flow" ? presentation.openingMs : 0;
  if (presentation.kind === "flow" && position < presentation.openingMs) {
    const groups = graph.phases.length;
    graph.nodes.forEach((node) => {
      const phaseIndex = Math.max(
        0,
        graph.phases.findIndex((phase) => phase.nodes.includes(node.id)),
      );
      const configTarget = graph.edges.find(
        (edge) => edge.kind === "ai_languageModel" && edge.from.node === node.id,
      );
      const group = configTarget
        ? Math.max(
            0,
            graph.phases.findIndex((phase) => phase.nodes.includes(configTarget.to.node)),
          )
        : phaseIndex;
      const authoredGroup = openingGroups?.findIndex((items) => items.includes(node.id));
      const start =
        authoredGroup !== undefined && authoredGroup >= 0
          ? authoredGroup * 130
          : (group / Math.max(1, groups - 1)) * presentation.openingMs * 0.48;
      const reveal = clamp(
        (position - start) / (openingGroups ? 380 : presentation.openingMs * 0.52),
      );
      result.nodes[node.id]!.reveal = 1 - Math.pow(1 - reveal, 3);
    });
  }
  if (presentation.kind === "assembly")
    graph.nodes.forEach((node) => {
      result.nodes[node.id]!.reveal = 0;
    });
  presentation.beats.forEach((beat) => {
    const progress = clamp((position - cursor) / beat.durationMs);
    const active = position >= cursor && position < cursor + beat.durationMs;
    beat.phases.forEach((id) => {
      const phase = result.phases[id];
      if (!phase) return;
      phase.covered ||= position >= cursor + beat.durationMs;
      phase.active ||= active;
      if (active) {
        phase.lift = -3 * Math.sin(Math.PI * clamp((position - cursor) / 420));
        result.activePhases.push(id);
      }
    });
    if (presentation.kind === "assembly") {
      beat.nodes.forEach((slot) =>
        ids(slot).forEach((id) => {
          result.nodes[id]!.reveal = Math.max(
            result.nodes[id]!.reveal,
            1 - Math.pow(1 - progress, 3),
          );
        }),
      );
    } else if ("edges" in beat) {
      beat.nodes.forEach((slot, index) =>
        ids(slot).forEach((id) => {
          const local = progress * beat.nodes.length - index;
          result.nodes[id]!.active ||= active && local >= 0 && local < 1;
          result.nodes[id]!.covered ||=
            position >= cursor + beat.durationMs || (position >= cursor && local >= 1);
        }),
      );
      beat.edges.forEach((slot, index) =>
        ids(slot).forEach((id) => {
          const local =
            progress * beat.nodes.length - index - (beat.nodes.length - beat.edges.length);
          result.edges[id]!.sweep = Math.max(result.edges[id]!.sweep, active ? clamp(local) : 0);
          result.edges[id]!.covered ||=
            position >= cursor + beat.durationMs || (position >= cursor && local >= 1);
        }),
      );
    }
    cursor += beat.durationMs;
  });
  graph.edges.forEach((edge) => {
    result.edges[edge.id]!.reveal = Math.min(
      result.nodes[edge.from.node]!.reveal,
      result.nodes[edge.to.node]!.reveal,
    );
  });
  result.complete = position >= duration;
  if (result.complete && presentation.kind === "flow") {
    result.activePhases = [...presentation.beats.at(-1)!.phases];
    result.ending = presentation.ending;
  }
  return result;
}
