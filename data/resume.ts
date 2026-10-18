export const profile = {
  name: "Shreyash Srivastava",
  handle: "ShreyashSri",
  role: "Backend engineer",
  city: "Bangalore, India",
  email: "shreyash.sri09@gmail.com",
  resume: "/resume/Shreyash_Resume.pdf",
}

export const tally = [
  { label: "GPA", value: "8.75" },
  { label: "Internships", value: "3" },
  { label: "Projects shipped", value: "6" },
  { label: "Certified", value: "CKAD" },
  { label: "Open-source orgs", value: "5" },
  { label: "CodeChef rating", value: "1415" },
  { label: "LeetCode rating", value: "1441" },
  { label: "Hackathon awards", value: "2" },
]

export const education = [
  {
    school: "Dayananda Sagar College of Engineering",
    detail: "B.E. Computer Science, Bangalore · GPA 8.75",
    period: "July 2024 – present",
  },
  {
    school: "Lucknow Public School",
    detail: "Intermediate, Lucknow",
    period: "2023 – 2024",
  },
]

export type SkillGroup = { id: string; title: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { id: "languages", title: "Languages", items: ["Go", "Python", "TypeScript"] },
  { id: "frameworks", title: "Frameworks", items: ["Gin", "Next.js", "Flask", "Django"] },
  { id: "data", title: "Databases", items: ["PostgreSQL", "MongoDB", "Supabase", "Firebase"] },
  { id: "infra", title: "Infrastructure", items: ["Kubernetes", "Docker", "AWS", "ArgoCD", "CI/CD"] },
  { id: "observability", title: "Observability", items: ["Prometheus", "Grafana", "Alertmanager", "OpenTelemetry"] },
  { id: "competitive", title: "Competitive", items: ["CodeChef", "LeetCode", "Codeforces"] },
]

export type Chapter = {
  company: string
  role: string
  place: string
  period: string
  gold: string
  objectives: string[]
  stack: string[]
}

export const chapters: Chapter[] = [
  {
    company: "Ignito Co.",
    role: "Fullstack Developer Intern",
    place: "Remote",
    period: "July – August 2025",
    gold: "Cut the time to ingest and process large Excel datasets from 7 minutes to 16 seconds.",
    objectives: [
      "Built an inventory management system with Next.js and Supabase that ingests and processes large Excel datasets.",
      "Engineered a full-stack app with Go (Gin) and MongoDB covering the lifecycle of purchase orders, bills and inventory, behind scalable REST APIs.",
    ],
    stack: ["Go", "Gin", "Next.js", "MongoDB", "Supabase"],
  },
  {
    company: "Seeqlo",
    role: "Backend Developer Intern",
    place: "Remote",
    period: "August 2025 – February 2026",
    gold: "Migrated a legacy backend from Express.js to Go (Gin) and refactored the monolith into modular components.",
    objectives: [
      "Integrated Stripe for secure payments and built a token-based credit system to control user access and resource use.",
      "Built a community admin interface for monitoring user activity and managing platform content.",
    ],
    stack: ["Go", "Gin", "Firebase", "Stripe"],
  },
  {
    company: "PRED",
    role: "Software Engineer Intern",
    place: "Onsite",
    period: "August 2026 – present",
    gold: "Building scalable backend infrastructure for a high-performance sports prediction exchange.",
    objectives: ["Working hands-on with real-time trading systems, order-book infrastructure and on-chain settlement."],
    stack: ["Go", "AWS", "PostgreSQL"],
  },
]

export const contributions = [
  {
    camp: "Debian — Salsa CI",
    href: "https://salsa.debian.org/salsa-ci-team/pipeline",
    role: "Contributor",
    deeds: [
      "Moved the base-image build pipeline to mmdebstrap and buildah, replacing Docker Hub pulls with native archive builds to fix rate-limit errors.",
      "Added a CI test case for the Debian Trixie release that checks build compatibility and test-environment readiness.",
    ],
  },
  {
    camp: "OpenTelemetry Operator",
    href: "https://github.com/open-telemetry/opentelemetry-operator",
    role: "Contributor",
    deeds: [
      "Automated Markdown link checks with Linkspector in GitHub Actions, on every pull request and a weekly cron, to stop broken docs.",
      "Deprecated the volumeSizeLimit field across every language instrumentation, with a validating webhook that warns on its use.",
    ],
  },
  {
    camp: "PointBlank",
    href: "https://github.com/pointblank-club",
    role: "Member",
    deeds: [
      "Shipped Swagger docs, Mailu, monitoring, a Kubernetes staging cluster and ArgoCD flows.",
      "A Bangalore community developing industry-ready engineers. Member since December 2024.",
    ],
  },
  {
    camp: "KWoC Backend",
    href: "https://github.com/kossiitkgp/KWoC-Backend",
    role: "Observability",
    deeds: ["Added Prometheus, Grafana, Node Exporter, Alertmanager and uptime alerts."],
  },
  {
    camp: "mwoffliner",
    href: "https://github.com/openzim/mwoffliner",
    role: "Contributor",
    deeds: ["Added CI checks for translations to make releases more robust."],
  },
]

export type Award = { title: string; context: string; medal: "gold" | "silver" | "bronze"; href?: string }

export const awards: Award[] = [
  {
    title: "Certified Kubernetes Application Developer",
    context: "CKAD, July 2026",
    medal: "gold",
    href: "https://www.credly.com/badges/b12bdc3c-f06b-4923-8591-2975d788de3c/public_url",
  },
  { title: "Unique Idea award, Hack-Nocturne ’26", context: "SMVIT, March 2026", medal: "gold" },
  { title: "Won the Xythera CTF", context: "AWS Student Builder Group", medal: "gold" },
  { title: "LiFT Scholarship", context: "The Linux Foundation, June 2025", medal: "gold" },
  { title: "Won the Coding Relay", context: "Dayananda Sagar College of Engineering, March 2025", medal: "silver" },
  { title: "Top 9 of 63 teams, HackOasis V2", context: "November 2024", medal: "bronze" },
  { title: "Member of PointBlank", context: "Engineering community, since December 2024", medal: "bronze" },
]

export const socials = [
  { label: "GitHub", href: "https://github.com/ShreyashSri" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shreyashsri/" },
  { label: "Twitter", href: "https://twitter.com/imshreyashsri" },
  { label: "Medium", href: "https://medium.com/@ShreyashSri" },
] as const
