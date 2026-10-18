import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"
import { socials } from "@/data/resume"

export function Writings() {
  const medium = socials.find((s) => s.label === "Medium")
  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post, i) => (
          <li key={post.title} className="got-rise" style={{ animationDelay: `${i * 0.08}s` }}>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="got-panel group flex h-full flex-col overflow-hidden transition-colors hover:border-[#c8102e]/70">
              <div className="relative aspect-4/3 overflow-hidden">
                <Image src={post.image} loading="eager" alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="got-ink object-cover group-hover:scale-[1.04]" />
                <span className="absolute right-3 top-3 bg-[#c8102e] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">{post.date}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold uppercase leading-snug tracking-[0.08em]">{post.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#ece6da]/75">{post.excerpt}</p>
                <span className="mt-auto pt-6 text-[11px] font-bold uppercase tracking-[0.32em] text-[#ece6da]/50 transition-colors group-hover:text-[#f4eee4]">Unroll the scroll</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {medium && (
        <div className="mt-10 flex justify-center">
          <a href={medium.href} target="_blank" rel="noopener noreferrer" className="got-btn">
            Every scroll on Medium
          </a>
        </div>
      )}
    </div>
  )
}
