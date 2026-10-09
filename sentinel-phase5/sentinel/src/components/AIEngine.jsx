import { useState, useEffect } from 'react'

/**
 * AI ENGINE - Neural Trust & Signal Integrity Analysis Component
 * 
 * Features:
 * - Real-time Neural Telemetry Analysis Visualization
 * - Interactive Trust Score Matrix & Signal Vector Inspector
 * - Real-Time Confidence Gauge & Anomaly Classifier
 */
export default function AIEngine() {
  const [activeTab, setActiveTab] = useState('matrix')
  const [trustScore, setTrustScore] = useState(99.4)
  const [neuralPulse, setNeuralPulse] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore((prev) => +(99.2 + Math.random() * 0.6).toFixed(1))
      setNeuralPulse((p) => (p + 1) % 100)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="ai-engine" className="st-wrap py-24 bg-[#04060b] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span>REAL-TIME AI INFERENCE ENGINE</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              INTEGRITY INSIDE <br />
              <span className="text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">EVERY SIGNAL</span>
            </h2>
          </div>
          <div className="flex gap-2 p-1 bg-black/60 rounded-lg border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'matrix' ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-gray-400 hover:text-white'}`}
            >
              TRUST MATRIX
            </button>
            <button
              onClick={() => setActiveTab('vector')}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'vector' ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-gray-400 hover:text-white'}`}
            >
              SIGNAL VECTORS
            </button>
          </div>
        </div>

        {/* Interactive Neural AI Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Panel: Neural Flow Diagram */}
          <div className="lg:col-span-7 bg-[#080d16] p-8 rounded-2xl border border-[#00f0ff]/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-500">
              INFERENCE RATE: <span className="text-[#00f0ff]">2400 Hz</span>
            </div>

            <h3 className="font-mono text-sm tracking-widest text-[#00f0ff] mb-8 uppercase">NEURAL PIPELINE FLOW</h3>

            {/* SVG Interactive Neural Flow */}
            <div className="relative h-64 flex items-center justify-between">
              {/* Node 1: Raw Telemetry */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-xl bg-black/80 border border-gray-700 flex items-center justify-center text-[#00f0ff] shadow-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-gray-400">RAW TELEMETRY</span>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-700 via-[#00f0ff] to-gray-700 relative mx-4">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                  style={{ left: `${neuralPulse}%` }}
                />
              </div>

              {/* Node 2: AI Neural Filter */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#00f0ff]/10 border-2 border-[#00f0ff] flex items-center justify-center text-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-[#00f0ff] font-semibold">AI MATRIX MODEL</span>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex-1 h-0.5 bg-gradient-to-r from-[#00f0ff] via-[#3dffa2] to-gray-700 relative mx-4">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#3dffa2] shadow-[0_0_10px_#3dffa2]"
                  style={{ left: `${(neuralPulse + 50) % 100}%` }}
                />
              </div>

              {/* Node 3: Trusted Output */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-xl bg-black/80 border border-[#3dffa2]/50 flex items-center justify-center text-[#3dffa2] shadow-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-mono text-xs text-[#3dffa2]">TRUSTED METRIC</span>
              </div>
            </div>

            {/* Neural Metric Chips */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="bg-black/50 p-3 rounded border border-white/5">
                <div className="text-gray-500 mb-1">LATENCY</div>
                <div className="text-white font-bold">1.2 ms</div>
              </div>
              <div className="bg-black/50 p-3 rounded border border-white/5">
                <div className="text-gray-500 mb-1">FEATURE MAPS</div>
                <div className="text-[#00f0ff] font-bold">128 Dims</div>
              </div>
              <div className="bg-black/50 p-3 rounded border border-white/5">
                <div className="text-gray-500 mb-1">ACCURACY</div>
                <div className="text-[#3dffa2] font-bold">99.98%</div>
              </div>
            </div>
          </div>

          {/* Right Panel: Trust Score & Confidence Gauge */}
          <div className="lg:col-span-5 bg-[#080d16] p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-mono text-sm tracking-widest text-gray-400 uppercase mb-4">SYSTEM CONFIDENCE SCORE</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-extrabold text-white font-mono tracking-tighter">{trustScore}%</span>
                <span className="text-sm font-mono text-[#3dffa2] bg-[#3dffa2]/10 px-2 py-0.5 rounded border border-[#3dffa2]/30">HIGH TRUST</span>
              </div>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                The Sentinel AI Engine continuously screens all incoming sensor telemetry against trained physical anomaly vectors, neutralizing sensor drift and signal tampering before it hits control loops.
              </p>
            </div>

            <div className="space-y-4 mt-8 pt-6 border-t border-white/10 font-mono text-xs">
              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>ENVIRONMENTAL DRIFT</span>
                  <span className="text-[#00f0ff]">0.02%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00f0ff] w-[4%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>PROXIMITY INTEGRITY</span>
                  <span className="text-[#3dffa2]">99.9%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3dffa2] w-[99.9%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>MOTION HARMONICS</span>
                  <span className="text-[#3dffa2]">100.0%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3dffa2] w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
