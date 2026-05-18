import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Star } from 'lucide-react'
import { triggerHeartRain, triggerSecret } from '../hooks/useEasterEgg'
import Particles from '../components/Particles'
import PageTransition from '../components/PageTransition'

export default function Intro() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [heartsCount, setHeartsCount] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.toLowerCase() === 'shifa') {
      setUnlocked(true)
      triggerHeartRain()
      setTimeout(() => navigate('/reveal'), 2500)
    } else {
      setError(true)
      setShakeKey(k => k + 1)
      setTimeout(() => setError(false), 1000)
    }
  }

  const handleHeartClick = () => {
    const next = heartsCount + 1
    setHeartsCount(next)
    if (next >= 5) {
      triggerHeartRain()
      setHeartsCount(0)
    }
  }

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#2a1a35] to-[#1a1025]">
        <Particles count={25} />

        <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 via-transparent to-blush/5" />

        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-lavender/10 rounded-full blur-[80px] animate-pulse" />

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="lock"
              className="relative z-10 w-[88%] max-w-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-lavender/10">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c4a4d4" strokeWidth="1.5" className="drop-shadow-lg">
                      <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" />
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                    </svg>
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={14} className="text-rose-gold" />
                    </motion.div>
                  </div>
                </motion.div>

                <p className="text-center text-cream/80 font-body text-sm mb-1">
                  A little surprise for someone special
                </p>
                <motion.p
                  className="text-center text-lavender font-heading text-lg mb-6"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎀
                </motion.p>

                <p className="text-center text-cream/60 font-body text-xs mb-6">
                  Only Shifa can unlock this.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    key={shakeKey}
                    animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      ref={inputRef}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password..."
                      className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-cream placeholder-cream/30 font-body text-sm outline-none transition-all duration-300 ${
                        error
                          ? 'border-red-400/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]'
                          : 'border-white/10 focus:border-lavender/50 focus:shadow-[0_0_20px_rgba(196,164,212,0.15)]'
                      }`}
                      autoFocus
                    />
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-300/80 text-xs text-center font-body"
                      >
                        Hmm… try again birthday girl 👀
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-lavender/80 to-rose-gold/80 text-cream font-body font-medium text-sm shadow-lg backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(196,164,212,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Unlock ✨
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlock"
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="text-6xl mb-4">✨</div>
                <p className="text-cream/80 font-heading text-xl">Unlocking memories...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleHeartClick}
          className="fixed bottom-8 right-6 z-20 text-blush/30 hover:text-blush/60 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={18} />
        </motion.button>

        <motion.div
          className="fixed top-20 right-8 z-20 cursor-pointer"
          onContextMenu={(e) => {
            e.preventDefault()
            triggerSecret()
          }}
          onTouchStart={() => {
            const timer = setTimeout(() => triggerSecret(), 800)
            const cancel = () => clearTimeout(timer)
            window.addEventListener('touchend', cancel, { once: true })
            window.addEventListener('touchmove', cancel, { once: true })
          }}
          onMouseDown={() => {
            const timer = setTimeout(() => triggerSecret(), 800)
            const cancel = () => clearTimeout(timer)
            window.addEventListener('mouseup', cancel, { once: true })
            window.addEventListener('mousemove', cancel, { once: true })
          }}
        >
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 180], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <Star size={14} className="text-lavender/30" />
          </motion.div>
        </motion.div>

        <motion.p
          className="fixed bottom-8 left-6 z-20 text-cream/20 font-body text-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          made for shifa ♡
        </motion.p>
      </div>
    </PageTransition>
  )
}
