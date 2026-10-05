import { NAVIGATION } from "@/content/portfolio-v2/content";

import { PortfolioHeaderV2 } from "./PortfolioHeaderV2";
import { useActiveSectionV2 } from "./useActiveSectionV2";

const SECTION_IDS = NAVIGATION.flatMap((item) => (item.kind === "section" ? [item.id] : []));

export function PortfolioNavV2() {
  const { active, scrolled } = useActiveSectionV2(SECTION_IDS);

  return <PortfolioHeaderV2 context="home" activeSection={active} scrolled={scrolled} />;
}
