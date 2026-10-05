import {
  SALESFORCE_ROUTING_CASE_STUDY,
  SALESFORCE_ROUTING_PROOF,
  SALESFORCE_ROUTING_STACK,
} from "@/content/portfolio-v2/salesforce-trial-demo-routing";

import { CaseEvidenceFigureV2 } from "./CaseEvidenceFigureV2";
import { FooterV2 } from "./FooterV2";
import { CaseStudyContinuationV2 } from "./CaseStudyContinuationV2";
import { PortfolioHeaderV2 } from "./PortfolioHeaderV2";
import { PortfolioUtilityDockV2 } from "./PortfolioUtilityDockV2";
import { SalesforceRoutingProofV2 } from "./SalesforceRoutingProofV2";

const safeguardPhases = ["Replay handling", "Recorded outcome", "Credential boundary"] as const;

export function SalesforceTrialDemoCaseStudyV2() {
  const { hero, decision, action, safeguards, status, closing } = SALESFORCE_ROUTING_CASE_STUDY;

  return (
    <div className="portfolio-v2 pv2-case-study pv2-salesforce-case" id="top">
      <a className="pv2-skip-link" href="#case-study-content">
        Skip to case study
      </a>

      <PortfolioHeaderV2 context="case-study" />

      <main id="case-study-content" className="pv2-case-main">
        <section className="pv2-case-hero pv2-salesforce-hero" aria-labelledby="case-study-title">
          <div className="pv2-frame pv2-case-hero__grid pv2-salesforce-hero__grid">
            <div className="pv2-salesforce-hero__title">
              {/* Native pagereveal temporarily owns this title’s attributes before hydration. */}
              <h1 id="case-study-title" suppressHydrationWarning>
                {hero.title.replace(/ \(Salesforce\)$/, "")}
                <span className="pv2-case-hero__platform"> (Salesforce)</span>
              </h1>
            </div>
            <div className="pv2-salesforce-hero__details">
              <p className="pv2-case-hero__support">{hero.support}</p>
              <div className="pv2-case-hero__stack">
                <p>{hero.builtWithLabel}</p>
                <div className="pv2-project-stack" aria-label="Technologies">
                  {SALESFORCE_ROUTING_STACK.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pv2-case-signature-proof pv2-case-salesforce-proof"
          aria-labelledby="salesforce-routing-title"
        >
          <div className="pv2-frame">
            <SalesforceRoutingProofV2
              experience={SALESFORCE_ROUTING_PROOF}
              playback="repeat"
              headingLevel="h2"
              headingId="salesforce-routing-title"
            />
          </div>
        </section>

        <section
          className="pv2-case-section pv2-salesforce-decision"
          aria-labelledby="decision-title"
        >
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                01
              </p>
              <h2 id="decision-title">{decision.heading}</h2>
              <p className="pv2-salesforce-evidence-context">{decision.evidenceContext}</p>
            </header>
            <div className="pv2-salesforce-decision__evidence">
              <div className="pv2-salesforce-decision__run">
                <CaseEvidenceFigureV2 evidence={decision.primaryEvidence} />
                <div className="pv2-salesforce-decision__story">
                  <div>
                    <p>{decision.label}</p>
                    <blockquote>{decision.principle}</blockquote>
                  </div>
                  <div>
                    {decision.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <p className="pv2-salesforce-muted">{decision.boundary}</p>
                  </div>
                </div>
              </div>
              <div className="pv2-salesforce-evidence-detail">
                <CaseEvidenceFigureV2 evidence={decision.detailEvidence} />
              </div>
            </div>
          </div>
        </section>

        <section className="pv2-case-section pv2-salesforce-action" aria-labelledby="action-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                02
              </p>
              <h2 id="action-title">{action.heading}</h2>
              <p>{action.intro}</p>
            </header>
            <div className="pv2-salesforce-action__stories">
              <article className="pv2-salesforce-action__act">
                <div className="pv2-salesforce-action__copy">
                  <p>{action.act.label}</p>
                  <h3>{action.act.heading}</h3>
                  <p>{action.act.body}</p>
                </div>
                <CaseEvidenceFigureV2 evidence={action.act.evidence} />
              </article>
              <article className="pv2-salesforce-action__stop">
                <div className="pv2-salesforce-action__copy">
                  <p>{action.stop.label}</p>
                  <h3>{action.stop.heading}</h3>
                  <p>{action.stop.body}</p>
                </div>
                <CaseEvidenceFigureV2 evidence={action.stop.evidence} />
              </article>
            </div>
          </div>
        </section>

        <section
          className="pv2-case-section pv2-salesforce-safeguards"
          aria-labelledby="safeguards-title"
        >
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                03
              </p>
              <h2 id="safeguards-title">{safeguards.heading}</h2>
              <p>{safeguards.intro}</p>
            </header>
            <div className="pv2-salesforce-safeguards__lifecycle">
              <ol aria-label="Request lifecycle">
                <li>Receipt</li>
                <li>Decision</li>
                <li>Action or hold</li>
                <li>Recorded outcome</li>
              </ol>
            </div>
            <ul className="pv2-salesforce-safeguards__ledger">
              {safeguards.items.map((item, index) => (
                <li key={item.title}>
                  <p className="pv2-salesforce-safeguards__phase">{safeguardPhases[index]}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <p className="pv2-salesforce-safeguards__check">
                    <strong>{safeguards.checkLabel}</strong>
                    <span>{item.check}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="pv2-salesforce-safeguards__evidence">
              <CaseEvidenceFigureV2 evidence={safeguards.evidence} />
              <div className="pv2-salesforce-safeguards__quiet">
                <div>
                  <h3>Verification</h3>
                  <p>{safeguards.verification}</p>
                  <p className="pv2-salesforce-muted">{safeguards.scope}</p>
                </div>
                <div>
                  <h3>{safeguards.limitsLabel}</h3>
                  <ul>
                    {safeguards.limits.map((limit) => (
                      <li key={limit}>{limit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pv2-case-section pv2-salesforce-status" aria-labelledby="status-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                04
              </p>
              <h2 id="status-title">{status.heading}</h2>
            </header>
            <div className="pv2-salesforce-status__groups">
              <div>
                <h3>{status.workingLabel}</h3>
                <ul>
                  {status.working.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{status.environmentLabel}</h3>
                <ul>
                  {status.environment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pv2-case-section pv2-salesforce-closing pv2-case-closing"
          aria-labelledby="closing-title"
        >
          <div className="pv2-frame pv2-salesforce-closing__grid">
            <h2 id="closing-title">{closing.heading}</h2>
            <div className="pv2-salesforce-closing__body">
              {closing.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
        <CaseStudyContinuationV2 currentSlug="salesforce-trial-demo-routing" />
      </main>

      <FooterV2 />
      <PortfolioUtilityDockV2 homeHref="/" />
    </div>
  );
}
