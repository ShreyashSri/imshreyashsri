import type { Realm, RealmId } from "../realms"
import { About } from "./about"
import { Awards } from "./awards"
import { Contact } from "./contact"
import { Experience } from "./experience"
import { Favors } from "./favors"
import { Games } from "./games"
import { Projects } from "./projects"
import { Skills } from "./skills"
import { Writing } from "./writing"

export type PageProps = { realm: Realm }

export const pages: Record<RealmId, (props: PageProps) => React.ReactNode> = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  writing: Writing,
  "open-source": Favors,
  awards: Awards,
  contact: Contact,
  games: Games,
}
