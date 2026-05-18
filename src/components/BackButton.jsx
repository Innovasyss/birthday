import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ to = '/gifts', className = '' }) {
  const navigate = useNavigate()

  return (
    <motion.button
      onClick={() => navigate(to)}
      className={`fixed top-6 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <ArrowLeft size={20} />
    </motion.button>
  )
}
