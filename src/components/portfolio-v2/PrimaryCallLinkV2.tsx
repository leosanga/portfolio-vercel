import { CONTACT } from "@/content/portfolio-v2/content";

type PrimaryCallLinkV2Props = {
  compact?: boolean;
  className?: string;
};

export function PrimaryCallLinkV2({ compact = false, className = "" }: PrimaryCallLinkV2Props) {
  return (
    <a
      className={`pv2-primary-call ${className}`}
      href={CONTACT.bookingUrl}
      aria-label="Schedule a Call"
    >
      <span className={compact ? "pv2-primary-call__full" : undefined}>Schedule a Call</span>
      {compact ? <span className="pv2-primary-call__compact">Call</span> : null}
      <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
        <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
      </svg>
    </a>
  );
}
