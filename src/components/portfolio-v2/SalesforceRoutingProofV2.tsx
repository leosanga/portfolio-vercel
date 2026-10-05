import { useEffect, useRef, useState } from "react";

import type { SalesforceRoutingProofExperience } from "@/content/portfolio-v2/types";

type SalesforceRoutingProofV2Props = {
  experience: SalesforceRoutingProofExperience;
  playback?: "once" | "repeat";
  headingLevel?: "h2" | "h3" | "h4";
  headingId?: string;
  animationEnabled?: boolean;
};

const FINAL_PHASE = 8;
const SETUP_BEAT_MS = 350;
const OUTCOME_HOLD_MS = 1800;
const FINAL_HOLD_MS = OUTCOME_HOLD_MS;
const FIRST_OUTCOME_MS = SETUP_BEAT_MS * 4;
const PHASE_DELAYS_MS = [
  0,
  SETUP_BEAT_MS,
  SETUP_BEAT_MS * 2,
  SETUP_BEAT_MS * 3,
  FIRST_OUTCOME_MS,
  FIRST_OUTCOME_MS + OUTCOME_HOLD_MS,
  FIRST_OUTCOME_MS + OUTCOME_HOLD_MS * 2,
  FIRST_OUTCOME_MS + OUTCOME_HOLD_MS * 3,
  FIRST_OUTCOME_MS + OUTCOME_HOLD_MS * 4,
] as const;
const REPEAT_DELAY_MS = PHASE_DELAYS_MS[FINAL_PHASE] + FINAL_HOLD_MS;

export function SalesforceRoutingProofV2({
  experience,
  playback = "repeat",
  headingLevel = "h4",
  headingId,
  animationEnabled,
}: SalesforceRoutingProofV2Props) {
  const proofRef = useRef<HTMLElement>(null);
  const catalogOncePlayedRef = useRef(false);
  const [phase, setPhase] = useState(FINAL_PHASE);
  const Heading = headingLevel;
  const [contextLabel, destinationLabel, followUpLabel] = experience.columns;
  const routes = experience.outcomes.filter((outcome) => !outcome.isReview);
  const review = experience.outcomes.find((outcome) => outcome.isReview);
  const selectedRoute = phase === 7 ? -1 : phase >= 6 ? 2 : phase >= 5 ? 1 : phase >= 2 ? 0 : -2;
  const evidenceReady = phase >= 1;
  const routeReady = phase >= 3;
  const actionReady = phase >= 4;

  useEffect(() => {
    if (animationEnabled === false) {
      setPhase(FINAL_PHASE);
      return;
    }

    const proof = proofRef.current;
    if (!proof) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timers: number[] = [];
    let inView = false;
    let played = false;

    const finish = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
      setPhase(FINAL_PHASE);
    };

    const play = () => {
      if (animationEnabled !== undefined && playback === "once" && catalogOncePlayedRef.current) {
        return;
      }
      if (played || reducedMotion.matches || document.hidden || !inView) return;
      if (animationEnabled !== undefined && playback === "once") {
        catalogOncePlayedRef.current = true;
      }
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

    const updatePlayback = () => {
      if (document.hidden || reducedMotion.matches || !inView) {
        finish();
        if (playback === "repeat") played = false;
      } else {
        play();
      }
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? false;
              updatePlayback();
            },
            { threshold: 0.35 },
          )
        : null;

    if (observer) observer.observe(proof);
    else {
      inView = true;
      updatePlayback();
    }

    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      finish();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, [animationEnabled, playback]);

  return (
    <figure className="pv2-salesforce-routing" ref={proofRef} aria-labelledby={headingId}>
      <figcaption className="pv2-salesforce-routing__caption">
        <p>{experience.eyebrow}</p>
        <Heading id={headingId}>{experience.heading}</Heading>
      </figcaption>

      <div className="pv2-salesforce-routing__canvas" data-phase={phase} aria-hidden="true">
        <div className="pv2-salesforce-routing__request">
          <span>Inbound request</span>
          <strong>Demo request</strong>
          <small>{experience.request}</small>
        </div>

        <div className="pv2-salesforce-routing__evidence" data-ready={evidenceReady}>
          <span>Relationship evidence</span>
          <div className="pv2-salesforce-routing__current">
            {routes.map((outcome, index) => (
              <strong data-selected={selectedRoute === index} key={outcome.context}>
                {outcome.context}
              </strong>
            ))}
            {review ? (
              <strong data-selected={phase === 7} data-interrupted="true">
                {review.context}
              </strong>
            ) : null}
          </div>
          <div className="pv2-salesforce-routing__records">
            <div data-emphasis="true">
              <i aria-hidden="true" />
              <span>Company</span>
            </div>
            <div data-emphasis={selectedRoute >= 1}>
              <i aria-hidden="true" />
              <span>Contact</span>
            </div>
            <div data-emphasis={selectedRoute >= 1}>
              <i aria-hidden="true" />
              <span>Account</span>
            </div>
            <div data-emphasis={selectedRoute === 1}>
              <i aria-hidden="true" />
              <span>Opportunity</span>
            </div>
          </div>
        </div>

        <div
          className="pv2-salesforce-routing__followup"
          data-ready={routeReady}
          data-interrupted={phase === 7}
        >
          <span>Responsible follow-up</span>
          {routes.map((outcome, index) => (
            <div
              className="pv2-salesforce-routing__resolution"
              data-selected={selectedRoute === index}
              data-action-ready={actionReady}
              key={outcome.context}
            >
              <strong>{outcome.destination}</strong>
              <small>{outcome.followUp}</small>
            </div>
          ))}
          {review ? (
            <div
              className="pv2-salesforce-routing__resolution pv2-salesforce-routing__resolution--review"
              data-selected={phase === 7}
              data-action-ready={actionReady}
            >
              <strong>{review.destination}</strong>
              <small>{review.followUp}</small>
            </div>
          ) : null}
        </div>

        <ol className="pv2-salesforce-routing__history">
          {routes.map((outcome, index) => (
            <li data-current={selectedRoute === index && phase !== 7} key={outcome.context}>
              <span>{outcome.context}</span>
              <strong>{outcome.destination}</strong>
              <small>{outcome.followUp}</small>
            </li>
          ))}
        </ol>

        {review ? (
          <div className="pv2-salesforce-routing__stop" data-interrupted={phase === 7}>
            <span>Separate stop condition</span>
            <strong>{review.context}</strong>
            <span>{review.destination}</span>
            <small>{review.followUp}</small>
          </div>
        ) : null}
      </div>

      <div className="pv2-visually-hidden">
        <p>
          {experience.request}. The same person and company remain constant as the CRM relationship
          changes.
        </p>
        <ol>
          {routes.map((outcome) => (
            <li key={outcome.context}>
              {contextLabel}: {outcome.context}. {destinationLabel}: {outcome.destination}.{" "}
              {followUpLabel}: {outcome.followUp}.
            </li>
          ))}
        </ol>
        {review ? (
          <p>
            Separate stop condition. {contextLabel}: {review.context}. {destinationLabel}:{" "}
            {review.destination}. {followUpLabel}: {review.followUp}.
          </p>
        ) : null}
      </div>
    </figure>
  );
}
