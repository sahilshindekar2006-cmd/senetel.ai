import useStickyProgress from '../hooks/useStickyProgress'
import VideoBackground from './ui/VideoBackground'
import DataFlowStyles from '../story/DataFlowStyles'
import { FLOW_INPUTS, FLOW_CONTROL, FLOW_OUTPUT, FLOW_STAGES, FLOW_COPY, FLOW_VIDEO } from '../data/dataFlowStory'

// One pulse = one pass along its line, driven by scroll (--ps start, --pd duration). Illustrative only.
const Pulse = ({ start, dur = 0.1, className = '' }) => (
  <span className={`df-pulse ${className}`} style={{ '--ps': start, '--pd': dur }} />
)

// Professional name first, actual hardware second, then what it measures (Phase 3 naming).
function FlowInput({ part, index }) {
  return (
    <div className="df-in" style={{ '--i': index, '--r': index + 1 }}>
      <p className="df-name">{part.name}</p>
      <p className="st-mono df-hw">{part.hardware}</p>
      <p className="df-fn">{part.detail}</p>
    </div>
  )
}

export default function DataFlow() {
  const ref = useStickyProgress()
  return (
    <>
      <section id="data-flow" ref={ref} className="st-wrap df" style={{ height: '400svh' }}>
        <div className="st-stage">
          {/* Optional: drop public/videos/sensor.mp4 in later. If it is missing, VideoBackground renders nothing. */}
          <VideoBackground src={FLOW_VIDEO} overlay={false} className="absolute inset-0 st-bgvid" />
          <div className="st-shade" aria-hidden="true" />
          <div className="df-grid" aria-hidden="true" />
          <div className="st-inner df-inner">
            <div className="st-mono df-top">
              <p>{FLOW_COPY.caption}</p>
              <p>{FLOW_COPY.disclaimer}</p>
            </div>

            <div
              className="df-flow"
              role="group"
              aria-label="Data flow: environmental, proximity and motion sensors feed the control unit, which feeds the monitoring output"
            >
              <div className="df-inputs">
                {FLOW_INPUTS.map((part, i) => <FlowInput key={part.id} part={part} index={i} />)}
              </div>

              {/* Connectors: three inputs -> one bus -> control unit. Inputs never connect to each other. */}
              {FLOW_INPUTS.map((part, i) => (
                <div key={part.id} className="df-ln df-stub" style={{ '--r': i + 1, '--s': 0.06 + i * 0.03 }} aria-hidden="true">
                  <Pulse start={0.1 + i * 0.03} />
                </div>
              ))}
              <div className="df-ln df-bus" style={{ '--s': 0.18, '--d': 0.1 }} aria-hidden="true">
                <Pulse start={0.2} dur={0.08} />
                <Pulse start={0.26} dur={0.08} className="df-pulse--up" />
              </div>
              <div className="df-ln df-trunk" style={{ '--s': 0.22 }} aria-hidden="true">
                <Pulse start={0.24} />
                <Pulse start={0.29} />
                <Pulse start={0.34} />
              </div>

              <div className="df-ctrl">
                <span className="df-ctrl-glow" aria-hidden="true" />
                <p className="st-mono df-ctrl-k">{FLOW_CONTROL.name}</p>
                <p className="df-ctrl-n">{FLOW_CONTROL.hardware}</p>
                <p className="st-mono df-ctrl-l">{FLOW_CONTROL.label}</p>
              </div>

              <div className="df-ln df-linkb" style={{ '--s': 0.58, '--d': 0.1 }} aria-hidden="true">
                <span className="st-mono df-linkb-l">{FLOW_COPY.link}</span>
                <Pulse start={0.62} />
                <Pulse start={0.7} />
              </div>

              <div className="df-out">
                <p className="df-out-t">{FLOW_OUTPUT.title}</p>
                <p className="st-mono df-out-k">{FLOW_OUTPUT.note}</p>
                <p className="st-mono df-out-l">
                  {FLOW_OUTPUT.parts.map((name) => <span key={name}>{name}</span>)}
                </p>
              </div>
            </div>

            <div className="df-foot">
              {FLOW_STAGES.map((s) => (
                <p key={s.n} className="st-mono df-cap" style={{ '--a': s.a, '--b': s.b }}>
                  <b>{s.n}</b>{s.text}
                </p>
              ))}
              <p className="df-sum">
                {FLOW_COPY.summary.map((line) => <span key={line}>{line}</span>)}
              </p>
            </div>
          </div>
          <span className="df-line" aria-hidden="true" />
        </div>
      </section>
      <DataFlowStyles />
    </>
  )
}
