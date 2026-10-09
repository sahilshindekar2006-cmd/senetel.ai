import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Full-bleed background video that never breaks the page.
 * - No `src`, a missing file, or a decode error: falls back to the dark background (and `poster` if given).
 * - Lazy: the video is only attached once the section is near the viewport.
 * - Reduced motion: no autoplay; poster/dark background only.
 * - `videoRef` gives later phases access to the <video> element (e.g. scroll-controlled currentTime).
 * Position it with className (default fills the nearest positioned parent).
 */
export default function VideoBackground({
  src,
  poster,
  overlay = true,
  className = 'absolute inset-0',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  lazy = true,
  videoRef,
  onReady,
}) {
  const wrapRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [near, setNear] = useState(!lazy)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (near || !wrapRef.current) return
    if (typeof IntersectionObserver === 'undefined') return setNear(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [near])

  const showVideo = Boolean(src) && near && !failed
  const overlayClass =
    typeof overlay === 'string' ? overlay : overlay ? 'bg-gradient-to-b from-bg/70 via-bg/30 to-bg' : ''

  return (
    <div ref={wrapRef} aria-hidden="true" className={`isolate overflow-hidden bg-bg ${className}`}>
      {poster && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay={autoPlay && !reduced}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onError={() => setFailed(true)}
          onLoadedData={() => onReady?.()}
        />
      )}
      {overlayClass && <div className={`absolute inset-0 ${overlayClass}`} />}
    </div>
  )
}
