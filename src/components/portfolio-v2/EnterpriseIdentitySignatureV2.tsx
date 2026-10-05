import { ENTERPRISE_IDENTITY } from "@/content/portfolio-v2/enterprise-identity";

import { useIdentityExplanationLoopV2 } from "./useIdentityExplanationLoopV2";

type Model = (typeof ENTERPRISE_IDENTITY.signature.models)[number];

function SsoModel({ accent = false }: { accent?: boolean }) {
  return (
    <>
      {!accent && (
        <>
          <rect
            className="pv2-identity-model__source-fill"
            x="15"
            y="30"
            width="190"
            height="140"
            rx="8"
          />
          <rect
            className="pv2-identity-model__outline"
            x="15"
            y="30"
            width="190"
            height="140"
            rx="8"
          />
          <circle className="pv2-identity-model__anchor" cx="45" cy="63" r="8" />
          <path className="pv2-identity-model__outline" d="M65 63H170M40 105H150M40 135H175" />
          <path
            className="pv2-identity-model__fine"
            d="M205 63C315 63 365 90 478 90M205 135C320 135 380 177 485 177"
          />
          <circle className="pv2-identity-model__application-fill" cx="530" cy="90" r="52" />
          <circle className="pv2-identity-model__outline" cx="530" cy="90" r="52" />
          <circle className="pv2-identity-model__outline" cx="530" cy="76" r="11" />
          <path
            className="pv2-identity-model__outline"
            d="M510 113C510 94 550 94 550 113M485 166H577M485 187H562"
          />
        </>
      )}
      {accent && (
        <g className="pv2-identity-model__accent">
          <rect x="15" y="30" width="190" height="140" rx="8" />
          <circle cx="530" cy="90" r="52" />
          <path d="M205 63C315 63 365 90 478 90M205 135C320 135 380 177 485 177" />
        </g>
      )}
    </>
  );
}

function ScimModel({ accent = false }: { accent?: boolean }) {
  return (
    <>
      {!accent && (
        <>
          <path className="pv2-identity-model__source-fill" d="M15 35H275V215H15Z" />
          <path className="pv2-identity-model__outline" d="M15 55V35H275V55M15 195V215H275V195" />
          <path
            className="pv2-identity-model__outline"
            d="M45 75H250M45 110H210M45 145H255M45 180H195"
          />
          <rect
            className="pv2-identity-model__application-fill"
            x="335"
            y="25"
            width="250"
            height="205"
            rx="8"
          />
          <path className="pv2-identity-model__mist" d="M350 25H585V230H350" />
          <rect
            className="pv2-identity-model__outline"
            x="365"
            y="62"
            width="85"
            height="30"
            rx="3"
          />
          <rect
            className="pv2-identity-model__outline"
            x="470"
            y="62"
            width="85"
            height="30"
            rx="3"
          />
          <path className="pv2-identity-model__outline" d="M365 124H550M365 152H510" />
          <path
            className="pv2-identity-model__mist"
            d="M365 191H550M365 182V200M457 182V200M550 182V200"
          />
        </>
      )}
      {accent && (
        <g className="pv2-identity-model__accent pv2-identity-model__accent--mist">
          <path d="M350 25H585V230H350M365 124H550M365 152H510M365 191H550" />
        </g>
      )}
    </>
  );
}

function SsoPhone({ accent = false }: { accent?: boolean }) {
  return (
    <>
      {!accent && (
        <>
          <rect
            className="pv2-identity-model__source-fill"
            x="8"
            y="35"
            width="100"
            height="110"
            rx="6"
          />
          <rect
            className="pv2-identity-model__outline"
            x="8"
            y="35"
            width="100"
            height="110"
            rx="6"
          />
          <circle className="pv2-identity-model__anchor" cx="30" cy="62" r="7" />
          <path className="pv2-identity-model__outline" d="M45 62H88M25 94H83M25 121H93" />
          <path
            className="pv2-identity-model__fine"
            d="M108 62C145 62 165 75 201 75M108 121C150 121 171 140 203 140"
          />
          <circle className="pv2-identity-model__application-fill" cx="245" cy="75" r="42" />
          <circle className="pv2-identity-model__outline" cx="245" cy="75" r="42" />
          <circle className="pv2-identity-model__outline" cx="245" cy="65" r="9" />
          <path
            className="pv2-identity-model__outline"
            d="M228 94C228 79 262 79 262 94M203 140H288M203 157H275"
          />
        </>
      )}
      {accent && (
        <g className="pv2-identity-model__accent">
          <rect x="8" y="35" width="100" height="110" rx="6" />
          <circle cx="245" cy="75" r="42" />
          <path d="M108 62C145 62 165 75 201 75M108 121C150 121 171 140 203 140" />
        </g>
      )}
    </>
  );
}

