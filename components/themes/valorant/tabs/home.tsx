import { blogPosts } from "@/data/blog-posts"
import { chapters, profile } from "@/data/resume"
import { KillFeed } from "../kill-feed"
import { PlayerCard } from "../player-card"
import type { ValorantTab } from "../valorant-app"

function RankBadge() {
  return (
    <div className="flex items-center gap-4">
      <span className="relative block h-16 w-16 overflow-hidden">
        <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
          <path d="M32 2l26 15v30L32 62 6 47V17z" fill="#f0c35a" opacity="0.14" />
          <path d="M32 8l21 12v24L32 56 11 44V20z" fill="none" stroke="#f0c35a" strokeWidth="2" />
          <path d="M32 16l14 8v16l-14 8-14-8V24z" fill="#f0c35a" />
          <path d="M32 22l-8 18h5l3-7 3 7h5z" fill="#0f1923" />
        </svg>
        <span className="val-rank-shine absolute inset-y-0 left-0 w-1/3 bg-white/50 mix-blend-overlay" />
      </span>
      <div className="font-barlow-condensed uppercase leading-tight">
        <p className="text-[11px] tracking-[0.3em] text-white/55">Current rank</p>
        <p className="text-xl font-semibold tracking-[0.18em] text-[#f0c35a]">CKAD Certified</p>
      </div>
    </div>
  )
}

export function HomeTab({ onOpen }: { onOpen: (tab: ValorantTab) => void }) {
  const current = chapters[chapters.length - 1]
  const [latest] = blogPosts
  return (
    <div className="grid min-h-full gap-8 lg:grid-cols-[1fr_minmax(300px,380px)] lg:gap-10 xl:grid-cols-[1fr_250px_minmax(300px,380px)]">
      <div className="val-in flex flex-col justify-end gap-7 pb-2 lg:row-span-2">
        <RankBadge />
        <h1 className="font-anton uppercase leading-[0.86] tracking-wide">
          <span className="block text-[clamp(3.6rem,10vw,9rem)]">Shreyash</span>
          <span className="block text-[clamp(2.6rem,7.2vw,6.4rem)] text-[#ff4655]">Srivastava</span>
        </h1>
        <p className="max-w-xl font-barlow text-lg leading-relaxed text-white/80">
          {current.role} at {current.company}, building backend infrastructure for a real-time sports prediction exchange. Go, Kubernetes and open source
          out of {profile.city.split(",")[0]}.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => onOpen("collection")} className="val-play">
            <span>
              <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
                <path d="M5 3l12 7-12 7z" fill="currentColor" />
              </svg>
              Play
            </span>
          </button>
          <button type="button" onClick={() => onOpen("career")} className="val-btn">
            Career
          </button>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="val-btn hidden sm:inline-flex">
            Resume
          </a>
        </div>
      </div>

      <div className="val-in hidden self-center xl:row-span-2 xl:block" style={{ animationDelay: "0.06s" }}>
        <div className="h-[400px]">
          <PlayerCard large />
        </div>
      </div>

      <div className="val-in" style={{ animationDelay: "0.1s" }}>
        <KillFeed />
      </div>

      <div className="val-in grid content-end gap-4" style={{ animationDelay: "0.18s" }}>
        <button type="button" onClick={() => onOpen("career")} className="val-panel val-ticks val-card group overflow-hidden text-left">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span className="flex items-center gap-2 text-[#ff4655]">
              <span className="h-2 w-2 animate-pulse bg-[#ff4655]" /> Current act
            </span>
            <span className="text-white/50">{current.period}</span>
          </div>
          <div className="px-4 py-4">
            <p className="font-anton text-4xl uppercase leading-none">{current.company}</p>
            <p className="mt-1 font-barlow-condensed text-sm uppercase tracking-[0.2em] text-white/70">{current.role}</p>
            <p className="mt-3 font-barlow text-sm leading-relaxed text-white/75">{current.gold}</p>
          </div>
        </button>
        <a href={latest.url} target="_blank" rel="noopener noreferrer" className="val-panel val-card group flex items-center gap-4 px-4 py-3">
          <span className="font-anton text-3xl leading-none text-[#ff4655]">!</span>
          <span className="min-w-0">
            <span className="block font-barlow-condensed text-[11px] uppercase tracking-[0.25em] text-white/50">Patch notes · {latest.date}</span>
            <span className="block truncate font-anton text-xl uppercase leading-tight">{latest.title}</span>
          </span>
        </a>
      </div>
    </div>
  )
}
