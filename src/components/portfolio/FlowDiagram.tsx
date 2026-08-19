import type { CSSProperties } from "react";
import type { Flow, FlowNode } from "./data";

/**
 * System diagram for a project card.
 *
 * The shape it can draw is deliberately narrow: a vertical spine of nodes with
 * two-way branches that merge back. That covers the pipelines on this site and
 * needs no node/edge model, no layout engine, and no SVG.
 *
 * Connectors are CSS borders on pseudo-elements positioned in percentages
 * (see `.flow-*` in styles.css), so the geometry follows any reflow instead of
 * being hand-authored against one fixed width.
 */

const KIND_LABEL: Record<FlowNode["kind"], string> = {
  native: "native workflow",
  service: "python service",
  manual: "human decision",
  constraint: "platform limitation",
};

function Node({ node }: { node: FlowNode }) {
  return (
    <div className={`flow-node flow-node--${node.kind}`}>
      <p className="flow-node-kind">{node.tag ?? KIND_LABEL[node.kind]}</p>
      <p className="flow-node-label">{node.label}</p>
      <p className="flow-node-detail">{node.detail}</p>
    </div>
  );
}

export function FlowDiagram({ flow }: { flow: Flow }) {
  return (
    <figure className="flow-figure">
      <figcaption className="flow-summary">{flow.summary}</figcaption>
      <ol className="flow-diagram">
        {flow.rows.map((row, i) => {
          const [head, ...rest] = row;
          if (!head) return null;
          const isBranch = rest.length > 0;
          const followsBranch = (flow.rows[i - 1]?.length ?? 0) > 1;
          return (
            <li
              key={head.label}
              className={[
                "flow-row",
                isBranch ? "flow-row--branch" : "",
                followsBranch ? "flow-row--merge" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              // Staggers the connector pulse down the spine. Read by
              // `animation-delay` in styles.css and inherited by the branch
              // children's own connectors.
              style={{ "--i": i } as CSSProperties}
            >
              {isBranch ? (
                <ul className="flow-branch">
                  {row.map((node) => (
                    <li key={node.label}>
                      <Node node={node} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Node node={head} />
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
