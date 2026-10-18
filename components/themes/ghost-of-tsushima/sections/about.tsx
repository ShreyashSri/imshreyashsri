import Image from "next/image"

import { awards, chapters, contributions, education, profile, tally } from "@/data/resume"
import { Rule, Seal } from "../ui"
import { Haiku } from "./haiku"

export function About() {
  const current = chapters[chapters.length - 1]
  const certified = awards[0]
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
      <div className="got-rise">
        <Haiku />
        <Rule className="my-10 max-w-md" />
        <div className="max-w-2xl space-y-5 text-[17px] leading-[1.85] text-[#ece6da]/85">
          <p>
            I am {profile.name}, a {profile.role.toLowerCase()} from {profile.city}. Today I am a {current.role} at {current.company}.{" "}
            {current.gold}
          </p>
          <p>
            I write Go, run things on Kubernetes and hold the {certified.title} certification. I contribute to {contributions.slice(0, 3).map((c) => c.camp).join(", ")} and
            more.
          </p>
        </div>

        <h3 className="mb-5 mt-14 text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/55">Virtues</h3>
        <dl className="grid grid-cols-2 gap-px bg-[#ece6da]/10 sm:grid-cols-4">
          {tally.map((t) => (
            <div key={t.label} className="flex flex-col-reverse bg-black/70 px-4 py-5">
              <dt className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#ece6da]/55">{t.label}</dt>
              <dd className="text-3xl font-extrabold tracking-wide text-[#f4eee4]">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="got-rise space-y-10" style={{ animationDelay: "0.15s" }}>
        <div className="got-frame group relative mx-auto max-w-[280px] p-3">
          <div className="relative aspect-3/4 overflow-hidden">
            <Image src="/images/profile/shrey.jpeg" loading="eager" alt={profile.name} fill sizes="280px" className="got-ink object-cover object-top" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          </div>
          <p className="mt-3 pr-6 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#ece6da]/70">{profile.name}</p>
          <Seal char="影" className="absolute -bottom-4 -right-4 h-12 w-12 -rotate-6 text-2xl" />
        </div>
        <div>
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/55">Teachers</h3>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.school} className="border-l-2 border-[#c8102e] pl-4">
                <p className="text-lg font-bold leading-snug">{e.school}</p>
                <p className="mt-1 text-sm text-[#ece6da]/70">{e.detail}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#ece6da]/45">{e.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
