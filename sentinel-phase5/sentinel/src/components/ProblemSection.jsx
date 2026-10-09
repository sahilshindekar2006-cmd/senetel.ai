import useStickyProgress, { rv } from '../hooks/useStickyProgress'

export default function ProblemSection() {
  const ref = useStickyProgress()
  return (
    <section id="problem" ref={ref} className="st-wrap" style={{ height: '240svh' }}>
      <div className="st-stage">
        {/* Decorative only: a clean reference wave and a misbehaving signal (spike, flatline, drift). Not sensor data. */}
        <svg className="st-signal" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
          <path className="st-sig-ref" d="M0 200 C150 120 300 280 450 200 S750 120 900 200 S1100 260 1200 200" />
          <path className="st-sig-bad" d="M0 210 L70 192 L140 222 L210 196 L280 214 L330 120 L350 330 L372 208 L440 214 H760 L1200 120" />
        </svg>
        <div className="st-inner">
          <h2 className="st-h">
            <span className="st-rve st-blk" style={rv(0.3, 0.4)}>SENSORS DON'T ALWAYS FAIL.</span>
            <span className="st-rve st-blk" style={rv(0.45, 0.4)}>SOMETIMES THEY LIE.</span>
          </h2>
          <div className="st-row">
            <p className="st-p">
              <span className="st-rv st-blk" style={rv(0.08)}>A sensor can report a value.</span>
              <span className="st-rv st-blk" style={rv(0.2)}>That doesn't mean the value is trustworthy.</span>
            </p>
            <p className="st-lg">
              <span className="st-rv st-blk" style={rv(0.38, 0.14)}>Drift. Spikes. Frozen values.</span>
              <span className="st-rv st-blk" style={rv(0.52, 0.14)}>Noise. Dropouts.</span>
              <span className="st-rv st-blk" style={rv(0.66, 0.14)}>False alarms.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
