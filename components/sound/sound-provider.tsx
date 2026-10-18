"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

import { SoundEngine, type SoundKit } from "./sound-engine"

const PREFERENCE_KEY = "portfolio-sound"

type SoundApi = { enabled: boolean; setEnabled: (on: boolean) => void; play: (sfx: string) => void }

const SoundContext = createContext<SoundApi>({ enabled: false, setEnabled: () => {}, play: () => {} })

export const useSound = () => useContext(SoundContext)

export function SoundProvider({ kit, children }: { kit: SoundKit; children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(false)
  const engine = useRef<SoundEngine | null>(null)

  const setEnabled = useCallback(
    (on: boolean) => {
      if (on && !engine.current) engine.current = new SoundEngine(kit)
      if (on) engine.current?.fadeIn()
      else engine.current?.fadeOut()
      setEnabledState(on)
      try {
        sessionStorage.setItem(PREFERENCE_KEY, on ? "on" : "off")
      } catch {}
    },
    [kit],
  )

  useEffect(() => {
    let wanted = false
    try {
      wanted = sessionStorage.getItem(PREFERENCE_KEY) === "on"
    } catch {}
    if (wanted) setEnabled(true)
    const resumeOnGesture = () => engine.current?.ctx.state === "suspended" && wanted && engine.current.fadeIn()
    window.addEventListener("pointerdown", resumeOnGesture, { once: true })
    return () => {
      window.removeEventListener("pointerdown", resumeOnGesture)
      engine.current?.dispose()
      engine.current = null
    }
  }, [setEnabled])

  useEffect(() => {
    if (!enabled) return
    const onVisibility = () => {
      if (document.hidden) engine.current?.ctx.suspend()
      else engine.current?.ctx.resume()
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [enabled])

  const play = useCallback((sfx: string) => enabled && engine.current?.play(sfx), [enabled])

  const value = useMemo(() => ({ enabled, setEnabled, play }), [enabled, setEnabled, play])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
