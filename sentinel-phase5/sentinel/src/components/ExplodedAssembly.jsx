import { Fragment, useEffect, useState } from 'react'
import useStickyProgress, { rv } from '../hooks/useStickyProgress'
import SentinelAssembly from './SentinelAssembly'
import { TONE_COLOR } from '../data/hardwareStory'

// 7 Components of the SENTINEL IoT Device
const SENTINEL_COMPONENTS = [
  { id: 'control-unit', label: 'CONTROL UNIT', note: 'CENTRAL PROCESSING & CHASSIS', tone: 'info' },
  { id: 'env-sensor', label: 'ENVIRONMENTAL SENSOR', note: 'TEMPERATURE & HUMIDITY POD', tone: 'neutral' },
  { id: 'prox-sensor', label: 'PROXIMITY SENSOR', note: 'ULTRASONIC TRANSDUCR ARRAY', tone: 'neutral' },
  { id: 'motion-sensor', label: 'MOTION SENSOR', note: 'IMU ACCELEROMETER MODULE', tone: 'neutral' },
  { id: 'status-led', label: 'STATUS INDICATOR', note: 'GREEN TRUSTED LED MODULE', tone: 'trusted' },
  { id: 'alert-led', label: 'ALERT INDICATOR', note: 'RED FAULT LED MODULE', tone: 'fault' },
  { id: 'audible-alert', label: 'AUDIBLE ALERT', note: 'PIEZOELECTRIC AUDIO BUZZER', tone: 'info' },
]

export default function ExplodedAssembly() {
  const ref = useStickyProgress()
  const [progress, setProgress] = useState(0)

  // Bind scroll progress from --p CSS variable updated by useStickyProgress
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = 0
    const updateProgress = () => {
      rafId = requestAnimationFrame(updateProgress)
      const pStr = el.style.getPropertyValue('--p') || '0'
      const p = parseFloat(pStr)
      setProgress(p)
    }

    rafId = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(rafId)
  }, [ref])

  const last = SENTINEL_COMPONENTS.length - 1

  return (
    <section id="assembly" ref={ref} className="st-wrap" style={{ height: '300svh' }}>
      <div className="st-stage">
        {/* Unified 3D Sentinel Assembly Canvas */}
        <div className="absolute inset-0 z-0 opacity-95 transition-opacity duration-700">
          <SentinelAssembly progress={progress} className="w-full h-full" />
        </div>

        {/* Ambient Dark Overlay Shader */}
        <div className="st-shade pointer-events-none z-1" aria-hidden="true" />

        {/* UI Overlay Content */}
        <div className="st-inner st-asm relative z-10 pointer-events-none">
          <div className="pointer-events-auto max-w-xl">
            <h2 className="st-h">
              <span className="st-rve st-blk" style={rv(0.1, 0.3)}>EVERY SIGNAL</span>
              <span className="st-rve st-blk text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]" style={rv(0.25, 0.3)}>
                SENTINEL DEVICE
              </span>
            </h2>
            <p className="st-mono st-rv st-final text-xs tracking-widest text-[#00f0ff]" style={rv(0.4, 0.2)}>
              UNIFIED 3D ASSEMBLY / SEVEN SYSTEM COMPONENTS
            </p>
          </div>

          <div className="st-plates pointer-events-auto">
            {SENTINEL_COMPONENTS.map((l, i) => (
              <Fragment key={l.id}>
                <div
                  className="st-plate transition-all duration-300 hover:border-[#00f0ff]"
                  style={{ '--s': 0.04 + i * 0.1, '--o': i - 3, '--tone': TONE_COLOR[l.tone] || '#00f0ff' }}
                >
                  <span className="st-mono font-medium">{l.label}</span>
                  <span className="st-mono st-plate-note text-xs opacity-75">{l.note}</span>
                </div>
                {i < last && <span className="st-conn" style={{ '--s': 0.12 + i * 0.1 }} />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


