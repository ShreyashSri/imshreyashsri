import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { Heading } from "../ui"

const tags = ["Dev blog", "Patch notes", "Community"]

export function NewsTab() {
  const [lead, ...rest] = blogPosts
  return (
    <div className="val-in">
      <Heading
        kicker="News"
        title="Articles"
        right={
          <a href="https://medium.com/@ShreyashSri" target="_blank" rel="noopener noreferrer" className="val-btn">
            All articles
          </a>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <a href={lead.url} target="_blank" rel="noopener noreferrer" className="val-panel val-card group block overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <Image src={lead.image} loading="eager" alt="" fill sizes="(min-width: 1024px) 55vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0f1923] via-[#0f1923]/30 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <span className="bg-[#ff4655] px-2 py-1 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.2em]">{tags[0]}</span>
              <p className="mt-3 font-anton text-[clamp(1.8rem,3.4vw,2.8rem)] uppercase leading-none">{lead.title}</p>
              <p className="mt-2 max-w-xl font-barlow text-sm leading-relaxed text-white/80">{lead.excerpt}</p>
            </div>
          </div>
        </a>
        <ul className="grid content-start gap-4">
          {rest.map((post, i) => (
            <li key={post.title}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="val-panel val-card group grid grid-cols-[140px_1fr] overflow-hidden">
                <div className="relative min-h-[120px] overflow-hidden">
                  <Image src={post.image} loading="eager" alt="" fill sizes="140px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ff4655]">{tags[(i + 1) % tags.length]}</p>
                  <p className="mt-1 font-anton text-xl uppercase leading-tight">{post.title}</p>
                  <p className="mt-2 font-barlow-condensed text-xs uppercase tracking-[0.2em] text-white/50">{post.date}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
