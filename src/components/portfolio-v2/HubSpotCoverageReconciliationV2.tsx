import { useEffect, useRef, useState } from "react";

import type { HubSpotCoverageReconciliationProofExperience } from "@/content/portfolio-v2/types";

type HubSpotCoverageReconciliationV2Props = {
  experience: HubSpotCoverageReconciliationProofExperience;
  playback?: "once" | "repeat";
  headingLevel?: "h2" | "h4";
  headingId?: string;
};

const FINAL_PHASE = 4;
const PHASE_DELAYS_MS = [240, 920, 1660, 2580, 3520] as const;
const REPEAT_DELAY_MS = 5600;

export function HubSpotCoverageReconciliationV2({
  experience,
  playback = "repeat",
  headingLevel = "h4",
  headingId,
}: HubSpotCoverageReconciliationV2Props) {
  const proofRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(FINAL_PHASE);
  const Heading = headingLevel;

  useEffect(() => {
    const proof = proofRef.current;
    if (!proof) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timers: number[] = [];
    let played = false;
    let inView = false;

    const finish = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
      setPhase(FINAL_PHASE);
    };

    const play = () => {
      if (played || reducedMotion.matches || document.hidden) return;
      played = true;
      setPhase(0);
      PHASE_DELAYS_MS.slice(1).forEach((delay, index) => {
        timers.push(window.setTimeout(() => setPhase(index + 1), delay));
      });

      if (playback === "repeat") {
        timers.push(
          window.setTimeout(() => {
            played = false;
            play();
          }, REPEAT_DELAY_MS),
        );
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              if (inView) play();
              else if (played) {
                finish();
                if (playback === "repeat") played = false;
              }
            },
            { threshold: 0.35 },
          )
        : null;

    if (observer) observer.observe(proof);
    else {
      inView = true;
      play();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        finish();
        if (playback === "repeat") played = false;
      } else if (inView) play();
    };

    const handleMotionChange = () => {
      finish();
      if (playback === "repeat") played = false;
      if (!reducedMotion.matches && inView) play();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      finish();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [playback]);

  return (
    <figure className="pv2-hubspot-reconciliation" data-phase={phase} ref={proofRef}>
      <figcaption className="pv2-hubspot-reconciliation__caption">
        <p>{experience.eyebrow}</p>
        <Heading id={headingId}>{experience.heading}</Heading>
      </figcaption>

      <div className="pv2-hubspot-reconciliation__canvas" aria-hidden="true">
        <section className="pv2-hubspot-reconciliation__assigned" data-scene="assigned">
          <span>{experience.labels.assigned}</span>
          <strong>{experience.totalAssigned}</strong>
          <p>{experience.labels.assignedUnit}</p>
        </section>

        <div className="pv2-hubspot-reconciliation__routes" data-scene="routes">
          {experience.routes.map((route) => (
            <section key={route.label}>
              <div>
                <strong>{route.count}</strong>
                <span>{route.label}</span>
              </div>
              <div className="pv2-hubspot-reconciliation__tokens">
                {Array.from({ length: route.count }, (_, index) => (
                  <i key={`${route.label}-${index}`} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="pv2-hubspot-reconciliation__comparison">
          <section className="pv2-hubspot-reconciliation__earlier" data-scene="gap">
            <span>{experience.labels.earlierReport}</span>
            <strong>
              {experience.earlierMeasured} {experience.labels.measuredUnit}
            </strong>
            <p>
              {experience.missingFromReport} {experience.labels.missingUnit}
            </p>
          </section>

          <div className="pv2-hubspot-reconciliation__correction" data-scene="correction">
            <span>{experience.labels.correction}</span>
            <p>{experience.correction}</p>
          </div>

          <section className="pv2-hubspot-reconciliation__current" data-scene="current">
            <span>{experience.labels.currentCoverage}</span>
            <strong>
              {experience.currentMeasured} {experience.labels.measuredUnit}
            </strong>
            <p>{experience.labels.currentSupport}</p>
          </section>
        </div>
      </div>

      <div className="pv2-hubspot-reconciliation__outcome">
        <strong>{experience.outcomeHeading}</strong>
        <span>{experience.outcomeBody}</span>
      </div>
    </figure>
  );
}