function ScimPhone({ accent = false }: { accent?: boolean }) {
  return (
    <>
      {!accent && (
        <>
          <path className="pv2-identity-model__source-fill" d="M8 30H120V155H8Z" />
          <path
            className="pv2-identity-model__outline"
            d="M8 45V30H120V45M8 140V155H120V140M25 58H108M25 87H95M25 117H110"
          />
          <rect
            className="pv2-identity-model__application-fill"
            x="145"
            y="20"
            width="147"
            height="145"
            rx="6"
          />
          <path className="pv2-identity-model__mist" d="M155 20H292V165H155" />
          <rect
            className="pv2-identity-model__outline"
            x="165"
            y="50"
            width="45"
            height="24"
            rx="2"
          />
          <rect
            className="pv2-identity-model__outline"
            x="224"
            y="50"
            width="48"
            height="24"
            rx="2"
          />
          <path className="pv2-identity-model__outline" d="M165 101H275M165 123H250M165 147H275" />
        </>
      )}
      {accent && (
        <g className="pv2-identity-model__accent pv2-identity-model__accent--mist">
          <path d="M155 20H292V165H155M165 101H275M165 123H250M165 147H275" />
        </g>
      )}
    </>
  );
}

function ModelDrawing({ model, phone = false }: { model: Model; phone?: boolean }) {
  const isSso = model.protocol === "SSO";
  const viewBox = phone ? "0 0 300 180" : isSso ? "0 0 600 220" : "0 0 600 250";
  const Shape = phone ? (isSso ? SsoPhone : ScimPhone) : isSso ? SsoModel : ScimModel;

  return (
    <svg
      className={`pv2-identity-model__drawing ${phone ? "pv2-identity-model__drawing--phone" : "pv2-identity-model__drawing--wide"}`}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      tabIndex={-1}
      data-identity-drawing={phone ? "phone" : "wide"}
    >
      <Shape />
      <g
        className="pv2-identity-model__overlay"
        data-identity-model-cue
        data-identity-phase={isSso ? "0" : "1"}
      >
        <Shape accent />
      </g>
    </svg>
  );
}

export function EnterpriseIdentityModelsV2({
  compact = false,
  animationEnabled = true,
  playback = "loop",
}: {
  compact?: boolean;
  animationEnabled?: boolean;
  playback?: "loop" | "once";
}) {
  const modelsRef = useIdentityExplanationLoopV2<HTMLDivElement>(
    compact,
    animationEnabled,
    playback,
  );
  const { sourceLabel, targetLabel, models } = ENTERPRISE_IDENTITY.signature;

  return (
    <div
      className={`pv2-identity-models${compact ? " pv2-identity-models--compact" : ""}`}
      ref={modelsRef}
    >
      {models.map((model) => (
        <figure className="pv2-identity-model" key={model.protocol}>
          <h3 className="pv2-identity-model__heading">
            <b>{model.protocol}</b>
            {!compact && <span>{model.subtitle}</span>}
          </h3>
          <ModelDrawing model={model} />
          <ModelDrawing model={model} phone />
          <figcaption>
            <div className="pv2-identity-model__labels">
              <p>
                <small>{sourceLabel}</small>
                {model.source}
              </p>
              <p>
                <small>{targetLabel}</small>
                {model.target}
              </p>
            </div>
            {!compact && <p className="pv2-identity-model__consideration">{model.consideration}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function EnterpriseIdentitySignatureV2({
  headingId = "identity-signature-title",
  headingLevel = "h2",
  animationEnabled = true,
  playback = "loop",
}: {
  headingId?: string;
  headingLevel?: "h2" | "h3";
  animationEnabled?: boolean;
  playback?: "loop" | "once";
} = {}) {
  const content = ENTERPRISE_IDENTITY.signature;
  const Heading = headingLevel;
  return (
    <figure className="pv2-identity-signature" aria-labelledby={headingId}>
      <figcaption className="pv2-identity-signature__heading">
        <div className="pv2-identity-signature__title">
          <p className="pv2-identity-label">{content.eyebrow}</p>
          <Heading id={headingId}>{content.heading}</Heading>
        </div>
        <p className="pv2-identity-signature__support">{content.explanation}</p>
      </figcaption>
      <EnterpriseIdentityModelsV2 animationEnabled={animationEnabled} playback={playback} />
      <p className="pv2-identity-context">{content.context}</p>
    </figure>
  );
}
