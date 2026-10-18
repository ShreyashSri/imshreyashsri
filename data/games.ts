export type ThemeId = "rdr2" | "valorant" | "god-of-war" | "ghost-of-tsushima" | "assassins-creed"

export type Game = {
  id: ThemeId
  title: string
  studio: string
  cover: string
}

export const games: Game[] = [
  { id: "rdr2", title: "Red Dead Redemption 2", studio: "Rockstar Games", cover: "/images/games/rdr2.jpg" },
  { id: "valorant", title: "Valorant", studio: "Riot Games", cover: "/images/games/valorant.jpg" },
  { id: "god-of-war", title: "God of War", studio: "Santa Monica Studio", cover: "/images/games/god-of-war.jpg" },
  { id: "ghost-of-tsushima", title: "Ghost of Tsushima", studio: "Sucker Punch", cover: "/images/games/ghost-of-tsushima.jpg" },
  { id: "assassins-creed", title: "Assassin's Creed II", studio: "Ubisoft", cover: "/images/games/assassins-creed.jpg" },
]

export const defaultTheme: ThemeId = "rdr2"

export const isThemeId = (value: unknown): value is ThemeId => games.some((g) => g.id === value)
