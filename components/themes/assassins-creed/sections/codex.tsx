"use client"

import Image from "next/image"

import { projects } from "@/data/projects"
import { Schematic } from "../schematic"

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
const tilt = [-0.8, 0.7, -0.5, 0.9, -0.7, 0.5]
const plateTilt = [3, -4, 2.5, -3, 4, -2]

export function CodexSection() {
  return (
    <div>
      <p className="mb-8 max-w-2xl font-exo text-[15px] leading-relaxed text-(--an-muted)">
        Pages recovered from the subject&apos;s notebooks. Each sketch is drawn in the old way, with the working invention pinned to the page.
      </p>
      <ul className="grid gap-10 lg:grid-cols-2">
        {projects.map((p, i) => {
          const external = p.demo.startsWith("http")
          return (
            <li key={p.title}>
              <article
                className="an-paper group flex h-full flex-col p-5 pb-6 sm:p-7"
                style={{ rotate: `${tilt[i % tilt.length]}deg` }}
              >
                <header className="flex items-center justify-between border-b border-(--an-paper-line) pb-2">
                  <p className="font-marcellus text-sm uppercase tracking-[0.2em]">Codex page {numerals[i]}</p>
                  <span className="font-garamond text-[13px] italic opacity-70">Folio {i + 1} of {projects.length}</span>
                </header>

                <div className="relative mt-4 aspect-[4/3]">
                  <Schematic seed={i + 1} script={p.description} />
                  <figure
                    className="absolute bottom-[6%] left-[6%] w-[54%] bg-[#f4ecd8] p-1.5 shadow-[0_12px_24px_-12px_rgba(58,42,27,0.7)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.04]"
                    style={{ rotate: `${plateTilt[i % plateTilt.length]}deg` }}
                  >
                    <span aria-hidden="true" className="absolute -top-1.5 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#8e1c1c] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.4)]" />
                    <div className="relative aspect-video overflow-hidden border border-(--an-paper-line)">
                      <Image src={p.image} loading="eager" alt={`Screenshot of ${p.title}`} fill sizes="(min-width: 1024px) 26vw, 50vw" className="an-sepia object-cover object-top" />
                    </div>
                    <figcaption className="mt-1 text-center font-garamond text-[11px] italic opacity-70">fig. {numerals[i]}</figcaption>
                  </figure>
                </div>

                <h3 className="an-glitchy mt-5 font-marcellus text-[clamp(1.6rem,2.6vw,2rem)] leading-tight">{p.title}</h3>
                <p className="mt-2 flex-1 font-garamond text-[17.5px] italic leading-snug">{p.longDescription ?? p.description}</p>
                <div className="mt-4 border-t border-dashed border-(--an-paper-line) pt-3">
                  <p className="font-exo text-[9.5px] font-bold uppercase tracking-[0.3em] opacity-60">Materia</p>
                  <p className="mt-1 font-garamond text-[15px] leading-relaxed">{p.technologies.join(" · ")}</p>
                </div>
                <div className="mt-4 flex gap-5 font-exo text-[11px] font-bold uppercase tracking-[0.24em]">
                  <a href={p.demo} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="an-key underline-offset-4 hover:underline">
                    Live demo
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    Source
                  </a>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
