"use client"

import { useEffect, useRef, useState } from "react"
import { SkipForward, X } from "lucide-react"

import type { Track } from "./music-provider"

type Player = { setVolume: (v: number) => void; playVideo: () => void; loadVideoById: (id: string) => void; destroy: () => void }
type PlayerEvent = { target: Player; data: number }
type YouTube = {
  Player: new (el: HTMLElement, options: Record<string, unknown>) => Player
  PlayerState: { ENDED: number }
}

declare global {
  interface Window {
    YT?: YouTube
    onYouTubeIframeAPIReady?: () => void
  }
}

const VOLUME = 35

let api: Promise<YouTube> | null = null

function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  api ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT) resolve(window.YT)
    }
    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    document.head.append(script)
  })
  return api
}

export function MusicDock({ playlist, accent, position, onClose }: { playlist: Track[]; accent: string; position: string; onClose: () => void }) {
  const host = useRef<HTMLDivElement>(null)
  const player = useRef<Player | null>(null)
  const [index, setIndex] = useState(0)
  const loaded = useRef(0)
  const track = playlist[index]

  useEffect(() => {
    let cancelled = false
    const next = () => setIndex((i) => (i + 1) % playlist.length)
    const wrapper = host.current
    loadApi().then((YT) => {
      if (cancelled || !wrapper) return
      const mount = document.createElement("div")
      wrapper.append(mount)
      player.current = new YT.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId: playlist[0].id,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: (e: PlayerEvent) => {
            e.target.setVolume(VOLUME)
            e.target.playVideo()
          },
          onStateChange: (e: PlayerEvent) => e.data === YT.PlayerState.ENDED && next(),
          onError: next,
        },
      })
    })
    return () => {
      cancelled = true
      player.current?.destroy()
      player.current = null
      wrapper?.replaceChildren()
    }
  }, [playlist])

  useEffect(() => {
    if (index === loaded.current || !player.current) return
    loaded.current = index
    player.current.loadVideoById(playlist[index].id)
    player.current.setVolume(VOLUME)
  }, [index, playlist])

  return (
    <aside
      aria-label="Now playing"
      className={`fixed z-900 w-[200px] bg-black/90 text-white shadow-[0_18px_40px_rgba(0,0,0,0.6)] ${position}`}
      style={{ outline: `1px solid ${accent}80` }}
    >
      <div className="flex items-start gap-2 px-2.5 py-2">
        <span className="mt-1 h-1.5 w-1.5 shrink-0 animate-pulse" style={{ background: accent }} />
        <p className="min-w-0 flex-1 font-sans leading-tight">
          <span className="block truncate text-[11px] font-semibold">{track.title}</span>
          <span className="block truncate text-[10px] text-white/55">{track.artist}</span>
        </p>
        {playlist.length > 1 && (
          <button type="button" onClick={() => setIndex((i) => (i + 1) % playlist.length)} aria-label="Next track" className="text-white/70 transition-colors hover:text-white">
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        )}
        <button type="button" onClick={onClose} aria-label="Stop music" className="text-white/70 transition-colors hover:text-white">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div ref={host} className="h-[200px] w-[200px] bg-black" />
    </aside>
  )
}
