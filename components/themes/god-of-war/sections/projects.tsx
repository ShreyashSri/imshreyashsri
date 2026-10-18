"use client"

import { useState } from "react"
import Image from "next/image"

import { projects } from "@/data/projects"
import { TechLogo, logos } from "@/components/shared/tech-logo"
import { Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

const rarities = [
  { name: "Legendary", color: "#f0a43c" },
  { name: "Epic", color: "#b67be8" },
  { name: "Rare", color: "#5fa8e8" },
]

const cuts = ["M0 -15 L13 -7 L13 7 L0 15 L-13 7 L-13 -7Z", "M0 -16 L12 0 L0 16 L-12 0Z", "M-11 -11 L11 -11 L15 0 L11 11 L-11 11 L-15 0Z"]

function Gem({ color, cut, on, id }: { color: string; cut: number; on: boolean; id: string }) {
  const d = cuts[cut % cuts.length]
  return (
    <svg viewBox="-20 -20 40 40" className={`h-full w-full transition-transform duration-300 ${on ? "scale-110" : "group-hover:scale-105"}`} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-core`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fffbe8" />
          <stop offset="28%" stopColor={color} />
          <stop offset="100%" stopColor="#0a0604" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="55%" stopColor="#8a6420" />
          <stop offset="100%" stopColor="#f3d98f" />
        </linearGradient>
      </defs>
      <circle r="18.5" fill="#050b0c" stroke={`url(#${id}-rim)`} strokeWidth="1.6" />
      <circle r="16" fill="none" stroke="#e9c46a" strokeOpacity="0.45" strokeDasharray="1 2" />
      <path d={d} fill={`url(#${id}-core)`} stroke="#fff3d0" strokeOpacity="0.85" strokeWidth="0.7" />
      <path d={`${d} M0 0 L0 -16 M0 0 L13 7 M0 0 L-13 7`} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.5" />
      <path d="M-5 -9 L2 -12 L-1 -3Z" fill="#fff" fillOpacity="0.75" />
      {on && <circle r="18.5" fill="none" stroke={color} strokeWidth="1.2" className="gow-gem-pulse" />}
    </svg>
  )
}

const inscription = "ᚠᚢᚦᚨᚱᚲ ᚷᚹᚺᚾᛁᛃ ᛇᛈᛉᛊᛏᛒ ᛖᛗᛚᛜᛞᛟ ᚠᚢᚦᚨᚱᚲ ᚷᚹᚺᚾᛁᛃ ᛇᛈᛉᛊᛏᛒ ᛖᛗᛚᛜᛞᛟ"
const centreRunes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"]

export function Projects({ realm }: PageProps) {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  const rarity = rarities[selected % rarities.length]
  const external = project.demo.startsWith("http")

  return (
    <div>
      <Heading
        rune={realm.rune}
        realm={realm.realm}
        codex={realm.codex}
        title="Projects"
        right={<p className="font-garamond text-lg italic text-[#e8dfc8]/60">{projects.length} enchantments socketed</p>}
      />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,460px)_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <radialGradient id="amulet-face" cx="50%" cy="42%" r="60%">
                <stop offset="0%" stopColor="#1c2f30" />
                <stop offset="70%" stopColor="#0b1517" />
                <stop offset="100%" stopColor="#050a0b" />
              </radialGradient>
              <linearGradient id="amulet-rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3d98f" />
                <stop offset="50%" stopColor="#9c7629" />
                <stop offset="100%" stopColor="#e9c46a" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#amulet-face)" stroke="url(#amulet-rim)" strokeWidth="6" />
            <circle cx="200" cy="200" r="158" fill="none" stroke="#c8a24a" strokeOpacity="0.45" strokeDasharray="3 5" />
            <circle cx="200" cy="200" r="104" fill="none" stroke="#c8a24a" strokeOpacity="0.3" />
            <path id="amulet-ring" d="M200 200 m-171 0 a171 171 0 1 1 342 0 a171 171 0 1 1 -342 0" fill="none" />
            <g className="gow-spin">
              <text className="gow-inscription font-runic" fontSize="15" letterSpacing="6.2">
                <textPath href="#amulet-ring">{inscription}</textPath>
              </text>
            </g>
            {projects.map((_, i) => {
              const a = (i / projects.length) * Math.PI * 2 - Math.PI / 2
              return <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 124} y2={200 + Math.sin(a) * 124} stroke={i === selected ? rarity.color : "#c8a24a"} strokeOpacity={i === selected ? 0.8 : 0.18} strokeWidth={i === selected ? 2 : 1} />
            })}
            <circle cx="200" cy="200" r="58" fill="#071012" stroke="url(#amulet-rim)" strokeWidth="2.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke={rarity.color} strokeOpacity="0.35" strokeWidth="1" className="gow-gem-pulse" />
            <text key={selected} x="200" y="222" textAnchor="middle" className="gow-centre-rune font-runic" fontSize="64" fill="#ffe9a8" style={{ filter: `drop-shadow(0 0 10px ${rarity.color})` }}>
              {centreRunes[selected % centreRunes.length]}
            </text>
          </svg>

          {projects.map((p, i) => {
            const a = (i / projects.length) * Math.PI * 2 - Math.PI / 2
            const on = i === selected
            const color = rarities[i % rarities.length].color
            return (
              <button
                key={p.title}
                type="button"
                aria-pressed={on}
                aria-label={p.title}
                onClick={() => {
                  if (on) return
                  setSelected(i)
                }}
                className="group absolute h-[17%] w-[17%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${50 + Math.cos(a) * 31}%`,
                  top: `${50 + Math.sin(a) * 31}%`,
                  filter: on ? `drop-shadow(0 0 14px ${color})` : undefined,
                }}
              >
                <Gem color={color} cut={i} on={on} id={`gem-${i}`} />
              </button>
            )
          })}
        </div>

        <div key={project.title} className="gow-in" style={{ "--rarity": rarity.color } as React.CSSProperties}>
          <Frame className="gow-rarity overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--rarity)]/40 bg-linear-to-r from-[var(--rarity)]/25 to-transparent px-6 py-3">
              <p className="font-cinzel text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--rarity)]">{rarity.name} enchantment</p>
              <p className="font-cinzel text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8dfc8]/50">
                {selected + 1} / {projects.length}
              </p>
            </div>
            <div className="grid gap-6 px-6 py-6 sm:grid-cols-[1fr_200px] sm:px-8">
              <div className="min-w-0">
                <h3 className="gow-title text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{project.title}</h3>
                <p className="mt-1 font-garamond text-lg italic text-[var(--rarity)]">{project.description}</p>
                <p className="mt-4 font-garamond text-lg leading-relaxed text-[#e8dfc8]/85">{project.longDescription ?? project.description}</p>
              </div>
              <div className="relative aspect-video overflow-hidden border border-[var(--rarity)]/40 sm:aspect-square">
                <Image src={project.image} loading="eager" alt={`Screenshot of ${project.title}`} fill sizes="200px" className="object-cover object-top" />
              </div>
            </div>
            <div className="border-t border-[#c8a24a]/15 px-6 py-5 sm:px-8">
              <Label>Perks</Label>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.technologies.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-garamond text-lg text-[#e8dfc8]/90">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--rarity)]/50 bg-[#071012] text-[var(--rarity)]">
                      {logos[t] ? <TechLogo name={t} className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rotate-45 bg-current" />}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={project.demo} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="gow-btn gow-btn-primary">
                  Live demo
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="gow-btn">
                  Source
                </a>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </div>
  )
}
