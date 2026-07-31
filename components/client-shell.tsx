"use client"

import { useState, useCallback } from "react"
import MatchFoundIntro from "./match-found-intro"
import GameTrigger from "./game-trigger"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <>
      {/* Intro overlay */}
      <MatchFoundIntro onComplete={handleIntroComplete} />

      {/* Main content */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          pointerEvents: introComplete ? "auto" : "none",
          transition: "opacity 0.5s ease 0.1s",
        }}
      >
        {children}
      </div>

      {/* Floating game trigger */}
      {introComplete && <GameTrigger />}
    </>
  )
}
