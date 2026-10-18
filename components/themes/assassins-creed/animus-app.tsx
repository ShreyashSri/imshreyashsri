"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { MusicProvider } from "@/components/music/music-provider"
import { useHashSection } from "@/components/shared/use-hash-section"
import { EagleContext } from "./eagle"
import { Menu } from "./menu"
import { SectionView } from "./section-view"
import { sequenceIds, type SequenceId } from "./sequences"
import { animusMusic } from "./music"
import { JumpOverlay, type Jump } from "./transition"
import { AnimusVoid } from "./void"
import "./animus.css"

type Ripple = { x: number; y: number; to: boolean; id: number }

const timing = { sync: { swap: 520, end: 1250 }, leap: { swap: 430, end: 950 } }

function Animus() {
  const [view, go] = useHashSection(sequenceIds, "menu")
  const [eagle, setEagle] = useState(false)
  const [ripple, setRipple] = useState<Ripple | null>(null)
  const [jump, setJump] = useState<Jump | null>(null)
  const busy = useRef(false)
  const timers = useRef<number[]>([])

  const toggle = useCallback(
    (x: number, y: number) => {
      if (busy.current) return
      busy.current = true
      const to = !eagle
      setRipple({ x, y, to, id: Date.now() })
      window.setTimeout(() => setEagle(to), 520)
      window.setTimeout(() => {
        setRipple(null)
        busy.current = false
      }, 900)
    },
    [eagle],
  )

  const eagleApi = useMemo(() => ({ eagle, toggle }), [eagle, toggle])

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const open = (id: SequenceId) => {
    if (jump) return
    const kind = view === "menu" ? "sync" : "leap"
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return go(id)
    const next = { kind, to: id, key: Date.now() } as Jump
    setJump(next)
    timers.current = [window.setTimeout(() => go(id), timing[kind].swap), window.setTimeout(() => setJump(null), timing[kind].end)]
  }

  useEffect(() => {
    if (!jump) return
    const skip = () => {
      clear()
      go(jump.to)
      setJump(null)
    }
    window.addEventListener("pointerdown", skip)
    window.addEventListener("keydown", skip)
    return () => {
      window.removeEventListener("pointerdown", skip)
      window.removeEventListener("keydown", skip)
    }
  }, [jump, go])

  useEffect(() => clear, [])

  const back = useCallback(() => {
    go("menu")
  }, [go])

  useEffect(() => {
    if (view === "menu") return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !document.querySelector('[role="alertdialog"]') && back()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [view, back])

  return (
    <EagleContext.Provider value={eagleApi}>
      <div className={`theme-animus fixed inset-0 overflow-hidden ${eagle ? "animus-eagle" : ""}`}>
        <AnimusVoid data={view === "menu"} />
        {view === "menu" ? <Menu onOpen={open} /> : <SectionView id={view} onOpen={open} onBack={back} />}
        {jump && <JumpOverlay jump={jump} />}
        {ripple && (
          <div
            key={ripple.id}
            aria-hidden="true"
            className="an-ripple"
            style={
              {
                "--rx": `${ripple.x}px`,
                "--ry": `${ripple.y}px`,
                background: ripple.to
                  ? "radial-gradient(circle at var(--rx) var(--ry), #4a3a14, #060c13 35%)"
                  : "radial-gradient(circle at var(--rx) var(--ry), #fff, #eef1f3 50%)",
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </EagleContext.Provider>
  )
}

export default function AnimusApp() {
  return (
    <MusicProvider playlist={animusMusic} accent="#b3121c" dock="bottom-4 right-4 md:bottom-60 lg:bottom-64">
      <Animus />
    </MusicProvider>
  )
}
