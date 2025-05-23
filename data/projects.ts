export interface Project {
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  demo: string
  github: string
}

export const projects: Project[] = [
  {
    title: "LiquidPay",
    description: "All-in-one banking and finance dashboard",
    longDescription: "A comprehensive banking and finance dashboard that provides users with powerful tools for managing their finances. Built with modern technologies including Next.js and integrated with TensorFlow and Gemini API for advanced features.",
    image: "/images/liquidpay.jpeg",
    technologies: ["Next.js", "React", "JavaScript", "TensorFlow", "Gemini API"],
    demo: "https://liquidpay.vercel.app",
    github: "https://github.com/ShreyashSri/liquidPay",
  },
  {
    title: "Career Portal",
    description: "Centralized opportunity board for students",
    longDescription: "A platform designed to help students discover and apply for career opportunities. Features include job listings, application tracking, and a user-friendly interface built with Flask and MongoDB.",
    image: "/images/career-portal.jpeg",
    technologies: ["Flask", "HTML", "CSS", "MongoDB"],
    demo: "https://career-portal-37i9.onrender.com",
    github: "https://github.com/ShreyashSri/career-portal",
  },
  {
    title: "VendIN",
    description: "Vendor discovery and visibility platform",
    longDescription: "A platform connecting vendors with potential customers, featuring vendor profiles, search functionality, and review systems. Built using Django with a focus on user experience.",
    image: "/images/vendin.jpeg",
    technologies: ["Django", "HTML", "CSS", "JavaScript"],
    demo: "https://vendin.onrender.com",
    github: "https://github.com/ShreyashSri/VendIn",
  },
] 