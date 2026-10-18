import Image from "next/image"

import { chapters, education, profile, tally } from "@/data/resume"
import { SubHeading } from "../ui"

export function SubjectSection() {
  const current = chapters[chapters.length - 1]
  const entries = [
    ["Name", profile.name],
    ["Alias", profile.handle],
    ["Occupation", `${current.role}, ${current.company}`],
    ["Discipline", profile.role],
    ["Location", profile.city],
    ["Correspondence", profile.email],
  ]

  return (
    <div className="space-y-14">
      <div className="grid gap-10 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
        <figure className="an-brackets mx-auto w-full max-w-[300px]">
          <div className="an-shard-frame group relative aspect-4/5 overflow-hidden bg-[#1c2a33]">
            <Image src="/images/profile/shrey.jpeg" loading="eager" alt="Portrait of Shreyash Srivastava" fill sizes="300px" className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            <div className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.14)_0_1px,transparent_1px_3px)]" />
            <span aria-hidden="true" className="an-scan absolute inset-x-0 top-0" />
          </div>
          <figcaption className="mt-3 font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Subject portrait · Match confirmed</figcaption>
        </figure>

        <div>
          <SubHeading>Subject profile</SubHeading>
          <p className="font-marcellus text-[clamp(1.25rem,2vw,1.6rem)] leading-snug">
            {profile.role} out of {profile.city}. Currently {current.role.toLowerCase()} at <span className="an-target">{current.company}</span>,{" "}
            {current.gold.charAt(0).toLowerCase() + current.gold.slice(1)}
          </p>
          <dl className="mt-8 grid border-t border-(--an-line) sm:grid-cols-2">
            {entries.map(([label, value]) => (
              <div key={label} className="border-b border-(--an-line) py-3.5 sm:odd:pr-6">
                <dt className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">{label}</dt>
                <dd className="mt-1 break-words font-exo text-[15px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section>
        <SubHeading>Statistics</SubHeading>
        <ul className="grid grid-cols-2 gap-px border border-(--an-line) bg-(--an-line) md:grid-cols-4">
          {tally.map((t) => (
            <li key={t.label} className="bg-(--an-bg) p-5">
              <p className="an-key font-marcellus text-[34px] leading-none">{t.value}</p>
              <p className="mt-2 font-exo text-[10px] font-semibold uppercase tracking-[0.26em] text-(--an-muted)">{t.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SubHeading>Education</SubHeading>
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <li key={e.school} className="an-card an-card-hover p-6">
              <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-red)">{e.period}</p>
              <p className="mt-2 font-marcellus text-2xl leading-tight">{e.school}</p>
              <p className="mt-2 font-exo text-sm text-(--an-muted)">{e.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
