import { useEffect, useRef, useState } from "react";

import { HUBSPOT_LEAD_ROUTING_CASE_STUDY } from "@/content/portfolio-v2/hubspot-lead-routing";

const FINAL_PHASE = 5;
const PHASE_DELAY_MS = 900;
const LOOP_DELAY_MS = 9800;

function resolveState(itemPhase: number, currentPhase: number) {
  if (currentPhase === FINAL_PHASE || itemPhase < currentPhase) return "complete";
  if (itemPhase === currentPhase) return "active";
  return "waiting";
}

export function HubSpotDecisionTrailV2() {
  const { decisionTrail } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;
  const trailRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(FINAL_PHASE);

  useEffect(() => {
    const trail = trailRef.current;
    if (!trail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timers: number[] = [];
    let isInView = false;

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const play = () => {
      clearTimers();
      setPhase(0);

      for (let nextPhase = 1; nextPhase <= FINAL_PHASE; nextPhase += 1) {
        timers.push(window.setTimeout(() => setPhase(nextPhase), PHASE_DELAY_MS * nextPhase));
      }

      timers.push(window.setTimeout(play, LOOP_DELAY_MS));
    };

    const updatePlayback = () => {
      if (reducedMotion.matches || document.hidden || !isInView) {
        clearTimers();
        setPhase(FINAL_PHASE);
        return;
      }

      play();
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              isInView = entry?.isIntersecting ?? true;
              updatePlayback();
            },
            { threshold: 0.3 },
          )
        : null;

    if (observer) observer.observe(trail);
    else {
      isInView = true;
      updatePlayback();
    }

    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      clearTimers();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <figure className="pv2-hubspot-decision-trail" data-phase={phase} ref={trailRef}>
      <figcaption>
        <span>{decisionTrail.label}</span>
        <strong>{decisionTrail.heading}</strong>
      </figcaption>

      <div className="pv2-hubspot-decision-trail__canvas">
        <section className="pv2-hubspot-decision-trail__lane">
          <header>
            <h3>{decisionTrail.currentStateLabel}</h3>
            <p>{decisionTrail.currentStateSupport}</p>
          </header>
          <ul className="pv2-hubspot-decision-trail__states">
            {decisionTrail.currentStates.map((state) => (
              <li data-state={resolveState(state.phase, phase)} key={state.label}>
                <i aria-hidden="true" />
                <span>{state.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pv2-hubspot-decision-trail__lane">
          <header>
            <h3>{decisionTrail.historyLabel}</h3>
            <p>{decisionTrail.historySupport}</p>
          </header>
          <ul className="pv2-hubspot-decision-trail__history">
            {decisionTrail.historyItems.map((item) => (
              <li
                data-persistent={item.persistent ? "true" : "false"}
                data-state={resolveState(item.phase, phase)}
                key={item.label}
              >
                <i aria-hidden="true" />
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="pv2-hubspot-decision-trail__lane pv2-hubspot-decision-trail__reporting"
          data-state={phase === FINAL_PHASE ? "complete" : "waiting"}
        >
          <header>
            <h3>{decisionTrail.reportingLabel}</h3>
            <p>{decisionTrail.reportingSupport}</p>
          </header>
          <div className="pv2-hubspot-decision-trail__reconcile">
            <span>{decisionTrail.reportingSource}</span>
            <i aria-hidden="true" />
            <span>{decisionTrail.reportingTarget}</span>
            <strong>{decisionTrail.reportingResult}</strong>
          </div>
        </section>
      </div>
    </figure>
  );
}
