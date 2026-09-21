import {
  BOOKING_AGENT_CASE_STUDY,
  BOOKING_AGENT_STACK,
} from "@/content/portfolio-v2/booking-agent";

import { BookingAgentArchitectureV2 } from "./BookingAgentArchitectureV2";
import { FooterV2 } from "./FooterV2";
import { PortfolioUtilityDockV2 } from "./PortfolioUtilityDockV2";
import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";
import { SignalMarkV2 } from "./SignalMarkV2";

export function BookingAgentCaseStudyV2() {
  const { hero, overview, protection, evolution, adaptability, close } = BOOKING_AGENT_CASE_STUDY;

  return (
    <div className="portfolio-v2 pv2-case-study" id="top">
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
            <a href="/#projects">Projects</a>
            <PrimaryCallLinkV2 compact />
          </div>
        </div>
      </header>

      <main id="case-study-content" className="pv2-case-main">
        <section className="pv2-case-hero" aria-labelledby="case-study-title">
          <div className="pv2-frame pv2-case-hero__grid">
            <h1 id="case-study-title">{hero.title}</h1>
            <p className="pv2-case-hero__support">{hero.support}</p>
            <div className="pv2-case-hero__stack" aria-label="Tech stack">
              <p>TECH STACK</p>
              <div className="pv2-project-stack">
                {BOOKING_AGENT_STACK.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
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
                <p>{overview.problem}</p>
              </div>
              <div className="pv2-project-field pv2-project-field--emphasis">
                <p className="pv2-project-field__label">What I built</p>
                <p>{overview.solution}</p>
              </div>
              <div className="pv2-project-field">
                <p className="pv2-project-field__label">The hard part</p>
                <p>{overview.hardPart}</p>
              </div>
            </div>
          </div>
        </section>

        <BookingAgentArchitectureV2 />

        <section className="pv2-case-section pv2-case-proof" aria-labelledby="protection-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header">
              <p className="pv2-case-section__index" aria-hidden="true">
                03
              </p>
              <h2 id="protection-title">{protection.heading}</h2>
              <p>{protection.intro}</p>
            </header>
            <div className="pv2-case-proof__chapters">
              {protection.chapters.map((chapter) => (
                <article className="pv2-case-proof__chapter" key={chapter.situation}>
                  <div className="pv2-case-proof__situation">
                    <p className="pv2-case-proof__label">When</p>
                    <h3>{chapter.situation}</h3>
                  </div>
                  <div className="pv2-case-proof__response">
                    <p className="pv2-case-proof__label">What the agent does</p>
                    <p className="pv2-case-proof__outcome">{chapter.outcome}</p>
                    <p className="pv2-case-proof__body">{chapter.body}</p>
                    <div className="pv2-case-proof__check">
                      <p className="pv2-case-proof__label">How this was checked</p>
                      <p>{chapter.checked}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pv2-case-section pv2-case-evolution" aria-labelledby="evolution-title">
          <div className="pv2-frame">
            <header className="pv2-case-section__header pv2-case-section__header--compact">
              <p className="pv2-case-section__index" aria-hidden="true">
                04
              </p>
              <h2 id="evolution-title">{evolution.heading}</h2>
            </header>
            <div className="pv2-case-evolution__chapters">
              {evolution.chapters.map((chapter) => (
                <article className="pv2-case-evolution__chapter" key={chapter.title}>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="pv2-case-section pv2-case-adaptability"
          aria-labelledby="adaptability-title"
        >
          <div className="pv2-frame">
            <header className="pv2-case-section__header pv2-case-section__header--compact">
              <p className="pv2-case-section__index" aria-hidden="true">
                05
              </p>
              <h2 id="adaptability-title">{adaptability.heading}</h2>
            </header>
            <ul className="pv2-case-adaptability__list">
              {adaptability.items.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
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
