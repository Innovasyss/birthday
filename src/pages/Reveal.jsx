import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift } from 'lucide-react'
import { triggerHeartRain } from '../hooks/useEasterEgg'
import Particles from '../components/Particles'
import Confetti from '../components/Confetti'
import TypingText from '../components/TypingText'
import PageTransition from '../components/PageTransition'

function FloatingSparkle({ index }) {
  const x = Math.random() * 100
  const dur = Math.random() * 4 + 3
  const delay = Math.random() * 2

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: '-20px' }}
      animate={{
        y: ['0vh', '100vh'],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 0.5, 0],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Sparkles size={12 + Math.random() * 8} className="text-rose-gold/40" />
    </motion.div>
  )
}

export default function Reveal() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 3500)
    const t3 = setTimeout(() => {
      setPhase(3)
      setShowConfetti(true)
      triggerHeartRain()
    }, 6500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#251830] to-[#1a1025]">
        <div className="absolute inset-0 bg-gradient-to-t from-lavender/5 via-transparent to-blush/5" />

        <Particles count={20} />
        {showConfetti && <Confetti count={50} />}

        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingSparkle key={i} index={i} />
        ))}

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-lavender/8 rounded-full blur-[120px]" />

        <div className="relative z-10 w-[88%] max-w-sm text-center space-y-6">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  ✨
                </motion.div>
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div
                key="typing1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TypingText
                  text="Today isn't an ordinary day…"
                  className="text-cream/70 font-body text-sm md:text-base"
                  speed={60}
                />
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                key="typing2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TypingText
                  text="Because someone amazing turned 19 ✨"
                  className="text-lavender font-body text-sm md:text-base"
                  speed={50}
                  delay={300}
                />
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-8"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -top-4 -left-4 text-2xl"
                    animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🎀
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-4 text-2xl"
                    animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    ✨
                  </motion.div>
                </div>

                <motion.h1
                  className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-lavender via-blush to-rose-gold bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  HAPPY BIRTHDAY
                  <br />
                  SHIFA 🎂
                </motion.h1>

                <motion.div
                  className="w-16 h-[2px] mx-auto bg-gradient-to-r from-transparent via-rose-gold to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                <motion.button
                  onClick={() => navigate('/gifts')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-lavender/80 to-rose-gold/80 text-cream font-body font-medium text-sm shadow-lg backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196,164,212,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  Open your gifts <Gift size={16} className="inline" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
