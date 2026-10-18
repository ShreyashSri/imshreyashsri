"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Crosshair, FileText, Volume2, VolumeX } from "lucide-react"

import { profile } from "@/data/resume"
import { MusicProvider, useMusic } from "@/components/music/music-provider"
import { useHashSection } from "@/components/shared/use-hash-section"
import { Backdrop, RoundBanner } from "./backdrop"
import { valorantMusic } from "./music"
import { AgentsTab } from "./tabs/agents"
import { BattlepassTab } from "./tabs/battlepass"
import { CareerTab } from "./tabs/career"
import { CollectionTab } from "./tabs/collection"
import { GamesTab } from "./tabs/games"
import { HomeTab } from "./tabs/home"
import { NewsTab } from "./tabs/news"
import { FriendsList, SocialTab } from "./tabs/social"
import "./valorant.css"
import "./range.css"

const ShooterGame = dynamic(() => import("./shooter-game"), { ssr: false })

const tabs = ["home", "career", "collection", "agents", "battlepass", "news", "games", "social"] as const

export type ValorantTab = (typeof tabs)[number]

function Logo() {
  return (
    <svg viewBox="0 0 40 32" className="h-7 w-9" aria-hidden="true">
      <path d="M2 4l16 20h-9L2 15z" fill="#ff4655" />
      <path d="M38 4L24 21.5h-9L38 4z" fill="#ff4655" />
    </svg>
  )
}

function Client() {
  const { playing, setPlaying } = useMusic()
  const [active, go] = useHashSection(tabs, "home")
  const [range, setRange] = useState(false)
  const [moved, setMoved] = useState(false)
  const content = useRef<HTMLDivElement>(null)

  useEffect(() => {
    content.current?.scrollTo({ top: 0 })
  }, [active])

  const open = (tab: ValorantTab) => {
    if (tab === active) return
    setMoved(true)
    go(tab)
  }

  const index = tabs.indexOf(active)

  return (
    <div className="theme-valorant fixed inset-0 flex flex-col overflow-hidden">
      <Backdrop tab={active} index={index} />
      {moved && <RoundBanner tab={active} index={index} />}

      <header className="relative z-10 border-b border-white/10 bg-[#0f1923]/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 sm:px-6 lg:h-16">
          <button type="button" onClick={() => open("home")} className="flex shrink-0 items-center gap-3" aria-label="Home">
            <Logo />
            <span className="hidden font-anton text-lg uppercase tracking-[0.2em] sm:block">{profile.handle}</span>
          </button>
          <nav aria-label="Client" className="no-scrollbar hidden h-full flex-1 justify-center gap-7 overflow-x-auto lg:flex">
            {tabs.map((t) => (
              <button key={t} type="button" aria-current={t === active ? "page" : undefined} onClick={() => open(t)} className="val-tab">
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={() => {
                setRange(true)
              }}
              className="val-btn val-btn-primary px-3! py-2! text-xs! sm:px-4!"
            >
              <Crosshair className="h-4 w-4" />
              <span className="hidden sm:inline">Range</span>
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="val-btn px-3! py-2! text-xs!" aria-label="Resume">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-pressed={playing}
              aria-label={playing ? "Stop music" : "Play music"}
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <nav aria-label="Client" className="no-scrollbar flex h-11 gap-6 overflow-x-auto border-t border-white/10 px-4 lg:hidden">
          {tabs.map((t) => (
            <button key={t} type="button" aria-current={t === active ? "page" : undefined} onClick={() => open(t)} className="val-tab text-sm!">
              {t}
            </button>
          ))}
        </nav>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1">
        <main ref={content} className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
          <div key={active} className="mx-auto h-full max-w-[1400px]">
            {active === "home" && <HomeTab onOpen={open} />}
            {active === "career" && <CareerTab />}
            {active === "collection" && <CollectionTab />}
            {active === "agents" && <AgentsTab />}
            {active === "battlepass" && <BattlepassTab />}
            {active === "news" && <NewsTab />}
            {active === "games" && <GamesTab />}
            {active === "social" && <SocialTab />}
            {active !== "home" && <div className="h-6" />}
          </div>
        </main>

        <aside className="hidden w-72 shrink-0 flex-col border-l border-white/10 bg-[#0f1923]/75 backdrop-blur-md 2xl:flex">
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden border border-[#ff4655]">
                <Image src="/images/profile/shrey.jpeg" alt="" fill sizes="48px" className="object-cover object-top" />
              </span>
              <div>
                <p className="font-anton text-lg uppercase leading-none">{profile.name.split(" ")[0]}</p>
                <p className="mt-1 font-barlow-condensed text-xs uppercase tracking-[0.2em] text-white/55">#{profile.handle}</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 font-barlow-condensed text-xs uppercase tracking-[0.2em] text-[#2fd3b2]">
              <span className="h-2 w-2 bg-[#2fd3b2]" /> Available for work
            </p>
          </div>
          <p className="px-4 pb-1 pt-4 font-barlow-condensed text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Friends</p>
          <FriendsList />
          <button type="button" onClick={() => open("social")} className="val-btn mx-4 mt-auto mb-4">
            Send invite
          </button>
        </aside>
      </div>

      <ShooterGame isOpen={range} onClose={() => {
        setRange(false)
      }} />
    </div>
  )
}

export default function ValorantApp() {
  return (
    <MusicProvider playlist={valorantMusic} accent="#ff4655">
      <Client />
    </MusicProvider>
  )
}
