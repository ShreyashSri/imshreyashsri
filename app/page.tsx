import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, ExternalLink, Mail, ArrowRight, Code, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedText from "@/components/animated-text"
import { Metadata } from "next"
import { projects } from "@/data/projects"
import { blogPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Shreyash Srivastava - Portfolio",
  description: "Computer Science Engineering student at Dayananda Sagar College of Engineering, Bangalore",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mountain-landscape.jpeg"
            alt="Mountain landscape background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <AnimatedText />
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-300/90">
            Currently pursuing Bachelors of Engineering in Computer Science from Dayananda Sagar College of Engineering, Bangalore
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="default" size="lg">
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
            <div className="mt-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src="/images/shrey.jpeg"
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 text-left">
                <p className="text-lg leading-relaxed">
                  Hello! I'm a Computer Science Engineering student at Dayananda Sagar College of Engineering, Bangalore
                  with a passion for web development and open source contributions.
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  I enjoy building applications that solve real-world problems and contributing to open source projects.
                  When I'm not coding, you can find me participating in hackathons or improving my competitive
                  programming skills.
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <p className="text-sm">
                    <span className="font-medium">Bachelor of Engineering in Computer Science</span> - Dayananda Sagar
                    College of Engineering, Bangalore (2024 - Present)
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Intermediate</span> - Lucknow Public School, Lucknow (2023 - 2024)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">My Skills</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" /> Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Python</Badge>
                  <Badge>Golang</Badge>
                  <Badge>TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" /> Frameworks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Gin</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>Flask</Badge>
                  <Badge>Django</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" /> Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Git</Badge>
                  <Badge>CI/CD</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>Docker</Badge>
                  <Badge>Monitoring Tools</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" /> Competitive Programming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>CodeChef</span>
                    <Badge variant="outline">2★ (1415)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CodeForces</span>
                    <Badge variant="outline">Newbie (940)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>LeetCode</span>
                    <Badge variant="outline">1441</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-background py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Experience</h2>
          <div className="mx-auto max-w-4xl space-y-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">Backend Developer</CardTitle>
                    <CardDescription className="text-base text-primary">Seeqlo (Remote)</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">Aug 2025 – Feb 2026</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Integrated Stripe for secure payments and implemented a token-based credit system to control user access and resource consumption.</li>
                  <li>Migrated a legacy backend from Express.js to Go (Gin) to enhance performance, and refactored a monolithic codebase into modular components to improve maintainability.</li>
                  <li>Built a community administration interface enabling admins to monitor user activity and manage platform content.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Go</Badge>
                  <Badge variant="secondary">Gin</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                  <Badge variant="secondary">Stripe</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">Backend Developer</CardTitle>
                    <CardDescription className="text-base text-primary">Ignito Co. (Remote)</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">July 2025 – Aug 2025</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Built an inventory management system using Next.js and Supabase to ingest and process large Excel datasets, optimizing the pipeline to reduce processing time from 7 minutes to 16 seconds.</li>
                  <li>Engineered a full-stack application using Go (Gin) and MongoDB to manage the end-to-end lifecycle of purchase orders, bills, and inventory tracking via scalable RESTful APIs.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Go</Badge>
                  <Badge variant="secondary">Gin</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Supabase</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">My Projects</h2>
            <Button asChild variant="outline">
              <Link href="https://github.com/ShreyashSri?tab=repositories" target="_blank" rel="noopener noreferrer">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=400&width=600"}
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
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
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
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="bg-background py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Open Source Contributions</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Debian - Salsa CI</CardTitle>
                <CardDescription>Contributor</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Migrated the base-image build pipeline to use mmdebstrap and buildah, resolving rate-limiting errors.</li>
                  <li>Added CI test case for the Debian Trixie release to validate build compatibility.</li>
                  <li>Added instructions to run Salsa CI locally.</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://salsa.debian.org/salsa-ci-team/pipeline" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>OpenTelemetry Operator</CardTitle>
                <CardDescription>Contributor</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Implemented automated Markdown link validation using Linkspector with GitHub Actions.</li>
                  <li>Deprecated the volumeSizeLimit field across instrumentations and added a validating webhook.</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://github.com/open-telemetry/opentelemetry-operator" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>PointBlank</CardTitle>
                <CardDescription>Member & Contributor (Dec 2024 - Present)</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Integrated Swagger documentation and resolved Cloudinary issues.</li>
                  <li>Implemented Mailu mail server for emails.</li>
                  <li>Implemented monitoring stack using Prometheus and Grafana.</li>
                  <li>Migrated staging to Kubernetes and automated deployments via ArgoCD Apps of Apps.</li>
                  <li>Added Dev container support to the website.</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://github.com/pointblank-club" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>KWoC Backend</CardTitle>
                <CardDescription>Backend & Observability Contributor</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Added a production-grade observability stack using Prometheus, Grafana, Node Exporter, and Alertmanager.</li>
                  <li>Implemented automated alerts for server downtime and resource threshold breaches.</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://github.com/kossiitkgp/KWoC-Backend" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>mwoffliner</CardTitle>
                <CardDescription>Contributor</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Implemented CI checks for translations to ensure robustness.</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="https://github.com/openzim/mwoffliner" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Achievements</h2>
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Award className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Won Xythera CTF</p>
                      <p className="text-sm text-muted-foreground">AWS Student Builder Group</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Won Unique Idea award at Hack-Nocturne ’26</p>
                      <p className="text-sm text-muted-foreground">SMVIT – March 2026</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Recipient of the LiFT Scholarship</p>
                      <p className="text-sm text-muted-foreground">The Linux Foundation – June 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Won Coding Relay</p>
                      <p className="text-sm text-muted-foreground">
                        Dayananda Sagar College of Engineering – March 2025
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Ranked Top 9 out of 63 teams in HackOasis V2 Hackathon</p>
                      <p className="text-sm text-muted-foreground">November 2024</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="mr-3 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Member, PointBlank</p>
                      <p className="text-sm text-muted-foreground">
                        A community focused on developing industry-ready engineers and well-rounded individuals (Dec
                        2024 - Present)
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Articles</h2>
            <Button asChild variant="outline">
              <Link href="https://dev.to/shreyashsri" target="_blank" rel="noopener noreferrer">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href={post.url} target="_blank" rel="noopener noreferrer">
                      Read Article <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Profiles Section */}
      <section id="profiles" className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Connect With Me</h2>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            <Link
              href="https://github.com/ShreyashSri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <Github className="h-12 w-12 mb-4" />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/shreyashsri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <Linkedin className="h-12 w-12 mb-4" />
              <span className="font-medium">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com/imshreyashsri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <Twitter className="h-12 w-12 mb-4" />
              <span className="font-medium">Twitter</span>
            </Link>
            <Link
              href="https://medium.com/@ShreyashSri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center">
                <svg viewBox="0 0 1043.63 592.71" className="h-12 w-12" fill="currentColor">
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                </svg>
              </div>
              <span className="font-medium">Medium</span>
            </Link>
            <Link
              href="mailto:shreyash.sri09@gmail.com"
              className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <Mail className="h-12 w-12 mb-4" />
              <span className="font-medium">Email</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Get In Touch</h2>
            <form className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="min-h-32 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Your message"
                  required
                />
              </div>
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Shreyash Srivastava. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/ShreyashSri" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/shreyashsri" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://twitter.com/imshreyashsri" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
