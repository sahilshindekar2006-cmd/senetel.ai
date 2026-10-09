import { useEffect, useRef } from 'react'

// Scroll style helper: --s = start, --d = duration (0..1 of progress), --y = travel.
// Use class st-rv (driven by --p, the pinned progress) or st-rve (driven by --e, the entry progress).
export const rv = (s, d = 0.16, y) => ({ '--s': s, '--d': d, ...(y ? { '--y': y } : {}) })

/**
 * Pinned-section progress without a render loop.
 * Wrapper (tall) > first child (sticky stage). Writes two variables on the wrapper:
 *   --p  0..1 while the stage is pinned
 *   --e  0..1 while the stage slides into view (so the first content is visible BEFORE the pin starts)
 * CSS maps them to transform/opacity. One passive scroll listener, throttled with rAF.
 * Reduced motion: --p = --e = 1 and a static layout. A GSAP ScrollTrigger onUpdate could drive the same variables.
 */
export default function useStickyProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const wrap = ref.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrap.style.setProperty('--p', '1')
      wrap.style.setProperty('--e', '1')
      return
    }
    const stage = wrap.firstElementChild
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    let raf = 0
    let lastP = -1
    let lastE = -1
    const update = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const total = Math.max(1, wrap.offsetHeight - stage.offsetHeight)
      const p = clamp01(-rect.top / total)
      const e = clamp01(1 - rect.top / Math.max(1, window.innerHeight))
      if (Math.abs(p - lastP) > 0.0005) {
        lastP = p
        wrap.style.setProperty('--p', p.toFixed(4))
      }
      if (Math.abs(e - lastE) > 0.001) {
        lastE = e
        wrap.style.setProperty('--e', e.toFixed(4))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('load', onScroll)
    document.fonts?.ready.then(onScroll) // webfonts change layout after first paint
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}
