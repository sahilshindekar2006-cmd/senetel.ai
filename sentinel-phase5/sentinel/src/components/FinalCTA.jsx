import { useState } from 'react'

/**
 * FINAL CTA - Cinematic Pre-Order & Documentation Section
 * 
 * Features:
 * - Interactive Documentation Access & Deployment Trigger Modal
 * - Real-Time System Status Ticker
 */
export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  return (
    <section id="cta" className="st-wrap py-32 bg-[#04060b] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00f0ff]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span>PRODUCTION-READY IoT ARCHITECTURE</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
          DEPLOY SENTINEL <br />
          <span className="text-[#00f0ff] drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            INTO YOUR INFRASTRUCTURE
          </span>
        </h2>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Zero unvetted signals. Zero unhandled hardware faults. Access complete hardware schematics, SDK documentation, and enterprise AI deployment guides.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center font-mono">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00f0ff] text-black font-semibold text-sm hover:bg-[#4fd8ff] transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]"
          >
            REQUEST DEVELOPER SDK ACCESS
          </button>
          <a
            href="#components"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 border border-white/20 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/5 transition-all"
          >
            EXPLORE 3D HARDWARE MODEL
          </a>
        </div>
      </div>

      {/* Interactive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#080d16] border border-[#00f0ff]/40 p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => { setModalOpen(false); setEmailSubmitted(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono"
            >
              ✕
            </button>

            {!emailSubmitted ? (
              <div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">REQUEST SENTINEL SDK</h3>
                <p className="text-xs font-mono text-gray-400 mb-6">Enter your enterprise email to receive hardware design files and AI model weights.</p>
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-gray-300 mb-1">WORK EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="engineer@company.com"
                      className="w-full p-3 rounded-lg bg-black/60 border border-white/15 text-white focus:border-[#00f0ff] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#00f0ff] text-black font-bold hover:bg-[#4fd8ff] transition-all"
                  >
                    SUBMIT ACCESS REQUEST
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#3dffa2]/20 border border-[#3dffa2] text-[#3dffa2] flex items-center justify-center mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-bold font-mono text-white mb-2">ACCESS GRANTED</h3>
                <p className="text-xs font-mono text-gray-400">Documentation package and SDK download link sent to your email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
