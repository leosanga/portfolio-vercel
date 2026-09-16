import { useEffect, useRef, useState } from "react";

import type { BookingReliabilityProofExperience } from "@/content/portfolio-v2/types";

type BookingReliabilityProofV2Props = {
  experience: BookingReliabilityProofExperience;
};

const BOOKING_PROOF_FINAL_PHASE = 4;
const BOOKING_PROOF_PHASE_DELAYS_MS = [180, 900, 1600, 2300, 3000] as const;
const BOOKING_PROOF_REPEAT_DELAY_MS = 6500;

export function BookingReliabilityProofV2({ experience }: BookingReliabilityProofV2Props) {
  const recordRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<number>(BOOKING_PROOF_FINAL_PHASE);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const record = recordRef.current;
    if (!record) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let playbackTimers: number[] = [];
    let inView = false;

    const clearPlayback = () => {
      playbackTimers.forEach((timer) => window.clearTimeout(timer));
      playbackTimers = [];
    };

    const startPlayback = () => {
      clearPlayback();
      setPhase(-1);

      BOOKING_PROOF_PHASE_DELAYS_MS.forEach((delay, nextPhase) => {
        playbackTimers.push(window.setTimeout(() => setPhase(nextPhase), delay));
      });

      playbackTimers.push(window.setTimeout(startPlayback, BOOKING_PROOF_REPEAT_DELAY_MS));
    };

    const updatePlayback = () => {
      const nextPaused = reducedMotion.matches || document.hidden || !inView;
      setPaused(nextPaused);

      if (nextPaused) {
        clearPlayback();
        setPhase(BOOKING_PROOF_FINAL_PHASE);
        return;
      }

      startPlayback();
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              updatePlayback();
            },
            { threshold: 0.3 },
          )
        : null;

    if (observer) observer.observe(record);
    else {
      inView = true;
      updatePlayback();
    }

    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      clearPlayback();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <figure className="pv2-booking-proof">
      <div className="pv2-booking-proof__header">
        <div>
          <p className="pv2-booking-proof__eyebrow">{experience.eyebrow}</p>
          <h4>{experience.heading}</h4>
        </div>
      </div>

      <p className="pv2-booking-proof__boundary">{experience.boundary}</p>

      <div className="pv2-booking-record__frame">
        <div className="pv2-booking-record__meta" aria-hidden="true">
          <span>Booking outcome record</span>
          <span>{phase >= BOOKING_PROOF_FINAL_PHASE ? "Resolved" : "Evaluating"}</span>
        </div>
        <div
          className="pv2-booking-record"
          data-paused={paused ? "true" : "false"}
          data-phase={phase}
          ref={recordRef}
          aria-hidden="true"
        >
          {experience.rows.map((row) => {
            const resolved = phase >= row.resolvedAt;
            const state = phase < 0 ? "reset" : resolved ? row.tone : "pending";

            return (
              <div className="pv2-booking-record__row" data-state={state} key={row.label}>
                <span>{row.label}</span>
                <strong>{resolved ? row.resolvedValue : row.pendingValue}</strong>
              </div>
            );
          })}
        </div>
      </div>

      <figcaption className="pv2-booking-proof__outcome">
        <strong>{experience.outcomeHeading}</strong>
        <span>{experience.outcomeBody}</span>
      </figcaption>
    </figure>
  );
}
