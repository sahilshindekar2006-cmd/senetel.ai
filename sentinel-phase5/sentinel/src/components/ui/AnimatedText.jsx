/**
 * Splits text into words, each in an overflow-hidden mask, ready for GSAP text reveals later.
 * Renders static, fully visible text by default (no animation is applied here).
 * Target with: ref.current.querySelectorAll('[data-word]')
 */
export default function AnimatedText({ text, as: Tag = 'span', className = '' }) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block will-change-transform">
            {word}
            {'\u00A0'}
          </span>
        </span>
      ))}
    </Tag>
  )
}
