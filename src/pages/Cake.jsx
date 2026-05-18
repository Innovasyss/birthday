import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Flame } from 'lucide-react'
import { triggerHeartRain } from '../hooks/useEasterEgg'
import Particles from '../components/Particles'
import Confetti from '../components/Confetti'
import TypingText from '../components/TypingText'
import BackButton from '../components/BackButton'
import PageTransition from '../components/PageTransition'

function Candle({ blown, onBlow }) {
  return (
    <motion.g
      onClick={onBlow}
      style={{ cursor: 'pointer' }}
      whileTap={{ scale: 0.95 }}
    >
      <rect x="45" y="38" width="10" height="22" rx="2" fill="#f5e6d0" />
      <rect x="47" y="40" width="6" height="18" rx="1" fill="#f0dcc8" />
      <line x1="50" y1="38" x2="50" y2="32" stroke="#f5e6d0" strokeWidth="1.5" />
      <line x1="47" y1="36" x2="47" y2="34" stroke="#f5e6d0" strokeWidth="1" />
      <line x1="53" y1="36" x2="53" y2="34" stroke="#f5e6d0" strokeWidth="1" />
      {!blown && (
        <>
          <motion.ellipse
            cx="50" cy="28" rx="3" ry="6"
            fill="#ff9a44"
            animate={{ scaleY: [1, 1.1, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="50" cy="26" rx="1.5" ry="3.5"
            fill="#ffd700"
            animate={{ scaleY: [1, 1.2, 0.8, 1], scaleX: [1, 0.8, 1.2, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="50" cy="24" rx="0.8" ry="2"
            fill="#fff"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.15, repeat: Infinity }}
          />
          <motion.circle
            cx="50" cy="26" r="4"
            fill="#ff9a44"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </>
      )}
    </motion.g>
  )
}

export default function Cake() {
  const navigate = useNavigate()
  const [blown, setBlown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWishText, setShowWishText] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowWishText(true), 800)
  }, [])

  const handleBlow = () => {
    if (!blown) {
      setBlown(true)
      setTimeout(() => {
        setShowConfetti(true)
        triggerHeartRain()
      }, 500)
    }
  }

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#251830] to-[#1a1025]">
        <BackButton to="/gifts" />

        <div className="absolute inset-0 bg-gradient-to-t from-lavender/5 via-transparent to-blush/5" />

        <Particles count={15} />
        {showConfetti && <Confetti count={60} />}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-gold/8 rounded-full blur-[120px]" />

        <div className="relative z-10 w-[88%] max-w-sm flex flex-col items-center gap-8">
          <div className="text-center space-y-2">
            {showWishText && (
              <TypingText
                text="Make a wish ✨"
                className="text-lavender font-heading text-xl md:text-2xl"
                speed={80}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              animate={!blown ? {
                y: [0, -3, 0],
              } : {
                y: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" width="220" height="220" className="md:w-64 md:h-64">
                <defs>
                  <linearGradient id="cakeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5d5d8" />
                    <stop offset="100%" stopColor="#e8b4b8" />
                  </linearGradient>
                  <linearGradient id="frostingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff8f0" />
                    <stop offset="100%" stopColor="#fce4ec" />
                  </linearGradient>
                </defs>

                <rect x="20" y="55" width="60" height="30" rx="3" fill="url(#cakeGrad)" />
                <rect x="22" y="57" width="56" height="26" rx="2" fill="url(#frostingGrad)" opacity="0.3" />

                <rect x="15" y="45" width="70" height="15" rx="3" fill="#f0c4c8" />
                <rect x="17" y="47" width="66" height="11" rx="2" fill="#fce4ec" opacity="0.4" />

                <rect x="25" y="35" width="50" height="14" rx="3" fill="#e8b4b8" />
                <rect x="27" y="37" width="46" height="10" rx="2" fill="#f5d5d8" opacity="0.4" />

                <Candle blown={blown} onBlow={handleBlow} />

                <motion.text
                  x="50" y="78"
                  textAnchor="middle"
                  fill="#fff8f0"
                  fontSize="7"
                  fontFamily="Playfair Display"
                  opacity="0.7"
                >
                  19
                </motion.text>
              </svg>
            </motion.div>

            {!blown && (
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-gold/30"
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame size={16} />
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence>
            {blown && (
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.p
                  className="text-cream/70 font-body text-sm"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Wish officially registered 🎂
                </motion.p>

                <p className="text-lavender font-heading text-lg">
                  Happy Birthday, my friend 💖
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!blown && (
            <motion.p
              className="text-cream/40 font-body text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Tap the candle to blow it out 🎉
            </motion.p>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
