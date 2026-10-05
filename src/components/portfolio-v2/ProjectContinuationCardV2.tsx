import { useId } from "react";

type ProjectContinuationCardV2Props = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export function ProjectContinuationCardV2({
  title,
  description,
  href,
  linkLabel,
}: ProjectContinuationCardV2Props) {
  const titleId = useId();
  const actionId = useId();

  return (
    <div className="pv2-continuation-card">
      <h2 id={titleId} className="pv2-continuation-card__title">
        {title}
      </h2>
      <p className="pv2-continuation-card__description">{description}</p>
      <a
        className="pv2-featured-project__case-link pv2-continuation-card__link"
        href={href}
        aria-labelledby={`${actionId} ${titleId}`}
      >
        <span id={actionId}>{linkLabel}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
        </svg>
      </a>
    </div>
  );
}
