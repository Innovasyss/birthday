import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Gift, RotateCcw, Sparkles } from 'lucide-react'
import { triggerHeartRain, triggerCat } from '../hooks/useEasterEgg'
import Particles from '../components/Particles'
import Confetti from '../components/Confetti'
import TypingText from '../components/TypingText'
import PageTransition from '../components/PageTransition'

function FloatingHeart({ index }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: '-20px',
        fontSize: `${14 + Math.random() * 16}px`,
      }}
      animate={{
        y: ['0vh', '105vh'],
        x: [0, (Math.random() - 0.5) * 80],
        rotate: [0, Math.random() * 360 - 180],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 3 + index * 0.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Heart
        size={14 + Math.random() * 8}
        className="text-blush/40"
        fill="currentColor"
      />
    </motion.div>
  )
}

export default function Ending() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    triggerHeartRain()
    const t1 = setTimeout(() => setPhase(1), 1500)
    const t2 = setTimeout(() => setPhase(2), 5500)
    const t3 = setTimeout(() => setShowButtons(true), 7500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#251830] to-[#1a1025]">
        <div className="absolute inset-0 bg-gradient-to-t from-lavender/8 via-transparent to-blush/8" />

        <Particles count={15} />
        <Confetti count={35} />

        {Array.from({ length: 10 }).map((_, i) => (
          <FloatingHeart key={i} index={i} />
        ))}

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender/6 rounded-full blur-[150px]" />

        <div className="relative z-10 w-[88%] max-w-sm text-center space-y-8">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-5xl"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div
                key="mission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TypingText
                  text="Okay birthday girl… mission complete 💖"
                  className="text-cream/80 font-heading text-xl md:text-2xl"
                  speed={60}
                />
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-lavender/70 font-heading text-lg">
                    Hope this made you smile.
                  </p>
                </motion.div>

                <motion.div
                  className="w-20 h-[2px] mx-auto bg-gradient-to-r from-transparent via-blush to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                <AnimatePresence>
                  {showButtons && (
                    <motion.div
                      className="flex flex-col items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <motion.button
                        onClick={() => navigate('/gifts')}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-lavender/80 to-rose-gold/80 text-cream font-body font-medium text-sm shadow-lg backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196,164,212,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Gift size={16} />
                        Return to gifts
                      </motion.button>

                      <motion.button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-cream/60 font-body text-sm border border-white/5 backdrop-blur-sm"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw size={14} />
                        Replay
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.p
                  className="text-cream/20 font-body text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  made with ♡ for shifa
                </motion.p>

                <motion.button
                  onClick={() => triggerCat()}
                  className="fixed bottom-4 left-4 z-20 text-cream/10 hover:text-cream/30 transition-colors text-lg"
                  whileTap={{ scale: 1.3 }}
                >
                  🐱
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
