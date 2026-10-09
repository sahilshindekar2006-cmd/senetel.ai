import useStickyProgress from '../hooks/useStickyProgress'
import MediaSlot from './ui/MediaSlot'
import ProductStyles from '../story/ProductStyles'
import { COMPONENTS } from '../data/hardwareStory'
import { PRODUCT_MEDIA, PRODUCT_CALLOUTS, PRODUCT_COPY } from '../data/productStory'

const byId = Object.fromEntries(COMPONENTS.map((c) => [c.id, c]))

// Professional name first, actual hardware second (Phase 3 naming).
function ProductCallout({ part, index, side }) {
  return (
    <div className={`pr-co pr-co--${side}`} style={{ '--s': 0.28 + index * 0.04 }}>
      <p className="st-mono pr-co-name">{part.name}</p>
      <p className="st-mono pr-co-hw">{part.hardware}</p>
    </div>
  )
}

function ProductIdentity() {
  return (
    <div>
      <h2 className="pr-name">{PRODUCT_COPY.name}</h2>
      <div className="pr-slot">
        <p className="pr-support">
          {PRODUCT_COPY.lines.map((line) => (
            <span key={line} className="st-blk">{line}</span>
          ))}
        </p>
        <p className="st-p pr-state">{PRODUCT_COPY.statement}</p>
      </div>
    </div>
  )
}

export default function ProductReveal() {
  const ref = useStickyProgress()
  const left = PRODUCT_CALLOUTS.left.map((id) => byId[id])
  const right = PRODUCT_CALLOUTS.right.map((id) => byId[id])
  return (
    <>
      <section id="product" ref={ref} className="st-wrap pr" style={{ height: '420svh' }}>
        <div className="st-stage">
          <div className="st-inner pr-inner">
            <p className="st-mono pr-cap">{PRODUCT_COPY.caption}</p>
            <div className="pr-field">
              <div className="pr-product">
                <div className="pr-glow" aria-hidden="true" />
                <div className="pr-media">
                  {/* Placeholder until a real render exists: set PRODUCT_MEDIA.image / .video in data/productStory.js */}
                  <MediaSlot id="product" label="SENTINEL / PRODUCT" media={PRODUCT_MEDIA} />
                </div>
              </div>
              <div className="pr-callouts">
                <div className="pr-col pr-col--l">
                  {left.map((part, i) => <ProductCallout key={part.id} part={part} index={i} side="l" />)}
                </div>
                <div className="pr-col pr-col--r">
                  {right.map((part, i) => <ProductCallout key={part.id} part={part} index={left.length + i} side="r" />)}
                </div>
              </div>
              <div className="pr-lower">
                <ProductIdentity />
                <ol className="st-mono pr-next" aria-label="Sensors, Sentinel, real-time data">
                  {PRODUCT_COPY.next.map((word, i) => (
                    <li key={word} className="pr-nx" style={{ '--s': 0.88 + i * 0.04 }}>{word}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <span className="pr-line" aria-hidden="true" />
        </div>
      </section>
      <ProductStyles />
    </>
  )
}
