"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { profile } from "@/data/resume"

export function LettersSection() {
  const [selected, setSelected] = useState(0)
  const pane = useRef<HTMLElement>(null)
  const post = blogPosts[selected]
  const meta = [
    ["Entry", String(selected + 1).padStart(3, "0")],
    ["Filed", post.date],
    ["Author", profile.name],
    ["Archive", "Medium"],
    ["Clearance", "Public"],
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="an-card h-fit">
        <p className="border-b border-(--an-line) px-5 py-3 font-exo text-[10px] font-bold uppercase tracking-[0.32em] text-(--an-muted)">Animus database · Letters</p>
        <ol>
          {blogPosts.map((p, i) => {
            const on = i === selected
            return (
              <li key={p.title}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setSelected(i)
                    if (!matchMedia("(min-width: 1024px)").matches) requestAnimationFrame(() => pane.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
                  }}
                  className={`group flex w-full items-baseline gap-4 border-l-2 px-5 py-4 text-left transition-colors ${on ? "border-(--an-red) bg-(--an-red)/5" : "border-transparent hover:bg-(--an-line)"}`}
                >
                  <span className="font-exo text-[11px] font-bold text-(--an-red)">{String(i + 1).padStart(3, "0")}</span>
                  <span className="min-w-0">
                    <span className={`an-glitchy block font-marcellus text-[19px] leading-tight ${on ? "an-key" : ""}`}>{p.title}</span>
                    <span className="mt-1 block font-exo text-[11px] uppercase tracking-[0.2em] text-(--an-muted)">{p.date}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <article ref={pane} key={post.title} className="an-card an-preview scroll-mt-20 p-6 sm:p-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-(--an-line) pb-4 sm:grid-cols-5">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="font-exo text-[9px] font-bold uppercase tracking-[0.3em] text-(--an-muted)">{label}</dt>
              <dd className="mt-0.5 font-exo text-[12.5px] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_220px]">
          <div>
            <h3 className="an-target font-marcellus text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight">{post.title}</h3>
            <p className="mt-4 font-garamond text-[19px] italic leading-relaxed">{post.excerpt}</p>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="animus-btn animus-btn-primary mt-6">
              Read the full entry ↗
            </a>
          </div>
          <figure className="an-brackets relative aspect-video self-start md:aspect-square">
            <div className="absolute inset-0 overflow-hidden">
              <Image src={post.image} loading="eager" alt="" fill sizes="220px" className="object-cover grayscale" />
              <span aria-hidden="true" className="an-scan absolute inset-x-0 top-0" />
            </div>
          </figure>
        </div>
      </article>
    </div>
  )
}
