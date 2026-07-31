import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github, Radio } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="valorant-shell min-h-screen pt-24 pb-28">
      <section className="container">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="section-kicker">Mission Archive</div>
            <h1 className="valorant-heading text-5xl text-foreground sm:text-6xl">Project Deployments</h1>
          </div>
          <div className="tactical-panel p-5">
            <p className="text-sm leading-7 text-muted-foreground">
              A field log of shipped systems, experiments, dashboards, and open-source builds across backend
              engineering, product surfaces, cryptography, finance, and student opportunity platforms.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const demoIsExternal = project.demo.startsWith("http")

            return (
              <Card key={project.title} className="flex h-full flex-col">
                <div className="relative h-64 overflow-hidden border-b border-border">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 bg-primary px-3 py-1 font-display text-xs font-black uppercase text-primary-foreground">
                    Mission {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <CardHeader>
                  <CardDescription>{project.description}</CardDescription>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-5 text-sm leading-7 text-muted-foreground">{project.longDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex flex-wrap justify-between gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.demo}
                      target={demoIsExternal ? "_blank" : undefined}
                      rel={demoIsExternal ? "noopener noreferrer" : undefined}
                    >
                      Live Demo <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> Source
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Radio className="h-4 w-4 text-primary" />
            <span>Repository list stays synced through GitHub.</span>
          </div>
          <Button asChild>
            <Link href="https://github.com/ShreyashSri?tab=repositories" target="_blank" rel="noopener noreferrer">
              View GitHub <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
