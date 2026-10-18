"use client"

import Image from "next/image"

import { places } from "@/data/rdr2/places"

export const headlines: Record<string, string> = {
  "ChaosCI-Stats": "DANGEROUS",
  "SiMG (DICOM Guardian)": "BEWARE",
  "Penguin: Proof-of-Art (cDNA)": "REWARD",
  LiquidPay: "BANK NOTICE",
  VendIN: "MARKET DAY",
  "Career Portal": "NOW HIRING",
}

const charges: Record<string, string> = {
  "ChaosCI-Stats": "Unleashing chaos on every pull request",
  "SiMG (DICOM Guardian)": "Turning away tampered medical images at the door",
  "Penguin: Proof-of-Art (cDNA)": "Signing and watermarking art on the blockchain",
  LiquidPay: "Keeping an entire bank account in one ledger",
  VendIN: "Putting frontier vendors on the map",
  "Career Portal": "Rounding up every student opportunity",
}

const tilt = ["-1.6deg", "1.2deg", "-0.6deg", "1.8deg", "-1.2deg", "0.7deg"]

export function ProjectsSection() {
  const bounties = places.filter((p) => p.category === "project")
  return (
    <div>
      <ul className="grid gap-x-8 gap-y-10 pt-2 sm:grid-cols-2 lg:grid-cols-3">
        {bounties.map((p, i) => (
          <li key={p.id} style={{ rotate: tilt[i % tilt.length] }}>
            <article className="journal-paper torn relative px-5 pb-5 pt-6 text-[#1d1813]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 45%, transparent 50%, rgba(120,78,30,0.45) 100%), radial-gradient(30% 22% at 78% 70%, rgba(140,95,40,0.22), transparent 70%), radial-gradient(22% 18% at 18% 28%, rgba(140,95,40,0.18), transparent 70%), linear-gradient(rgba(196,160,104,0.35), rgba(196,160,104,0.35))",
                }}
              />
              <span aria-hidden="true" className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#8d8d8d,#2f2f2f_65%)] shadow-[0_2px_2px_rgba(0,0,0,0.6)]" />

              <p className="relative text-center font-rocks text-[14px] uppercase tracking-[0.22em]">No. {String(i + 1).padStart(2, "0")}</p>
              <p className="relative mt-1 text-center font-redemption text-[clamp(2.4rem,4vw,3.25rem)] leading-[0.88] tracking-[0.02em]">{headlines[p.title] ?? "WANTED"}</p>

              <div className="relative mx-auto mt-3 aspect-16/10 w-full overflow-hidden border-[3px] border-[#1d1813] bg-[#cbb48a]">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={`Screenshot of ${p.title}`}
                    fill
                    sizes="380px"
                    className="object-cover object-top filter-[grayscale(1)_sepia(0.6)_contrast(1.05)]"
                  />
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(60,35,10,0.55)]" />
              </div>

              <h3 className="relative mt-4 text-center font-kirsty text-[26px] font-bold uppercase leading-none tracking-wide">{p.title}</h3>
              <p className="mt-2 text-center font-slab text-[14.5px] italic leading-snug">
                Known for {(charges[p.title] ?? p.summary).toLowerCase()}. Last seen in {p.location}.
              </p>

              <p className="relative mt-3 border-t-2 border-double border-[#1d1813] pt-3 text-center font-sans text-[12px] font-semibold uppercase leading-relaxed tracking-wide text-[#1d1813]/85">
                Known associates: {p.tags?.join(", ")}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {p.links?.map((l) => {
                  const external = l.href.startsWith("http")
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="border border-[#1d1813] px-3 py-1.5 font-sans text-[12px] font-bold uppercase hover:bg-[rgba(105,17,8,0.12)]"
                    >
                      {l.label === "Demo" ? "Live demo" : "Source code"}
                    </a>
                  )
                })}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
