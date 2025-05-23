"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, User, Code, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

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
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/#blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-zinc-900/80 backdrop-blur-md shadow-sm text-white" 
            : "bg-zinc-900/30 backdrop-blur-sm text-white"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            <span className="text-primary">Shreyash</span> Srivastava
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" className="ml-2 bg-white text-black hover:bg-gray-100 border-gray-200">
              <Link href="/Shreyash_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Resume
              </Link>
            </Button>
            <ModeToggle />
          </nav>

          <div className="md:hidden">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <nav className="bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="flex items-center justify-around h-16">
            {mobileNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center w-full h-full space-y-1 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  target={item.target}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
