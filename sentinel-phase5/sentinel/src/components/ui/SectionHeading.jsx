export default function SectionHeading({ title, description, align = 'left', as: Tag = 'h2', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <header className={`max-w-3xl ${alignment} ${className}`}>
      <Tag className="font-display text-title font-semibold text-fg">{title}</Tag>
      {description && <p className="mt-6 max-w-[60ch] text-lead text-muted">{description}</p>}
    </header>
  )
}
