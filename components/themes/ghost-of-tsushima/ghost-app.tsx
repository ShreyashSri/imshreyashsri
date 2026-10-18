"use client"

import { useEffect, useState } from "react"

import { MusicProvider } from "@/components/music/music-provider"
import { useHashSection } from "@/components/shared/use-hash-section"
import { Journal } from "./journal"
import { sections, type SectionId } from "./sections"
import { ghostMusic } from "./music"
import { Title } from "./title"
import { Seal } from "./ui"
import "./ghost.css"

const views: readonly ("home" | SectionId)[] = ["home", ...sections.map((s) => s.id)]

function Loader({ ready }: { ready: boolean }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!ready) return
    const hide = window.setTimeout(() => setGone(true), 900)
    return () => window.clearTimeout(hide)
  }, [ready])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-900 flex items-center justify-center bg-black transition-opacity duration-900"
      style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? "none" : "auto" }}
      role="status"
      aria-label={ready ? "Loaded" : "Loading"}
    >
      <Seal className="h-14 w-14 animate-pulse text-3xl" />
    </div>
  )
}

function Ghost() {
  const [view, go] = useHashSection(views, "home")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    const timeout = new Promise((r) => setTimeout(r, 4000))
    Promise.race([document.fonts.ready, timeout]).then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="theme-ghost">
      <Title
        covered={view !== "home"}
        onOpen={(id) => {
          go(id)
        }}
      />
      {view !== "home" && (
        <Journal
          id={view}
          onTab={(id) => {
            go(id)
          }}
          onClose={() => {
            go("home")
          }}
        />
      )}
      <Loader ready={ready} />
    </div>
  )
}

export default function GhostApp() {
  return (
    <MusicProvider playlist={ghostMusic} accent="#c8102e" dock="bottom-4 right-4 sm:bottom-16">
      <Ghost />
    </MusicProvider>
  )
}
