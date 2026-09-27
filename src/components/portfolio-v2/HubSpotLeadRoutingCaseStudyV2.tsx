import {
  HUBSPOT_COVERAGE_RECONCILIATION_PROOF,
  HUBSPOT_LEAD_ROUTING_CASE_STUDY,
  HUBSPOT_LEAD_ROUTING_OVERVIEW,
  HUBSPOT_LEAD_ROUTING_STACK,
} from "@/content/portfolio-v2/hubspot-lead-routing";

import { FooterV2 } from "./FooterV2";
import { HubSpotCoverageReconciliationV2 } from "./HubSpotCoverageReconciliationV2";
import { HubSpotEvidenceFigureV2 } from "./HubSpotEvidenceFigureV2";
import { HubSpotLeadJourneyV2 } from "./HubSpotLeadJourneyV2";
import { HubSpotSafeguardsV2 } from "./HubSpotSafeguardsV2";
import { HubSpotSystemBoundaryV2 } from "./HubSpotSystemBoundaryV2";
import { PortfolioUtilityDockV2 } from "./PortfolioUtilityDockV2";
import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";
import { SignalMarkV2 } from "./SignalMarkV2";

export function HubSpotLeadRoutingCaseStudyV2() {
  const { hero, discoveries, rollout, close } = HUBSPOT_LEAD_ROUTING_CASE_STUDY;

  return (
    <div className="portfolio-v2 pv2-case-study pv2-hubspot-case" id="top">
      <a className="pv2-skip-link" href="#case-study-content">
        Skip to case study
      </a>

      <header className="pv2-case-nav">
        <div className="pv2-frame pv2-case-nav__inner">
          <a className="pv2-case-nav__identity" href="/" aria-label="Leo Sanga, home">
            <SignalMarkV2 />
            <span>Leo Sanga</span>
          </a>
          <div className="pv2-case-nav__actions">
            <a href="/#projects">Back to projects</a>
            <PrimaryCallLinkV2 compact />
          </div>
        </div>
      </header>

      <main id="case-study-content" className="pv2-case-main">
        <section className="pv2-case-hero pv2-hubspot-hero" aria-labelledby="case-study-title">
          <div className="pv2-frame pv2-case-hero__grid pv2-hubspot-hero__grid">
            <div className="pv2-hubspot-hero__title">
              <h1 id="case-study-title">{hero.title}</h1>
            </div>

            <div className="pv2-hubspot-hero__details">
              <p className="pv2-case-hero__support">{hero.support}</p>

              <div className="pv2-case-hero__stack">
                <p>{hero.builtWithLabel}</p>
                <div className="pv2-project-stack" aria-label="Technologies">
                  {HUBSPOT_LEAD_ROUTING_STACK.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className="pv2-hubspot-case__environment">{hero.environment}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pv2-case-signature-proof pv2-case-hubspot-proof"
          aria-labelledby="hubspot-coverage-title"
        >
          <div className="pv2-frame">
            <HubSpotCoverageReconciliationV2
              experience={HUBSPOT_COVERAGE_RECONCILIATION_PROOF}
              playback={"repeat"}
              headingLevel="h2"
              headingId="hubspot-coverage-title"
            />
          </div>
        </section>

        <section className="pv2-case-section pv2-case-overview" aria-labelledby="overview-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header pv2-case-section__header--compact">
              <p className="pv2-case-section__index" aria-hidden="true">
                01
              </p>
              <h2 id="overview-title">Overview</h2>
            </header>
            <div className="pv2-case-overview__grid">
              <div className="pv2-project-field">
                <p className="pv2-project-field__label">The problem</p>
                <p>{HUBSPOT_LEAD_ROUTING_OVERVIEW.problem}</p>
              </div>
              <div className="pv2-project-field pv2-project-field--emphasis">
                <p className="pv2-project-field__label">What I built</p>
                <p>{HUBSPOT_LEAD_ROUTING_OVERVIEW.solution}</p>
              </div>
              <div className="pv2-project-field">
                <p className="pv2-project-field__label">The hard part</p>
                <p>{HUBSPOT_LEAD_ROUTING_OVERVIEW.hardPart}</p>
              </div>
            </div>
          </div>
        </section>

        <HubSpotLeadJourneyV2 />
        <HubSpotSafeguardsV2 />

        <section
          className="pv2-case-section pv2-hubspot-discoveries"
          aria-labelledby="discoveries-title"
        >
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                04
              </p>
              <h2 id="discoveries-title">{discoveries.heading}</h2>
              <p>{discoveries.intro}</p>
            </header>

            <div className="pv2-hubspot-discoveries__context" aria-label="Evidence context">
              {discoveries.evidenceContext.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="pv2-hubspot-discoveries__list">
              {discoveries.items.map((discovery) => (
                <article className="pv2-hubspot-discovery" key={discovery.heading}>
                  <div className="pv2-hubspot-discovery__story">
                    <p>Finding</p>
                    <h3>{discovery.heading}</h3>
                    <p>{discovery.explanation}</p>
                    <dl>
                      <div>
                        <dt>What changed</dt>
                        <dd>{discovery.resolution}</dd>
                      </div>
                      <div>
                        <dt>Result</dt>
                        <dd>{discovery.result}</dd>
                      </div>
                      <div>
                        <dt>What remains</dt>
                        <dd>{discovery.limit}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="pv2-hubspot-discovery__evidence">
                    <HubSpotEvidenceFigureV2 evidence={discovery.evidence} layout="report" />
                  </div>
                </article>
              ))}
            </div>

            <article className="pv2-hubspot-supporting-evidence">
              <div>
                <p>{discoveries.supportingEvidence.label}</p>
                <h3>{discoveries.supportingEvidence.heading}</h3>
                <p>{discoveries.supportingEvidence.body}</p>
              </div>
              <HubSpotEvidenceFigureV2
                evidence={discoveries.supportingEvidence.evidence}
                layout="report"
              />
            </article>
          </div>
        </section>

        <HubSpotSystemBoundaryV2 />

        <section className="pv2-case-section pv2-hubspot-rollout" aria-labelledby="rollout-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                06
              </p>
              <h2 id="rollout-title">{rollout.heading}</h2>
              <p>{rollout.intro}</p>
            </header>

            <ol className="pv2-hubspot-rollout__stages">
              {rollout.stages.map((stage, index) => (
                <li data-current={index === 0 ? "true" : "false"} key={stage.title}>
                  <header>
                    <p>{stage.state}</p>
                  </header>
                  <h3>{stage.title}</h3>
                  <p>{stage.support}</p>
                  <ul>
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className="pv2-hubspot-rollout__close">{rollout.close}</p>
          </div>
        </section>

        <section className="pv2-case-close" aria-labelledby="case-close-title">
          <div className="pv2-frame pv2-case-close__grid">
            <div>
              <h2 id="case-close-title">{close.heading}</h2>
              <p>{close.support}</p>
            </div>
            <div className="pv2-case-close__action">
              <PrimaryCallLinkV2 />
              <p>{close.duration}</p>
            </div>
          </div>
        </section>
      </main>

      <FooterV2 />
      <PortfolioUtilityDockV2 homeHref="/" />
    </div>
  );
}
