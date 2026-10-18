"use client"

import { ChevronLeft, ScrollText, Volume2, VolumeX } from "lucide-react"

import { profile } from "@/data/resume"
import { useMusic } from "@/components/music/music-provider"

export function Omega({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M14 50h12v-5c-7-3-11-9-11-16 0-10 7.6-17 17-17s17 7 17 17c0 7-4 13-11 16v5h12" fill="none" stroke="#e9c46a" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

function Tools() {
  const { playing, setPlaying } = useMusic()
  return (
    <div className="flex shrink-0 items-center gap-2">
      <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="gow-btn px-3! py-2! sm:px-4!" aria-label="Resume">
        <ScrollText className="h-4 w-4" />
        <span className="hidden sm:inline">Resume</span>
      </a>
      <button
        type="button"
        onClick={() => setPlaying(!playing)}
        aria-pressed={playing}
        aria-label={playing ? "Stop music" : "Play music"}
        className="flex h-9 w-9 items-center justify-center border border-[#c8a24a]/45 bg-[#071012]/70 text-[#e9c46a] transition-colors hover:border-[#e9c46a]"
      >
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function TopBar({ onBack, children }: { onBack?: () => void; children?: React.ReactNode }) {
  return (
    <header className="relative z-20 grid shrink-0 grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 px-4 pt-3 sm:px-8 sm:pt-4">
      {onBack ? (
        <button type="button" onClick={onBack} className="group flex shrink-0 items-center gap-2 text-[#e8dfc8]/75 transition-colors hover:text-[#ffe9a8]">
          <span className="flex h-9 w-9 items-center justify-center border border-[#c8a24a]/45 bg-[#071012]/70 transition-colors group-hover:border-[#e9c46a]">
            <ChevronLeft className="h-4 w-4" />
          </span>
          <span className="hidden font-cinzel text-xs font-bold uppercase tracking-[0.25em] xl:inline">Realm travel</span>
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-3">
          <Omega />
          <span className="hidden font-cinzel text-sm font-bold uppercase tracking-[0.3em] text-[#e8dfc8]/80 sm:inline">{profile.handle}</span>
        </div>
      )}
      <div className="col-span-3 row-start-2 flex min-w-0 justify-center md:col-span-1 md:col-start-2 md:row-start-1">{children}</div>
      <div className="col-start-3 row-start-1">
        <Tools />
      </div>
    </header>
  )
}
