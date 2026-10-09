import useStickyProgress, { rv } from '../hooks/useStickyProgress'
import { SYSTEM_PARTS, TONE_COLOR } from '../data/hardwareStory'

export default function SystemIntro() {
  const ref = useStickyProgress()
  return (
    <section id="system" ref={ref} className="st-wrap" style={{ height: '200svh' }}>
      <div className="st-stage">
        <div className="st-inner">
          <h2 className="st-h">
            <span className="st-rve st-blk" style={rv(0.3, 0.4)}>ONE SYSTEM.</span>
            <span className="st-rve st-blk" style={rv(0.45, 0.4)}>MULTIPLE SIGNALS.</span>
          </h2>
          <p className="st-p st-rv" style={rv(0.06)}>
            SENTINEL combines several sensor sources and analyzes how each one behaves, instead of blindly trusting a single reading.
          </p>
          <div className="st-parts">
            {SYSTEM_PARTS.map((part, i) => (
              <div key={part.id} className="st-part st-rv" style={rv(0.2 + i * 0.085, 0.12, '3vh')}>
                <span className="st-dot" style={{ '--c': TONE_COLOR[part.tone] }} />
                <span>
                  <span className="st-blk">{part.label}</span>
                  <span className="st-mono st-hw st-blk">{part.hardware}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
