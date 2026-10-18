"use client"

import { useEffect, useState } from "react"

export function Loader({ ready }: { ready: boolean }) {
  const [visible, setVisible] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 250)
    return () => window.clearTimeout(show)
  }, [])

  useEffect(() => {
    if (!ready) return
    const hide = window.setTimeout(() => setGone(true), 700)
    return () => window.clearTimeout(hide)
  }, [ready])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-900 bg-black transition-opacity duration-700"
      style={{ opacity: ready || !visible ? 0 : 1, pointerEvents: ready ? "none" : "auto" }}
      role="status"
      aria-live="polite"
      aria-label={ready ? "Loaded" : "Loading"}
    >
      <div className="absolute bottom-7 right-8 flex items-center gap-3 font-rocks text-[18px] uppercase tracking-[0.12em] text-white/80">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        Loading
      </div>
    </div>
  )
}
