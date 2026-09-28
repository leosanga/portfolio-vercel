import { useEffect, useId, useState } from "react";

import type { ExecutiveReportingArchitectureExperience } from "@/content/portfolio-v2/types";

type ReportingPathState = "pending" | "active" | "complete";

const FINAL_STAGE = 6;
const LOOP_DURATION_MS = 10600;
const STAGE_TIMING = [
  { at: 1500, stage: 0 },
  { at: 2400, stage: 1 },
  { at: 4000, stage: 2 },
  { at: 5100, stage: 3 },
  { at: 6700, stage: 4 },
  { at: 7900, stage: 5 },
  { at: 9100, stage: FINAL_STAGE },
] as const;

function activePathIndex(stage: number): 0 | 1 | 2 {
  if (stage === FINAL_STAGE) return 2;
  if (stage < 2) return 0;
  if (stage < 4) return 1;
  return 2;
}

function completedMetricCount(stage: number) {
  if (stage === FINAL_STAGE) return 3;
  return Math.min(3, Math.floor((stage + 1) / 2));
}

function pathState(stage: number, index: number): ReportingPathState {
  if (stage === FINAL_STAGE) return "complete";

  const activeIndex = activePathIndex(stage);
  if (index < activeIndex) return "complete";
  if (index > activeIndex) return "pending";
  return stage % 2 === 0 ? "active" : "complete";
}

export function ExecutiveReportingArchitectureV2({
  experience,
  shouldAnimate,
}: {
  experience: ExecutiveReportingArchitectureExperience;
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
      setStage(FINAL_STAGE);
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

  const pathIndex = activePathIndex(stage);
  const completedCount = completedMetricCount(stage);
  const currentPath = experience.paths[pathIndex];
  const isComplete = stage === FINAL_STAGE;
  const isResolving = !isComplete && stage % 2 === 0;

  const blueprint = isComplete
    ? {
        metric: "Multiple metrics",
        method: "Architecture by metric",
        delivery: experience.finalStatus,
      }
    : {
        metric: `Metric ${String(pathIndex + 1).padStart(2, "0")}`,
        method: currentPath.blueprint,
        delivery: isResolving ? "Preparing reporting" : "Available on demand",
      };

  const dashboardStatus = isComplete
    ? experience.finalStatus
    : completedCount === 0
      ? "Building reporting"
      : `${completedCount} of 3 available`;

  return (
    <figure
      className="pv2-reporting-architecture"
      aria-describedby={`${scopeId} ${scopeId}-evidence`}
    >
      <figcaption className="pv2-reporting-architecture__scope" id={scopeId}>
        {experience.scope}
      </figcaption>
      <p className="pv2-reporting-architecture__evidence-note" id={`${scopeId}-evidence`}>
        {experience.evidenceNote}
      </p>

      <div className="pv2-reporting-architecture__workspace">
        <section className="pv2-reporting-architecture__paths" aria-labelledby={`${scopeId}-paths`}>
          <header className="pv2-reporting-architecture__section-header">
            <p>Reporting paths</p>
            <h4 id={`${scopeId}-paths`}>Different need, different path</h4>
          </header>

          <ol role="list">
            {experience.paths.map((path, index) => (
              <li data-state={pathState(stage, index)} key={path.key}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{path.tag}</p>
                  <strong>{path.label}</strong>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="pv2-reporting-architecture__blueprint"
          aria-labelledby={`${scopeId}-blueprint`}
        >
          <header className="pv2-reporting-architecture__section-header">
            <p>Architecture blueprint</p>
            <h4 id={`${scopeId}-blueprint`}>{experience.architectureLabel}</h4>
          </header>

          <dl className="pv2-reporting-architecture__blueprint-stack">
            <div data-state={isComplete ? "complete" : "active"}>
              <dt>Reporting need</dt>
              <dd>{blueprint.metric}</dd>
            </div>
            <div data-state={isResolving ? "active" : "complete"}>
              <dt>Selected path</dt>
              <dd>{blueprint.method}</dd>
            </div>
            <div data-state={!isResolving || isComplete ? "complete" : "pending"}>
              <dt>Dashboard outcome</dt>
              <dd>{blueprint.delivery}</dd>
            </div>
          </dl>
        </section>

        <section
          className="pv2-reporting-architecture__dashboard"
          aria-labelledby={`${scopeId}-dashboard`}
        >
          <header className="pv2-reporting-architecture__section-header">
            <div>
              <p>Outcome</p>
              <h4 id={`${scopeId}-dashboard`}>Live dashboard</h4>
            </div>
            <span>{dashboardStatus}</span>
          </header>

          <ol role="list">
            {experience.paths.map((path, index) => {
              const available = index < completedCount;
              return (
                <li data-state={available ? "complete" : "pending"} key={path.key}>
                  <div>
                    <span>Metric {String(index + 1).padStart(2, "0")}</span>
                    <strong>
                      {available ? "Available on demand" : "Manual analysis required"}
                    </strong>
                  </div>
                  <span aria-hidden="true" />
                </li>
              );
            })}
          </ol>

          <p className="pv2-reporting-architecture__dashboard-note">{experience.dashboardLabel}</p>
        </section>
      </div>
    </figure>
  );
}
