import { useMemo } from 'react'
import { motion } from 'framer-motion'

function ConfettiPiece({ index }) {
  const x = useMemo(() => Math.random() * 100, [])
  const color = useMemo(() => {
    const colors = ['#c4a4d4', '#f4c4c4', '#e8b4b8', '#fff8f0', '#f5d5d8', '#d4a4b4', '#e8d5f2', '#ffd700']
    return colors[Math.floor(Math.random() * colors.length)]
  }, [])
  const rotation = useMemo(() => Math.random() * 720 - 360, [])
  const duration = useMemo(() => Math.random() * 2 + 2, [])
  const delay = useMemo(() => Math.random() * 0.5, [])
  const width = useMemo(() => Math.random() * 8 + 4, [])
  const height = useMemo(() => Math.random() * 12 + 6, [])

  return (
    <motion.div
      className="absolute top-0"
      style={{
        left: `${x}%`,
        width,
        height,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: '100vh',
        rotate: rotation,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
      }}
    />
  )
}

export default function Confetti({ count = 40 }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {Array.from({ length: count }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  )
}
