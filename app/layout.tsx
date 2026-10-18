import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import {
  Anton,
  Arvo,
  Barlow,
  Barlow_Condensed,
  Bebas_Neue,
  Cinzel,
  EB_Garamond,
  Exo_2,
  Inter,
  Marcellus,
  Noto_Sans_Runic,
  Open_Sans,
  Rajdhani,
  Shippori_Mincho,
  Special_Elite,
  UnifrakturMaguntia,
  Yuji_Syuku,
} from "next/font/google"
import "./globals.css"

const redemption = localFont({ src: "./fonts/rdr2/redemption.woff2", variable: "--face-redemption", display: "block" })
const chineseRocks = localFont({ src: "./fonts/rdr2/chinese-rocks.woff2", variable: "--face-rocks", display: "block" })
const kirsty = localFont({
  src: [
    { path: "./fonts/rdr2/kirsty.woff2", weight: "400" },
    { path: "./fonts/rdr2/kirsty-bold.woff2", weight: "700" },
  ],
  variable: "--face-kirsty",
  display: "swap",
})
const hand = localFont({ src: "./fonts/rdr2/arthur-hand.woff2", variable: "--face-hand", display: "swap" })
const arvo = Arvo({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--face-arvo", display: "swap" })
const openSans = Open_Sans({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--face-open-sans", display: "swap" })
const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--face-type", display: "swap" })
const blackletter = UnifrakturMaguntia({ weight: "400", subsets: ["latin"], variable: "--face-blackletter", display: "swap" })

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--face-bebas", display: "swap" })
const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--face-rajdhani", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--face-inter", display: "swap" })

const anton = Anton({ weight: "400", variable: "--face-anton", display: "swap", preload: false })
const barlow = Barlow({ weight: ["400", "500", "600", "700"], variable: "--face-barlow", display: "swap", preload: false })
const barlowCondensed = Barlow_Condensed({ weight: ["500", "600", "700"], variable: "--face-barlow-condensed", display: "swap", preload: false })
const cinzel = Cinzel({ weight: ["400", "600", "700", "900"], variable: "--face-cinzel", display: "swap", preload: false })
const garamond = EB_Garamond({ weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--face-garamond", display: "swap", preload: false })
const runic = Noto_Sans_Runic({ weight: "400", variable: "--face-runic", display: "swap", preload: false })
const mincho = Shippori_Mincho({ weight: ["400", "500", "700", "800"], variable: "--face-mincho", display: "swap", preload: false })
const brush = Yuji_Syuku({ weight: "400", variable: "--face-brush", display: "swap", preload: false })
const marcellus = Marcellus({ weight: "400", variable: "--face-marcellus", display: "swap", preload: false })
const exo = Exo_2({ weight: ["300", "400", "500", "600", "700"], variable: "--face-exo", display: "swap", preload: false })

const fonts = [
  redemption,
  chineseRocks,
  kirsty,
  hand,
  arvo,
  openSans,
  typewriter,
  blackletter,
  bebas,
  rajdhani,
  inter,
  anton,
  barlow,
  barlowCondensed,
  cinzel,
  garamond,
  runic,
  mincho,
  brush,
  marcellus,
  exo,
]

export const metadata: Metadata = {
  title: "Shreyash Srivastava",
  description: "Backend engineer in Bangalore. Projects, jobs and open source, themed after the games I love.",
}

export const viewport: Viewport = {
  themeColor: "#0b0a09",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts.map((f) => f.variable).join(" ")}>
      <body>{children}</body>
    </html>
  )
}
