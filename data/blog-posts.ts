export interface BlogPost {
  title: string
  excerpt: string
  image: string
  date: string
  url: string
}

export const blogPosts: BlogPost[] = [
  {
    title: "Swagger: What's That?",
    excerpt: "Learn about Swagger documentation and its importance in API development.",
    image: "/images/swagger.webp",
    date: "March 18, 2025",
    url: "https://medium.com/@ShreyashSri/swagger-whats-that-2377ba6d8e17",
  },
  {
    title: "My Experience Participating in KWoC",
    excerpt: "A reflection on my journey participating in Kharagpur Winter of Code.",
    image: "/images/kwoc.webp",
    date: "January 18, 2025",
    url: "https://medium.com/@ShreyashSri/my-experience-participating-in-kwoc-b87d197d4728",
  },
] 