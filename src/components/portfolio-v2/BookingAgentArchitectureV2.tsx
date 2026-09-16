import { useEffect, useRef, useState } from "react";

import { BOOKING_AGENT_CASE_STUDY } from "@/content/portfolio-v2/booking-agent";

const FINAL_ARCHITECTURE_STAGE = 3;

export function BookingAgentArchitectureV2() {
  const { architecture } = BOOKING_AGENT_CASE_STUDY;
  const [activeStage, setActiveStage] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [promptLed, productionSafe] = architecture.lanes;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 1023px)");
    let frameId = 0;

    const resolveStage = () => {
      frameId = 0;
      const anchor = window.innerHeight * 0.5;
      const availableSteps = stepRefs.current.filter((step): step is HTMLLIElement =>
        Boolean(step),
      );

      if (!availableSteps.length) return;

      const nearestStep = availableSteps.reduce((nearest, step) => {
        const nearestRect = nearest.getBoundingClientRect();
        const stepRect = step.getBoundingClientRect();
        const nearestDistance = Math.abs(nearestRect.top + nearestRect.height / 2 - anchor);
        const stepDistance = Math.abs(stepRect.top + stepRect.height / 2 - anchor);

        return stepDistance < nearestDistance ? step : nearest;
      });
      const stage = Number(nearestStep.dataset["stage"]);

      if (Number.isInteger(stage)) {
        setActiveStage((currentStage) => (currentStage === stage ? currentStage : stage));
      }
    };

    const scheduleStageResolution = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(resolveStage);
    };

    const stopInteractiveMode = () => {
      window.removeEventListener("scroll", scheduleStageResolution);
      window.removeEventListener("resize", scheduleStageResolution);
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const configureMode = () => {
      stopInteractiveMode();
      const shouldAnimate = !reducedMotion.matches && !compactLayout.matches;
      setIsInteractive(shouldAnimate);

      if (!shouldAnimate) {
        setActiveStage(FINAL_ARCHITECTURE_STAGE);
        return;
      }

      window.addEventListener("scroll", scheduleStageResolution, { passive: true });
      window.addEventListener("resize", scheduleStageResolution);
      scheduleStageResolution();
    };

    configureMode();
    reducedMotion.addEventListener("change", configureMode);
    compactLayout.addEventListener("change", configureMode);

    return () => {
      stopInteractiveMode();
      reducedMotion.removeEventListener("change", configureMode);
      compactLayout.removeEventListener("change", configureMode);
    };
  }, []);

  return (
    <section
      className="pv2-case-section pv2-case-architecture"
      aria-labelledby="architecture-title"
    >
      <div className="pv2-frame">
        <header className="pv2-case-section__header">
          <p className="pv2-case-section__index" aria-hidden="true">
            02
          </p>
          <h2 id="architecture-title">{architecture.heading}</h2>
          <p>{architecture.intro}</p>
        </header>

        <div className="pv2-architecture-story">
          <figure
            className="pv2-architecture-story__visual"
            data-stage={activeStage}
            data-interactive={isInteractive ? "true" : "false"}
            aria-hidden="true"
          >
            <figcaption>
              <span>{architecture.visualLabel}</span>
              <strong>
                {isInteractive ? architecture.chapters[activeStage]?.title : "Before and after"}
              </strong>
            </figcaption>

            <div className="pv2-architecture-story__canvas">
              <div className="pv2-architecture-story__system">
                <div className="pv2-architecture-node" data-active="true">
                  <strong>Guest request</strong>
                </div>
                <span className="pv2-architecture-connector" data-active="true" />
                <div className="pv2-architecture-node pv2-architecture-node--ai" data-active="true">
                  <strong>
                    <span data-visible={activeStage === 0 ? "true" : "false"}>AI decision</span>
                    <span data-visible={activeStage > 0 ? "true" : "false"}>AI proposal</span>
                  </strong>
                  <small>{activeStage === 0 ? "Decides and acts" : "Describes the request"}</small>
                </div>
                <span
                  className="pv2-architecture-connector pv2-architecture-connector--handoff"
                  data-active={activeStage > 0 ? "true" : "false"}
                />
                <div
                  className="pv2-architecture-boundary"
                  data-open={activeStage > 0 ? "true" : "false"}
                  data-active={activeStage >= 2 ? "true" : "false"}
                >
                  <span>Decision authority</span>
                  <div
                    className="pv2-architecture-node"
                    data-active={activeStage >= 2 ? "true" : "false"}
                  >
                    <strong>Tested validation</strong>
                    <small>Checks the rules</small>
                  </div>
                  <span
                    className="pv2-architecture-connector"
                    data-active={activeStage >= 3 ? "true" : "false"}
                  />
                  <div
                    className="pv2-architecture-node"
                    data-active={activeStage >= 3 ? "true" : "false"}
                  >
                    <strong>Booking state check</strong>
                    <small>Checks what is true now</small>
                  </div>
                </div>
                <span
                  className="pv2-architecture-connector pv2-architecture-connector--action"
                  data-active={activeStage === 0 || activeStage >= 3 ? "true" : "false"}
                />
                <div
                  className="pv2-architecture-node pv2-architecture-node--action"
                  data-active={activeStage === 0 || activeStage >= 3 ? "true" : "false"}
                >
                  <strong>Connected action</strong>
                  <small>{activeStage === 0 ? "Direct access" : "Approved changes only"}</small>
                </div>
              </div>

              <div className="pv2-architecture-story__comparison">
                <section>
                  <span>Before</span>
                  <strong>{promptLed.label}</strong>
                  <ol>
                    {promptLed.nodes.map((node) => (
                      <li key={node}>{node}</li>
                    ))}
                  </ol>
                </section>
                <section>
                  <span>After</span>
                  <strong>{productionSafe.label}</strong>
                  <ol>
                    {productionSafe.nodes.map((node, index) => (
                      <li data-boundary={index === 2 || index === 3 ? "true" : "false"} key={node}>
                        {index === 2 ? <small>Decision authority</small> : null}
                        {node}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </figure>

          <ol className="pv2-architecture-story__steps">
            {architecture.chapters.map((chapter, stage) => (
              <li
                aria-current={isInteractive && activeStage === stage ? "step" : undefined}
                data-active={isInteractive && activeStage === stage ? "true" : "false"}
                data-complete={!isInteractive || stage <= activeStage ? "true" : "false"}
                data-stage={stage}
                key={chapter.title}
                ref={(element) => {
                  stepRefs.current[stage] = element;
                }}
              >
                <span>{String(stage + 1).padStart(2, "0")}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
