import { useRef } from 'react'
import VideoBackground from './ui/VideoBackground'
import useScrollAnimation from '../hooks/useScrollAnimation'

const HEADLINE = ['KNOW WHEN', 'YOUR SENSORS', 'LIE.']

export default function Hero() {
  const root = useRef(null)

  useScrollAnimation(
    ({ gsap, reduceMotion }) => {
      // Reduced motion: no intro, no pin, no scrub. The hero stays static and readable.
      if (reduceMotion) return

      // One-time intro: headline lines rise out of their masks.
      gsap.from('[data-hero-line]', { yPercent: 110, duration: 1.2, ease: 'power3.out', stagger: 0.12, delay: 0.15 })

      // Scroll: the hero holds for 80% of a viewport while the "camera" moves forward.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })
      tl.to('[data-hero-video]', { scale: 1.08, duration: 1 }, 0)
        .to('[data-hero-dim]', { opacity: 0.55, duration: 1 }, 0)
        .to('[data-hero-label]', { y: '-10vh', opacity: 0, duration: 0.5 }, 0)
        .to('[data-hero-headline]', { y: '-18vh', opacity: 0, duration: 0.75, ease: 'power1.in' }, 0)
        .to('[data-hero-support]', { y: '-12vh', opacity: 0, duration: 0.7, ease: 'power1.in' }, 0.12)
        .to('[data-hero-foot]', { opacity: 0, duration: 0.35 }, 0)
    },
    { scope: root },
  )

  return (
    <section id="hero" ref={root} className="relative h-[100svh] min-h-[34rem] overflow-clip">
      {/* Background: reuses VideoBackground. Falls back to the dark page background if the file is missing. */}
      <div data-hero-video className="absolute inset-0 will-change-transform">
        <VideoBackground src="/videos/hero.mp4" overlay={false} lazy={false} preload="metadata" />
      </div>
      {/* Static cinematic overlay + faint technical tint (visible mostly when there is no video) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgb(var(--accent)/0.07),transparent),linear-gradient(to_bottom,rgb(var(--background)/0.55),rgb(var(--background)/0.2)_45%,rgb(var(--background)/0.9))]"
      />
      {/* Scroll-driven darkening */}
      <div data-hero-dim aria-hidden="true" className="absolute inset-0 bg-bg opacity-0" />

      <div className="container-x relative z-10 flex h-full flex-col pb-7 pt-24 md:pb-10 md:pt-[var(--nav-height)]">
        <div className="flex flex-1 flex-col justify-center">
          <p data-hero-label className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-fg/70">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            SENTINEL / SENSOR TRUST SYSTEM
          </p>

          <h1
            data-hero-headline
            aria-label="Know when your sensors lie."
            className="mt-6 font-display text-[clamp(2rem,min(9.5vw,15svh),9rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-fg will-change-transform md:mt-8"
          >
            {HEADLINE.map((line) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-support
            className="mt-6 max-w-[36ch] text-lead text-fg/70 will-change-transform md:mt-10"
          >
            AI-based detection of sensor drift, false alarms and abnormal behavior.
          </p>
        </div>

        <div data-hero-foot className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-[0.18em] text-muted">ESP32 • MULTI-SENSOR • AI ANALYSIS</p>
            <a
              href="#problem"
              className="group inline-flex w-fit items-center gap-3 border-b border-fg/30 pb-1 font-mono text-xs tracking-[0.18em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              EXPLORE THE SYSTEM ↓
            </a>
          </div>

          <div aria-hidden="true" className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted">
            SCROLL
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue absolute inset-x-0 top-0 block h-3 bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
