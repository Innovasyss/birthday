import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { triggerHeartRain } from '../hooks/useEasterEgg'
import Particles from '../components/Particles'
import BackButton from '../components/BackButton'
import PageTransition from '../components/PageTransition'

const base = import.meta.env.BASE_URL

const memories = [
  {
    id: 1,
    caption: 'Main character energy ✨',
    image: `${base}images/photo1.jpeg`,
  },
  {
    id: 2,
    caption: 'Still one of my favorite photos',
    image: `${base}images/photo3.jpeg`,
  },
  {
    id: 3,
    caption: 'This deserved to be here 💖',
    image: `${base}images/photo2.jpeg`,
  },
]

function MemoryCard({ memory, index, visible }) {
  const rotate = (Math.random() - 0.5) * 4
  const xOffset = (Math.random() - 0.5) * 12

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={
        visible
          ? { opacity: 1, y: 0, rotate }
          : { opacity: 0, y: 60, rotate: 0 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-2xl p-4 pb-6 shadow-xl border border-white/10 w-72 md:w-80"
        style={{ transform: `rotate(${rotate}deg)` }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
        whileHover={{ scale: 1.02, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative">
          <img
            src={memory.image}
            alt={memory.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <p className="font-handwritten text-cream/70 text-base text-center px-2">
          {memory.caption}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [allVisible, setAllVisible] = useState(false)
  const [showEndButton, setShowEndButton] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => setAllVisible(true), memories.length * 400 + 500)
    const t2 = setTimeout(() => setShowEndButton(true), memories.length * 400 + 2000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#251830] to-[#1a1025]">
        <BackButton to="/gifts" />

        <div className="absolute inset-0 bg-gradient-to-br from-lavender/4 via-transparent to-rose-gold/4" />

        <Particles count={12} />

        <motion.h1
          className="relative z-10 font-heading text-2xl md:text-3xl text-cream/80 mt-16 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Memory Gallery 📸
        </motion.h1>

        <div
          ref={containerRef}
          className="relative z-10 flex flex-col items-center gap-6 pb-24 px-4 w-full max-w-sm"
        >
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={index}
              visible={visible}
            />
          ))}

          <AnimatePresence>
            {showEndButton && (
              <motion.button
                onClick={() => {
                  triggerHeartRain()
                  navigate('/ending')
                }}
                className="mt-4 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-lavender/80 to-rose-gold/80 text-cream font-body font-medium text-sm shadow-lg backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196,164,212,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Continue <Heart size={14} className="inline" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
