"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { games } from "@/data/games"
import { projects } from "@/data/projects"
import { awards, chapters, contributions, profile, skillGroups, tally } from "@/data/resume"
import { headlines } from "./sections/projects"
import { logos } from "./sections/skills"

type Layer = { delay: number; rotate?: number; depth?: number; dim?: number }

const shadow = "drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)]"

const layer = ({ delay, rotate = 0, depth = 1, dim = 1 }: Layer) =>
  ({
    animation: `preview-in 0.55s cubic-bezier(.2,.8,.2,1) ${delay}s both`,
    "--r": `${rotate}deg`,
    "--depth": depth,
    "--dim": dim,
  }) as React.CSSProperties

const sepia = "filter-[grayscale(1)_sepia(0.6)_contrast(1.05)]"

function useTypewriter(text: string, msPerWord = 90) {
  const words = text.split(" ")
  const [shown, setShown] = useState(0)
  useEffect(() => {
    setShown(0)
    const id = window.setInterval(() => setShown((n) => (n >= words.length ? n : n + 1)), msPerWord)
    return () => window.clearInterval(id)
  }, [words.length, msPerWord])
  return words.slice(0, shown).join(" ")
}

function CountUp({ value }: { value: string }) {
  const target = Number(value)
  const [current, setCurrent] = useState(Number.isFinite(target) ? 0 : target)
  useEffect(() => {
    if (!Number.isFinite(target)) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900)
      setCurrent(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  if (!Number.isFinite(target)) return <>{value}</>
  const decimals = value.split(".")[1]?.length ?? 0
  return <>{current.toFixed(decimals)}</>
}

function Poster({ title, image, headline }: { title: string; image: string; headline: string }) {
  return (
    <div className="journal-paper torn w-[230px] px-5 pb-5 pt-5 text-center text-[#1d1813]">
      <p className="font-redemption text-[34px] leading-[0.9]">{headline}</p>
      <div className="relative mt-2 aspect-16/10 overflow-hidden border-2 border-[#1d1813]">
        <Image src={image} alt="" fill sizes="230px" className={`object-cover object-top ${sepia}`} />
      </div>
      <p className="mt-2 font-kirsty text-[18px] font-bold uppercase leading-none">{title}</p>
    </div>
  )
}

function JournalPreview() {
  return (
    <div className="flex w-[600px] items-start">
      <div className={`pv-layer pv-lift relative z-10 w-[240px] shrink-0 ${shadow}`} style={layer({ delay: 0.15, rotate: -5, depth: 2 })}>
        <figure className="torn bg-[#d9c39a] px-5 pb-5 pt-5 text-center text-[#1d1813]">
          <p className="font-redemption text-[40px] leading-[0.9]">WANTED</p>
          <div className="relative mx-auto mt-2 aspect-4/5 w-[85%] overflow-hidden border-[3px] border-[#1d1813]">
            <Image src="/images/profile/shrey.jpeg" alt="" fill sizes="200px" className={`object-cover object-top ${sepia}`} />
          </div>
          <figcaption className="mt-2 font-kirsty text-[19px] font-bold uppercase leading-none">{profile.name}</figcaption>
        </figure>
      </div>
      <div className="pv-layer pv-lift journal-paper torn -ml-5 mt-12 w-[360px] shrink-0 px-9 py-7" style={layer({ delay: 0.05, rotate: 3, depth: 0.8 })}>
        <p className="font-hand text-[28px] leading-tight text-pencil">A few words on myself</p>
        <p className="mt-3 font-slab text-[14px] leading-relaxed text-pencil">
          I build the parts of software nobody sees until they break. Right now that’s the backend of a sports prediction exchange at PRED.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1 border-t border-pencil/25 pt-3">
          {tally.slice(0, 4).map((t) => (
            <div key={t.label} className="flex items-baseline justify-between gap-2">
              <dt className="font-slab text-[12px] text-pencil/75">{t.label}</dt>
              <dd className="font-slab text-[16px] font-bold text-pencil">
                <CountUp value={t.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function StoryPreview() {
  const recent = [...chapters].reverse()
  return (
    <div className="relative h-[420px] w-[560px]">
      {recent.map((c, i) => (
        <div
          key={c.company}
          className="pv-layer pv-lift pv-dim absolute w-[460px] border border-white/15 bg-[#0d0c0b]/90 px-7 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          style={{ left: i * 44, top: i * 104, zIndex: recent.length - i, ...layer({ delay: 0.05 + i * 0.1, depth: 2 - i * 0.6, dim: 1 - i * 0.25 }) }}
        >
          <p className="font-rocks text-[15px] uppercase tracking-wide text-white/55">Chapter {["III", "II", "I"][i]}</p>
          <p className="mt-1 font-redemption text-[46px] uppercase leading-[0.9] text-white">{c.company}</p>
          <p className="mt-2 font-slab text-[14px] text-white/80">
            {c.role} · {c.period}
          </p>
        </div>
      ))}
    </div>
  )
}

function BountiesPreview() {
  const fan = projects.slice(0, 3)
  return (
    <div className="relative h-[440px] w-[640px]">
      {fan.map((p, i) => (
        <div
          key={p.title}
          className={`pv-layer pv-lift pv-fan absolute ${shadow}`}
          style={
            {
              "--center": "205px",
              "--offset": i - 1,
              "--gap": "160px",
              top: i === 1 ? 30 : 70,
              zIndex: i === 1 ? 3 : 1,
              ...layer({ delay: 0.05 + i * 0.08, rotate: (i - 1) * 8, depth: i === 1 ? 2 : 1 }),
            } as React.CSSProperties
          }
        >
          <Poster title={p.title} image={p.image} headline={headlines[p.title] ?? "WANTED"} />
        </div>
      ))}
    </div>
  )
}

function SatchelPreview() {
  const items = skillGroups.flatMap((g) => g.items).filter((name) => logos[name]).slice(0, 20)
  return (
    <ul className="pv-layer grid w-[560px] grid-cols-5 gap-2.5" style={layer({ delay: 0, depth: 1.5 })}>
      {items.map((name, i) => (
        <li
          key={name}
          className="pv-icon flex aspect-square flex-col items-center justify-center gap-2 border border-white/15 bg-[#0d0c0b]/80"
          style={{ animation: `preview-in 0.45s cubic-bezier(.2,.8,.2,1) ${0.03 * i}s both` }}
        >
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-white/90" aria-hidden="true">
            <path d={logos[name].path} fill="currentColor" />
          </svg>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-white">{name}</span>
        </li>
      ))}
    </ul>
  )
}

function CampPreview() {
  const medal = { gold: "#c9a24a", silver: "#b9b4a8", bronze: "#a8703c" }
  return (
    <div className="relative h-[440px] w-[580px]">
      <div className="pv-layer pv-lift journal-paper torn absolute left-0 top-0 w-[400px] px-8 py-6" style={layer({ delay: 0.05, rotate: -2, depth: 0.8 })}>
        <p className="text-center font-kirsty text-[26px] font-bold uppercase text-pencil">Camp Ledger</p>
        <ul className="mt-3 divide-y divide-[#4a6a8a]/35 border-y border-[#4a6a8a]/35">
          {contributions.map((c) => (
            <li key={c.camp} className="flex items-baseline justify-between gap-4 py-2 transition-colors hover:bg-[#8c1a14]/10">
              <span className="font-slab text-[15px] font-bold text-pencil">{c.camp}</span>
              <span className="font-hand text-[19px] text-pencil">{c.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul
        className="pv-layer pv-lift absolute bottom-0 right-0 z-10 w-[330px] space-y-2 border border-white/15 bg-[#0d0c0b]/90 p-5"
        style={layer({ delay: 0.18, rotate: 1.5, depth: 2 })}
      >
        {awards.slice(0, 3).map((a) => (
          <li key={a.title} className="pv-medal-row flex items-center gap-3">
            <span className="pv-medal h-7 w-7 shrink-0 rounded-full border-2 border-black/40" style={{ background: medal[a.medal] }} />
            <span className="font-rocks text-[16px] uppercase leading-tight text-white">{a.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NewspapersPreview() {
  const [lead] = blogPosts
  return (
    <div className={`pv-layer pv-solo group/paper w-[460px] ${shadow}`} style={layer({ delay: 0.05, rotate: 2, depth: 0.8 })}>
      <div className="journal-paper torn px-8 pb-8 pt-6 text-[#1b1712]">
        <p className="border-b border-[#1b1712] pb-1 text-center font-sans text-[9px] font-bold uppercase tracking-[0.2em]">Saint Denis · Price 5 cents</p>
        <p className="mt-2 text-center font-blackletter text-[46px] leading-none">The Saint Denis Times</p>
        <div className="mt-2 border-y-[3px] border-double border-[#1b1712]" />
        <div className="mt-4 grid grid-cols-[1fr_150px] gap-4">
          <div>
            <p className="font-kirsty text-[26px] font-bold uppercase leading-[0.95]">{lead.title}</p>
            <p className="mt-2 line-clamp-4 font-slab text-[12.5px] leading-relaxed">{lead.excerpt}</p>
          </div>
          <div className="relative aspect-3/4 overflow-hidden border-2 border-[#1b1712]">
            <Image src={lead.image} alt="" fill sizes="150px" className="object-cover filter-[grayscale(1)_contrast(1.4)]" />
            <Image src={lead.image} alt="" fill sizes="150px" className="object-cover opacity-0 transition-opacity duration-500 group-hover/paper:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TelegramPreview() {
  const message = `Backend engineer available for interesting work STOP Go, Kubernetes, AWS STOP Reply to ${profile.email} STOP`
  const typed = useTypewriter(message)
  return (
    <div className="pv-layer pv-solo journal-paper w-[440px] px-8 pb-8 pt-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={layer({ delay: 0.05, rotate: -1.5, depth: 0.8 })}>
      <div className="flex items-end justify-between border-b-2 border-pencil pb-2">
        <p className="font-kirsty text-[38px] font-bold uppercase leading-none text-pencil">Telegram</p>
        <p className="text-right font-type text-[11px] leading-tight text-pencil/70">Bangalore office</p>
      </div>
      <p className="mt-5 min-h-[7.6em] font-type text-[16px] uppercase leading-[1.9] text-pencil">
        {typed}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-pencil motion-safe:animate-blink" />
      </p>
      <p className="pv-stamp mt-6 inline-block rotate-[-8deg] border-[3px] border-[#8c1a14] px-3 py-1 font-rocks text-[22px] uppercase text-[#8c1a14] opacity-80">
        Send word
      </p>
    </div>
  )
}

function GamesPreview() {
  return (
    <div className="relative h-[420px] w-[640px]">
      {games.map((g, i) => {
        const offset = i - (games.length - 1) / 2
        return (
          <div
            key={g.id}
            className="pv-layer pv-lift pv-fan absolute top-8 w-[170px] overflow-hidden border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            style={
              {
                "--center": "235px",
                "--offset": offset,
                zIndex: 10 - Math.abs(offset),
                ...layer({ delay: 0.05 + i * 0.06, rotate: offset * 7, depth: 2 - Math.abs(offset) * 0.5 }),
              } as React.CSSProperties
            }
          >
            <div className="relative aspect-2/3">
              <Image src={g.cover} alt="" fill sizes="170px" className="object-cover" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ResumePreview() {
  return (
    <div className="pv-layer pv-solo group/resume w-[380px] bg-[#f4efe3] px-8 pb-10 pt-8 text-[#1b1712] shadow-[0_24px_60px_rgba(0,0,0,0.6)]" style={layer({ delay: 0.05, rotate: 2, depth: 0.8 })}>
      <p className="font-kirsty text-[28px] font-bold leading-none">{profile.name}</p>
      <p className="mt-1 font-sans text-[11px] text-[#1b1712]/70">{profile.email}</p>
      {["Experience", "Open source", "Achievements"].map((heading, i) => (
        <div key={heading} className="mt-5">
          <p className="border-b border-[#1b1712]/40 font-sans text-[11px] font-bold uppercase tracking-[0.14em]">{heading}</p>
          {[0, 1, 2].map((line) => (
            <div
              key={line}
              className="mt-2 h-[5px] rounded-sm bg-[#1b1712]/15"
              style={{ width: `${92 - ((line + i) % 3) * 18}%` }}
            />
          ))}
        </div>
      ))}
      <p className="mt-6 font-rocks text-[18px] uppercase tracking-wide text-[#8c1a14]">
        Open PDF <span className="inline-block transition-transform group-hover/resume:translate-x-1.5">›</span>
      </p>
    </div>
  )
}

function CreditsPreview() {
  return (
    <div className="pv-layer space-y-5 text-center" style={layer({ delay: 0.05, depth: 1.5 })}>
      {[
        ["Typefaces", "Rockstar North · Ray Larabie"],
        ["Pictures", "Rockstar Games · ambientCG"],
        ["Built by", profile.name],
      ].map(([title, names]) => (
        <div key={title} className="transition-transform duration-300 hover:scale-105">
          <p className="font-rocks text-[16px] uppercase tracking-[0.14em] text-white/55">{title}</p>
          <p className="mt-1 font-rocks text-[28px] uppercase leading-none text-white">{names}</p>
        </div>
      ))}
    </div>
  )
}

const previews: Record<string, () => React.ReactElement> = {
  about: JournalPreview,
  experience: StoryPreview,
  projects: BountiesPreview,
  skills: SatchelPreview,
  "open-source": CampPreview,
  writing: NewspapersPreview,
  contact: TelegramPreview,
  games: GamesPreview,
  resume: ResumePreview,
  credits: CreditsPreview,
}

export function MenuPreview({ id, onOpen }: { id: string; onOpen: (id: string) => void }) {
  const root = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const target = { mx: 0, my: 0, px: 0, py: 0 }
    const current = { ...target }
    let raf = 0

    const render = () => {
      let moving = false
      for (const key of ["mx", "my", "px", "py"] as const) {
        const delta = target[key] - current[key]
        if (Math.abs(delta) > (key.startsWith("p") ? 0.5 : 0.001)) moving = true
        current[key] += delta * 0.22
      }
      el.style.setProperty("--mx", current.mx.toFixed(4))
      el.style.setProperty("--my", current.my.toFixed(4))
      el.style.setProperty("--px", `${current.px.toFixed(1)}px`)
      el.style.setProperty("--py", `${current.py.toFixed(1)}px`)
      raf = moving ? requestAnimationFrame(render) : 0
    }

    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect()
      const clamp = (v: number) => Math.max(-1, Math.min(1, v))
      target.mx = clamp((e.clientX - (box.left + box.width / 2)) / box.width)
      target.my = clamp((e.clientY - (box.top + box.height / 2)) / box.height)
      target.px = e.clientX - box.left
      target.py = e.clientY - box.top
      if (!raf) raf = requestAnimationFrame(render)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const Preview = previews[id]
  if (!Preview) return null

  return (
    <button ref={root} type="button" tabIndex={-1} aria-hidden="true" onClick={() => onOpen(id)} className="group relative cursor-pointer text-left outline-hidden">
      <style>{`@keyframes preview-in { from { opacity: 0; transform: translateY(26px) rotate(calc(var(--r, 0deg) * 2)) scale(.96) } to { opacity: 1; transform: rotate(var(--r, 0deg)) } }
@keyframes preview-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>
      <div className="motion-safe:animate-[preview-float_7s_ease-in-out_infinite]">
        <div key={id} className="pv-scene">
          <Preview />
        </div>
      </div>
      <div aria-hidden="true" className="pv-light pointer-events-none absolute left-0 top-0 opacity-0 group-hover:opacity-100" />
    </button>
  )
}
