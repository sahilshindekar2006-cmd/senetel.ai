import { useState } from 'react'

/**
 * FAULT SIMULATOR - Interactive Test Bench Component
 * 
 * Features:
 * - Interactive Fault Injector (Noise, Drift, Out of Range, Freeze)
 * - Live System Mitigation Response Feedback
 */
export default function FaultSimulator() {
  const [activeFault, setActiveFault] = useState(null)
  const [simStatus, setSimStatus] = useState({
    state: 'NOMINAL',
    trustScore: 99.8,
    action: 'Monitoring active telemetry streams',
    color: 'text-[#3dffa2]',
  })

  const injectFault = (faultType) => {
    setActiveFault(faultType)
    if (faultType === 'noise') {
      setSimStatus({
        state: 'HIGH NOISE DETECTED',
        trustScore: 84.2,
        action: 'AI Wavelet Filter Engaged — High-frequency spikes eliminated',
        color: 'text-[#00f0ff]',
      })
    } else if (faultType === 'drift') {
      setSimStatus({
        state: 'THERMAL DRIFT DETECTED',
        trustScore: 78.5,
        action: 'Polynomial Compensation Applied — Baseline restored',
        color: 'text-[#00f0ff]',
      })
    } else if (faultType === 'range') {
      setSimStatus({
        state: 'OUT OF RANGE CLIPPED',
        trustScore: 62.0,
        action: 'Range Isolator Engaged — Sensor value clamped to safe physical limits',
        color: 'text-[#ff5d5d]',
      })
    } else if (faultType === 'freeze') {
      setSimStatus({
        state: 'SENSOR FREEZE DETECTED',
        trustScore: 45.0,
        action: 'Secondary Observer Synthesized — Backup state estimator active',
        color: 'text-[#ff5d5d]',
      })
    }
  }

  const resetSim = () => {
    setActiveFault(null)
    setSimStatus({
      state: 'NOMINAL',
      trustScore: 99.8,
      action: 'All systems operating within baseline parameters',
      color: 'text-[#3dffa2]',
    })
  }

  return (
    <section id="fault-simulator" className="st-wrap py-24 bg-[#06080e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs mb-4">
              <span>HARDWARE FAULT SIMULATOR & TEST BENCH</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              TEST SENTINEL <br />
              <span className="text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">IN REAL TIME</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm">
            Select a fault injection scenario below to simulate real-world hardware failures and watch Sentinel's AI mitigation pipeline instantly isolate and compensate.
          </p>
        </div>

        {/* Test Bench Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Fault Injection Controls */}
          <div className="lg:col-span-6 bg-[#080d16] p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-sm tracking-widest text-gray-400 uppercase mb-6">SELECT FAULT SCENARIO</h3>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <button
                  onClick={() => injectFault('noise')}
                  className={`p-4 rounded-xl border text-left transition-all ${activeFault === 'noise' ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  <div className="font-bold text-sm mb-1">NOISE SPIKE</div>
                  <div className="text-gray-400 text-[11px]">High frequency noise</div>
                </button>

                <button
                  onClick={() => injectFault('drift')}
                  className={`p-4 rounded-xl border text-left transition-all ${activeFault === 'drift' ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  <div className="font-bold text-sm mb-1">THERMAL DRIFT</div>
                  <div className="text-gray-400 text-[11px]">Gradual calibration bias</div>
                </button>

                <button
                  onClick={() => injectFault('range')}
                  className={`p-4 rounded-xl border text-left transition-all ${activeFault === 'range' ? 'bg-[#ff5d5d]/20 border-[#ff5d5d] text-[#ff5d5d] shadow-[0_0_15px_rgba(255,93,93,0.3)]' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  <div className="font-bold text-sm mb-1">OUT OF RANGE</div>
                  <div className="text-gray-400 text-[11px]">Physical limit clip</div>
                </button>

                <button
                  onClick={() => injectFault('freeze')}
                  className={`p-4 rounded-xl border text-left transition-all ${activeFault === 'freeze' ? 'bg-[#ff5d5d]/20 border-[#ff5d5d] text-[#ff5d5d] shadow-[0_0_15px_rgba(255,93,93,0.3)]' : 'bg-black/40 border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  <div className="font-bold text-sm mb-1">FREEZE FAULT</div>
                  <div className="text-gray-400 text-[11px]">Stuck telemetry value</div>
                </button>
              </div>
            </div>

            <button
              onClick={resetSim}
              className="mt-8 w-full py-3 rounded-xl bg-white/5 border border-white/20 text-white font-mono text-xs hover:bg-white/10 transition-all"
            >
              RESET SIMULATOR TO NOMINAL BASELINE
            </button>
          </div>

          {/* Right Column: Live Mitigation Status Display */}
          <div className="lg:col-span-6 bg-[#080d16] p-8 rounded-2xl border border-[#00f0ff]/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-mono text-sm tracking-widest text-[#00f0ff] uppercase">AI RESPONSE DIAGNOSTICS</h3>
                <span className="font-mono text-xs text-gray-500">LIVE FEEDBACK</span>
              </div>

              <div className="bg-black/60 p-6 rounded-xl border border-white/10 space-y-4 font-mono">
                <div>
                  <div className="text-xs text-gray-500 mb-1">DETECTION STATE</div>
                  <div className={`text-xl font-bold ${simStatus.color}`}>{simStatus.state}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">ADAPTIVE ACTION</div>
                  <div className="text-sm text-gray-200">{simStatus.action}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">COMPENSATED TRUST SCORE</div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-white">{simStatus.trustScore}%</span>
                    <span className="text-xs text-[#3dffa2] bg-[#3dffa2]/10 px-2 py-0.5 rounded border border-[#3dffa2]/30">
                      SAFETY PRESERVED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff] flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Sentinel automatically maintains downstream actuator safety regardless of sensor fault state.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
