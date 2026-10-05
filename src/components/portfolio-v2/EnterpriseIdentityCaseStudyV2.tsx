import { ENTERPRISE_IDENTITY } from "@/content/portfolio-v2/enterprise-identity";
import "@/styles/enterprise-identity.css";

import { EnterpriseIdentitySignatureV2 } from "./EnterpriseIdentitySignatureV2";
import { CaseStudyContinuationV2 } from "./CaseStudyContinuationV2";
import { FooterV2 } from "./FooterV2";
import { PortfolioHeaderV2 } from "./PortfolioHeaderV2";
import { PortfolioUtilityDockV2 } from "./PortfolioUtilityDockV2";
import { useExplanationOnceV2 } from "./useExplanationOnceV2";

function ChapterHeader({
  index,
  heading,
  intro,
  id,
}: {
  index: string;
  heading: string;
  intro: string;
  id: string;
}) {
  return (
    <header className="pv2-case-section__header">
      <p className="pv2-case-section__index" aria-hidden="true">
        {index}
      </p>
      <h2 id={id}>{heading}</h2>
      <p>{intro}</p>
    </header>
  );
}

export function EnterpriseIdentityCaseStudyV2() {
  const { hero, identity, provisioning, internal, endpoint, close } = ENTERPRISE_IDENTITY;
  const endpointRef = useExplanationOnceV2();
  return (
    <div className="portfolio-v2 pv2-case-study pv2-identity-case" id="top">
      <a className="pv2-skip-link" href="#case-study-content">
        Skip to case study
      </a>
      <PortfolioHeaderV2 context="case-study" />
      <main id="case-study-content" className="pv2-case-main" tabIndex={-1}>
        <section className="pv2-case-hero pv2-identity-hero" aria-labelledby="case-study-title">
          <div className="pv2-frame pv2-case-hero__grid">
            <div className="pv2-identity-hero__title">
              <h1 id="case-study-title">{hero.title}</h1>
            </div>
            <div className="pv2-identity-hero__details">
              <p className="pv2-case-hero__support">{hero.support}</p>
              <div className="pv2-case-hero__stack">
                <p>{hero.stackLabel}</p>
                <div className="pv2-project-stack" aria-label={hero.stackLabel}>
                  {hero.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="pv2-case-signature-proof pv2-identity-opening"
          aria-labelledby="identity-signature-title"
        >
          <div className="pv2-frame">
            <EnterpriseIdentitySignatureV2 />
          </div>
        </section>
        <section
          className="pv2-case-section pv2-identity-mapping"
          aria-labelledby="identity-mapping-title"
        >
          <div className="pv2-frame">
            <ChapterHeader
              index="01"
              heading={identity.heading}
              intro={identity.intro}
              id="identity-mapping-title"
            />
            <div className="pv2-identity-mapping__body">
              <div className="pv2-identity-account">
                <p className="pv2-identity-label">{identity.label}</p>
                {identity.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="pv2-identity-decisions">
                {identity.decisions.map((item) => (
                  <div key={item.label}>
                    <dt className="pv2-identity-label">{item.label}</dt>
                    <dd>
                      <strong>{item.question}</strong>
                      <p>{item.body}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section
          className="pv2-case-section pv2-identity-provisioning"
          aria-labelledby="identity-provisioning-title"
        >
          <div className="pv2-frame">
            <ChapterHeader
              index="02"
              heading={provisioning.heading}
              intro={provisioning.intro}
              id="identity-provisioning-title"
            />
            <div className="pv2-identity-provisioning__body">
              <div className="pv2-identity-provisioning__copy">
                {provisioning.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <figure>
                <figcaption className="pv2-identity-label">
                  {provisioning.considerationsLabel}
                </figcaption>
                <dl className="pv2-identity-provisioning-considerations">
                  {provisioning.considerations.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </figure>
            </div>
            <div className="pv2-identity-ownership">
              <p className="pv2-identity-label">{provisioning.ownershipLabel}</p>
              <p>{provisioning.ownership}</p>
            </div>
          </div>
        </section>
        <section
          className="pv2-case-section pv2-identity-internal"
          aria-labelledby="identity-internal-title"
        >
          <div className="pv2-frame">
            <p className="pv2-identity-scope">{internal.scopeLabel}</p>
            <ChapterHeader
              index="03"
              heading={internal.heading}
              intro={internal.intro}
              id="identity-internal-title"
            />
            <div className="pv2-identity-internal__intro">
              <p>{internal.body}</p>
            </div>
            <h3 className="pv2-identity-access-heading">{internal.accessLabel}</h3>
            <dl className="pv2-identity-access">
              {internal.situations.map((item) => (
                <div key={item.when}>
                  <dt>{item.when}</dt>
                  <dd>
                    <p>{item.body}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section
          className="pv2-case-section pv2-identity-endpoint"
          aria-labelledby="identity-endpoint-title"
        >
          <div className="pv2-frame">
            <ChapterHeader
              index="04"
              heading={endpoint.heading}
              intro={endpoint.intro}
              id="identity-endpoint-title"
            />
            <p className="pv2-identity-endpoint__intro">{endpoint.body}</p>
            <figure
              className="pv2-identity-rollout"
              ref={endpointRef}
              aria-labelledby="identity-rollout-label"
            >
              <figcaption id="identity-rollout-label" className="pv2-identity-label">
                {endpoint.sequenceLabel}
              </figcaption>
              <ol>
                {endpoint.stages.map((item) => (
                  <li key={item.label}>
                    <span className="pv2-identity-rollout__marker" aria-hidden="true" />
                    <h3>{item.label}</h3>
                    <p>{item.body}</p>
                    <span className="pv2-identity-cue" data-identity-cue aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </figure>
            <div className="pv2-identity-documentation">
              {endpoint.responsibilities.map((item) => (
                <div key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="pv2-identity-close" aria-labelledby="identity-close-title">
          <div className="pv2-frame">
            <h2 id="identity-close-title">{close.heading}</h2>
            <div className="pv2-identity-close__body">
              {close.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
        <CaseStudyContinuationV2 currentSlug="enterprise-identity-systems-operations" />
      </main>
      <FooterV2 />
      <PortfolioUtilityDockV2 homeHref="/" />
    </div>
  );
}
