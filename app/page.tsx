import Link from "next/link"
import Image from "next/image"
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Code,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Radio,
  Send,
  Shield,
  Terminal,
  Trophy,
  Twitter,
  Zap,
} from "lucide-react"
import { Metadata } from "next"

import AnimatedText from "@/components/animated-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/data/blog-posts"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
  title: "Shreyash Srivastava - Tactical Portfolio",
  description: "Backend engineering, open source, and project portfolio for Shreyash Srivastava.",
}

const stats = [
  { label: "Active Projects", value: "06" },
  { label: "Open Source Fronts", value: "05" },
  { label: "CodeChef Rating", value: "1415" },
  { label: "LeetCode Rating", value: "1441" },
]

const skillGroups = [
  {
    title: "Languages",
    icon: Code,
    signal: "Core stack",
    items: ["Python", "Golang", "TypeScript"],
  },
  {
    title: "Frameworks",
    icon: Cpu,
    signal: "App layer",
    items: ["Gin", "Next.js", "Flask", "Django"],
  },
  {
    title: "Systems",
    icon: Database,
    signal: "Runtime kit",
    items: ["PostgreSQL", "MongoDB", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
  },
  {
    title: "Competitive",
    icon: Trophy,
    signal: "Rank board",
    items: ["CodeChef 2 Star", "CodeForces Newbie", "LeetCode 1441"],
  },
]

const experience = [
  {
    role: "Backend Developer",
    company: "Seeqlo",
    place: "Remote",
    period: "Aug 2025 - Feb 2026",
    points: [
      "Integrated Stripe payments and a token-based credit system for controlled platform access.",
      "Migrated a legacy Express.js backend to Go with Gin and split a monolith into maintainable modules.",
      "Built a community administration interface for user activity and content management.",
    ],
    stack: ["Go", "Gin", "Firebase", "Stripe"],
  },
  {
    role: "Backend Developer",
    company: "Ignito Co.",
    place: "Remote",
    period: "July 2025 - Aug 2025",
    points: [
      "Built an inventory system with Next.js and Supabase for large Excel data ingestion.",
      "Reduced processing time from 7 minutes to 16 seconds through pipeline optimization.",
      "Engineered Go and MongoDB APIs for purchase orders, bills, and inventory tracking.",
    ],
    stack: ["Go", "Gin", "Next.js", "MongoDB", "Supabase"],
  },
]

const contributions = [
  {
    title: "Debian - Salsa CI",
    role: "Contributor",
    href: "https://salsa.debian.org/salsa-ci-team/pipeline",
    points: ["Moved base-image builds to mmdebstrap and buildah.", "Added Debian Trixie CI coverage."],
  },
  {
    title: "OpenTelemetry Operator",
    role: "Contributor",
    href: "https://github.com/open-telemetry/opentelemetry-operator",
    points: ["Added Markdown link validation through Linkspector.", "Deprecated volumeSizeLimit with webhook validation."],
  },
  {
    title: "PointBlank",
    role: "Member & Contributor",
    href: "https://github.com/pointblank-club",
    points: ["Shipped Swagger docs, Mailu, monitoring, Kubernetes staging, and ArgoCD flows."],
  },
  {
    title: "KWoC Backend",
    role: "Backend & Observability",
    href: "https://github.com/kossiitkgp/KWoC-Backend",
    points: ["Added Prometheus, Grafana, Node Exporter, Alertmanager, and uptime alerts."],
  },
  {
    title: "mwoffliner",
    role: "Contributor",
    href: "https://github.com/openzim/mwoffliner",
    points: ["Implemented CI checks for translations to improve release robustness."],
  },
]

const achievements = [
  { title: "Won Xythera CTF", context: "AWS Student Builder Group", icon: Shield },
  { title: "Won Unique Idea award at Hack-Nocturne '26", context: "SMVIT - March 2026", icon: Award },
  { title: "Recipient of the LiFT Scholarship", context: "The Linux Foundation - June 2025", icon: Trophy },
  { title: "Won Coding Relay", context: "Dayananda Sagar College of Engineering - March 2025", icon: Zap },
  { title: "Top 9 out of 63 teams in HackOasis V2", context: "November 2024", icon: Activity },
  { title: "Member, PointBlank", context: "Industry-ready engineering community since Dec 2024", icon: BookOpen },
]

const socials = [
  { label: "GitHub", href: "https://github.com/ShreyashSri", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/shreyashsri", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/imshreyashsri", icon: Twitter },
  { label: "Medium", href: "https://medium.com/@ShreyashSri", icon: BookOpen },
  { label: "Email", href: "mailto:shreyash.sri09@gmail.com", icon: Mail },
]

export default function Home() {
  return (
    <div className="valorant-shell flex min-h-screen flex-col">
      <section className="relative overflow-hidden border-b border-primary/20 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mountain-landscape.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.18] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/60" />
          <div className="tactical-grid absolute inset-0 opacity-30" />
        </div>

        <div className="container relative z-10 grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 pb-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="section-kicker">Bangalore / Computer Science / Backend</div>
            <h1 className="valorant-heading max-w-4xl text-5xl text-foreground sm:text-6xl lg:text-8xl">
              Shreyash
              <span className="block text-primary">Srivastava</span>
            </h1>
            <div className="mt-6">
              <AnimatedText />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Computer Science Engineering student building fast backend systems, open-source infrastructure, and
              production-ready web applications with Go, Next.js, observability, and a healthy appetite for hard
              problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="#projects">
                  View Missions <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/Shreyash_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" /> Open Resume
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="tactical-panel p-4">
                  <div className="font-display text-3xl font-black text-foreground">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-5 -top-5 h-28 w-28 border-r-2 border-t-2 border-primary/70" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 border-b-2 border-l-2 border-secondary/70" />
            <div className="tactical-card p-3">
              <div className="corner-cut relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src="/images/shrey.jpeg"
                  alt="Portrait of Shreyash Srivastava"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover grayscale-[15%] contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 border border-primary bg-background/70 px-3 py-1 font-display text-xs font-bold uppercase text-primary backdrop-blur">
                  Agent Dossier
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display text-3xl font-black uppercase text-foreground">Shreyash.SR</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>Go</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="outline">Open Source</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-border text-center">
                {["Deploy", "Observe", "Scale"].map((item) => (
                  <div key={item} className="border-r border-border px-2 py-4 last:border-r-0">
                    <div className="font-display text-sm font-bold uppercase text-muted-foreground">{item}</div>
                    <div className="mt-1 h-1 bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.6)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="section-kicker">Mission Brief</div>
            <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Engineering that holds under fire.</h2>
          </div>
          <div className="grid gap-5">
            <div className="tactical-panel p-6">
              <p className="text-lg leading-8 text-muted-foreground">
                I am pursuing a Bachelor of Engineering in Computer Science at Dayananda Sagar College of Engineering,
                Bangalore. I like systems that are clean under the hood: reliable APIs, fast data flows, useful admin
                tools, and open-source infrastructure that other builders can trust.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                My work spans backend development, observability, CI/CD, hackathons, and competitive programming. The
                common thread is simple: build practical software, measure it, and make it easier to operate.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="tactical-panel p-5">
                <div className="hud-label">Education 01</div>
                <h3 className="mt-2 font-display text-2xl font-black uppercase">B.E. Computer Science</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Dayananda Sagar College of Engineering, Bangalore / 2024 - Present
                </p>
              </div>
              <div className="tactical-panel p-5">
                <div className="hud-label">Education 02</div>
                <h3 className="mt-2 font-display text-2xl font-black uppercase">Intermediate</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Lucknow Public School, Lucknow / 2023 - 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative border-y border-border bg-muted/35 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="section-kicker">Loadout</div>
              <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Skills Arsenal</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              A practical stack for backend-heavy products, cloud-native workflows, and product surfaces that need to
              move quickly without losing operational clarity.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => {
              const Icon = group.icon

              return (
                <Card key={group.title} className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center border border-primary/45 bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardDescription>{group.signal}</CardDescription>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <div className="section-kicker">Operations</div>
            <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Experience Timeline</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5">
            {experience.map((item) => (
              <Card key={`${item.company}-${item.period}`}>
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <CardDescription>
                        {item.company} / {item.place}
                      </CardDescription>
                      <CardTitle className="text-3xl">{item.role}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {item.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                    <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap content-start gap-2">
                      {item.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative border-y border-border bg-background/60 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="section-kicker">Missions</div>
              <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Project Deployments</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="https://github.com/ShreyashSri?tab=repositories" target="_blank" rel="noopener noreferrer">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const demoIsExternal = project.demo.startsWith("http")

              return (
                <Card key={project.title} className="flex h-full flex-col">
                  <div className="relative h-52 overflow-hidden border-b border-border">
                    <Image
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 bg-primary px-3 py-1 font-display text-xs font-black uppercase text-primary-foreground">
                      Mission {String(index + 1).padStart(2, "0")}
                    </div>
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
                  <CardFooter className="mt-auto flex justify-between gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={project.demo}
                        target={demoIsExternal ? "_blank" : undefined}
                        rel={demoIsExternal ? "noopener noreferrer" : undefined}
                      >
                        Demo <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> Code
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="open-source" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="section-kicker">Open Source</div>
              <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Community Fronts</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Contributions across CI, observability, documentation, Kubernetes workflows, mail infra, and release
              quality.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {contributions.map((item) => (
              <Card key={item.title} className="flex h-full flex-col">
                <CardHeader>
                  <CardDescription>{item.role}</CardDescription>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <Radio className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href={item.href} target="_blank" rel="noopener noreferrer">
                      Open Repo <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="border-y border-border bg-muted/35 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <div className="section-kicker">Scoreboard</div>
            <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Achievements</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon

              return (
                <div key={achievement.title} className="tactical-panel flex gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/45 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black uppercase text-foreground">{achievement.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{achievement.context}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="section-kicker">Intel</div>
              <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Latest Articles</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="https://dev.to/shreyashsri" target="_blank" rel="noopener noreferrer">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.title} className="grid overflow-hidden md:grid-cols-[240px_1fr]">
                <div className="relative min-h-56 border-b border-border md:border-b-0 md:border-r">
                  <Image
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 240px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                </div>
                <div className="flex flex-col">
                  <CardHeader>
                    <CardDescription>{post.date}</CardDescription>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={post.url} target="_blank" rel="noopener noreferrer">
                        Read Intel <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="profiles" className="border-y border-border bg-background/60 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="section-kicker">Network</div>
            <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Connect With Me</h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-5">
            {socials.map((social) => {
              const Icon = social.icon

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="tactical-panel group flex min-h-32 flex-col items-center justify-center gap-3 p-5 text-center transition-colors hover:border-primary"
                >
                  <Icon className="h-9 w-9 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="font-display text-base font-black uppercase text-foreground">{social.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 pb-28 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="section-kicker">Comms</div>
            <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">Ready For The Next Mission?</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Send a message for collaborations, backend projects, open-source work, hackathons, or anything that needs
              a builder who can move from idea to deployed system.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="tactical-panel flex items-center gap-4 p-4">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">shreyash.sri09@gmail.com</span>
              </div>
              <div className="tactical-panel flex items-center gap-4 p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Bangalore, India</span>
              </div>
              <div className="tactical-panel flex items-center gap-4 p-4">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Go / Next.js / Observability / CI</span>
              </div>
            </div>
          </div>

          <form className="tactical-card grid gap-5 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className="hud-label">
                  Name
                </label>
                <input id="name" type="text" className="valorant-input px-4 py-3 text-sm" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="hud-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="valorant-input px-4 py-3 text-sm"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="subject" className="hud-label">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="valorant-input px-4 py-3 text-sm"
                placeholder="Project, role, or collaboration"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="hud-label">
                Message
              </label>
              <textarea
                id="message"
                className="valorant-input min-h-36 resize-y px-4 py-3 text-sm"
                placeholder="Drop the details"
                required
              />
            </div>
            <Button type="submit" size="lg" className="justify-self-start">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-background/80 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shreyash Srivastava. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.slice(0, 3).map((social) => {
              const Icon = social.icon

              return (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </footer>
    </div>
  )
}
