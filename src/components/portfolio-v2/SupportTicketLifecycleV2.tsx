import { useEffect, useId, useState } from "react";

import type { SupportTicketLifecycleExperience } from "@/content/portfolio-v2/types";

type TicketStageState = "pending" | "active" | "complete";
type LifecycleState = "intake" | "active" | "waiting" | "resolved" | "closed";

const FINAL_STAGE = 8;
const LOOP_DURATION_MS = 22000;
const STAGE_TIMING = [
  { at: 1500, stage: 1 },
  { at: 3200, stage: 2 },
  { at: 5200, stage: 3 },
  { at: 7600, stage: 4 },
  { at: 9800, stage: 5 },
  { at: 12200, stage: 6 },
  { at: 14500, stage: 7 },
  { at: 16000, stage: FINAL_STAGE },
] as const;

const LIFECYCLE_STATES: readonly { key: LifecycleState; label: string }[] = [
  { key: "intake", label: "Intake" },
  { key: "active", label: "Active" },
  { key: "waiting", label: "Waiting" },
  { key: "resolved", label: "Resolved" },
  { key: "closed", label: "Closed" },
];

function stateForStage(stage: number, activeAt: number): TicketStageState {
  if (stage === FINAL_STAGE || stage > activeAt) return "complete";
  if (stage === activeAt) return "active";
  return "pending";
}

function currentLifecycle(stage: number): LifecycleState {
  if (stage === FINAL_STAGE || stage >= 7) return "closed";
  if (stage === 6) return "resolved";
  if (stage === 3) return "waiting";
  if (stage >= 2) return "active";
  return "intake";
}

function recordValues(stage: number) {
  if (stage === FINAL_STAGE || stage >= 7) {
    return {
      conversation: "Existing thread",
      owner: "Complete",
      state: "Closed",
      nextAction: "Lifecycle complete",
    };
  }
  if (stage === 6) {
    return {
      conversation: "Existing thread",
      owner: "Visible",
      state: "Resolved",
      nextAction: "Move toward closure",
    };
  }
  if (stage >= 4) {
    return {
      conversation: "Existing reply",
      owner: "Visible",
      state: "Active",
      nextAction: "Review response",
    };
  }
  if (stage === 3) {
    return {
      conversation: "New request",
      owner: "Visible",
      state: "Waiting",
      nextAction: "Follow-up retained",
    };
  }
  if (stage === 2) {
    return {
      conversation: "New request",
      owner: "Visible",
      state: "Active",
      nextAction: "Begin work",
    };
  }
  return {
    conversation: "New request",
    owner: "Pending",
    state: "Intake",
    nextAction: "Create ticket",
  };
}

function TicketStep({
  node,
  stage,
  activeAt,
}: {
  node: { tag: string; label: string };
  stage: number;
  activeAt: number;
}) {
  return (
    <div className="pv2-ticket-lifecycle__step" data-state={stateForStage(stage, activeAt)}>
      <p className="pv2-ticket-lifecycle__tag">{node.tag}</p>
      <p className="pv2-ticket-lifecycle__label">{node.label}</p>
    </div>
  );
}

export function SupportTicketLifecycleV2({
  experience,
  shouldAnimate,
}: {
  experience: SupportTicketLifecycleExperience;
  shouldAnimate: boolean;
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
      cycleTimer = window.setTimeout(runCycle, LOOP_DURATION_MS);
    };

    runCycle();
    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(cycleTimer);
    };
  }, [shouldAnimate]);

  const lifecycle = currentLifecycle(stage);
  const values = recordValues(stage);
  const activeLifecycleIndex = LIFECYCLE_STATES.findIndex((item) => item.key === lifecycle);

  return (
    <figure className="pv2-ticket-lifecycle" aria-describedby={scopeId}>
      <figcaption className="pv2-ticket-lifecycle__scope" id={scopeId}>
        {experience.scope}
      </figcaption>

      <div className="pv2-ticket-lifecycle__workspace">
        <ol className="pv2-ticket-lifecycle__entries" role="list">
          <li>
            <TicketStep node={experience.nodes.newRequest} stage={stage} activeAt={0} />
          </li>
          <li>
            <TicketStep node={experience.nodes.existingReply} stage={stage} activeAt={4} />
          </li>
        </ol>

        <article className="pv2-ticket-lifecycle__record">
          <header className="pv2-ticket-lifecycle__record-header">
            <div>
              <p>Ticket record</p>
              <h4>Support lifecycle</h4>
            </div>
            <span>{experience.finalStatus}</span>
          </header>

          <dl className="pv2-ticket-lifecycle__fields">
            <div>
              <dt>Conversation</dt>
              <dd>{values.conversation}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{values.owner}</dd>
            </div>
            <div>
              <dt>Lifecycle state</dt>
              <dd>{values.state}</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>{values.nextAction}</dd>
            </div>
          </dl>

          <ol className="pv2-ticket-lifecycle__rail" aria-label="Ticket lifecycle">
            {LIFECYCLE_STATES.map((item, index) => (
              <li
                data-state={
                  stage === FINAL_STAGE
                    ? "complete"
                    : index === activeLifecycleIndex
                      ? "active"
                      : index < activeLifecycleIndex
                        ? "complete"
                        : "pending"
                }
                key={item.key}
              >
                <span aria-hidden="true" />
                <strong>{item.label}</strong>
              </li>
            ))}
          </ol>

          <p className="pv2-ticket-lifecycle__return" data-state={stateForStage(stage, 4)}>
            {experience.nodes.replyLoop.label}
          </p>
        </article>

        <ul className="pv2-ticket-lifecycle__rules" role="list">
          <li>
            <TicketStep node={experience.nodes.ownership} stage={stage} activeAt={2} />
          </li>
          <li>
            <TicketStep node={experience.nodes.nextAction} stage={stage} activeAt={3} />
          </li>
          <li>
            <TicketStep node={experience.nodes.followUp} stage={stage} activeAt={3} />
          </li>
          <li>
            <TicketStep node={experience.nodes.resolution} stage={stage} activeAt={6} />
          </li>
        </ul>
      </div>
    </figure>
  );
}
