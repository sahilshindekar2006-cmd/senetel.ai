// DataFlow styles. Uses the Phase 3 scroll variables: --p (pinned progress) and --e (entry progress).
// Timeline (p): entry = inputs appear | .06-.20 stubs | .20-.30 bus + trunk | .34-.48 control unit focus
//   .58-.68 output path | .66-.74 output | .84-.92 summary | .9-1 hand-off to the next section
// Pulses are scroll-driven (one pass each, no loops). Every moving element animates transform/opacity only.
export const DATAFLOW_CSS = `
.df{--vis:clamp(0,calc((var(--e) - .12) / .5),1);--dimx:clamp(0,calc((var(--p) - .84) / .1),1);--ce:clamp(0,calc((var(--p) - .34) / .14),1);--out:clamp(0,calc((var(--p) - .9) / .1),1);--cw:7.5rem}
.df-inner{justify-content:flex-start;gap:clamp(.9rem,3svh,2rem)}
.df-grid{position:absolute;inset:0;pointer-events:none;opacity:.6;
  background-image:linear-gradient(rgba(238,242,247,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(238,242,247,.035) 1px,transparent 1px);background-size:56px 56px;
  -webkit-mask-image:radial-gradient(70% 60% at 50% 50%,#000,transparent);mask-image:radial-gradient(70% 60% at 50% 50%,#000,transparent)}
.df-top{flex:none;display:flex;flex-wrap:wrap;justify-content:space-between;gap:.3rem 1.5rem;color:var(--st-muted);opacity:var(--vis)}
.df-top p{margin:0}
.df-flow{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);align-content:center;row-gap:clamp(.5rem,1.6svh,1rem);opacity:calc(var(--vis) * (1 - .5 * var(--dimx)))}
/* inputs */
.df-inputs{display:grid;grid-template-columns:minmax(0,1fr);gap:.6rem}
.df-in{--t:clamp(0,calc((var(--e) - .3 - var(--i) * .12) / .25),1);text-align:center;padding-top:.6rem;border-top:1px solid rgba(238,242,247,.14);opacity:var(--t);transform:translateY(calc((1 - var(--t)) * 3vh));will-change:transform,opacity}
.df-name{margin:0;font-weight:600;letter-spacing:-.02em;line-height:1.1;font-size:clamp(1rem,1.8vw,1.5rem)}
.df-hw{margin:.35rem 0 0;color:var(--st-accent)}
.df-fn{margin:.3rem 0 0;color:var(--st-muted);font-size:.85rem;line-height:1.35}
/* lines: faint track always visible, cyan fill drawn by scroll */
.df-ln{--t:clamp(0,calc((var(--p) - var(--s)) / var(--d,.08)),1);position:relative;background:rgba(238,242,247,.12)}
.df-ln::before{content:'';position:absolute;inset:0;background:var(--st-accent);opacity:.85;transform-origin:top;transform:scaleY(var(--t));will-change:transform}
.df-stub,.df-bus{display:none}
.df-trunk,.df-linkb{width:1px;height:clamp(1.25rem,5svh,2.75rem);justify-self:center}
.df-linkb-l{position:absolute;left:1rem;top:50%;transform:translateY(-50%);white-space:nowrap;color:var(--st-muted);opacity:var(--t)}
.df-pulse{--q:clamp(0,calc((var(--p) - var(--ps)) / var(--pd,.1)),1);position:absolute;inset:0;pointer-events:none;transform:translateY(calc(var(--q) * 100%));opacity:min(calc(var(--q) * 8),calc((1 - var(--q)) * 8));will-change:transform,opacity}
.df-pulse::before{content:'';position:absolute;left:50%;top:0;width:.4rem;height:.4rem;margin:-.2rem 0 0 -.2rem;border-radius:50%;background:var(--st-accent);box-shadow:0 0 .7rem rgba(79,216,255,.7)}
/* control unit */
.df-ctrl{position:relative;justify-self:center;width:min(30rem,100%);padding:1.1rem 1.25rem;text-align:center;border:1px solid rgba(79,216,255,calc(.16 + .5 * var(--ce)));background:rgba(238,242,247,.02);
  opacity:calc(.45 + .55 * var(--ce));transform:scale(calc(1 + .02 * var(--ce)));will-change:transform,opacity}
.df-ctrl::before,.df-ctrl::after{content:'';position:absolute;width:.8rem;height:.8rem;border:1px solid var(--st-accent);opacity:.8}
.df-ctrl::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.df-ctrl::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.df-ctrl-glow{position:absolute;inset:-30% -10%;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,rgba(79,216,255,.14),transparent);opacity:var(--ce)}
.df-ctrl-k{margin:0;color:rgba(238,242,247,.8)}
.df-ctrl-n{margin:.4rem 0 0;font-weight:600;letter-spacing:-.035em;line-height:1;font-size:clamp(2rem,5vw,4.5rem)}
.df-ctrl-l{margin:.7rem 0 0;color:var(--st-accent);opacity:clamp(0,calc((var(--p) - .42) / .06),1)}
/* output */
.df-out{--t:clamp(0,calc((var(--p) - .66) / .08),1);justify-self:center;width:min(30rem,100%);text-align:center;opacity:var(--t);transform:translateY(calc((1 - var(--t)) * 2vh));will-change:transform,opacity}
.df-out-t{margin:0;font-weight:600;letter-spacing:-.025em;line-height:1.1;font-size:clamp(1.1rem,2.2vw,1.9rem)}
.df-out-k{margin:.4rem 0 0;color:var(--st-muted)}
.df-out-l{margin:.7rem 0 0;display:flex;flex-wrap:wrap;justify-content:center;gap:.25rem 1rem;color:rgba(238,242,247,.7);opacity:clamp(0,calc((var(--p) - .72) / .06),1)}
/* captions + summary */
.df-foot{flex:none;display:grid;opacity:var(--vis)}
.df-cap,.df-sum{grid-area:1/1;align-self:end;margin:0}
.df-cap{color:var(--st-muted);opacity:calc(min(clamp(0,calc((var(--p) - var(--a)) / .04),1),clamp(0,calc((var(--b) - var(--p)) / .04),1)))}
.df-cap b{color:var(--st-accent);font-weight:400;margin-right:.6rem}
.df-sum{--t:clamp(0,calc((var(--p) - .84) / .08),1);font-weight:600;line-height:.98;letter-spacing:-.035em;text-transform:uppercase;font-size:clamp(1.6rem,4.4vw,4rem);text-wrap:balance;opacity:var(--t);transform:translateY(calc((1 - var(--t)) * 3vh))}
.df-sum span{display:block}
.df-line{position:absolute;left:50%;bottom:0;width:1px;height:2.4rem;background:linear-gradient(var(--st-accent),transparent);transform-origin:top;transform:scaleY(var(--out));opacity:.7}
@media (min-width:640px){
  .df-inputs{grid-template-columns:repeat(3,minmax(0,1fr));gap:0 1.5rem}
}
@media (max-width:1099px) and (max-height:760px){
  .df-fn,.df-out-l{display:none}
  .df-trunk,.df-linkb{height:1.25rem}
}
@media (min-width:1100px){
  .df-flow{grid-template-columns:minmax(0,1.1fr) var(--cw) minmax(0,1fr) var(--cw) minmax(0,1.1fr);grid-template-rows:repeat(3,minmax(0,1fr));row-gap:0;align-content:stretch;align-items:center}
  .df-inputs{display:contents}
  .df-in{grid-column:1;grid-row:var(--r);text-align:right;border-top:0;padding:0 1rem 0 0}
  .df-ln::before{transform-origin:left;transform:scaleX(var(--t))}
  .df-stub{display:block;grid-column:2;grid-row:var(--r);align-self:center;justify-self:start;width:50%;height:1px}
  .df-bus{display:block;grid-column:2;grid-row:1/4;align-self:center;justify-self:center;width:1px;height:66.666%}
  .df-bus::before{inset:0 0 50% 0;transform-origin:top;transform:scaleY(var(--t))}
  .df-bus::after{content:'';position:absolute;inset:50% 0 0 0;background:var(--st-accent);opacity:.85;transform-origin:bottom;transform:scaleY(var(--t));will-change:transform}
  .df-trunk{grid-column:2;grid-row:1/4;align-self:center;justify-self:end;width:50%;height:1px}
  .df-ctrl{grid-column:3;grid-row:1/4}
  .df-linkb{grid-column:4;grid-row:1/4;align-self:center;justify-self:stretch;width:auto;height:1px}
  .df-linkb-l{left:0;right:0;top:auto;bottom:.7rem;transform:none;white-space:normal;text-align:center;line-height:1.35}
  .df-out{grid-column:5;grid-row:1/4;justify-self:start;text-align:left}
  .df-out-l{justify-content:flex-start;flex-direction:column;gap:.25rem}
  .df-pulse{transform:translateX(calc(var(--q) * 100%))}
  .df-pulse::before{left:0;top:50%}
  .df-bus .df-pulse{inset:0 0 50% 0;transform:translateY(calc(var(--q) * 100%))}
  .df-bus .df-pulse::before{left:50%;top:0}
  .df-bus .df-pulse--up{inset:50% 0 0 0;transform:translateY(calc(var(--q) * -100%))}
  .df-bus .df-pulse--up::before{top:100%}
}
@media (prefers-reduced-motion:reduce){
  .df-flow{opacity:1}
  .df-in,.df-out,.df-ctrl-l{opacity:1;transform:none}
  .df-ctrl{transform:none}
  .df-pulse,.df-line{display:none}
  .df-foot{display:block}
  .df-cap{opacity:1;margin:.35rem 0}
  .df-sum{opacity:1;transform:none;margin-top:1.25rem}
}
@media (prefers-reduced-motion:reduce) and (min-width:1100px){
  .df-flow{grid-template-rows:repeat(3,minmax(6.5rem,auto));row-gap:.75rem;padding-block:1rem}
}
`
export default function DataFlowStyles() {
  return <style>{DATAFLOW_CSS}</style>
}
