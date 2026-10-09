import { useState } from 'react'

/**
 * REAL VS FAULT - Interactive Telemetry Comparison Slider
 * 
 * Features:
 * - Interactive Split-Screen Comparison Slider (Normal Telemetry vs Corrupted/Faulty Telemetry)
 * - Live AI Trust Score Delta Comparison
 */
export default function RealVsFault() {
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <section id="real-vs-fault" className="st-wrap py-24 bg-[#04060b] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs mb-4">
            <span>TELEMETRY INTEGRITY COMPARISON</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            NORMAL SIGNAL VS <span className="text-[#ff5d5d]">FAULT INJECTED</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Drag the comparison slider below to see how Sentinel's AI filter cleans noisy, corrupted sensor outputs into pristine telemetry vectors in real time.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative w-full max-w-5xl mx-auto h-96 bg-[#080d16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl select-none">
          {/* Left Side: Normal Clean Signal */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041a1a] to-[#08222a] p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs tracking-widest text-[#3dffa2] font-semibold bg-[#3dffa2]/10 px-3 py-1 rounded border border-[#3dffa2]/30">
                CLEAN SENSOR TELEMETRY (AI FILTERED)
              </span>
              <span className="font-mono text-sm font-bold text-[#3dffa2]">TRUST SCORE: 99.8%</span>
            </div>

            {/* SVG Clean Waveform */}
            <div className="w-full h-32 flex items-center">
              <svg className="w-full h-24" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path d="M0,50 Q62.5,20 125,50 T250,50 T375,50 T500,50" fill="none" stroke="#3dffa2" strokeWidth="3" />
              </svg>
            </div>

            <div className="flex gap-6 font-mono text-xs text-gray-300">
              <div>VARIANCE: <span className="text-[#3dffa2]">0.01%</span></div>
              <div>SIGNAL NOISE: <span className="text-[#3dffa2]">&lt; 0.2 dB</span></div>
              <div>RELIABILITY: <span className="text-[#3dffa2]">OPTIMAL</span></div>
            </div>
          </div>

          {/* Right Side: Corrupted Fault Signal (Clipped by sliderPos) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#220a0a] to-[#3a0d0d] p-8 flex flex-col justify-between overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs tracking-widest text-[#ff5d5d] font-semibold bg-[#ff5d5d]/10 px-3 py-1 rounded border border-[#ff5d5d]/30">
                RAW UNFILTERED TELEMETRY (NOISE / DRIFT)
              </span>
              <span className="font-mono text-sm font-bold text-[#ff5d5d]">RAW VARIANCE: 42.6%</span>
            </div>

            {/* SVG Corrupted Waveform */}
            <div className="w-full h-32 flex items-center">
              <svg className="w-full h-24" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path d="M0,50 L30,10 L60,90 L90,20 L120,80 L150,50 L180,100 L210,10 L240,85 L270,15 L300,75 L330,25 L360,95 L390,30 L420,70 L450,10 L480,90 L500,50" fill="none" stroke="#ff5d5d" strokeWidth="3" />
              </svg>
            </div>

            <div className="flex gap-6 font-mono text-xs text-gray-300">
              <div>VARIANCE: <span className="text-[#ff5d5d]">42.60%</span></div>
              <div>SIGNAL NOISE: <span className="text-[#ff5d5d]">18.4 dB</span></div>
              <div>RELIABILITY: <span className="text-[#ff5d5d]">UNSAFE</span></div>
            </div>
          </div>

          {/* Draggable Slider Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#00f0ff] cursor-ew-resize z-20 shadow-[0_0_15px_#00f0ff]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#00f0ff] text-black font-bold flex items-center justify-center text-xs shadow-lg">
              ↔
            </div>
          </div>

          {/* Hidden Range Input overlay for easy mouse/touch dragging */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(+e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>
      </div>
    </section>
  )
}
