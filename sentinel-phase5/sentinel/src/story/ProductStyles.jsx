// ProductReveal styles. Uses the Phase 3 scroll variables: --p (pinned progress) and --e (entry progress).
// Timeline (p): 0-.3 product gains focus | .28-.6 callouts | .62-.8 identity | .8-.9 statement | .88-1 hand-off to DataFlow
export const PRODUCT_CSS = `
.pr{--vis:clamp(0,calc((var(--e) - .15) / .5),1);--prom:clamp(0,calc(var(--p) / .3),1);--idn:clamp(0,calc((var(--p) - .62) / .16),1);
  --cout:clamp(0,calc((var(--p) - .62) / .08),1);--out:clamp(0,calc((var(--p) - .9) / .1),1)}
.pr-inner{justify-content:flex-start;gap:1rem}
.pr-cap{flex:none;margin:0;color:var(--st-muted);opacity:calc((1 - clamp(0,calc(var(--p) / .12),1)) * var(--vis))}
.pr-field{--lower:17rem;position:relative;flex:1;min-height:0}
.pr-product{position:absolute;left:0;right:0;top:0;height:calc(100% - var(--lower));display:flex;align-items:center;justify-content:center}
.pr-glow{position:absolute;inset:6% 8%;pointer-events:none;background:radial-gradient(closest-side,rgba(79,216,255,.16),transparent);opacity:calc(var(--prom) * var(--vis))}
.pr-media{--act:var(--prom);position:relative;width:min(36rem,100%);aspect-ratio:4/3;max-height:100%;
  opacity:calc((.55 + .45 * var(--prom)) * var(--vis) * (1 - .5 * var(--out)));
  transform:scale(calc(.88 + .12 * var(--prom) - .06 * var(--idn)));will-change:transform,opacity}
.pr-media .st-media{height:100%;max-height:none;aspect-ratio:auto}
.pr-media .st-media img{object-fit:contain}
.pr-media .st-media[data-ready]{border-color:transparent}
/* callouts: lower zone on mobile/tablet, around the product on desktop */
.pr-callouts{--dx:0px;--dy:1.5rem;position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.25rem;align-content:end}
.pr-col{display:contents}
.pr-co{--t:clamp(0,calc((var(--p) - var(--s)) / .07),1);padding-top:.6rem;border-top:1px solid rgba(238,242,247,.14);
  opacity:calc(var(--t) * (1 - var(--cout)));transform:translate(calc((1 - var(--t)) * var(--dx)),calc((1 - var(--t)) * var(--dy)));will-change:transform,opacity}
.pr-co-name{margin:0;color:var(--st-fg);font-size:.68rem;letter-spacing:.12em}
.pr-co-hw{margin:.3rem 0 0;color:var(--st-muted);font-size:.68rem;letter-spacing:.12em}
/* identity + statement + hand-off */
.pr-lower{position:absolute;left:0;right:0;bottom:0;height:var(--lower);display:flex;flex-direction:column;justify-content:flex-end;gap:1.25rem}
.pr-name{margin:0;font-weight:600;line-height:.9;letter-spacing:-.04em;font-size:clamp(2.6rem,12vw,9rem);
  --t:clamp(0,calc((var(--p) - .64) / .14),1);opacity:var(--t);transform:translateY(calc((1 - var(--t)) * 4vh));will-change:transform,opacity}
.pr-slot{display:grid;margin-top:1rem}
.pr-support,.pr-state{grid-area:1/1;margin:0}
.pr-support{font-size:clamp(1rem,1.7vw,1.4rem);line-height:1.35;letter-spacing:.02em;font-weight:400;color:rgba(238,242,247,.8);
  opacity:calc(clamp(0,calc((var(--p) - .72) / .08),1) * (1 - clamp(0,calc((var(--p) - .8) / .06),1)))}
.pr-state{--t:clamp(0,calc((var(--p) - .82) / .08),1);max-width:44ch;opacity:var(--t);transform:translateY(calc((1 - var(--t)) * 2vh))}
.pr-next{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;margin:0;padding:0;list-style:none;color:var(--st-muted)}
.pr-nx{--t:clamp(0,calc((var(--p) - var(--s)) / .04),1);opacity:var(--t)}
.pr-nx+.pr-nx::before{content:'';display:inline-block;width:1.5rem;height:1px;margin-right:1rem;vertical-align:middle;background:var(--st-accent)}
.pr-nx:last-child{color:var(--st-accent)}
.pr-line{position:absolute;left:50%;bottom:0;width:1px;height:2.4rem;background:linear-gradient(var(--st-accent),transparent);transform-origin:top;transform:scaleY(var(--out));opacity:.7}
@media (min-width:640px){
  .pr-field{--lower:16rem}
  .pr-callouts{grid-template-columns:repeat(4,1fr)}
  .pr-co-name,.pr-co-hw{font-size:.72rem}
}
@media (min-width:1180px){
  .pr-field{--lower:15rem}
  .pr-callouts{--dy:0px;top:0;bottom:var(--lower);grid-template-columns:1fr min(36rem,100%) 1fr;gap:0;align-content:stretch}
  .pr-col{display:flex;flex-direction:column;justify-content:space-around;padding-block:1.5rem}
  .pr-col--l{grid-column:1}
  .pr-col--r{grid-column:3}
  .pr-co{position:relative;padding-top:0;border-top:0}
  .pr-co--l{--dx:-1.5rem;text-align:right;padding-right:3.4rem}
  .pr-co--r{--dx:1.5rem;padding-left:3.4rem}
  .pr-co::after{content:'';position:absolute;top:.5rem;width:2.6rem;height:1px}
  .pr-co--l::after{right:0;background:linear-gradient(90deg,transparent,var(--st-accent))}
  .pr-co--r::after{left:0;background:linear-gradient(270deg,transparent,var(--st-accent))}
  .pr-lower{flex-direction:row;align-items:flex-end;justify-content:space-between}
  .pr-next{flex-direction:column;align-items:flex-start;gap:0}
  .pr-nx+.pr-nx::before{display:block;width:1px;height:1.3rem;margin:.4rem 0 .4rem .25rem}
}
@media (prefers-reduced-motion:reduce){
  .pr-field{display:flex;flex-direction:column;gap:2rem;height:auto}
  .pr-product{position:static;height:44svh}
  .pr-callouts,.pr-lower{position:static;height:auto}
  .pr-callouts{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))}
  .pr-col{display:contents}
  .pr-co{position:static;padding:.6rem 0 0;text-align:left;border-top:1px solid rgba(238,242,247,.14);opacity:1;transform:none}
  .pr-co::after{display:none}
  .pr-lower{flex-direction:column;align-items:flex-start}
  .pr-next{flex-direction:row;align-items:center;gap:.5rem 1rem}
  .pr-nx+.pr-nx::before{display:inline-block;width:1.5rem;height:1px;margin:0 1rem 0 0}
  .pr-slot{display:block}
  .pr-support,.pr-state{opacity:1;transform:none;margin-top:.75rem}
  .pr-name,.pr-nx,.pr-media,.pr-glow,.pr-cap{opacity:1;transform:none}
  .pr-line{display:none}
}
`
export default function ProductStyles() {
  return <style>{PRODUCT_CSS}</style>
}
