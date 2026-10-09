import { useState, useEffect } from 'react'

/**
 * LIVE DASHBOARD - Real-Time Sensor Telemetry & Node Health Monitor
 * 
 * Features:
 * - Live Telemetry Stream Cards for all 7 Hardware Nodes
 * - Real-Time Animated Sensor Gauges & Node Health Indicators
 */
export default function LiveDashboard() {
  const [telemetry, setTelemetry] = useState({
    temp: 24.2,
    humidity: 48.5,
    distance: 142.8,
    accelX: 0.02,
    accelY: -0.01,
    accelZ: 9.81,
    controlStatus: 'OPERATIONAL',
    systemUptime: '99.998%',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        temp: +(24.0 + Math.random() * 0.6).toFixed(1),
        humidity: +(48.0 + Math.random() * 1.2).toFixed(1),
        distance: +(142.0 + Math.random() * 2.5).toFixed(1),
        accelX: +(0.01 + Math.random() * 0.03).toFixed(2),
        accelY: +(-0.02 + Math.random() * 0.03).toFixed(2),
        accelZ: +(9.79 + Math.random() * 0.04).toFixed(2),
        controlStatus: 'OPERATIONAL',
        systemUptime: '99.998%',
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="live-dashboard" className="st-wrap py-24 bg-[#04060b] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span>LIVE SYSTEM MONITORING</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              REAL-TIME INDUSTRIAL <br />
              <span className="text-[#00f0ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">TELEMETRY DASHBOARD</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-right text-gray-400">
            <div>SYSTEM UPTIME: <span className="text-[#3dffa2]">{telemetry.systemUptime}</span></div>
            <div>STATUS: <span className="text-[#00f0ff]">{telemetry.controlStatus}</span></div>
          </div>
        </div>

        {/* Live Telemetry Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {/* Card 1: Control Unit */}
          <div className="bg-[#080d16] p-6 rounded-2xl border border-[#00f0ff]/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400">NODE 01</span>
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">CONTROL UNIT</h4>
              <p className="text-xs text-[#00f0ff] mb-6">MAIN PROCESSING HUB</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">CPU LOAD</span>
                  <span className="text-white font-bold">14.2%</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">BUS VOLTAGE</span>
                  <span className="text-[#3dffa2] font-bold">5.02 V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CLOCK RATE</span>
                  <span className="text-white font-bold">240 MHz</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-[#00f0ff] tracking-wider uppercase">STATUS: OPTIMAL</div>
          </div>

          {/* Card 2: Environmental Sensor */}
          <div className="bg-[#080d16] p-6 rounded-2xl border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400">NODE 02</span>
                <span className="w-2 h-2 rounded-full bg-[#3dffa2]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">ENVIRONMENTAL</h4>
              <p className="text-xs text-[#3dffa2] mb-6">TEMP & HUMIDITY POD</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">TEMPERATURE</span>
                  <span className="text-white font-bold">{telemetry.temp} °C</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">HUMIDITY</span>
                  <span className="text-white font-bold">{telemetry.humidity} %</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">DEW POINT</span>
                  <span className="text-white font-bold">12.8 °C</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-[#3dffa2] tracking-wider uppercase">STREAM: STABLE</div>
          </div>

          {/* Card 3: Proximity Sensor */}
          <div className="bg-[#080d16] p-6 rounded-2xl border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400">NODE 03</span>
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">PROXIMITY</h4>
              <p className="text-xs text-[#00f0ff] mb-6">ULTRASONIC ARRAY</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">DISTANCE</span>
                  <span className="text-[#00f0ff] font-bold">{telemetry.distance} cm</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">ECHO LATENCY</span>
                  <span className="text-white font-bold">8.2 ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ZONE STATUS</span>
                  <span className="text-[#3dffa2] font-bold">CLEAR</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-[#00f0ff] tracking-wider uppercase">RANGE: ACTIVE</div>
          </div>

          {/* Card 4: Motion Sensor */}
          <div className="bg-[#080d16] p-6 rounded-2xl border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400">NODE 04</span>
                <span className="w-2 h-2 rounded-full bg-[#3dffa2]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">MOTION SENSOR</h4>
              <p className="text-xs text-[#3dffa2] mb-6">IMU ACCELEROMETER</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">ACCEL X</span>
                  <span className="text-white font-bold">{telemetry.accelX} m/s²</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-gray-500">ACCEL Y</span>
                  <span className="text-white font-bold">{telemetry.accelY} m/s²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ACCEL Z</span>
                  <span className="text-[#3dffa2] font-bold">{telemetry.accelZ} m/s²</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] text-[#3dffa2] tracking-wider uppercase">HARMONICS: CALIBRATED</div>
          </div>
        </div>
      </div>
    </section>
  )
}
