"use client"

import Image from "next/image"

import { projects, type Project } from "@/data/projects"
import { useReveal } from "../reveal"
import { numerals, Seal } from "../ui"

function Rod() {
  return (
    <div className="got-rod relative h-3.5" aria-hidden="true">
      <span className="absolute -left-2 top-1/2 h-4.5 w-3 -translate-y-1/2 rounded-sm bg-[#2a1a12]" />
      <span className="absolute -right-2 top-1/2 h-4.5 w-3 -translate-y-1/2 rounded-sm bg-[#2a1a12]" />
    </div>
  )
}

function Scroll({ project, index }: { project: Project; index: number }) {
  const [ref, open] = useReveal<HTMLLIElement>()
  const external = project.demo.startsWith("http")

  return (
    <li ref={ref} className="relative">
      <svg viewBox="0 0 100 24" className="mx-auto -mb-px block h-6 w-28" aria-hidden="true">
        <path d="M14 24L50 3L86 24" fill="none" stroke="#8a7a62" strokeWidth="1.2" />
        <circle cx="50" cy="3" r="2.4" fill="#8a7a62" />
      </svg>
      <Rod />
      <div className="got-unroll" data-open={open} style={{ transitionDelay: `${(index % 3) * 0.14}s` }}>
        <div className="min-h-0 overflow-hidden">
          <article className="got-washi group relative px-5 pb-6 pt-5 text-[#1b1714] sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-[#9b1424]">Mythic tale {numerals[index]}</p>
                <h3 className="mt-2 font-brush text-[clamp(1.35rem,2vw,1.7rem)] leading-snug tracking-normal">{project.title}</h3>
              </div>
              <Seal char={numerals[index]} className="mt-1 h-10 w-10 -rotate-6 text-xl" />
            </div>
            <a
              href={project.demo}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="got-ink-frame relative mt-4 block aspect-video overflow-hidden"
              aria-label={`Open ${project.title}`}
            >
              <Image src={project.image} loading="eager" alt={`Screenshot of ${project.title}`} fill sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw" className="got-ink object-cover object-top group-hover:scale-[1.03]" />
            </a>
            <p className="mt-4 text-sm italic text-[#1b1714]/70">{project.description}</p>
            <p className="mt-3 text-[14.5px] leading-[1.75] text-[#1b1714]/90">{project.longDescription ?? project.description}</p>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#1b1714]/60">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={project.demo} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="got-btn got-btn-primary">
                Visit
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="got-btn got-btn-ink">
                Source
              </a>
            </div>
          </article>
        </div>
      </div>
      <Rod />
    </li>
  )
}

export function Myths() {
  return (
    <ol className="grid items-start gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((p, i) => (
        <Scroll key={p.title} project={p} index={i} />
      ))}
    </ol>
  )
}
