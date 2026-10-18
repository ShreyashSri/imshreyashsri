"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import { projects } from "@/data/projects"
import { Chip, Gem, Heading, tiers } from "../ui"

export function CollectionTab() {
  const [selected, setSelected] = useState(0)
  const inspect = useRef<HTMLElement>(null)
  const project = projects[selected]
  const tier = tiers[selected % tiers.length]
  const external = project.demo.startsWith("http")

  return (
    <div className="val-in">
      <Heading kicker="Collection" title="Projects" right={<p className="font-barlow-condensed text-sm uppercase tracking-[0.25em] text-white/55">{projects.length} skins owned</p>} />
      <div className="flex flex-col-reverse gap-6 xl:grid xl:grid-cols-[1fr_420px]">
        <ul className="grid content-start gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {projects.map((p, i) => {
            const t = tiers[i % tiers.length]
            return (
              <li key={p.title}>
                <button
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => {
                    setSelected(i)
                    if (!matchMedia("(min-width: 1280px)").matches) requestAnimationFrame(() => inspect.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
                  }}
                  className="val-panel val-card group block w-full overflow-hidden text-left"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={p.image} loading="eager" alt="" fill sizes="(min-width: 1536px) 22vw, (min-width: 640px) 40vw, 90vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f1923] via-transparent to-transparent" />
                    <span className="absolute left-2 top-2 flex items-center gap-1.5 bg-[#0f1923]/85 px-2 py-1 font-barlow-condensed text-[10px] font-semibold uppercase tracking-[0.2em]">
                      <Gem color={t.color} className="h-3 w-3" />
                      {t.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-3">
                    <p className="font-anton text-lg uppercase leading-tight">{p.title}</p>
                    <span className="font-barlow-condensed text-[10px] uppercase tracking-[0.25em] text-white/45">{i === selected ? "Equipped" : "Equip"}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <aside ref={inspect} key={project.title} className="val-panel val-ticks val-in h-fit scroll-mt-4 xl:sticky xl:top-0" aria-live="polite">
          <div
            className="val-inspect relative aspect-video overflow-hidden border-b border-white/10"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`)
              e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`)
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.setProperty("--rx", "0deg")
              e.currentTarget.style.setProperty("--ry", "0deg")
            }}
          >
            <div className="val-inspect-card absolute inset-3">
              <Image src={project.image} loading="eager" alt={`Screenshot of ${project.title}`} fill sizes="420px" className="object-cover object-top" />
            </div>
            <span className="absolute bottom-2 right-3 font-barlow-condensed text-[10px] uppercase tracking-[0.3em] text-white/50">Inspect</span>
          </div>
          <div className="p-5">
            <p className="flex items-center gap-2 font-barlow-condensed text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: tier.color }}>
              <Gem color={tier.color} /> {tier.name} edition
            </p>
            <h3 className="mt-2 font-anton text-3xl uppercase leading-none">{project.title}</h3>
            <p className="mt-3 font-barlow text-sm leading-relaxed text-white/75">{project.longDescription ?? project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.demo} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="val-btn val-btn-primary">
                Live demo
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="val-btn">
                Source
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
