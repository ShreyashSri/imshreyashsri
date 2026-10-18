import Image from "next/image"

import { blogPosts } from "@/data/blog-posts"

export function WritingSection() {
  const [lead, ...rest] = blogPosts
  return (
    <article className="journal-paper mx-auto max-w-[980px] px-6 pb-10 pt-7 text-[#1b1712] filter-[grayscale(.35)] sm:px-12">
      <header className="text-center">
        <div className="flex items-center justify-between border-b border-[#1b1712] pb-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em]">
          <span>Vol. II</span>
          <span>Bangalore, Karnataka</span>
          <span>Price 5 cents</span>
        </div>
        <h2 className="mt-2 font-blackletter text-[clamp(2.6rem,8vw,5.2rem)] leading-none">The Bangalore Ledger</h2>
        <div className="mt-2 border-y-[3px] border-double border-[#1b1712] py-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.2em]">
          Written by Shreyash Srivastava · Published on Medium
        </div>
      </header>

      {lead && (
        <section className="grid gap-8 border-b border-[#1b1712]/60 py-7 md:grid-cols-[1.15fr_1fr]">
          <div>
            <h3 className="font-kirsty text-[clamp(2rem,4.6vw,3.2rem)] font-bold uppercase leading-[0.95]">{lead.title}</h3>
            <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em]">{lead.date}</p>
            <p className="mt-4 font-slab text-[16px] leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-kirsty first-letter:text-[58px] first-letter:font-bold first-letter:leading-[0.85]">
              {lead.excerpt}
            </p>
            <a href={lead.url} target="_blank" rel="noopener noreferrer" className="btn-rdr mt-5 border-[#1b1712]! text-[#1b1712]!">
              Read the full story
            </a>
          </div>
          <figure className="relative aspect-4/3 overflow-hidden border-2 border-[#1b1712] bg-[#e4d7b9]">
            <Image src={lead.image} alt="" fill sizes="420px" className="object-cover mix-blend-multiply filter-[grayscale(1)_contrast(1.5)_brightness(1.05)]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(27,23,18,0.45)_0.9px,transparent_1.2px)] bg-size-[3px_3px] mix-blend-multiply" />
          </figure>
        </section>
      )}

      <section className="grid gap-8 pt-7 md:grid-cols-2">
        {rest.map((post) => (
          <div key={post.title} className="grid grid-cols-[140px_1fr] gap-5">
            <figure className="relative aspect-square overflow-hidden border-2 border-[#1b1712] bg-[#e4d7b9]">
              <Image src={post.image} alt="" fill sizes="140px" className="object-cover mix-blend-multiply filter-[grayscale(1)_contrast(1.5)]" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(27,23,18,0.45)_0.9px,transparent_1.2px)] bg-size-[3px_3px] mix-blend-multiply" />
            </figure>
            <div>
              <h3 className="font-kirsty text-[24px] font-bold uppercase leading-none">{post.title}</h3>
              <p className="mt-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em]">{post.date}</p>
              <p className="mt-2 font-slab text-[14px] leading-relaxed">{post.excerpt}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-sans text-[12px] font-bold uppercase underline underline-offset-4 hover:text-blood">
                Read the full story
              </a>
            </div>
          </div>
        ))}
        <div className="border-l border-[#1b1712]/50 pl-6 font-slab text-[14px] leading-relaxed">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em]">Back issues</p>
          <p className="mt-2">
            Older dispatches on APIs, documentation and open-source programmes are filed at{" "}
            <a href="https://medium.com/@ShreyashSri" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-blood">
              medium.com/@ShreyashSri
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  )
}
