import { motion } from 'framer-motion'

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-lavender/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blush/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-rose-gold/15 rounded-full blur-[80px]" />
    </div>
  )
}
