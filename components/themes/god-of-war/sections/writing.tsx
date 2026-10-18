import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { Runes } from "../runes"
import { Heading } from "../ui"
import type { PageProps } from "."

export function Writing({ realm }: PageProps) {
  return (
    <div>
      <Heading
        rune={realm.rune}
        realm={realm.realm}
        codex={realm.codex}
        title="Writing"
        right={
          <a href="https://medium.com/@ShreyashSri" target="_blank" rel="noopener noreferrer" className="gow-btn">
            All articles
          </a>
        }
      />
      <ol className="grid gap-6">
        {blogPosts.map((post, i) => (
          <li key={post.title}>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="gow-lore group grid overflow-hidden sm:grid-cols-[260px_1fr]">
              <div className="relative aspect-video overflow-hidden sm:aspect-auto">
                <Image src={post.image} loading="eager" alt="" fill sizes="(min-width: 640px) 260px, 90vw" className="object-cover grayscale-[0.5] transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#071012]/70" />
              </div>
              <div className="relative px-6 py-6 sm:px-8">
                <span className="gow-lore-num absolute right-5 top-4 font-runic text-5xl" aria-hidden="true">
                  {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ"][i] ?? "ᛟ"}
                </span>
                <p className="font-cinzel text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--realm)]">Lore marker · {post.date}</p>
                <Runes as="h3" text={post.title} replay speed={26} className="gow-title mt-2 block pr-12 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight" />
                <p className="mt-3 max-w-2xl font-garamond text-lg leading-relaxed text-[#e8dfc8]/80">{post.excerpt}</p>
                <p className="mt-4 font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#e9c46a] transition-[letter-spacing] group-hover:tracking-[0.35em]">Read the lore ›</p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
