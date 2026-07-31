import { Mail, MapPin, Phone, Send, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"

const contactChannels = [
  { label: "Email", value: "shreyash.sri09@gmail.com", icon: Mail },
  { label: "Location", value: "Bangalore, India", icon: MapPin },
  { label: "Phone", value: "+91 9305115681", icon: Phone },
]

export default function ContactPage() {
  return (
    <div className="valorant-shell min-h-screen pt-24 pb-28">
      <section className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <div className="section-kicker">Comms Link</div>
          <h1 className="valorant-heading text-5xl text-foreground sm:text-6xl">Get In Touch</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Have a project, open-source idea, hackathon sprint, or backend problem that needs a builder? Send the brief
            and I will get back to you.
          </p>

          <div className="mt-8 grid gap-4">
            {contactChannels.map((channel) => {
              const Icon = channel.icon

              return (
                <div key={channel.label} className="tactical-panel flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center border border-primary/45 bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="hud-label">{channel.label}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{channel.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 tactical-panel p-5">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="font-display text-xl font-black uppercase text-foreground">Preferred Stack</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Go, Gin, Next.js, PostgreSQL, MongoDB, Docker, Kubernetes, CI/CD, observability, and practical product
              engineering.
            </p>
          </div>
        </div>

        <form className="tactical-card grid gap-5 p-6">
          <div>
            <div className="hud-label">Transmission Form</div>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-foreground">Send a Message</h2>
          </div>
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
              className="valorant-input min-h-44 resize-y px-4 py-3 text-sm"
              placeholder="Drop the details"
              required
            />
          </div>
          <Button type="submit" size="lg" className="justify-self-start">
            <Send className="h-4 w-4" /> Send Message
          </Button>
        </form>
      </section>
    </div>
  )
}
