import { ApproachV2 } from "./ApproachV2";
import { CapabilitiesV2 } from "./CapabilitiesV2";
import { ConversationV2 } from "./ConversationV2";
import { FooterV2 } from "./FooterV2";
import { HeroV2 } from "./HeroV2";
import { PortfolioNavV2 } from "./PortfolioNavV2";
import { PortfolioUtilityDockV2 } from "./PortfolioUtilityDockV2";
import { ProjectsV2 } from "./ProjectsV2";
import { usePortfolioV2Motion } from "./usePortfolioV2Motion";

export function PortfolioV2Page() {
  usePortfolioV2Motion();

  return (
    <div className="portfolio-v2" id="top">
      <a className="pv2-skip-link" href="#main-content-v2">
        Skip to content
      </a>
      <PortfolioNavV2 />
      <main id="main-content-v2" tabIndex={-1}>
        <HeroV2 />
        <ProjectsV2 />
        <CapabilitiesV2 />
        <ApproachV2 />
        <ConversationV2 />
      </main>
      <FooterV2 />
      <PortfolioUtilityDockV2 />
    </div>
  );
}
