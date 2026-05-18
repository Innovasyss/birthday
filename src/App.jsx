import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useEasterEgg } from './hooks/useEasterEgg'
import Intro from './pages/Intro'
import Reveal from './pages/Reveal'
import Gifts from './pages/Gifts'
import Cake from './pages/Cake'
import Letter from './pages/Letter'
import Gallery from './pages/Gallery'
import Ending from './pages/Ending'
import EasterEggLayer from './components/EasterEggLayer'

export default function App() {
  const location = useLocation()
  const { registerKeySequence } = useEasterEgg()

  useEffect(() => {
    const handler = (e) => registerKeySequence(e.key)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [registerKeySequence])

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Intro />} />
          <Route path="/reveal" element={<Reveal />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ending" element={<Ending />} />
        </Routes>
      </AnimatePresence>
      <EasterEggLayer />
    </>
  )
}
