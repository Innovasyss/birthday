import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function HeartRainEffect() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blush"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-40px',
            fontSize: `${Math.random() * 20 + 16}px`,
          }}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0.4, 0],
            rotate: [0, Math.random() * 360 - 180],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          🤍
        </motion.div>
      ))}
    </div>
  )
}

function SecretMessage({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-cream/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border border-lavender/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <p className="text-lavender font-heading text-xl text-center">
          You found the secret message 👀
        </p>
      </motion.div>
    </motion.div>
  )
}

function CatMessage({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-cream/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl border border-blush/30 text-center"
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <span className="text-4xl block mb-2">🐱</span>
        <p className="text-rose-gold-dark font-heading text-lg">
          Okay this exists just because it's cute.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function EasterEggLayer() {
  const [heartRain, setHeartRain] = useState(false)
  const [secret, setSecret] = useState(false)
  const [cat, setCat] = useState(false)

  const onHeartRain = useCallback(() => {
    setHeartRain(true)
    setTimeout(() => setHeartRain(false), 5000)
  }, [])

  const onSecret = useCallback(() => {
    setSecret(true)
    setTimeout(() => setSecret(false), 3000)
  }, [])

  const onCat = useCallback(() => {
    setCat(true)
    setTimeout(() => setCat(false), 3000)
  }, [])

  useEffect(() => {
    window.addEventListener('easteregg:heartrain', onHeartRain)
    window.addEventListener('easteregg:secret', onSecret)
    window.addEventListener('easteregg:cat', onCat)
    return () => {
      window.removeEventListener('easteregg:heartrain', onHeartRain)
      window.removeEventListener('easteregg:secret', onSecret)
      window.removeEventListener('easteregg:cat', onCat)
    }
  }, [onHeartRain, onSecret, onCat])

  return (
    <>
      <AnimatePresence>{heartRain && <HeartRainEffect />}</AnimatePresence>
      <AnimatePresence>
        {secret && <SecretMessage onClose={() => setSecret(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {cat && <CatMessage onClose={() => setCat(false)} />}
      </AnimatePresence>
    </>
  )
}
