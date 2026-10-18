import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Arvo, Bebas_Neue, Inter, Open_Sans, Rajdhani, Special_Elite, UnifrakturMaguntia } from "next/font/google"
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

const fonts = [redemption, chineseRocks, kirsty, hand, arvo, openSans, typewriter, blackletter, bebas, rajdhani, inter]

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
