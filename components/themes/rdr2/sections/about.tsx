import Image from "next/image"

import { education, profile, tally } from "@/data/resume"

function SelfPoster() {
  return (
    <figure className="relative mx-auto w-full max-w-[280px] rotate-[-1.5deg] bg-[#d9c39a] px-5 pb-5 pt-5 text-[#1d1813] shadow-[0_10px_24px_rgba(60,40,15,0.35)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(120,78,30,0.4) 100%)" }}
      />
      <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#8d8d8d,#2f2f2f_65%)] shadow-[0_2px_2px_rgba(0,0,0,0.6)]" />
      <p className="relative text-center font-redemption text-[48px] leading-[0.88]">WANTED</p>
      <p className="relative mt-1 text-center font-rocks text-[15px] uppercase tracking-widest">For backend work</p>
      <div className="relative mx-auto mt-3 aspect-4/5 w-[86%] overflow-hidden border-[3px] border-[#1d1813] bg-[#cbb48a]">
        <Image
          src="/images/profile/shrey.jpeg"
          alt="Photograph of Shreyash Srivastava"
          fill
          sizes="240px"
          priority
          className="object-cover object-top filter-[grayscale(1)_sepia(0.65)_contrast(1.08)_brightness(1.02)]"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_36px_rgba(60,35,10,0.6)]" />
      </div>
      <figcaption className="relative mt-3 text-center font-kirsty text-[24px] font-bold uppercase leading-none">{profile.name}</figcaption>
    </figure>
  )
}

export function AboutSection() {
  return (
    <div className="journal-paper torn mx-auto max-w-[1040px] px-6 pb-10 pt-8 sm:px-10">
      <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
        <SelfPoster />
        <div>
          <h3 className="font-hand text-[34px] leading-tight text-pencil">A few words on myself</h3>
          <div className="mt-4 space-y-4 font-slab text-[16.5px] leading-[1.75] text-pencil">
            <p>
              I build the parts of software nobody sees until they break: APIs, data pipelines, CI, and the infrastructure underneath. Most days that
              means Go on top of PostgreSQL, shipped in Docker to Kubernetes.
            </p>
            <p>
              Right now I’m a software engineer intern at PRED, working on the backend of a sports prediction exchange: real-time trading, order books
              and on-chain settlement. Before that I moved Seeqlo’s backend from Express.js to Go, and cut a 7-minute import at Ignito down to 16
              seconds.
            </p>
            <p>
              I study Computer Science at Dayananda Sagar College of Engineering, contribute to Debian and the OpenTelemetry Operator, hold the CKAD,
              and was awarded the Linux Foundation’s LiFT Scholarship in 2025.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-hand text-[32px] text-pencil">Tally</h3>
          <dl className="mt-2 space-y-2 border-t border-pencil/25 pt-3">
            {tally.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-pencil/30 pb-1">
                <dt className="font-slab text-[15px] text-pencil/85">{t.label}</dt>
                <dd className="font-slab text-[20px] font-bold text-pencil">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="font-hand text-[32px] text-pencil">Schooling</h3>
          <ul className="mt-2 space-y-3 border-t border-pencil/25 pt-3">
            {education.map((e) => (
              <li key={e.school}>
                <p className="font-slab text-[16px] font-bold leading-snug text-pencil">{e.school}</p>
                <p className="font-slab text-[14.5px] leading-snug text-pencil/80">
                  {e.detail} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote className="mt-10 -rotate-1 border-l-2 border-pencil/35 pl-4">
        <p className="font-hand text-[28px] leading-snug text-pencil">“What I cannot create, I do not understand.”</p>
        <footer className="mt-1 font-slab text-[15px] italic text-pencil/75">Richard Feynman</footer>
      </blockquote>
    </div>
  )
}
