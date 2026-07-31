import { ArrowLeft, Clock, Construction } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface UnderConstructionProps {
  title?: string
  description?: string
  expectedCompletion?: string
  progress?: number
  backLink?: string
  backLinkText?: string
  showProgress?: boolean
}

export default function UnderConstruction({
  title = "Under Construction",
  description = "This page is currently being built and will be available soon.",
  expectedCompletion = "Coming Soon",
  progress = 25,
  backLink = "/",
  backLinkText = "Back to Home",
  showProgress = true,
}: UnderConstructionProps) {
  return (
    <div className="valorant-shell flex min-h-screen items-center justify-center px-4 py-24">
      <div className="tactical-card w-full max-w-xl p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-primary/45 bg-primary/10 text-primary shadow-[0_0_28px_hsl(var(--primary)/0.2)]">
          <Construction className="h-10 w-10 animate-pulse" />
        </div>

        <div className="mt-8">
          <div className="section-kicker justify-center">Build Queue</div>
          <h1 className="valorant-heading text-4xl text-foreground sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="mx-auto mt-8 flex w-fit items-center justify-center gap-2 border border-border bg-background/45 px-4 py-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>Expected completion: {expectedCompletion}</span>
        </div>

        {showProgress && (
          <div className="mt-8 space-y-3 text-left">
            <div className="flex justify-between font-display text-xs font-bold uppercase text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full border border-border bg-background/60">
              <div
                className="h-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.55)] transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href={backLink}>
              <ArrowLeft className="h-4 w-4" />
              {backLinkText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
