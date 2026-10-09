export const STORY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;400;600&display=swap');
.st-wrap{--st-bg:#04060b;--st-fg:#eef2f7;--st-muted:#7c8799;--st-accent:#4fd8ff;--st-g:clamp(1.25rem,5vw,5rem);--p:0;--e:0;
  position:relative;background:var(--st-bg);color:var(--st-fg);font-family:Sora,ui-sans-serif,system-ui,sans-serif;font-weight:300;overflow-x:clip;-webkit-font-smoothing:antialiased}
.st-wrap *{box-sizing:border-box}
.st-stage{position:sticky;top:0;height:100vh;height:100svh;min-height:32rem;overflow:clip}
.st-inner{position:relative;z-index:2;height:100%;max-width:90rem;margin:0 auto;padding:5.5rem var(--st-g) 2.5rem;display:flex;flex-direction:column;justify-content:center;gap:clamp(1.5rem,5svh,3.5rem)}
.st-mono{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,monospace;font-size:.75rem;letter-spacing:.18em;line-height:1.3;margin:0}
.st-h{margin:0;font-weight:600;line-height:.95;letter-spacing:-.035em;font-size:clamp(1.9rem,5.4vw,5.5rem);text-wrap:balance}
.st-p{margin:0;max-width:40ch;font-size:clamp(1rem,1.5vw,1.35rem);line-height:1.6;color:rgba(238,242,247,.7)}
.st-lg{margin:0;font-size:clamp(1.1rem,2vw,1.75rem);line-height:1.35;font-weight:400}
.st-blk{display:block}
.st-row{display:grid;gap:1.5rem 4rem;grid-template-columns:1fr}
.st-rv{--t:clamp(0,calc((var(--p) - var(--s,0)) / var(--d,.15)),1);opacity:var(--t);transform:translateY(calc((1 - var(--t)) * var(--y,5vh)));will-change:transform,opacity}
.st-rve{--t:clamp(0,calc((var(--e) - var(--s,.3)) / var(--d,.4)),1);opacity:var(--t);transform:translateY(calc((1 - var(--t)) * var(--y,5vh)));will-change:transform,opacity}
.st-bgvid{opacity:.35;transition:opacity .6s}
.st-has-video .st-rve{--t:clamp(0,calc((var(--e) - var(--s,.3)) / var(--d,.4)),1);opacity:var(--t);transform:translateY(calc((1 - var(--t)) * var(--y,5vh)));will-change:transform,opacity}
.st-bgvid{opacity:.85}
.st-shade{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(4,6,11,.5),rgba(4,6,11,.25) 40%,rgba(4,6,11,.85))}
/* problem */
.st-signal{position:absolute;left:0;top:50%;width:100%;height:60%;opacity:.55;fill:none;transform:translateY(calc(-50% + var(--p) * -10vh));will-change:transform}
.st-signal path{vector-effect:non-scaling-stroke}
.st-sig-ref{stroke:rgba(238,242,247,.12);stroke-width:1}
.st-sig-bad{stroke:var(--st-accent);stroke-width:1.2;opacity:.6;stroke-dasharray:10 8;animation:st-dash 14s linear infinite}
@keyframes st-dash{to{stroke-dashoffset:-180}}
/* system */
.st-parts{display:grid;gap:0 2rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr))}
.st-part{display:flex;align-items:center;gap:.75rem;padding:.9rem 0;border-top:1px solid rgba(238,242,247,.14);font-size:clamp(1rem,1.7vw,1.5rem);font-weight:400;letter-spacing:-.01em}
.st-hw{margin-top:.3rem;color:var(--st-muted)}
.st-dot{flex:none;width:.45rem;height:.45rem;border-radius:50%;background:var(--c,#7c8799)}
/* components */
.st-item{position:absolute;left:0;right:0;top:0;bottom:0;margin:0 auto;width:100%;max-width:90rem;padding:5.5rem var(--st-g) 2.5rem;display:grid;grid-template-columns:1fr;align-content:center;gap:1.5rem 4rem;pointer-events:none;
  --u:calc(var(--p) * 7 - var(--i));--in:clamp(0,calc(var(--u) * 5),1);--out:clamp(0,calc((1 - var(--u)) * 5),1);--act:min(var(--in),var(--out));
  opacity:var(--act);transform:translateY(calc((1 - var(--in)) * 7vh - (1 - var(--out)) * 7vh));will-change:transform,opacity}
/* first item eases in as the stage scrolls into view (no empty frame); last item holds until the pin releases */
.st-item:first-of-type{--in:max(clamp(0,calc(var(--u) * 5),1),clamp(0,calc((var(--e) - .3) / .6),1))}
.st-item.st-last{--out:1}
.st-rail{position:absolute;z-index:3;right:max(.3rem,calc(var(--st-g) * .3));top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:.7rem}
.st-tick{--u:calc(var(--p) * 7 - var(--i));width:.9rem;height:2px;background:var(--st-accent);opacity:calc(.2 + .8 * min(clamp(0,calc(var(--u) * 5),1),clamp(0,calc((1 - var(--u)) * 5),1)))}
.st-tick:last-child{opacity:calc(.2 + .8 * clamp(0,calc(var(--u) * 5),1))}
.st-name{font-size:clamp(1.6rem,4.6vw,5rem)}
.st-cat{margin-bottom:1rem;color:var(--st-muted)}
.st-role{margin-top:1rem;color:var(--st-accent)}
.st-fn{margin-top:.75rem}
.st-media{position:relative;width:100%;aspect-ratio:16/9;max-height:32svh;border:1px solid rgba(79,216,255,calc(.14 + .3 * var(--act,0)));overflow:hidden;transform:scale(calc(.97 + .03 * var(--act,1)));
  background:radial-gradient(70% 70% at 50% 40%,rgba(79,216,255,.06),transparent),repeating-linear-gradient(0deg,rgba(238,242,247,.035) 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,rgba(238,242,247,.035) 0 1px,transparent 1px 28px)}
.st-media[data-ready]{background:var(--st-bg)}
.st-media::before,.st-media::after{content:'';position:absolute;z-index:2;width:.9rem;height:.9rem;border:1px solid var(--st-accent);opacity:.7}
.st-media::before{top:.5rem;left:.5rem;border-right:0;border-bottom:0}
.st-media::after{right:.5rem;bottom:.5rem;border-left:0;border-top:0}
.st-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.st-media-hint{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;color:var(--st-muted);text-align:center}
/* assembly */
.st-asm{flex-direction:column;justify-content:flex-start;gap:1.25rem}
.st-plates{--amp:5vh;--amp-x:2vw;display:flex;flex-direction:column;flex:1;min-height:0;width:100%;max-width:32rem;transition:opacity .6s}
.st-has-video .st-plates{opacity:0}
.st-plate{--k:clamp(0,calc((var(--p) - var(--s)) / .22),1);flex:none;display:flex;align-items:center;justify-content:space-between;gap:1rem;height:clamp(2.5rem,7svh,4rem);padding:0 1rem;
  --lock:clamp(0,calc((var(--p) - .8) / .1),1);border:1px solid rgba(79,216,255,calc(.18 + .32 * var(--lock)));border-left:2px solid var(--tone);background:rgba(238,242,247,.025);
  opacity:var(--k);transform:translate(calc((1 - var(--k)) * var(--o) * var(--amp-x)),calc((1 - var(--k)) * var(--o) * var(--amp))) scale(calc(.94 + .06 * var(--k)));will-change:transform,opacity}
.st-plate-note{color:var(--st-muted);text-align:right}
.st-final{margin-top:1.5rem;color:var(--st-accent)}
.st-conn{flex:1;min-height:.6rem;width:1px;align-self:center;background:linear-gradient(var(--st-accent),rgba(79,216,255,.1));transform-origin:top;transform:scaleY(clamp(0,calc((var(--p) - var(--s)) / .15),1))}
@media (min-width:768px){
  .st-row{grid-template-columns:1.2fr 1fr;align-items:start}
  .st-item{grid-template-columns:1.1fr .9fr;align-items:center}
  .st-media{aspect-ratio:4/3;max-height:52svh}
  .st-asm{display:grid;grid-template-columns:1fr 1fr;align-items:center}
  .st-plates{--amp:9vh;--amp-x:3vw;flex:none;height:min(64svh,34rem);justify-self:end}
}
@media (prefers-reduced-motion:reduce){
  .st-wrap{height:auto!important}
  .st-stage{position:relative;height:auto;min-height:100svh}
  .st-item{position:relative;opacity:1!important;transform:none!important;padding-block:3rem}
  .st-sig-bad{animation:none}
  .st-rv,.st-rve,.st-plate{opacity:1;transform:none}
  .st-rail{display:none}
  .st-final{margin-top:1.5rem;color:var(--st-accent)}
.st-conn{transform:none}
}
`
export default function StoryStyles() {
  return <style>{STORY_CSS}</style>
}
