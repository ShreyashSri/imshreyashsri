"use client"

import { useEffect, useRef, useState } from "react"


export type Phase = "idle" | "tension" | "glint" | "early" | "struck"

const HOLD = 1100

export function Standoff({ ready, onStrike, phase, setPhase }: { ready: () => boolean; onStrike: () => void; phase: Phase; setPhase: (p: Phase) => void }) {
  const timer = useRef(0)
  const [calm, setCalm] = useState(false)

  useEffect(() => setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches), [])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const start = () => {
    if (phase === "tension" || phase === "glint" || !ready()) return
    setPhase("tension")
    timer.current = window.setTimeout(() => {
      setPhase("glint")
    }, HOLD)
  }

  const release = () => {
    window.clearTimeout(timer.current)
    if (phase === "glint") {
      setPhase("struck")
      onStrike()
    } else if (phase === "tension") {
      setPhase("early")
      timer.current = window.setTimeout(() => setPhase("idle"), 1400)
    }
  }

  if (calm) {
    return (
      <button
        type="button"
        onClick={() => {
          if (!ready()) return
          setPhase("struck")
          onStrike()
        }}
        className="got-btn got-btn-primary"
      >
        Seal and send
      </button>
    )
  }

  const label = { idle: "Hold to strike", tension: "Wait…", glint: "Release!", early: "Too soon", struck: "Sent" }[phase]

  return (
    <div className="flex items-center gap-4">
      <p className="hidden text-right text-[10.5px] font-bold uppercase leading-relaxed tracking-[0.26em] text-[#1b1714]/55 sm:block" aria-live="polite">
        {phase === "early" ? "Release on the glint" : phase === "struck" ? "Letter sent" : "Hold, wait for the glint, release"}
      </p>
      <button
        type="button"
        data-phase={phase}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          start()
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault()
            start()
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            release()
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
        className="got-standoff relative flex h-24 w-24 shrink-0 select-none items-center justify-center rounded-full"
        aria-label="Hold to strike and send the letter"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(27,23,20,0.18)" strokeWidth="2" />
          <circle className="got-tension" cx="50" cy="50" r="46" pathLength="1" fill="none" stroke="#c8102e" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
        <span className="got-glint absolute -right-1 -top-1 text-2xl text-[#c8102e]" aria-hidden="true">
          ✦
        </span>
        <span className="relative text-center text-[10px] font-extrabold uppercase leading-tight tracking-[0.2em]">{label}</span>
      </button>
    </div>
  )
}
