export function HeroSignalV2() {
  return (
    <svg className="pv2-hero-signal" viewBox="0 0 720 640" aria-hidden="true" focusable="false">
      <path className="pv2-hero-signal__path" d="M90 320H350" />
      <path className="pv2-hero-signal__path" d="M350 320C430 320 450 180 590 180" />
      <path className="pv2-hero-signal__path" d="M350 320C430 320 450 460 590 460" />
      <circle className="pv2-hero-signal__start" cx="90" cy="320" r="13" />
      <circle className="pv2-hero-signal__output" cx="590" cy="180" r="10" />
      <circle className="pv2-hero-signal__output" cx="590" cy="460" r="10" />
      <circle className="pv2-hero-signal__dot pv2-hero-signal__dot--trunk" cx="0" cy="0" r="6" />
      <circle className="pv2-hero-signal__dot pv2-hero-signal__dot--upper" cx="0" cy="0" r="6" />
      <circle className="pv2-hero-signal__dot pv2-hero-signal__dot--lower" cx="0" cy="0" r="6" />
    </svg>
  );
}
