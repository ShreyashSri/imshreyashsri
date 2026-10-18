"use client"

import { createContext, useContext, useMemo, useState } from "react"

import { MusicDock } from "./music-dock"

export type Track = { id: string; title: string; artist: string }

type MusicApi = { playing: boolean; setPlaying: (on: boolean) => void }

const MusicContext = createContext<MusicApi>({ playing: false, setPlaying: () => {} })

export const useMusic = () => useContext(MusicContext)

export function MusicProvider({ playlist, accent, dock = "bottom-4 right-4", children }: { playlist: Track[]; accent: string; dock?: string; children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const value = useMemo(() => ({ playing, setPlaying }), [playing])
  return (
    <MusicContext.Provider value={value}>
      {children}
      {playing && <MusicDock playlist={playlist} accent={accent} position={dock} onClose={() => setPlaying(false)} />}
    </MusicContext.Provider>
  )
}
