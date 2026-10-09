import { useState, useEffect } from 'react'

/**
 * FAULT DETECTION - Live Signal Anomaly & Telemetry Inspector
 * 
 * Features:
 * - Real-Time Waveform Anomaly Visualizer
 * - Multi-Factor Fault Diagnostic Categories
 * - Live Event Stream Log
 */
export default function FaultDetection() {
  const [logs, setLogs] = useState([
    { id: 1, time: '23:24:01', sensor: 'DHT11 / TEMP', type: 'THERMAL DRIFT', status: 'MITIGATED', severity: 'low' },
    { id: 2, time: '23:23:45', sensor: 'JSN-SR04T', type: 'OUT OF BOUNDS', status: 'FILTERED', severity: 'medium' },
    { id: 3, time: '23:22:18', sensor: 'ACCELEROMETER', type: 'HARMONIC NOISE', status: 'CLEARED', severity: 'low' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toTimeString().split(' ')[0]
      const sensors = ['DHT11 / TEMP', 'JSN-SR04T', 'ACCELEROMETER', 'CONTROL UNIT']
      const types = ['SIGNAL SPIKE', 'VOLTAGE DIP', 'DRIFT VARIANCE', 'PACKET LOSS']
      const randomSensor = sensors[Math.floor(Math.random() * sensors.length)]
      const randomType = types[Math.floor(Math.random() * types.length)]

      setLogs((prev) => [
        { id: Date.now(), time: now, sensor: randomSensor, type: randomType, status: 'MITIGATED', severity: 'low' },
        ...prev.slice(0, 4),
      ])
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="fault-detection" className="st-wrap py-24 bg-[#06080e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5d5d]/10 border border-[#ff5d5d]/30 text-[#ff5d5d] font-mono text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff5d5d] animate-ping" />
              <span>ACTIVE DIAGNOSTIC MONITORING</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              INSTANT ANOMALY <br />
              <span className="text-[#ff5d5d] drop-shadow-[0_0_20px_rgba(255,93,93,0.3)]">DETECTION & ISOLATION</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm">
            Sentinel flags hardware anomalies in microsecond windows, maintaining system operation even when individual sensors experience electrical noise, drift, or catastrophic damage.
          </p>
        </div>

        {/* Diagnostic Waveform & Event Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Waveform Visualizer */}
          <div className="lg:col-span-7 bg-[#0a0e18] p-8 rounded-2xl border border-white/10 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-sm tracking-widest text-[#00f0ff] uppercase">LIVE TELEMETRY WAVEFORM INSPECTOR</h3>
              <span className="font-mono text-xs text-gray-500">SAMPLE FREQ: 500 Hz</span>
            </div>

            {/* SVG Live Waveform Canvas */}
            <div className="relative h-48 bg-black/60 rounded-xl border border-white/5 overflow-hidden flex items-center">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#ffffff10" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#ffffff20" />
                <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#ffffff10" strokeDasharray="4 4" />

                {/* Wave Area Fill */}
                <path
                  d="M0,75 Q50,40 100,75 T200,75 T300,30 T350,120 T400,75 T500,75 L500,150 L0,150 Z"
                  fill="url(#waveGrad)"
                />
                {/* Wave Path */}
                <path
                  d="M0,75 Q50,40 100,75 T200,75 T300,30 T350,120 T400,75 T500,75"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                />

                {/* Anomaly Spike Marker */}
                <circle cx="350" cy="120" r="6" fill="#ff5d5d" className="animate-ping" />
                <circle cx="350" cy="120" r="4" fill="#ff5d5d" />
              </svg>

              <div className="absolute top-4 right-4 bg-[#ff5d5d]/20 border border-[#ff5d5d]/50 px-3 py-1 rounded text-[#ff5d5d] font-mono text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d5d] animate-pulse" />
                <span>ANOMALY FLAGGED AT T+350ms</span>
              </div>
            </div>

            {/* Diagnostic Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'THERMAL DRIFT', val: 'NOMINAL', color: 'text-[#3dffa2]' },
                { label: 'SIGNAL NOISE', val: 'FILTERED', color: 'text-[#00f0ff]' },
                { label: 'OUT OF RANGE', val: 'ISOLATED', color: 'text-[#00f0ff]' },
                { label: 'HARDWARE FREEZE', val: '0 DETECTED', color: 'text-[#3dffa2]' },
              ].map((c) => (
                <div key={c.label} className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-xs">
                  <div className="text-gray-500 mb-1">{c.label}</div>
                  <div className={`font-semibold ${c.color}`}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Stream Panel */}
          <div className="lg:col-span-5 bg-[#0a0e18] p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-mono text-sm tracking-widest text-gray-400 uppercase">REAL-TIME EVENT STREAM</h3>
                <span className="w-2 h-2 rounded-full bg-[#3dffa2] animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-lg bg-black/60 border border-white/5 flex items-center justify-between gap-4 transition-all hover:border-[#00f0ff]/30">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-500">{log.time}</span>
                        <span className="text-white font-semibold">{log.sensor}</span>
                      </div>
                      <div className="text-gray-400 text-[11px]">{log.type}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#3dffa2]/10 border border-[#3dffa2]/30 text-[#3dffa2] font-semibold text-[10px]">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-gray-400 flex justify-between items-center">
              <span>ACTIVE THREAT LEVEL</span>
              <span className="text-[#3dffa2] font-semibold">LEVEL 0 (SAFE)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
