import {
  siArgo,
  siCodechef,
  siCodeforces,
  siFirebase,
  siGrafana,
  siLeetcode,
  siOpentelemetry,
  siSupabase,
  siDjango,
  siDocker,
  siFlask,
  siGin,
  siGithubactions,
  siGo,
  siKubernetes,
  siMongodb,
  siNextdotjs,
  siPostgresql,
  siPrometheus,
  siPython,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"

import { skillGroups } from "@/data/resume"

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

const ratings: Record<string, string> = { CodeChef: "2★ · 1415", LeetCode: "1441" }

export function SkillsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <section key={group.id} className="border border-white/10 bg-black/55 px-5 py-6 backdrop-blur-xs sm:px-6">
          <h3 className="font-rocks text-[22px] uppercase tracking-wide text-white">{group.title}</h3>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
            {group.items.map((name) => {
              const icon = logos[name]
              return (
                <li key={name} className="flex aspect-square flex-col items-center justify-center gap-2 border border-white/15 bg-black/40 px-1">
                  {icon ? (
                    <svg viewBox="0 0 24 24" className="h-9 w-9 text-white/90" aria-hidden="true">
                      <path d={icon.path} fill="currentColor" />
                    </svg>
                  ) : (
                    <span aria-hidden="true" className="font-rocks text-[26px] leading-none text-white/90">
                      {name}
                    </span>
                  )}
                  <span className="text-center font-sans text-[11.5px] font-semibold uppercase leading-tight tracking-wide text-white">{name}</span>
                  {ratings[name] && <span className="-mt-1 font-sans text-[11px] text-white/60">{ratings[name]}</span>}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
