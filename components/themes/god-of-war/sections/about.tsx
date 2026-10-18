import Image from "next/image"

import { chapters, education, profile, tally } from "@/data/resume"
import { Runes } from "../runes"
import { Diamond, Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

const statRunes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ"]

export function About({ realm }: PageProps) {
  const current = chapters[chapters.length - 1]
  return (
    <div>
      <Heading rune={realm.rune} realm={realm.realm} codex={realm.codex} title="About me" />
      <div className="grid gap-7 lg:grid-cols-[300px_1fr]">
        <Frame className="h-fit p-3">
          <div className="relative aspect-4/5 overflow-hidden">
            <Image src="/images/profile/shrey.jpeg" loading="eager" alt={`Portrait of ${profile.name}`} fill sizes="300px" className="object-cover object-top grayscale-[0.35] sepia-[0.2]" />
            <div className="absolute inset-0 bg-linear-to-t from-[#071012] via-[#071012]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="gow-title text-2xl leading-none">{profile.name}</p>
              <p className="mt-1.5 font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--realm)]">{profile.role}</p>
            </div>
          </div>
        </Frame>

        <div className="grid content-start gap-7">
          <Frame className="px-6 py-6 sm:px-8 sm:py-7">
            <Label>Codex entry</Label>
            <p className="mt-3 font-garamond text-xl leading-relaxed text-[#e8dfc8]/90 first-letter:float-left first-letter:mr-2 first-letter:font-cinzel first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-[#e9c46a]">
              A backend engineer from {profile.city}, now a {current.role} at {current.company}. Before that, three internships of Go services, payments and
              data pipelines, a Kubernetes certification, and a steady trail of open-source work across Debian, OpenTelemetry and more.
            </p>
            <div className="mt-5 border-t border-[#c8a24a]/20 pt-4">
              <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8dfc8]/45">Inscription, translated</p>
              <Runes as="p" text={current.gold} speed={22} className="mt-2 block font-garamond text-lg italic leading-snug text-[#fff3d0]" />
            </div>
          </Frame>

          <section aria-label="Stats">
            <Label className="mb-4">Stats</Label>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4">
              {tally.map((t, i) => (
                <li key={t.label} className="gow-stat group flex items-center gap-3">
                  <span className="gow-hex flex h-14 w-12 shrink-0 items-center justify-center">
                    <span className="font-runic text-xl text-[var(--realm)] transition-transform duration-300 group-hover:scale-125">{statRunes[i % statRunes.length]}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-cinzel text-2xl font-bold leading-none text-[#fff3d0]">{t.value}</span>
                    <span className="mt-1 block font-cinzel text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-[#e8dfc8]/55">{t.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <Frame className="px-6 py-5 sm:px-8">
            <Label>Training grounds</Label>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2">
              {education.map((e) => (
                <li key={e.school} className="flex gap-3">
                  <Diamond className="mt-2.5 h-2 w-2" />
                  <div>
                    <p className="font-cinzel text-base font-bold uppercase tracking-[0.06em] text-[#fff3d0]">{e.school}</p>
                    <p className="font-garamond text-lg text-[#e8dfc8]/80">{e.detail}</p>
                    <p className="font-garamond text-base italic text-[var(--realm)]">{e.period}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Frame>
        </div>
      </div>
    </div>
  )
}
