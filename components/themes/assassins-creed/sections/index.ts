import type { ComponentType } from "react"

import type { SequenceId } from "../sequences"
import { ArsenalSection } from "./arsenal"
import { CodexSection } from "./codex"
import { ContactSection } from "./contact"
import { GamesSection } from "./games"
import { GlyphsSection } from "./glyphs"
import { HonoursSection } from "./honours"
import { LettersSection } from "./letters"
import { MemoriesSection } from "./memories"
import { SubjectSection } from "./subject"

export const sectionContent: Record<SequenceId, ComponentType> = {
  subject: SubjectSection,
  memories: MemoriesSection,
  codex: CodexSection,
  arsenal: ArsenalSection,
  glyphs: GlyphsSection,
  honours: HonoursSection,
  letters: LettersSection,
  contact: ContactSection,
  games: GamesSection,
}
