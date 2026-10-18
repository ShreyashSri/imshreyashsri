import { profile } from "@/data/resume"

export function composeMail(form: HTMLFormElement) {
  const data = new FormData(form)
  const get = (key: string) => String(data.get(key) ?? "").trim()
  const sender = get("email") ? `${get("name")} (${get("email")})` : get("name")
  const body = `${get("message")}\n\n— ${sender}`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`
}
