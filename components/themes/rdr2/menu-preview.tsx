import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { games } from "@/data/games"
import { projects } from "@/data/projects"
import { awards, chapters, contributions, profile, skillGroups, tally } from "@/data/resume"
import { headlines } from "./sections/projects"
import { logos } from "./sections/skills"

const enter = (delay: number, rotate = 0) =>
  ({ animation: `preview-in 0.55s cubic-bezier(.2,.8,.2,1) ${delay}s both`, "--r": `${rotate}deg` }) as React.CSSProperties

const sepia = "filter-[grayscale(1)_sepia(0.6)_contrast(1.05)]"

function Poster({ title, image, headline, className = "" }: { title: string; image: string; headline: string; className?: string }) {
  return (
    <div className={`journal-paper w-[230px] px-4 pb-4 pt-4 text-center text-[#1d1813] ${className}`}>
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
      <figure className="relative z-10 w-[240px] shrink-0 bg-[#d9c39a] px-4 pb-4 pt-4 text-center text-[#1d1813] shadow-[0_16px_40px_rgba(0,0,0,0.6)]" style={enter(0.15, -5)}>
        <p className="font-redemption text-[40px] leading-[0.9]">WANTED</p>
        <div className="relative mx-auto mt-2 aspect-4/5 w-[85%] overflow-hidden border-[3px] border-[#1d1813]">
          <Image src="/images/profile/shrey.jpeg" alt="" fill sizes="200px" className={`object-cover object-top ${sepia}`} />
        </div>
        <figcaption className="mt-2 font-kirsty text-[19px] font-bold uppercase leading-none">{profile.name}</figcaption>
      </figure>
      <div className="journal-paper torn -ml-5 mt-12 w-[360px] shrink-0 px-8 py-7" style={enter(0.05, 3)}>
        <p className="font-hand text-[28px] leading-tight text-pencil">A few words on myself</p>
        <p className="mt-3 font-slab text-[14px] leading-relaxed text-pencil">
          I build the parts of software nobody sees until they break. Right now that’s the backend of a sports prediction exchange at PRED.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1 border-t border-pencil/25 pt-3">
          {tally.slice(0, 4).map((t) => (
            <div key={t.label} className="flex items-baseline justify-between gap-2">
              <dt className="font-slab text-[12px] text-pencil/75">{t.label}</dt>
              <dd className="font-slab text-[16px] font-bold text-pencil">{t.value}</dd>
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
          className="absolute w-[460px] border border-white/15 bg-black/75 px-7 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xs"
          style={{ left: i * 44, top: i * 104, zIndex: recent.length - i, opacity: 1 - i * 0.22, ...enter(0.05 + i * 0.1) }}
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
    <div className="relative flex h-[440px] w-[600px] items-center justify-center">
      {fan.map((p, i) => (
        <div key={p.title} className="absolute shadow-[0_20px_50px_rgba(0,0,0,0.6)]" style={{ left: 40 + i * 160, top: i === 1 ? 30 : 70, zIndex: i === 1 ? 3 : 1, ...enter(0.05 + i * 0.08, (i - 1) * 8) }}>
          <Poster title={p.title} image={p.image} headline={headlines[p.title] ?? "WANTED"} />
        </div>
      ))}
    </div>
  )
}

function SatchelPreview() {
  const items = skillGroups.flatMap((g) => g.items).filter((name) => logos[name]).slice(0, 20)
  return (
    <ul className="grid w-[560px] grid-cols-5 gap-2.5">
      {items.map((name, i) => (
        <li key={name} className="flex aspect-square flex-col items-center justify-center gap-2 border border-white/15 bg-black/60 backdrop-blur-xs" style={enter(0.03 * i)}>
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
      <div className="journal-paper torn absolute left-0 top-0 w-[400px] px-7 py-6" style={enter(0.05, -2)}>
        <p className="text-center font-kirsty text-[26px] font-bold uppercase text-pencil">Camp Ledger</p>
        <ul className="mt-3 divide-y divide-[#4a6a8a]/35 border-y border-[#4a6a8a]/35">
          {contributions.map((c) => (
            <li key={c.camp} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="font-slab text-[15px] font-bold text-pencil">{c.camp}</span>
              <span className="font-hand text-[19px] text-pencil">{c.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="absolute bottom-0 right-0 w-[330px] space-y-2 border border-white/15 bg-black/75 p-5 backdrop-blur-xs" style={enter(0.18, 1.5)}>
        {awards.slice(0, 3).map((a) => (
          <li key={a.title} className="flex items-center gap-3">
            <span className="h-7 w-7 shrink-0 rounded-full border-2 border-black/40" style={{ background: medal[a.medal] }} />
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
    <div className="journal-paper w-[460px] px-7 pb-7 pt-5 text-[#1b1712] filter-[grayscale(.35)]" style={enter(0.05, 2)}>
      <p className="border-b border-[#1b1712] pb-1 text-center font-sans text-[9px] font-bold uppercase tracking-[0.2em]">Bangalore · Price 5 cents</p>
      <p className="mt-2 text-center font-blackletter text-[46px] leading-none">The Bangalore Ledger</p>
      <div className="mt-2 border-y-[3px] border-double border-[#1b1712]" />
      <div className="mt-4 grid grid-cols-[1fr_150px] gap-4">
        <div>
          <p className="font-kirsty text-[26px] font-bold uppercase leading-[0.95]">{lead.title}</p>
          <p className="mt-2 line-clamp-4 font-slab text-[12.5px] leading-relaxed">{lead.excerpt}</p>
        </div>
        <div className="relative aspect-3/4 overflow-hidden border-2 border-[#1b1712]">
          <Image src={lead.image} alt="" fill sizes="150px" className="object-cover filter-[grayscale(1)_contrast(1.4)]" />
        </div>
      </div>
    </div>
  )
}

function TelegramPreview() {
  return (
    <div className="journal-paper w-[440px] px-8 pb-8 pt-6" style={enter(0.05, -1.5)}>
      <div className="flex items-end justify-between border-b-2 border-pencil pb-2">
        <p className="font-kirsty text-[38px] font-bold uppercase leading-none text-pencil">Telegram</p>
        <p className="text-right font-type text-[11px] leading-tight text-pencil/70">Bangalore office</p>
      </div>
      <p className="mt-5 font-type text-[16px] uppercase leading-[1.9] text-pencil">
        Backend engineer available for interesting work STOP Go, Kubernetes, AWS STOP Reply to {profile.email} STOP
      </p>
      <p className="mt-6 inline-block rotate-[-8deg] border-[3px] border-[#8c1a14] px-3 py-1 font-rocks text-[22px] uppercase text-[#8c1a14] opacity-80">
        Send word
      </p>
    </div>
  )
}

function GamesPreview() {
  return (
    <div className="relative h-[420px] w-[620px]">
      {games.map((g, i) => {
        const offset = i - (games.length - 1) / 2
        return (
          <div
            key={g.id}
            className="absolute top-8 w-[170px] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
            style={{ left: 225 + offset * 115, zIndex: 10 - Math.abs(offset), ...enter(0.05 + i * 0.06, offset * 7) }}
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
    <div className="w-[380px] bg-[#f4efe3] px-8 pb-10 pt-8 text-[#1b1712] shadow-[0_24px_60px_rgba(0,0,0,0.6)]" style={enter(0.05, 2)}>
      <p className="font-kirsty text-[28px] font-bold leading-none">{profile.name}</p>
      <p className="mt-1 font-sans text-[11px] text-[#1b1712]/70">{profile.email}</p>
      {["Experience", "Open source", "Achievements"].map((heading, i) => (
        <div key={heading} className="mt-5">
          <p className="border-b border-[#1b1712]/40 font-sans text-[11px] font-bold uppercase tracking-[0.14em]">{heading}</p>
          {[0, 1, 2].map((line) => (
            <div key={line} className="mt-2 h-[5px] rounded-sm bg-[#1b1712]/15" style={{ width: `${92 - ((line + i) % 3) * 18}%` }} />
          ))}
        </div>
      ))}
      <p className="mt-6 font-rocks text-[18px] uppercase tracking-wide text-[#8c1a14]">Open PDF ›</p>
    </div>
  )
}

function CreditsPreview() {
  return (
    <div className="space-y-5 text-center" style={enter(0.05)}>
      {[
        ["Typefaces", "Rockstar North · Ray Larabie"],
        ["Pictures", "Rockstar Games · ambientCG"],
        ["Built by", profile.name],
      ].map(([title, names]) => (
        <div key={title}>
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
  const Preview = previews[id]
  if (!Preview) return null
  return (
    <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => onOpen(id)} className="group cursor-pointer text-left outline-hidden">
      <style>{`@keyframes preview-in { from { opacity: 0; transform: translateY(26px) rotate(calc(var(--r, 0deg) * 2)) scale(.96) } to { opacity: 1; transform: rotate(var(--r, 0deg)) } }
@keyframes preview-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>
      <div key={id} className="motion-safe:animate-[preview-float_7s_ease-in-out_infinite] transition-transform duration-300 group-hover:scale-[1.02]">
        <Preview />
      </div>
    </button>
  )
}
