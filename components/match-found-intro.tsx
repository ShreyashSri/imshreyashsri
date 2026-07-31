"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Phase = "searching" | "match-found" | "countdown" | "done"

export default function MatchFoundIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("searching")
  const [countdownValue, setCountdownValue] = useState(3)
  const [dismissed, setDismissed] = useState(false)

  // Check if we've already shown the intro this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("intro-seen")
      if (seen) {
        setPhase("done")
        onComplete()
      }
    }
  }, [onComplete])

  const handleDeploy = useCallback(() => {
    setDismissed(true)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intro-seen", "true")
    }
    setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 800)
  }, [onComplete])

  // Phase progression timeline
  useEffect(() => {
    if (phase === "done") return

    const timers: NodeJS.Timeout[] = []

    if (phase === "searching") {
      timers.push(setTimeout(() => {
        setPhase("match-found")
      }, 1400))
    }

    if (phase === "match-found") {
      timers.push(setTimeout(() => setPhase("countdown"), 1800))
    }

    if (phase === "countdown") {
      timers.push(setTimeout(() => setCountdownValue(2), 1000))
      timers.push(setTimeout(() => setCountdownValue(1), 2000))
      timers.push(setTimeout(() => handleDeploy(), 3000))
    }

    return () => timers.forEach(clearTimeout)
  }, [phase, handleDeploy])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      {!dismissed ? (
        <motion.div
          key="intro-overlay"
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Scan-line overlay */}
          <div className="intro-scanlines" />

          {/* Grid overlay */}
          <div className="intro-grid" />

          {/* Corner HUD brackets */}
          <div className="intro-corner intro-corner--tl" />
          <div className="intro-corner intro-corner--tr" />
          <div className="intro-corner intro-corner--bl" />
          <div className="intro-corner intro-corner--br" />

          {/* HUD status bar */}
          <div className="intro-hud-bar">
            <span className="intro-hud-bar__dot" />
            <span className="intro-hud-bar__text">
            <span className="intro-hud-bar__text">
              {phase === "searching" && "SEARCHING FOR PORTFOLIO..."}
              {phase === "match-found" && "PORTFOLIO LOCATED"}
              {phase === "countdown" && "INITIALIZING SYSTEMS"}
            </span>
            </span>
          </div>

          {/* === PHASE: SEARCHING === */}
          <AnimatePresence mode="wait">
            {phase === "searching" && (
              <motion.div
                key="searching"
                className="intro-phase intro-phase--searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="intro-searching__text">
                  <span className="intro-searching__label">IN QUEUE</span>
                  <div className="intro-searching__bar">
                    <div className="intro-searching__bar-fill" />
                  </div>
                  <span className="intro-searching__sub">SEARCHING FOR MATCH...</span>
                </div>
              </motion.div>
            )}

            {/* === PHASE: MATCH FOUND === */}
            {phase === "match-found" && (
              <motion.div
                key="match-found"
                className="intro-phase intro-phase--match-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {/* White flash */}
                <motion.div
                  className="intro-flash"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Screen shake container */}
                <motion.div
                  className="intro-match-found__content"
                  initial={{ scale: 2.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: [0, -6, 5, -3, 2, 0],
                    y: [0, 4, -5, 3, -2, 0],
                  }}
                  transition={{
                    scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.15 },
                    x: { duration: 0.5, delay: 0.3, ease: "easeOut" },
                    y: { duration: 0.5, delay: 0.3, ease: "easeOut" },
                  }}
                >
                  <h1 className="intro-match-found__title" data-text="MATCH FOUND">
                    MATCH FOUND
                  </h1>
                </motion.div>

                {/* Horizontal accent lines */}
                <motion.div
                  className="intro-match-found__line intro-match-found__line--left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="intro-match-found__line intro-match-found__line--right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* V-shape geometric */}
                <motion.div
                  className="intro-match-found__v-shape"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </motion.div>
            )}

            {/* === PHASE: COUNTDOWN === */}
            {phase === "countdown" && (
              <motion.div
                key="countdown"
                className="intro-phase intro-phase--countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Diamond frame */}
                <div className="intro-countdown__diamond" />

                {/* Countdown number */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={countdownValue}
                    className="intro-countdown__number"
                    initial={{ scale: 2.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {countdownValue}
                  </motion.div>
                </AnimatePresence>

                {/* Geometric V-lines */}
                <svg className="intro-countdown__geo" viewBox="0 0 400 300" fill="none">
                  <motion.path
                    d="M200 280 L100 160 L200 40"
                    stroke="#FF4655"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M200 280 L300 160 L200 40"
                    stroke="#FF4655"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M200 260 L120 160 L200 60"
                    stroke="#FF465533"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3 }}
                  />
                  <motion.path
                    d="M200 260 L280 160 L200 60"
                    stroke="#FF465533"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3 }}
                  />
                </svg>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Wipe-out transition on dismiss */}
          {dismissed && (
            <motion.div
              className="intro-wipe"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
          )}
        </motion.div>
      ) : (
        /* Wipe-out reveal — slides right to reveal portfolio */
        <motion.div
          key="wipe-out"
          className="intro-wipe intro-wipe--exit"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
