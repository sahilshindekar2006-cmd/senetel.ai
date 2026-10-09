const TONES = {
  neutral: 'bg-muted',
  trusted: 'bg-accent-green',
  info: 'bg-accent',
  drift: 'bg-accent-purple',
}

export default function SensorBadge({ label, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-fg/80 ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${TONES[tone] ?? TONES.neutral}`} />
      {label}
    </span>
  )
}
