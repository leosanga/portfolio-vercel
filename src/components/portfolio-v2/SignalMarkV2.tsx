type SignalMarkV2Props = {
  className?: string;
  animated?: boolean;
};

export function SignalMarkV2({ className = "", animated = false }: SignalMarkV2Props) {
  return (
    <svg
      aria-hidden="true"
      className={`pv2-signal-mark ${animated ? "pv2-signal-mark--animated" : ""} ${className}`}
      viewBox="0 0 48 48"
      focusable="false"
    >
      <path className="pv2-signal-mark__line" d="M11 24H24" />
      <path className="pv2-signal-mark__line" d="M24 14V34M24 14H37M24 34H37" />
      <rect className="pv2-signal-mark__start" x="4" y="21" width="7" height="7" rx="1.5" />
      <rect className="pv2-signal-mark__output" x="37" y="10" width="7" height="7" rx="1.5" />
      <rect className="pv2-signal-mark__output" x="37" y="31" width="7" height="7" rx="1.5" />
      {animated ? <circle className="pv2-signal-mark__signal" cx="7" cy="24" r="2" /> : null}
    </svg>
  );
}
