import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="container py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Technical articles, tutorials, and thoughts on software development and technology.
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Card key={post.title} className="flex overflow-hidden md:flex-row">
              <div className="relative h-60 w-full md:h-auto md:w-1/3">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col md:w-2/3">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link href={post.url} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample data - replace with your actual blog posts from dev.to
const blogPosts = [
  {
    title: "How to Build a RESTful API with Node.js and Express",
    excerpt:
      "Learn how to create a robust RESTful API using Node.js and Express framework with proper error handling and validation. This comprehensive guide covers everything from setting up your project to deploying your API to production.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2025",
    url: "https://dev.to/yourusername/how-to-build-a-restful-api-with-nodejs-and-express",
  },
  {
    title: "Understanding React Hooks: A Comprehensive Guide",
    excerpt:
      "Dive deep into React Hooks and learn how to use useState, useEffect, useContext, and custom hooks effectively in your applications. This article explains the concepts with practical examples and best practices.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 22, 2025",
    url: "https://dev.to/yourusername/understanding-react-hooks-a-comprehensive-guide",
  },
  {
    title: "Getting Started with TypeScript in 2025",
    excerpt:
      "A beginner-friendly introduction to TypeScript, covering basic types, interfaces, and how to set up a new project with TypeScript. Learn how TypeScript can improve your development workflow and catch errors before runtime.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2025",
    url: "https://dev.to/yourusername/getting-started-with-typescript-in-2025",
  },
  {
    title: "Building Accessible Web Applications: A Developer's Guide",
    excerpt:
      "Learn how to make your web applications accessible to all users, including those with disabilities. This guide covers ARIA attributes, keyboard navigation, color contrast, and testing tools to ensure your applications meet accessibility standards.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 5, 2025",
    url: "https://dev.to/yourusername/building-accessible-web-applications-a-developers-guide",
  },
  {
    title: "Optimizing React Performance: Tips and Tricks",
    excerpt:
      "Discover practical techniques to improve the performance of your React applications. This article covers memoization, code splitting, virtualization, and other optimization strategies to make your React apps faster and more efficient.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 18, 2025",
    url: "https://dev.to/yourusername/optimizing-react-performance-tips-and-tricks",
  },
]
