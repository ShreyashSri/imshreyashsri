import Image from "next/image"
import { Activity, Award, BookOpen, Code, Cpu, Database, ExternalLink, FileText, Mail, MapPin, Radio, Shield, Terminal, Trophy } from "lucide-react"

import { blogPosts } from "@/data/blog-posts"
import { projects } from "@/data/projects"
import { awards, chapters, contributions, education, profile, skillGroups, socials, tally } from "@/data/resume"
import { BrandIcon } from "@/components/brand-icon"
import { GamePicker } from "@/components/games/game-picker"
import AnimatedText from "./animated-text"
import ContactForm from "./contact-form"
import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, button } from "./ui"

const skillIcons = [Code, Cpu, Database]
const awardIcons = [Shield, Award, Trophy, Activity, BookOpen]

function SectionHeading({ kicker, title, align = "left" }: { kicker: string; title: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto mb-10 max-w-4xl text-center" : "mb-10"}>
      <div className="section-kicker">{kicker}</div>
      <h2 className="valorant-heading text-4xl text-foreground sm:text-5xl">{title}</h2>
    </div>
  )
}

export function ProfileHero() {
  return (
    <section id="profile" className="relative overflow-hidden border-b border-primary/20">
      <div className="absolute inset-0">
        <Image src="/themes/valorant/mountain-landscape.jpeg" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.18] grayscale" />
        <div className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-background/60" />
        <div className="tactical-grid absolute inset-0 opacity-30" />
      </div>

      <div className="container relative grid min-h-svh items-center gap-12 pb-24 pt-28 lg:grid-cols-[1.08fr_0.92fr]">
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
            Software engineer intern at PRED, building backend infrastructure for a real-time sports prediction exchange. Go, Kubernetes, open source,
            and a healthy appetite for hard problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className={button({ size: "lg" })}>
              View missions
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "lg" })}>
              <FileText /> Open resume
            </a>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {tally.map((stat) => (
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
            <div className="corner-cut relative aspect-4/5 overflow-hidden bg-muted">
              <Image
                src="/images/profile/shrey.jpeg"
                alt="Portrait of Shreyash Srivastava"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover contrast-110 grayscale-15"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
              <div className="absolute left-4 top-4 border border-primary bg-background/70 px-3 py-1 font-display text-xs font-bold uppercase text-primary backdrop-blur-sm">
                Agent dossier
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-3xl font-black uppercase text-foreground">ShreyashSri</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>Go</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="outline">CKAD</Badge>
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
  )
}

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionHeading kicker="Mission brief" title="Engineering that holds under fire." />
        <div className="grid gap-5">
          <div className="tactical-panel p-6">
            <p className="text-lg leading-8 text-muted-foreground">
              I build the parts of software nobody sees until they break: APIs, data pipelines, CI and the infrastructure underneath. Right now that
              means the backend of a sports prediction exchange at PRED: real-time trading, order books and on-chain settlement.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Before that I moved Seeqlo’s backend from Express.js to Go and cut a 7-minute import at Ignito to 16 seconds. I contribute to Debian and
              the OpenTelemetry Operator, and hold the CKAD.
            </p>
          </div>
          {education.map((e) => (
            <div key={e.school} className="tactical-panel p-5">
              <div className="hud-label">Education</div>
              <h3 className="mt-2 font-display text-2xl font-black uppercase">{e.school}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {e.detail} / {e.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative border-y border-border bg-muted/35 py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Loadout" title="Skills arsenal" />
        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = skillIcons[i % skillIcons.length]
            return (
              <Card key={group.id} className="h-full">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-primary/45 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
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
  )
}

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Operations" title="Experience timeline" align="center" />
        <div className="mx-auto grid max-w-5xl gap-5">
          {[...chapters].reverse().map((job) => (
            <Card key={job.company}>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <CardDescription>
                      {job.company} / {job.place}
                    </CardDescription>
                    <CardTitle className="text-3xl">{job.role}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {job.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {[job.gold, ...job.objectives].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap content-start gap-2">
                    {job.stack.map((tech) => (
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
  )
}

export function OpenSource() {
  return (
    <section id="open-source" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Open source" title="Community fronts" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contributions.map((item) => (
            <Card key={item.camp} className="flex h-full flex-col">
              <CardHeader>
                <CardDescription>{item.role}</CardDescription>
                <CardTitle>{item.camp}</CardTitle>
              </CardHeader>
              <CardContent className="grow">
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {item.deeds.map((deed) => (
                    <li key={deed} className="flex gap-3">
                      <Radio className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{deed}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "sm" })}>
                  Open repo <BrandIcon name="GitHub" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative border-y border-border bg-background/60 py-16 md:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading kicker="Missions" title="Project deployments" />
          <a href="https://github.com/ShreyashSri?tab=repositories" target="_blank" rel="noopener noreferrer" className={`${button({ variant: "outline" })} mb-10 w-fit`}>
            View all
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const external = project.demo.startsWith("http")
            return (
              <Card key={project.title} className="flex h-full flex-col">
                <div className="relative h-52 overflow-hidden border-b border-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/85 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 bg-primary px-3 py-1 font-display text-xs font-black uppercase text-primary-foreground">
                    Mission {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex justify-between gap-3">
                  <a href={project.demo} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={button({ variant: "outline", size: "sm" })}>
                    Demo <ExternalLink />
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={button({ variant: "ghost", size: "sm" })}>
                    <BrandIcon name="GitHub" /> Code
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Achievements() {
  return (
    <section id="achievements" className="border-y border-border bg-muted/35 py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Scoreboard" title="Achievements" align="center" />
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {awards.map((award, i) => {
            const Icon = awardIcons[i % awardIcons.length]
            return (
              <div key={award.title} className="tactical-panel flex gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/45 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-foreground">
                    {award.href ? (
                      <a href={award.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {award.title}
                      </a>
                    ) : (
                      award.title
                    )}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{award.context}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Writing() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Intel" title="Latest articles" />
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post.title} className="grid overflow-hidden md:grid-cols-[240px_1fr]">
              <div className="relative min-h-56 border-b border-border md:border-b-0 md:border-r">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 240px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <CardHeader>
                  <CardDescription>{post.date}</CardDescription>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="grow">
                  <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "sm" })}>
                    Read intel <ExternalLink />
                  </a>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Games() {
  return (
    <section id="games" className="border-y border-border bg-background/60 py-16 md:py-24">
      <div className="container">
        <SectionHeading kicker="Agent select" title="Games I play" />
        <p className="-mt-6 mb-8 max-w-2xl text-sm leading-7 text-muted-foreground">Pick a game and the whole portfolio switches to its theme.</p>
        <GamePicker tone="valorant" />
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="py-16 pb-28 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionHeading kicker="Comms" title="Ready for the next mission?" />
          <p className="-mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            Backend roles, open-source work, hackathons, or anything that needs a builder who can take an idea to a deployed system.
          </p>
          <div className="mt-8 grid gap-4">
            <a href={`mailto:${profile.email}`} className="tactical-panel flex items-center gap-4 p-4 hover:border-primary">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">{profile.email}</span>
            </a>
            <div className="tactical-panel flex items-center gap-4 p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">{profile.city}</span>
            </div>
            <div className="tactical-panel flex items-center gap-4 p-4">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Go / Kubernetes / AWS / PostgreSQL</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "sm" })}>
                <BrandIcon name={s.label} /> {s.label}
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 py-8 pb-24 lg:pb-8">
      <div className="container flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <p>© {new Date().getFullYear()} Shreyash Srivastava.</p>
        <p>Valorant is a trademark of Riot Games. Fan tribute, not affiliated.</p>
      </div>
    </footer>
  )
}
