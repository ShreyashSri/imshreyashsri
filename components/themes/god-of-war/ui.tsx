import { Runes } from "./runes"

export function KnotBand({ className = "", rune = "ᛟ" }: { className?: string; rune?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[var(--realm,#c8a24a)] ${className}`} aria-hidden="true">
      <svg className="h-3 min-w-0 flex-1" preserveAspectRatio="none">
        <defs>
          <pattern id="gow-braid" width="24" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 6 C6 -1 18 13 24 6" fill="none" stroke="#071012" strokeWidth="3.4" />
            <path d="M0 6 C6 -1 18 13 24 6" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.1" />
            <path d="M0 6 C6 13 18 -1 24 6" fill="none" stroke="#071012" strokeWidth="3.4" />
            <path d="M0 6 C6 13 18 -1 24 6" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.1" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#gow-braid)" />
      </svg>
      <span className="font-runic text-sm text-[#e9c46a]">{rune}</span>
      <svg className="h-3 min-w-0 flex-1" preserveAspectRatio="none">
        <rect width="100%" height="12" fill="url(#gow-braid)" />
      </svg>
    </div>
  )
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none absolute h-9 w-9 text-[var(--realm,#c8a24a)] ${className}`} aria-hidden="true">
      <path d="M2 30 V8 a6 6 0 0 1 6 -6 H30" fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" />
      <path d="M8 22 V14 a6 6 0 0 1 6 -6 H22" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M14 14 l4 -4 l4 4 l-4 4z" fill="#e9c46a" />
      <circle cx="2" cy="34" r="1.6" fill="currentColor" />
      <circle cx="34" cy="2" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function Frame({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "article" | "li" | "form" }) {
  return (
    <Tag className={`gow-frame ${className}`}>
      <Corner className="-left-1 -top-1" />
      <Corner className="-right-1 -top-1 rotate-90" />
      <Corner className="-bottom-1 -right-1 rotate-180" />
      <Corner className="-bottom-1 -left-1 -rotate-90" />
      {children}
    </Tag>
  )
}

export function Heading({ rune, realm, codex, title, right }: { rune: string; realm: string; codex: string; title: string; right?: React.ReactNode }) {
  return (
    <header className="mb-7 sm:mb-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="gow-sigil flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
            <span className="font-runic text-3xl text-[#fff3d0]">{rune}</span>
          </span>
          <div className="min-w-0">
            <p className="font-cinzel text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--realm,#c8a24a)]">
              {realm} · {codex}
            </p>
            <Runes as="h2" text={title} replay className="gow-title mt-1 block text-[clamp(1.9rem,6vw,3.4rem)] leading-none" />
          </div>
        </div>
        {right}
      </div>
      <KnotBand className="mt-5" rune={rune} />
    </header>
  )
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-cinzel text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--realm,#c8a24a)] ${className}`}>{children}</p>
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="border border-[#c8a24a]/30 bg-[#071012]/60 px-2.5 py-1 font-cinzel text-[11px] font-bold uppercase tracking-[0.12em] text-[#e8dfc8]/85">{children}</span>
}

export function Diamond({ className = "h-2 w-2" }: { className?: string }) {
  return <span className={`inline-block shrink-0 rotate-45 bg-[var(--realm,#c8a24a)] ${className}`} aria-hidden="true" />
}

export function Key({ label, onClick, hint }: { label: string; onClick: () => void; hint: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hint}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c8a24a]/50 bg-[#071012]/80 font-cinzel text-xs font-bold text-[#e9c46a] transition-colors hover:border-[#e9c46a] hover:bg-[#c8a24a]/15"
    >
      {label}
    </button>
  )
}
