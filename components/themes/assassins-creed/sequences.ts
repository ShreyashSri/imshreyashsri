import { awards, chapters, contributions, skillGroups } from "@/data/resume"
import { blogPosts } from "@/data/blog-posts"
import { games } from "@/data/games"
import { projects } from "@/data/projects"

export type SequenceId = "subject" | "memories" | "codex" | "arsenal" | "glyphs" | "honours" | "letters" | "contact" | "games"

export type Sequence = { id: SequenceId; title: string; label: string; place: string; blurb: string; readout: string }

export const sequences: Sequence[] = [
  { id: "subject", title: "Database entry", label: "About me", place: "Venezia, 1485", blurb: "Who the subject is, where he studies and the numbers that define him.", readout: "1 subject · match confirmed" },
  { id: "memories", title: "Memories", label: "Experience", place: "Rooftops of Venezia", blurb: "Three internships relived, from the first ingest pipeline to a live trading exchange.", readout: `${chapters.length} memories recovered` },
  { id: "codex", title: "Codex pages", label: "Projects", place: "Piazza San Marco", blurb: "Six inventions, sketched and shipped. Each page holds the code and the demo.", readout: `${projects.length} pages decoded` },
  { id: "arsenal", title: "Arsenal", label: "Skills", place: "The armoury", blurb: "The weapon wheel. Languages, frameworks, data, infrastructure and more.", readout: `${skillGroups.reduce((n, g) => n + g.items.length, 0)} tools in ${skillGroups.length} slots` },
  { id: "glyphs", title: "Glyphs", label: "Open source", place: "Hidden in plain sight", blurb: "Marks left on Debian, OpenTelemetry and other open-source walls. Solve each glyph to read it.", readout: `${contributions.length} glyphs on the walls` },
  { id: "honours", title: "Honours", label: "Achievements", place: "Grand Canal", blurb: "Certifications, scholarships and the contests that were won.", readout: `${awards.length} seals awarded` },
  { id: "letters", title: "Database", label: "Writing", place: "By gondola", blurb: "Dispatches on production outages, API docs and open-source winters.", readout: `${blogPosts.length} entries on file` },
  { id: "contact", title: "Send a courier", label: "Contact", place: "The canals", blurb: "A message reaches the subject faster than any courier.", readout: "Courier standing by" },
  { id: "games", title: "Other memories", label: "Games", place: "The Animus library", blurb: "Load a different game and the whole portfolio follows.", readout: `${games.length} simulations installed` },
]

export const sequenceIds = ["menu", ...sequences.map((s) => s.id)] as const

export type View = SequenceId | "menu"

export const sequenceNumber = (id: SequenceId) => String(sequences.findIndex((s) => s.id === id) + 1).padStart(2, "0")
