import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from '../components/Particles'
import PageTransition from '../components/PageTransition'

const gifts = [
  {
    id: 'cake',
    label: 'Cake',
    emoji: '🎂',
    color: 'from-lavender/60 to-lavender/30',
    border: 'border-lavender/30',
    glow: 'shadow-lavender/20',
    route: '/cake',
  },
  {
    id: 'letter',
    label: 'Letter',
    emoji: '💌',
    color: 'from-cream/60 to-cream/20',
    border: 'border-cream/30',
    glow: 'shadow-cream/10',
    route: '/letter',
  },
  {
    id: 'gallery',
    label: 'Memories',
    emoji: '📸',
    color: 'from-rose-gold/60 to-rose-gold/30',
    border: 'border-rose-gold/30',
    glow: 'shadow-rose-gold/20',
    route: '/gallery',
  },
]

function GiftBox({ gift, index, opened, setOpened, navigate }) {
  const isOpen = opened[gift.id]

  return (
    <motion.button
      onClick={() => {
        if (!isOpen) {
          setOpened(prev => ({ ...prev, [gift.id]: true }))
        }
        setTimeout(() => navigate(gift.route), 400)
      }}
      className="relative flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3 + 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`relative w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-b ${gift.color} backdrop-blur-md border ${gift.border} shadow-xl ${gift.glow} flex items-center justify-center cursor-pointer`}
        animate={{
          y: [0, -5, 0],
          rotate: isOpen ? [0, -3, 3, -3, 0] : [0, 1, -1, 0],
          scale: isOpen ? 1 : [1, 1.02, 1],
        }}
        transition={{
          y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, -2, 0] }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen && (
          <motion.div
            className="absolute -top-3 -right-3 bg-lavender/80 text-white text-xs px-2 py-0.5 rounded-full font-body"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            ✨ open
          </motion.div>
        )}
        <motion.div
          className="text-5xl md:text-6xl"
          animate={isOpen ? { rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {gift.emoji}
        </motion.div>

        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 30px rgba(255,255,255,0.05)', '0 0 0px rgba(255,255,255,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.div>

      <motion.span
        className="font-heading text-cream/80 text-lg"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
      >
        {gift.label}
      </motion.span>
    </motion.button>
  )
}

export default function Gifts() {
  const navigate = useNavigate()
  const [opened, setOpened] = useState({})

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#221530] to-[#1a1025]">
        <div className="absolute inset-0 bg-gradient-radial from-lavender/5 via-transparent to-transparent" />

        <Particles count={15} />

        <motion.h1
          className="relative z-10 font-heading text-2xl md:text-3xl text-cream/80 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Choose a gift 🎁
        </motion.h1>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-8 w-full px-6 max-w-lg md:max-w-2xl mx-auto">
          {gifts.map((gift, i) => (
            <GiftBox
              key={gift.id}
              gift={gift}
              index={i}
              opened={opened}
              setOpened={setOpened}
              navigate={navigate}
            />
          ))}
        </div>

        <motion.p
          className="absolute bottom-10 text-cream/30 font-body text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Tap a gift to open it ✨
        </motion.p>
      </div>
    </PageTransition>
  )
}
