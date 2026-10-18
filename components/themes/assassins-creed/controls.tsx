"use client"

import { Eye, FileText, Volume2, VolumeX } from "lucide-react"

import { profile } from "@/data/resume"
import { useMusic } from "@/components/music/music-provider"
import { useEagle } from "./eagle"

export function Controls() {
  const { playing, setPlaying } = useMusic()
  const { eagle, toggle } = useEagle()
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-pressed={eagle}
        onClick={(e) => {
          const box = e.currentTarget.getBoundingClientRect()
          toggle(box.left + box.width / 2, box.top + box.height / 2)
        }}
        className="an-icon-btn"
        title="Eagle Vision"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden md:inline">Eagle Vision</span>
      </button>
      <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="an-icon-btn" aria-label="Resume">
        <FileText className="h-4 w-4" />
        <span className="hidden md:inline">Resume</span>
      </a>
      <button type="button" onClick={() => setPlaying(!playing)} aria-pressed={playing} aria-label={playing ? "Stop music" : "Play music"} className="an-icon-btn">
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  )
}
