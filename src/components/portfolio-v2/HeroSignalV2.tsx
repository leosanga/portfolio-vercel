import { useEffect, useRef, useState } from "react";

export function HeroSignalV2() {
  const signalRef = useRef<SVGSVGElement>(null);
  const [motionActive, setMotionActive] = useState(false);

  useEffect(() => {
    const hero = signalRef.current?.closest(".pv2-hero");
    if (!hero || !("IntersectionObserver" in window)) return;
    let inView = false;
    const update = () => setMotionActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <>
      <svg
        className="pv2-hero-signal pv2-hero-frame--compact"
        viewBox="0 0 720 640"
        aria-hidden="true"
        focusable="false"
      >
        <path className="pv2-hero-signal__path" d="M90 320H350" />
        <path className="pv2-hero-signal__path" d="M350 320C430 320 450 180 590 180" />
        <path className="pv2-hero-signal__path" d="M350 320C430 320 450 460 590 460" />
        <circle className="pv2-hero-signal__start" cx="90" cy="320" r="13" />
        <circle className="pv2-hero-signal__output" cx="590" cy="180" r="10" />
        <circle className="pv2-hero-signal__output" cx="590" cy="460" r="10" />
      </svg>
      <svg
        className="pv2-hero-signal pv2-hero-frame--wide pv2-hero-depth-plane pv2-hero-depth-plane--trunk"
        ref={signalRef}
        data-motion-active={motionActive}
        viewBox="0 0 1200 640"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="pv2-hero-signal__path" d="M540 320H650" />
        <circle
          className="pv2-hero-signal__start pv2-hero-frame__source"
          cx="540"
          cy="320"
          r="13"
        />
        <circle className="pv2-hero-frame__dot pv2-hero-frame__dot--trunk" cx="0" cy="0" r="6" />
      </svg>
      <svg
        className="pv2-hero-signal pv2-hero-frame--wide pv2-hero-depth-plane pv2-hero-depth-plane--upper"
        data-motion-active={motionActive}
        viewBox="0 0 1200 640"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="pv2-hero-signal__path" d="M650 320H700V16H1150" />
        <circle
          className="pv2-hero-signal__output pv2-hero-frame__output"
          cx="1150"
          cy="16"
          r="10"
        />
        <circle className="pv2-hero-frame__dot pv2-hero-frame__dot--upper" cx="0" cy="0" r="6" />
      </svg>
      <svg
        className="pv2-hero-signal pv2-hero-frame--wide pv2-hero-depth-plane pv2-hero-depth-plane--lower"
        data-motion-active={motionActive}
        viewBox="0 0 1200 640"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="pv2-hero-signal__path" d="M650 320H700V624H1150" />
        <circle
          className="pv2-hero-signal__output pv2-hero-frame__output"
          cx="1150"
          cy="624"
          r="10"
        />
        <circle className="pv2-hero-frame__dot pv2-hero-frame__dot--lower" cx="0" cy="0" r="6" />
      </svg>
    </>
  );
}
