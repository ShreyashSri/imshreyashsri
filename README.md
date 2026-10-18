# imshreyashsri

Personal portfolio of Shreyash Srivastava. Visitors pick a game under **Games** and the whole site switches to that game's theme.

| Theme | Status |
| --- | --- |
| Red Dead Redemption 2 | Ready (default) |
| Valorant | Ready |
| God of War, Ghost of Tsushima, Assassin's Creed | Coming soon |

## Run

```bash
npm install
npm run dev
```

## Layout

```
app/                    Next.js entry, global CSS, fonts per theme
components/
  theme-root.tsx        Picks and switches the active theme
  games/                Game picker shared by every theme
  sound/                Web Audio engine; each theme passes its own sound kit
  themes/rdr2/          Red Dead Redemption 2 theme
  themes/valorant/      Valorant theme
data/
  resume.ts             Profile, jobs, skills, awards (mirrors the resume PDF)
  projects.ts           Projects
  blog-posts.ts         Articles
  games.ts              Games list and which ones have a theme
  rdr2/                 RDR2-only data (in-game locations)
public/
  images/               Shared images: profile, projects, blog, game covers
  resume/               Resume PDF
  icons/                Tab icon per theme
  themes/<theme>/       Theme-only assets (backdrops, textures)
scripts/                Asset tooling (RDR2 backdrops and paper textures)
```

## Adding a theme

1. Build it under `components/themes/<name>/`, reading content from `data/`.
2. Put its assets in `public/themes/<name>/`.
3. Give it a sound kit (`components/themes/<name>/sounds.ts`) and a tab icon (`public/icons/<name>.svg`).
4. Add the id to `ThemeId` in `data/games.ts`, set `theme` on the game, and render it in `components/theme-root.tsx`.

## Credits

RDR2 and Valorant names, art and the Redemption typeface belong to Rockstar Games and Riot Games. This is a fan tribute and is not affiliated with either.
