import {
  siArgo,
  siCodechef,
  siCodeforces,
  siDjango,
  siDocker,
  siFirebase,
  siFlask,
  siGin,
  siGithubactions,
  siGo,
  siGrafana,
  siKubernetes,
  siLeetcode,
  siMongodb,
  siNextdotjs,
  siOpentelemetry,
  siPostgresql,
  siPrometheus,
  siPython,
  siSupabase,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"

export const logos: Record<string, SimpleIcon> = {
  Go: siGo,
  Python: siPython,
  TypeScript: siTypescript,
  Gin: siGin,
  "Next.js": siNextdotjs,
  Flask: siFlask,
  Django: siDjango,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  "CI/CD": siGithubactions,
  Prometheus: siPrometheus,
  Supabase: siSupabase,
  Firebase: siFirebase,
  ArgoCD: siArgo,
  Grafana: siGrafana,
  Alertmanager: siPrometheus,
  OpenTelemetry: siOpentelemetry,
  CodeChef: siCodechef,
  LeetCode: siLeetcode,
  Codeforces: siCodeforces,
}

export const ratings: Record<string, string> = { CodeChef: "2★ · 1415", LeetCode: "1441" }

export function TechLogo({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const icon = logos[name]
  if (!icon) return <span className={`flex items-center justify-center font-bold leading-none ${className}`}>{name.slice(0, 3)}</span>
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
