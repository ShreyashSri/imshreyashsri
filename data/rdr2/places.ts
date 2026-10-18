
import { blogPosts } from "../blog-posts"
import { projects } from "../projects"
import { awards, chapters, contributions, education } from "../resume"

export type CategoryId = "experience" | "education" | "project" | "opensource" | "award" | "article"

export type Place = {
  id: string
  category: CategoryId
  title: string
  location: string
  summary: string
  meta?: string
  image?: string
  tags?: string[]
  links?: { label: string; href: string }[]
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const locations: Record<string, string> = {
  "PRED": "Saint Denis",
  "Seeqlo": "Annesburg",
  "Ignito Co.": "Valentine",
  "Dayananda Sagar College of Engineering": "Rhodes",
  "Lucknow Public School": "Strawberry",
  "ChaosCI-Stats": "Blackwater",
  "SiMG (DICOM Guardian)": "Annesburg",
  "Penguin: Proof-of-Art (cDNA)": "Van Horn Trading Post",
  "LiquidPay": "Emerald Ranch",
  "VendIN": "Armadillo",
  "Career Portal": "Tumbleweed",
  "Debian — Salsa CI": "Wallace Station",
  "OpenTelemetry Operator": "Riggs Station",
  "PointBlank": "Lagras",
  "KWoC Backend": "Bacchus Station",
  "mwoffliner": "MacFarlane's Ranch",
  "Certified Kubernetes Application Developer": "Fort Wallace",
  "Unique Idea award, Hack-Nocturne ’26": "Wapiti",
  "Won the Xythera CTF": "Fort Brennand",
  "LiFT Scholarship": "Caliga Hall",
  "Won the Coding Relay": "Flatneck Station",
  "Top 9 of 63 teams, HackOasis V2": "Thieves Landing",
  "Member of PointBlank": "Braithwaite Manor",
  "Swagger: What's That?": "Manzanita Post",
  "My Experience Participating in KWoC": "Twin Rocks",
  "Production Was Down": "Blackwater",
}

function at(key: string) {
  const location = locations[key]
  if (!location) throw new Error(`No location for "${key}"`)
  return { location }
}

export const places: Place[] = [
  ...chapters.map((c) => ({
    id: `job-${slug(c.company)}`,
    category: "experience" as const,
    title: c.company,
    ...at(c.company),
    meta: `${c.role} · ${c.period}`,
    summary: c.gold,
    tags: c.stack,
  })),
  ...education.map((e) => ({
    id: `school-${slug(e.school)}`,
    category: "education" as const,
    title: e.school,
    ...at(e.school),
    meta: e.period,
    summary: e.detail,
  })),
  ...projects.map((p) => ({
    id: `bounty-${slug(p.title)}`,
    category: "project" as const,
    title: p.title,
    ...at(p.title),
    summary: p.longDescription ?? p.description,
    image: p.image,
    tags: p.technologies,
    links: [
      { label: "Demo", href: p.demo },
      { label: "Source", href: p.github },
    ],
  })),
  ...contributions.map((c) => ({
    id: `camp-${slug(c.camp)}`,
    category: "opensource" as const,
    title: c.camp,
    ...at(c.camp),
    meta: c.role,
    summary: c.deeds.join(" "),
    links: [{ label: "Repository", href: c.href }],
  })),
  ...awards.map((a) => ({
    id: `award-${slug(a.title)}`,
    category: "award" as const,
    title: a.title,
    ...at(a.title),
    meta: a.context,
    summary: a.context,
  })),
  ...blogPosts.map((b) => ({
    id: `article-${slug(b.title)}`,
    category: "article" as const,
    title: b.title,
    ...at(b.title),
    meta: b.date,
    summary: b.excerpt,
    image: b.image,
    links: [{ label: "Read on Medium", href: b.url }],
  })),
]

