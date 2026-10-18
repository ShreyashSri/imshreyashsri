"use client"

import { useEffect, useState } from "react"

import { MusicProvider } from "@/components/music/music-provider"
import { rdr2Music } from "./music"
import "./rdr2.css"
import { Credits } from "./credits"
import { Loader } from "./loader"
import { Home } from "./home"
import { sections } from "./sections"

function Frontier() {
  const [ready, setReady] = useState(false)
  const [credits, setCredits] = useState(false)

  useEffect(() => {
    let alive = true
    const first = new window.Image()
    first.src = `/themes/rdr2/backdrops/${sections[0].backdrop}.webp`
    const backdrop = first.decode().catch(() => {})
    const timeout = new Promise((r) => setTimeout(r, 6000))
    Promise.race([Promise.all([document.fonts.ready, backdrop]), timeout]).then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="theme-rdr2">
      <Home onCredits={() => setCredits(true)} covered={credits} />

      {credits && <Credits onClose={() => setCredits(false)} />}

      <Loader ready={ready} />
    </div>
  )
}

export default function FrontierApp() {
  return (
    <MusicProvider playlist={rdr2Music} accent="#b8121b" dock="bottom-4 right-4 lg:bottom-16">
      <Frontier />
    </MusicProvider>
  )
}
