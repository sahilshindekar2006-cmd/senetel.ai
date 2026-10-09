import { useEffect, useState } from 'react'
import useStickyProgress from '../hooks/useStickyProgress'
import VideoBackground from './ui/VideoBackground'
import MediaSlot from './ui/MediaSlot'
import { SHOWCASE, STORY_VIDEOS } from '../data/hardwareStory'

export default function ComponentShowcase() {
  const ref = useStickyProgress()
  const [progress, setProgress] = useState(0)

  // Track pinned progress from --p CSS variable set by useStickyProgress
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

  const last = SHOWCASE.length - 1

  return (
    <section id="components" ref={ref} className="st-wrap" style={{ height: `${SHOWCASE.length * 100}svh` }}>
      <div className="st-stage">
        {/* Optional cinematic layer */}
        <VideoBackground src={STORY_VIDEOS.components} overlay={false} className="absolute inset-0 st-bgvid" />
        <div className="st-shade" aria-hidden="true" />
        
        {/* Persistent rail: the stage never looks empty between components */}
        <div className="st-rail" aria-hidden="true">
          {SHOWCASE.map((c, i) => (
            <span key={c.id} className="st-tick" style={{ '--i': i }} />
          ))}
        </div>

        {SHOWCASE.map((c, i) => {
          // Calculate item-specific scroll progress (0.0 to 1.0) while item i is pinned
          const startP = i / SHOWCASE.length
          const endP = (i + 1) / SHOWCASE.length
          const itemProgress = Math.min(1, Math.max(0, (progress - startP) / (endP - startP)))

          return (
            <article key={c.id} className={`st-item${i === last ? ' st-last' : ''}`} style={{ '--i': i }}>
              <div>
                <p className="st-mono st-cat">{c.category}</p>
                <h3 className="st-h st-name">{c.name}</h3>
                <p className="st-mono st-role">{c.hardware}</p>
                <p className="st-p st-fn">{c.role}</p>
              </div>
              <MediaSlot id={c.id} label={c.name} media={c.media} progress={itemProgress} />
            </article>
          )
        })}
      </div>
    </section>
  )
}

