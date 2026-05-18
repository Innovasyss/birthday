import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Particle({ index }) {
  const size = useMemo(() => Math.random() * 6 + 2, [])
  const x = useMemo(() => Math.random() * 100, [])
  const duration = useMemo(() => Math.random() * 20 + 15, [])
  const delay = useMemo(() => Math.random() * 10, [])
  const shape = useMemo(() => {
    const r = Math.random()
    if (r < 0.33) return 'star'
    if (r < 0.66) return 'heart'
    return 'circle'
  }, [])

  const colors = ['#c4a4d4', '#f4c4c4', '#e8b4b8', '#fff8f0', '#f5d5d8']

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: '-10px',
        width: size * 2,
        height: size * 2,
      }}
      animate={{
        y: ['0vh', '110vh'],
        rotate: [0, 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      {shape === 'star' ? (
        <svg viewBox="0 0 24 24" fill={colors[index % colors.length]} width={size * 2} height={size * 2}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ) : shape === 'heart' ? (
        <svg viewBox="0 0 24 24" fill={colors[index % colors.length]} width={size * 2} height={size * 2}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: colors[index % colors.length],
          }}
        />
      )}
    </motion.div>
  )
}

export default function Particles({ count = 20 }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </div>
  )
}
