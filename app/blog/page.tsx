import Link from "next/link"
import Image from "next/image"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPage() {
  return (
    <div className="valorant-shell min-h-screen pt-24 pb-28">
      <section className="container">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <div className="section-kicker">Intel Archive</div>
            <h1 className="valorant-heading text-5xl text-foreground sm:text-6xl">Technical Notes</h1>
          </div>
          <div className="tactical-panel p-5">
            <p className="text-sm leading-7 text-muted-foreground">
              Field reports on APIs, open-source programs, documentation, and the engineering lessons that survive
              beyond a single project.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <Card key={post.title} className="grid overflow-hidden lg:grid-cols-[320px_1fr]">
              <div className="relative min-h-64 border-b border-border lg:border-b-0 lg:border-r">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute left-4 top-4 bg-primary px-3 py-1 font-display text-xs font-black uppercase text-primary-foreground">
                  Intel {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-3xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Newspaper className="h-4 w-4 text-secondary" />
                    <span>External article</span>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={post.url} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
