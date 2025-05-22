import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
  return (
    <div className="container py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Projects</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of projects I've worked on, from web applications to open source contributions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="flex h-full flex-col overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{project.longDescription}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample data - replace with your actual projects
const projects = [
  {
    title: "Project One",
    description: "A web application for tracking personal finances",
    longDescription:
      "This project helps users track their income and expenses, create budgets, and visualize their spending habits through interactive charts and reports. Built with a focus on user experience and data security.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    demo: "https://project-demo.com",
    github: "https://github.com/yourusername/project-one",
  },
  {
    title: "Project Two",
    description: "An e-commerce platform with payment integration",
    longDescription:
      "A full-featured e-commerce solution with product catalog, shopping cart, user authentication, and secure payment processing. Includes admin dashboard for inventory management and order tracking.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
    demo: "https://project-demo.com",
    github: "https://github.com/yourusername/project-two",
  },
  {
    title: "Project Three",
    description: "A real-time chat application with video calls",
    longDescription:
      "This application enables users to communicate through text messages and video calls in real-time. Features include user authentication, message encryption, and screen sharing capabilities.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Socket.io", "WebRTC", "Firebase"],
    demo: "https://project-demo.com",
    github: "https://github.com/yourusername/project-three",
  },
  {
    title: "Project Four",
    description: "A content management system for blogs",
    longDescription:
      "A modern CMS built for bloggers with a rich text editor, image uploads, SEO optimization tools, and analytics dashboard. Supports multiple authors and content scheduling.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Vue.js", "Express", "MySQL", "AWS S3"],
    demo: "https://project-demo.com",
    github: "https://github.com/yourusername/project-four",
  },
]
