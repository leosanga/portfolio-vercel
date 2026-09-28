import { useEffect, useRef, useState } from "react";

import type { ProjectVisualExperience } from "@/content/portfolio-v2/types";

import { ExecutiveReportingArchitectureV2 } from "./ExecutiveReportingArchitectureV2";
import { LeadQualificationLoopV2 } from "./LeadQualificationLoopV2";
import { OutboundDraftAssemblyV2 } from "./OutboundDraftAssemblyV2";
import { SupportTicketLifecycleV2 } from "./SupportTicketLifecycleV2";

export function ProjectVisualDisclosureV2({ experience }: { experience: ProjectVisualExperience }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!reducedMotion.matches);
    update();
    reducedMotion.addEventListener("change", update);
    return () => reducedMotion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin: "120px 0px" },
    );
    observer.observe(details);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = open && inView && documentVisible && motionAllowed;

  return (
    <details
      className="pv2-workflow-disclosure pv2-project-visual-disclosure"
      ref={detailsRef}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <span>
          <span className="pv2-workflow-disclosure__eyebrow">{experience.eyebrow}</span>
          <span className="pv2-workflow-disclosure__label">{experience.disclosureLabel}</span>
        </span>
        <span className="pv2-workflow-disclosure__control" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path d="M4 10h12M10 4v12" />
          </svg>
        </span>
      </summary>
      <div className="pv2-workflow-disclosure__content">
        {experience.kind === "lead-qualification-loop" ? (
          <LeadQualificationLoopV2
            experience={experience}
            open={open}
            shouldAnimate={shouldAnimate}
          />
        ) : experience.kind === "outbound-draft-assembly" ? (
          <OutboundDraftAssemblyV2 experience={experience} shouldAnimate={shouldAnimate} />
        ) : experience.kind === "support-ticket-lifecycle" ? (
          <SupportTicketLifecycleV2 experience={experience} shouldAnimate={shouldAnimate} />
        ) : experience.kind === "executive-reporting-architecture" ? (
          <ExecutiveReportingArchitectureV2 experience={experience} shouldAnimate={shouldAnimate} />
        ) : null}
      </div>
    </details>
  );
}
