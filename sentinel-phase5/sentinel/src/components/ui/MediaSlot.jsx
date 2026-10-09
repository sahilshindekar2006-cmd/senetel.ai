import { useState } from 'react'
import VideoBackground from './VideoBackground'
import HardwareModel from '../HardwareModel'

/** Designed visual frame for 3D hardware models & media slots. */
export default function MediaSlot({ id, label, media, progress = 0 }) {
  const [ready, setReady] = useState(false)
  const { image, video } = media || {}

  // If specific media file exists, render image or video
  if (image) {
    return (
      <div className="st-media" data-slot={id} data-ready="true">
        <img src={image} alt="" loading="lazy" />
      </div>
    )
  }

  if (video) {
    return (
      <div className="st-media" data-slot={id} data-ready="true">
        <VideoBackground src={video} overlay={false} />
      </div>
    )
  }

  // Interactive 3D Hardware Model for all 7 components
  return (
    <div className="st-media overflow-hidden relative border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)]" data-slot={id} data-ready="true">
      <HardwareModel type={id} progress={progress} className="w-full h-full absolute inset-0" />
    </div>
  )
}


