"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crosshair } from "lucide-react"
import ShooterGame from "./shooter-game"

export default function GameTrigger() {
  const [gameOpen, setGameOpen] = useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="game-trigger"
        onClick={() => setGameOpen(true)}
        whileHover={{ scale: 1.08, x: -3, y: -3 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        title="Open Practice Range"
      >
        <span className="game-trigger__icon">
          <Crosshair className="h-5 w-5" />
        </span>
        <span className="game-trigger__label">PRACTICE</span>
        <span className="game-trigger__glow" />
      </motion.button>

      {/* Game modal */}
      <AnimatePresence>
        {gameOpen && (
          <ShooterGame isOpen={gameOpen} onClose={() => setGameOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
