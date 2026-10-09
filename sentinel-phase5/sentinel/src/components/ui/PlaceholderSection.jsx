import VideoBackground from './VideoBackground'

/** Temporary stand-in for a later phase: compact (no accidental blank screens), same type language. */
export default function PlaceholderSection({ id, name, phase, videoSlot }) {
  return (
    <section
      id={id}
      data-section={id}
      className="relative flex min-h-[clamp(14rem,38svh,26rem)] items-center overflow-clip border-t border-white/10"
    >
      {videoSlot && <VideoBackground />}
      <div className="container-x relative z-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 py-10">
        <p className="font-display text-[clamp(2rem,7vw,6rem)] font-semibold uppercase leading-none tracking-[-0.035em] text-fg/15">
          {name}
        </p>
        <p className="font-mono text-xs tracking-[0.18em] text-muted">
          IN DEVELOPMENT / {phase.toUpperCase()}
          {videoSlot ? ` / ${videoSlot}` : ''}
        </p>
      </div>
    </section>
  )
}
