import { blogPosts } from "@/data/blog-posts"
import { games } from "@/data/games"
import { projects } from "@/data/projects"
import { awards, chapters, contributions, profile, skillGroups } from "@/data/resume"
import type { Mood } from "../wind"
import { About } from "./about"
import { Games } from "./games"
import { Letter } from "./letter"
import { Myths } from "./myths"
import { Records } from "./records"
import { Shrines } from "./shrines"
import { Stances } from "./stances"
import { Tales } from "./tales"
import { Writings } from "./writings"

const current = chapters[chapters.length - 1]

export const sections = [
  { id: "about", label: "About", kanji: "心", epithet: "The ghost", blurb: "Who walks this path, and why.", fact: `${profile.role} · ${profile.city}`, photo: "overlook", mood: "wind", Content: About },
  { id: "experience", label: "Experience", kanji: "旅", epithet: "Tales of the road", blurb: "Where I have worked, and what I left behind.", fact: `${chapters.length} tales · now at ${current.company}`, photo: "overlook", mood: "gold", Content: Tales },
  { id: "projects", label: "Projects", kanji: "作", epithet: "Mythic tales", blurb: "Things I built, told as legends.", fact: `${projects.length} mythic tales`, photo: "golden-tree", mood: "ember", Content: Myths },
  { id: "skills", label: "Skills", kanji: "構", epithet: "Stances", blurb: "The stances I fight with, and their techniques.", fact: `${skillGroups.length} stances · ${skillGroups.reduce((n, g) => n + g.items.length, 0)} techniques`, photo: "duel", mood: "snow", Content: Stances },
  { id: "open-source", label: "Open source", kanji: "祠", epithet: "Shrines", blurb: "Shrines I climbed to, and the offerings I left.", fact: `${contributions.length} shrines visited`, photo: "golden-tree", mood: "maple", Content: Shrines },
  { id: "awards", label: "Awards", kanji: "誉", epithet: "Records of honour", blurb: "Honours earned along the way.", fact: `${awards.length} records`, photo: "duel", mood: "crimson", Content: Records },
  { id: "writing", label: "Writing", kanji: "書", epithet: "Ink and scroll", blurb: "Words set down in ink.", fact: `Latest · ${blogPosts[0].title}`, photo: "overlook", mood: "petal", Content: Writings },
  { id: "contact", label: "Contact", kanji: "文", epithet: "Send a letter", blurb: "Send word. I will answer.", fact: profile.email, photo: "golden-tree", mood: "firefly", Content: Letter },
  { id: "games", label: "Games", kanji: "遊", epithet: "Other lands", blurb: "Travel to another land. The whole site changes with you.", fact: `${games.length} games`, photo: "duel", mood: "maple", Content: Games },
] as const satisfies readonly { id: string; label: string; kanji: string; epithet: string; blurb: string; fact: string; photo: string; mood: Mood; Content: () => React.ReactNode }[]

export type SectionId = (typeof sections)[number]["id"]

export type Section = (typeof sections)[number]
