import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/data/blog-posts"

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
