import { useEffect, useId, useState } from "react";

import type { OutboundDraftAssemblyExperience } from "@/content/portfolio-v2/types";

type DraftStageState = "pending" | "active" | "complete";

const FINAL_STAGE = 11;
const LOOP_DURATION_MS = 11900;
const STAGE_TIMING = [
  { at: 650, stage: 1 },
  { at: 1450, stage: 2 },
  { at: 2550, stage: 3 },
  { at: 3500, stage: 4 },
  { at: 4450, stage: 5 },
  { at: 5400, stage: 6 },
  { at: 6350, stage: 7 },
  { at: 7350, stage: 8 },
  { at: 8400, stage: 9 },
  { at: 9400, stage: 10 },
  { at: 10200, stage: FINAL_STAGE },
] as const;

function stateForStage(stage: number, activeAt: number): DraftStageState {
  if (stage === FINAL_STAGE || stage > activeAt) return "complete";
  if (stage === activeAt) return "active";
  return "pending";
}

function AssemblyStep({
  node,
  stage,
  activeAt,
  className = "",
}: {
  node: { tag: string; label: string };
  stage: number;
  activeAt: number;
  className?: string;
}) {
  return (
    <div
      className={`pv2-outbound-draft__step ${className}`.trim()}
      data-state={stateForStage(stage, activeAt)}
    >
      <p className="pv2-outbound-draft__tag">{node.tag}</p>
      <p className="pv2-outbound-draft__label">{node.label}</p>
    </div>
  );
}

export function OutboundDraftAssemblyV2({
  experience,
  shouldAnimate,
  playback = "loop",
}: {
  experience: OutboundDraftAssemblyExperience;
  shouldAnimate: boolean;
  playback?: "loop" | "once";
}) {
  const scopeId = useId();
  const [stage, setStage] = useState(FINAL_STAGE);

  useEffect(() => {
    if (!shouldAnimate) {
      setStage(FINAL_STAGE);
      return;
    }

    let stageTimers: number[] = [];
    let cycleTimer = 0;

    const runCycle = () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      setStage(0);
      stageTimers = STAGE_TIMING.map(({ at, stage: nextStage }) =>
        window.setTimeout(() => setStage(nextStage), at),
      );
      if (playback === "loop") cycleTimer = window.setTimeout(runCycle, LOOP_DURATION_MS);
    };

    runCycle();
    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(cycleTimer);
    };
  }, [shouldAnimate, playback]);

  return (
    <figure className="pv2-outbound-draft" aria-describedby={scopeId}>
      <figcaption className="pv2-outbound-draft__scope" id={scopeId}>
        {experience.scope}
      </figcaption>

      <ol className="pv2-outbound-draft__workspace" role="list">
        <li className="pv2-outbound-draft__source">
          <p className="pv2-outbound-draft__region-label">Limited signal</p>
          <AssemblyStep node={experience.nodes.notification} stage={stage} activeAt={0} />
          <AssemblyStep node={experience.nodes.workflowStart} stage={stage} activeAt={1} />
          <AssemblyStep node={experience.nodes.crmCheck} stage={stage} activeAt={2} />
        </li>

        <li className="pv2-outbound-draft__research">
          <div className="pv2-outbound-draft__research-header" aria-hidden="true">
            <span>Research brief</span>
            <span>n8n</span>
          </div>

          <ul className="pv2-outbound-draft__research-grid" role="list">
            <li>
              <AssemblyStep node={experience.nodes.companyContext} stage={stage} activeAt={3} />
            </li>
            <li>
              <AssemblyStep node={experience.nodes.leadershipActivity} stage={stage} activeAt={4} />
            </li>
            <li>
              <AssemblyStep node={experience.nodes.painPointFit} stage={stage} activeAt={5} />
            </li>
            <li>
              <AssemblyStep node={experience.nodes.relevantProof} stage={stage} activeAt={6} />
            </li>
          </ul>

          <div className="pv2-outbound-draft__page-intent" data-state={stateForStage(stage, 7)}>
            <p className="pv2-outbound-draft__tag">{experience.nodes.pageIntent.tag}</p>
            <p className="pv2-outbound-draft__label">{experience.nodes.pageIntent.label}</p>
          </div>

          <div className="pv2-outbound-draft__qualification" data-state={stateForStage(stage, 8)}>
            <p className="pv2-outbound-draft__tag">{experience.nodes.qualification.tag}</p>
            <p className="pv2-outbound-draft__label">{experience.nodes.qualification.label}</p>
          </div>
        </li>

        <li className="pv2-outbound-draft__message">
          <article className="pv2-outbound-draft__sheet">
            <header className="pv2-outbound-draft__sheet-header">
              <div>
                <p>Draft</p>
                <h4>Conversation starter</h4>
              </div>
              <span>Not sent</span>
            </header>

            <ol className="pv2-outbound-draft__draft-sections" role="list">
              <li>
                <AssemblyStep node={experience.nodes.draft} stage={stage} activeAt={9} />
              </li>
            </ol>

            <div className="pv2-outbound-draft__review" data-state={stateForStage(stage, 10)}>
              <div>
                <p className="pv2-outbound-draft__tag">{experience.nodes.review.tag}</p>
                <p className="pv2-outbound-draft__label">{experience.nodes.review.label}</p>
              </div>
              <span>{experience.nodes.review.status}</span>
            </div>
          </article>
        </li>
      </ol>
    </figure>
  );
}
