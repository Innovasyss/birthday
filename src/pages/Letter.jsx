import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import Particles from '../components/Particles'
import BackButton from '../components/BackButton'
import PageTransition from '../components/PageTransition'

const letterContent = `Hey Shifa,

So you made it past all the locks and secrets just to read a letter. Cute. But I guess you earned it.

Nineteen. That's a big one. You're officially at that age where you're supposed to have your life together — but honestly? Take your time. You're doing beautifully even when you don't feel like it.

I've always admired how you carry yourself — that quiet confidence, the way you care so deeply about the people around you, and how you somehow make even the most ordinary moment feel special. You have a way of making people feel seen, and that's rare.

You deserve all the good things coming your way. All the laughter, the late-night talks, the unexpected joys, the kind of happiness that makes you catch your breath.

And hey, stop being so hard on yourself. Yes, even about that one thing you're thinking about right now. Stop it.

Thank you for being you. For being the kind of person someone would build a whole website for.

Here's to 19. Here's to you.

With love,
Someone who thinks you're pretty great 💖`

export default function Letter() {
  const [opened, setOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [heartClicked, setHeartClicked] = useState(0)

  useEffect(() => {
    if (opened) {
      const t = setTimeout(() => setShowLetter(true), 1500)
      return () => clearTimeout(t)
    }
  }, [opened])

  return (
    <PageTransition>
      <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1025] via-[#251830] to-[#1a1025]">
        <BackButton to="/gifts" />

        <div className="absolute inset-0 bg-gradient-to-br from-cream/3 via-transparent to-blush/3" />

        <Particles count={10} />

        <div className="relative z-10 w-[88%] max-w-md flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -10 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="relative cursor-pointer"
                  onClick={() => setOpened(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <svg width="180" height="140" viewBox="0 0 180 140" className="md:w-52 md:h-40">
                      <defs>
                        <linearGradient id="envGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f5d5d8" />
                          <stop offset="100%" stopColor="#e8b4b8" />
                        </linearGradient>
                      </defs>
                      <rect x="10" y="30" width="160" height="100" rx="6" fill="url(#envGrad)" opacity="0.3" stroke="#e8b4b8" strokeWidth="1" />
                      <polygon points="10,30 90,75 170,30" fill="#e8b4b8" opacity="0.5" />
                      <polygon points="10,30 90,75 170,30" fill="none" stroke="#e8b4b8" strokeWidth="1" />
                      <rect x="10" y="30" width="160" height="100" rx="6" fill="none" stroke="#e8b4b8" strokeWidth="1" />
                      <motion.rect
                        x="75" y="60" width="30" height="20" rx="3"
                        fill="#c4a4d4"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </svg>
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={20} className="text-lavender" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-cream/50 font-body text-xs"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to open 💌
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {showLetter && (
                    <motion.div
                      className="relative w-full"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="relative bg-gradient-to-b from-[#fef9f0] to-[#fdf5e8] rounded-2xl p-6 md:p-8 shadow-2xl border border-rose-gold/20 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c4a4d4' fill-opacity='0.3'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />

                        <div className="relative z-10">
                          <motion.div
                            className="text-center mb-4"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                          >
                            <span className="text-3xl">💌</span>
                          </motion.div>

                          <div className="font-handwritten text-[#5a4a3a] leading-relaxed text-base md:text-lg space-y-3 whitespace-pre-line">
                            {letterContent.split('\n').map((line, i) => (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                                className={line.startsWith('With love') || line.startsWith('Hey Shifa') ? 'font-bold text-lg' : ''}
                              >
                                {line}
                              </motion.p>
                            ))}
                          </div>

                          <motion.div
                            className="flex justify-center mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4 }}
                          >
                            <motion.button
                              onClick={() => {
                                const n = heartClicked + 1
                                setHeartClicked(n)
                              }}
                              className="text-blush/40 hover:text-blush/70 transition-colors"
                              whileTap={{ scale: 1.3 }}
                            >
                              <Heart size={20} fill={heartClicked > 0 ? 'currentColor' : 'none'} />
                            </motion.button>
                          </motion.div>
                        </div>

                        <div className="absolute top-3 right-3 text-rose-gold/10 text-2xl">♡</div>
                        <div className="absolute bottom-3 left-3 text-rose-gold/10 text-2xl">♡</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
