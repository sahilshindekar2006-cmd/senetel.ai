import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

/**
 * Scoped, auto-cleaned GSAP/ScrollTrigger setup with a reduced-motion strategy built in.
 *
 *   const ref = useScrollAnimation(({ gsap, ScrollTrigger, reduceMotion }) => {
 *     if (reduceMotion) return          // show final state, skip scrubbing/pinning
 *     gsap.from('.title', { yPercent: 40, opacity: 0, scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
 *   })
 *   return <section ref={ref}>...</section>
 *
 * Selectors are scoped to the ref'd element. Everything created inside is reverted on unmount.
 * Animate transform/opacity only. Ready for pin, scrub, parallax and video-time scrubbing.
 */
export default function useScrollAnimation(setup, { scope, dependencies = [] } = {}) {
  const localRef = useRef(null)
  const ref = scope ?? localRef

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
        (ctx) => setup({ gsap, ScrollTrigger, reduceMotion: !!ctx.conditions.reduce, element: ref.current }),
      )
      return () => mm.revert()
    },
    { scope: ref, dependencies },
  )

  return ref
}
