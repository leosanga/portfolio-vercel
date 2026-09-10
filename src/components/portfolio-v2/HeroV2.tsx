import { HERO } from "@/content/portfolio-v2/content";

import { HeroSignalV2 } from "./HeroSignalV2";
import { PortraitV2 } from "./PortraitV2";
import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";

export function HeroV2() {
  return (
    <section className="pv2-hero" aria-labelledby="pv2-hero-title">
      <div className="pv2-frame pv2-hero__grid">
        <HeroSignalV2 />
        <div className="pv2-hero__copy">
          <p className="pv2-role pv2-hero-enter pv2-hero-enter--1">{HERO.role}</p>
          <h1 id="pv2-hero-title" className="pv2-hero-enter pv2-hero-enter--2">
            {HERO.headline}
          </h1>
          <p className="pv2-hero__support pv2-hero-enter pv2-hero-enter--3">{HERO.support}</p>
          <div className="pv2-hero__action pv2-hero-enter pv2-hero-enter--4">
            <PrimaryCallLinkV2 />
          </div>
        </div>
        <div className="pv2-hero__portrait pv2-portrait-enter">
          <PortraitV2 />
        </div>
      </div>
    </section>
  );
}
