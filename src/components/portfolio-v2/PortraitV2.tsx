import portrait3x4640Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-640.avif";
import portrait3x4640Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-640.webp";
import portrait3x4960Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-960.avif";
import portrait3x4960Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-960.webp";
import portrait4x3480Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-480.avif";
import portrait4x3480Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-480.webp";
import portrait4x3768Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-768.avif";
import portrait4x3768Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-768.webp";
import portrait4x5640Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-640.avif";
import portrait4x5640Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-640.webp";
import portrait4x5960Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-960.avif";
import portrait4x5960Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-960.webp";
import portrait4x51200Avif from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-1200.avif";
import portrait4x51200Webp from "@/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-1200.webp";
import portraitFallback from "@/assets/portfolio-v2/portrait/leo-sanga-hero-fallback.jpg";
import { HERO } from "@/content/portfolio-v2/content";

import { usePortraitDepth } from "./usePortraitDepth";

export function PortraitV2() {
  const depthRef = usePortraitDepth();

  return (
    <figure className="pv2-portrait-shell">
      <div className="pv2-portrait-frame" ref={depthRef} data-depth-active="false">
        <picture>
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet={`${portrait4x3480Avif} 480w, ${portrait4x3768Avif} 768w`}
            sizes="calc(100vw - 40px)"
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={`${portrait4x3480Webp} 480w, ${portrait4x3768Webp} 768w`}
            sizes="calc(100vw - 40px)"
          />
          <source
            media="(max-width: 1023px)"
            type="image/avif"
            srcSet={`${portrait3x4640Avif} 640w, ${portrait3x4960Avif} 960w`}
            sizes="calc(100vw - 64px)"
          />
          <source
            media="(max-width: 1023px)"
            type="image/webp"
            srcSet={`${portrait3x4640Webp} 640w, ${portrait3x4960Webp} 960w`}
            sizes="calc(100vw - 64px)"
          />
          <source
            type="image/avif"
            srcSet={`${portrait4x5640Avif} 640w, ${portrait4x5960Avif} 960w, ${portrait4x51200Avif} 1200w`}
            sizes="(min-width: 1440px) 520px, 38vw"
          />
          <source
            type="image/webp"
            srcSet={`${portrait4x5640Webp} 640w, ${portrait4x5960Webp} 960w, ${portrait4x51200Webp} 1200w`}
            sizes="(min-width: 1440px) 520px, 38vw"
          />
          <img
            src={portraitFallback}
            alt="Portrait of Leo Sanga"
            width="1200"
            height="1500"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="pv2-portrait-frame__edge" aria-hidden="true" />
      </div>
      <figcaption className="pv2-portrait-caption">{HERO.role}</figcaption>
    </figure>
  );
}
