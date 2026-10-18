export type ThemeId = "rdr2" | "valorant"

export type Game = {
  id: string
  title: string
  studio: string
  cover: string
  theme?: ThemeId
}

export const games: Game[] = [
  { id: "rdr2", title: "Red Dead Redemption 2", studio: "Rockstar Games", cover: "/images/games/rdr2.jpg", theme: "rdr2" },
  { id: "valorant", title: "Valorant", studio: "Riot Games", cover: "/images/games/valorant.jpg", theme: "valorant" },
  { id: "god-of-war", title: "God of War", studio: "Santa Monica Studio", cover: "/images/games/god-of-war.jpg" },
  { id: "ghost-of-tsushima", title: "Ghost of Tsushima", studio: "Sucker Punch", cover: "/images/games/ghost-of-tsushima.jpg" },
  { id: "assassins-creed", title: "Assassin's Creed", studio: "Ubisoft", cover: "/images/games/assassins-creed.jpg" },
]

export const defaultTheme: ThemeId = "rdr2"
