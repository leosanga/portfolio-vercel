import type { CaseEvidenceMedia } from "@/content/portfolio-v2/types";

type CaseEvidenceFigureV2Props = {
  evidence: CaseEvidenceMedia;
};

// Canvas screenshots are wider than the content column, so their node labels shrink below reading
// size, and on a phone they show only the stage's shape. The full-size link opens the original image,
// which needs no script and keeps working at any zoom.
export function CaseEvidenceFigureV2({ evidence }: CaseEvidenceFigureV2Props) {
  return (
    <figure className="pv2-case-evidence">
      <p className="pv2-case-evidence__label">{evidence.label}</p>
      <div className="pv2-case-evidence__frame">
        <img
          src={evidence.src}
          alt={evidence.alt}
          width={evidence.width}
          height={evidence.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption>
        <p>{evidence.caption}</p>
        <a href={evidence.src} target="_blank" rel="noopener">
          Open full size<span className="pv2-visually-hidden"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
