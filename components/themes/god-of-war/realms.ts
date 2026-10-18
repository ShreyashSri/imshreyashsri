export type RealmId = "about" | "experience" | "projects" | "skills" | "writing" | "open-source" | "awards" | "contact" | "games"

export type Mood = "motes" | "embers" | "snow" | "sparks" | "spores" | "frost" | "mist"

export type Realm = {
  id: RealmId
  realm: string
  title: string
  codex: string
  rune: string
  accent: string
  mood: Mood
  blurb: string
  vista: string
}

export const realms: Realm[] = [
  { id: "about", realm: "Midgard", title: "About", codex: "Journal", rune: "ᛗ", accent: "#7fc8b4", mood: "motes", blurb: "Who I am, where I studied and the numbers so far.", vista: "serpent" },
  { id: "experience", realm: "Jötunheim", title: "Experience", codex: "Shrines", rune: "ᛃ", accent: "#d9a05b", mood: "motes", blurb: "Every internship, carved into the giants' shrines.", vista: "statues" },
  { id: "projects", realm: "Svartalfheim", title: "Projects", codex: "Enchantments", rune: "ᚷ", accent: "#5fb3c9", mood: "sparks", blurb: "Projects forged and socketed, with demos and source.", vista: "cabin" },
  { id: "skills", realm: "Asgard", title: "Skills", codex: "Skill Tree", rune: "ᚨ", accent: "#e9c46a", mood: "sparks", blurb: "Languages, frameworks, data and infrastructure, unlocked.", vista: "hunt" },
  { id: "writing", realm: "Alfheim", title: "Writing", codex: "Lore", rune: "ᛚ", accent: "#f2d98a", mood: "motes", blurb: "Articles on Medium, lessons from the field.", vista: "grove" },
  { id: "open-source", realm: "Vanaheim", title: "Open source", codex: "Favors", rune: "ᚹ", accent: "#8fcf6a", mood: "spores", blurb: "Favors done for open-source projects.", vista: "forest" },
  { id: "awards", realm: "Muspelheim", title: "Awards", codex: "Trials", rune: "ᛉ", accent: "#f08a3c", mood: "embers", blurb: "Certifications, hackathons and contests won.", vista: "troll" },
  { id: "contact", realm: "Helheim", title: "Contact", codex: "Raven", rune: "ᚱ", accent: "#9fc4e8", mood: "frost", blurb: "Send a raven. Every message reaches me.", vista: "snow" },
  { id: "games", realm: "Niflheim", title: "Games", codex: "Realms", rune: "ᚾ", accent: "#a8b8d8", mood: "mist", blurb: "Travel to another world. The whole portfolio changes.", vista: "woods" },
]

export const vistaUrl = (name: string) => `/themes/god-of-war/vistas/${name}.webp`

export const realmIds = realms.map((r) => r.id)

export const realmOf = (id: RealmId) => realms.find((r) => r.id === id) ?? realms[0]
