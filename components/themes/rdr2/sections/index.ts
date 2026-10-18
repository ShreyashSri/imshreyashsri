import { AboutSection } from "./about"
import { ContactSection } from "./contact"
import { ExperienceSection } from "./experience"
import { GamesSection } from "./games"
import { OpenSourceSection } from "./open-source"
import { ProjectsSection } from "./projects"
import { SkillsSection } from "./skills"
import { WritingSection } from "./writing"

export const sections = [
  { id: "about", label: "Journal", blurb: "A few words on myself, where I studied, and the tally so far.", backdrop: "misty-oak", Content: AboutSection },
  { id: "experience", label: "Story", blurb: "PRED, Seeqlo and Ignito, told chapter by chapter.", backdrop: "trestle", Content: ExperienceSection },
  { id: "projects", label: "Bounties", blurb: "Six projects at large. Demos and source on every poster.", backdrop: "canyon", Content: ProjectsSection },
  { id: "skills", label: "Satchel", blurb: "The languages, frameworks and tools I carry on every job.", backdrop: "night-lake", Content: SkillsSection },
  { id: "open-source", label: "Camp", blurb: "Open-source work in the camp ledger, and the awards won.", backdrop: "snow-camp", Content: OpenSourceSection },
  { id: "writing", label: "Newspapers", blurb: "Articles I've written, printed in The Bangalore Ledger.", backdrop: "wagon-fog", Content: WritingSection },
  { id: "contact", label: "Telegram", blurb: "Send word about a role, a project or a collaboration.", backdrop: "golden-field", Content: ContactSection },
  { id: "games", label: "Games", blurb: "Games I love. Pick one and the whole portfolio changes to match.", backdrop: "oak-riders", Content: GamesSection },
] as const satisfies readonly { id: string; label: string; blurb: string; backdrop: string; Content: () => React.ReactNode }[]

export type SectionId = (typeof sections)[number]["id"]

export const isSectionId = (id: string): id is SectionId => sections.some((s) => s.id === id)
