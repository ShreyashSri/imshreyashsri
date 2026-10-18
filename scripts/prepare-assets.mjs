#!/usr/bin/env node
// Usage: node scripts/prepare-assets.mjs <dir with paper/ scans and official/ RDR2 screenshots>

import { mkdirSync } from "node:fs"
import { join, resolve } from "node:path"
import sharp from "sharp"

const src = resolve(process.argv[2] ?? "")
const pub = resolve(import.meta.dirname, "..", "public")

async function paper() {
  const out = join(pub, "themes", "rdr2", "textures")
  mkdirSync(out, { recursive: true })
  const SIZE = 1400
  const shade = async (file, floor) => {
    const { data } = await sharp(join(src, "paper", file)).resize(SIZE, SIZE).greyscale().normalise().raw().toBuffer({ resolveWithObject: true })
    return Float32Array.from(data, (v) => floor + (1 - floor) * (v / 255))
  }
  const grain = await shade("Paper001_2K-JPG_Color.jpg", 0.91)
  const creases = await shade("Paper003_2K-JPG_Color.jpg", 0.93)
  const base = { r: 252, g: 241, b: 210 }
  const px = Buffer.alloc(SIZE * SIZE * 3)
  for (let i = 0; i < SIZE * SIZE; i++) {
    const k = grain[i] * creases[i]
    px[i * 3] = base.r * k
    px[i * 3 + 1] = base.g * k
    px[i * 3 + 2] = base.b * k
  }
  await sharp(px, { raw: { width: SIZE, height: SIZE, channels: 3 } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(out, "journal.jpg"))
  console.log("texture → public/themes/rdr2/textures/journal.jpg")
}

const screens = {
  "title-night": "RDR2_PC_21-4200-1080.jpg",
  "oak-riders": "RDR2_PC_22-4201-1080.jpg",
  "misty-oak": "RDR2_PC_10-4169-1080.jpg",
  "trestle": "RDR2_PC_24-4203-1080.jpg",
  "wagon-fog": "RDR2_PC_25-4204-1080.jpg",
  "canyon": "RDR2_PC_12-4172-1080.jpg",
  "night-lake": "RDR2_PC_04-4143-1080.jpg",
  "golden-field": "RDR2_PC_01-4140-1080.jpg",
  "swamp": "RDR2_PC_14-4191-1080.jpg",
  "snow-camp": "RDR2_PC_26-4205-1080.jpg",
}

async function backgrounds() {
  const out = join(pub, "themes", "rdr2", "backdrops")
  mkdirSync(out, { recursive: true })
  for (const [name, file] of Object.entries(screens)) {
    await sharp(join(src, "official", file))
      .extract({ left: 0, top: 0, width: 1660, height: 934 })
      .resize(1920, 1080)
      .webp({ quality: 80 })
      .toFile(join(out, `${name}.webp`))
  }
  console.log(`backgrounds → public/themes/rdr2/backdrops (${Object.keys(screens).length})`)
}

await paper()
await backgrounds()
