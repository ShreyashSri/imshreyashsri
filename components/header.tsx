"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Code, Crosshair, FileText, Home, Mail, User } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/#projects", label: "Projects", icon: Code },
    { href: "/#about", label: "About", icon: User },
    { href: "/#contact", label: "Contact", icon: Mail },
    { href: "/Shreyash_Resume.pdf", label: "Resume", icon: FileText, target: "_blank" },
  ]

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Loadout" },
    { href: "/#projects", label: "Missions" },
    { href: "/#blog", label: "Intel" },
    { href: "/#contact", label: "Comms" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-primary/30 bg-background/90 shadow-[0_0_32px_hsl(var(--primary)/0.12)] backdrop-blur-xl"
            : "border-foreground/10 bg-background/40 backdrop-blur-md"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-primary bg-primary/15 text-primary shadow-[0_0_18px_hsl(var(--primary)/0.24)]">
              <Crosshair className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-black uppercase text-foreground">
              Shreyash<span className="text-primary">.SR</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/")

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 font-display text-sm font-bold uppercase transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Button asChild variant="outline" size="sm" className="ml-2">
              <Link href="/Shreyash_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" /> Resume
              </Link>
            </Button>
            <ModeToggle />
          </nav>

          <div className="md:hidden">
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <nav className="border-t border-primary/25 bg-background/95 shadow-[0_-16px_40px_hsl(var(--background)/0.55)] backdrop-blur-xl">
          <div className="grid h-16 grid-cols-5">
            {mobileNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href === "/" && pathname === "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-full flex-col items-center justify-center gap-1 font-display text-xs font-bold uppercase transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  target={item.target}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
