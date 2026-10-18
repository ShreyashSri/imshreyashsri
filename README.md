# imshreyashsri

Portfolio of Shreyash Srivastava. Pick a game under **Games** and the whole site restyles itself as that game.

| Theme | Built around |
| --- | --- |
| Red Dead Redemption 2 (default) | Main menu, pause menu, journal, posters, the Saint Denis Times |
| Valorant | The game client: match history, skins, agent select, battlepass, practice range |
| God of War | Yggdrasil realm travel, rune decoding, skill tree, enchantment amulet |
| Ghost of Tsushima | Ink and guiding wind, haiku composing, stances, standoff |
| Assassin's Creed II | Animus void, DNA helix menu, glyph puzzles, Eagle Vision |

## Run

```bash
npm install
npm run dev
```

## Structure

```
app/                         Entry, global CSS, fonts
components/
  theme-root.tsx             Loads and switches the active theme
  games/                     Game picker used by every theme
  music/                     Background music player
  shared/                    Hooks and helpers shared by themes
  themes/<theme>/            One folder per theme
data/                        Resume, projects, articles, games
public/
  images/                    Profile, projects, articles, game covers
  icons/                     Tab icon per theme
  themes/<theme>/            Theme-only images
  resume/                    Resume PDF
scripts/                     RDR2 image preparation
```

## Adding a theme

1. Build it in `components/themes/<theme>/`, reading content from `data/`.
2. Put its images in `public/themes/<theme>/` and its tab icon in `public/icons/<theme>.svg`.
3. Add a `music.ts` playlist of official soundtrack uploads on YouTube.
4. Add the game to `data/games.ts`, register it in `components/theme-root.tsx` and give it a tone in `components/games/game-picker.tsx`.

## Music

Each theme plays a short playlist from its game's soundtrack. No audio is hosted here. Tracks stream through the official YouTube player from the composers' and labels' own channels. The player stays visible while music is on, as YouTube's terms require, and nothing loads until a visitor turns music on.

## Credits

Game names, art, music and typefaces belong to their owners: Rockstar Games, Riot Games, Santa Monica Studio, Sucker Punch Productions and Ubisoft. This is a fan tribute and is not affiliated with any of them.
