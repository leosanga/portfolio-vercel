import { useEffect, useState } from "react";

import { ExecutiveReportingArchitectureV2 } from "@/components/portfolio-v2/ExecutiveReportingArchitectureV2";
import { LeadQualificationLoopV2 } from "@/components/portfolio-v2/LeadQualificationLoopV2";
import { OutboundDraftAssemblyV2 } from "@/components/portfolio-v2/OutboundDraftAssemblyV2";
import { SupportTicketLifecycleV2 } from "@/components/portfolio-v2/SupportTicketLifecycleV2";
import { WorkflowDiagramV2 } from "@/components/portfolio-v2/WorkflowDiagramV2";
import type { ProjectVisualExperience } from "@/content/portfolio-v2/types";
import type { HomepageCatalogEntry } from "@/content/project-catalog/mixed-catalog";
import { useCatalogVisualMotion } from "./useCatalogVisualMotion";

function assertNever(value: never): never {
  throw new Error(`Unknown homepage visual: ${String(value)}`);
}

function VisualExperience({
  experience,
  playing,
}: {
  experience: ProjectVisualExperience;
  playing: boolean;
}) {
  switch (experience.kind) {
    case "lead-qualification-loop":
      return (
        <LeadQualificationLoopV2
          experience={experience}
          open
          shouldAnimate={playing}
          playback="loop"
        />
      );
    case "outbound-draft-assembly":
      return (
        <OutboundDraftAssemblyV2 experience={experience} shouldAnimate={playing} playback="loop" />
      );
    case "support-ticket-lifecycle":
      return (
        <SupportTicketLifecycleV2 experience={experience} shouldAnimate={playing} playback="loop" />
      );
    case "executive-reporting-architecture":
      return (
        <ExecutiveReportingArchitectureV2
          experience={experience}
          shouldAnimate={playing}
          playback="loop"
        />
      );
    default:
      return assertNever(experience);
  }
}

/** Reuse homepage motion while the expanded figure remains eligible. */
export function CatalogHomepagePreview({
  entry,
  active,
}: {
  entry: HomepageCatalogEntry;
  active: boolean;
}) {
  const { rootRef, playing } = useCatalogVisualMotion(active);
  const [playbackKey, setPlaybackKey] = useState(0);

  useEffect(() => {
    if (!playing || !entry.project.flow) return;
    const replay = window.setInterval(() => setPlaybackKey((current) => current + 1), 3200);
    return () => window.clearInterval(replay);
  }, [playing, entry.project.flow]);

  return (
    <div className="pc-home-preview" ref={rootRef}>
      {entry.project.visualExperience ? (
        <VisualExperience experience={entry.project.visualExperience} playing={playing} />
      ) : entry.project.flow ? (
        <WorkflowDiagramV2
          flow={entry.project.flow}
          open
          playbackKey={playbackKey}
          animationEnabled={playing}
        />
      ) : null}
    </div>
  );
}
