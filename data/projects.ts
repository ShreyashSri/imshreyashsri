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
    title: "ChaosCI-Stats",
    description: "Chaos Engineering Continuous Integration platform",
    longDescription: "A Chaos Engineering Continuous Integration platform integrated with GitHub Actions. It runs chaos experiments via ChaosMesh or LitmusChaos against target environments whenever a Pull Request is raised.",
    image: "/images/ChaosCI.png",
    technologies: ["Go", "PostgreSQL", "SvelteKit", "Docker", "Kubernetes", "ChaosMesh", "LitmusChaos"],
    demo: "https://chaos-ci-stats.vercel.app/",
    github: "https://github.com/ShreyashSri/ChaosCI-Stats",
  },
  {
    title: "SiMG (DICOM Guardian)",
    description: "Cryptographically verify DICOM medical images",
    longDescription: "A cross-platform Electron application that cryptographically verifies medical DICOM images, blocking supply chain attacks before AI inference. It features a zero-trust pipeline using seccomp-BPF and isolated Docker sandboxes.",
    image: "/images/SiMG.png",
    technologies: ["Electron", "Docker", "seccomp-BPF", "Cryptography"],
    demo: "https://github.com/ShreyashSri/SiMG#5-build-and-run-the-desktop-app",
    github: "https://github.com/ShreyashSri/SiMG",
  },
  {
    title: "Penguin: Proof-of-Art (cDNA)",
    description: "Authenticated digital art generation and provenance framework",
    longDescription: "A robust, end-to-end framework for authenticated digital art generation and provenance, leveraging Ethereum Sepolia and IPFS. It combines cryptographic signing, steganographic watermarking, and blockchain-based immutable storage.",
    image: "/images/Penguin.png",
    technologies: ["Go", "React", "Solidity", "IPFS", "PyTorch"],
    demo: "https://penguin-phi-blush.vercel.app/",
    github: "https://github.com/ShreyashSri/Penguin",
  },
  {
    title: "LiquidPay",
    description: "All-in-one banking and finance dashboard",
    longDescription: "A comprehensive banking and finance dashboard that provides users with powerful tools for managing their finances. Built with modern technologies including Next.js and integrated with TensorFlow and Gemini API for advanced features.",
    image: "/images/liquidpay.jpeg",
    technologies: ["Next.js", "React", "JavaScript", "TensorFlow", "Gemini API"],
    demo: "/projects/liquidpay",
    github: "https://github.com/ShreyashSri/liquidPay",
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
  {
    title: "Career Portal",
    description: "Centralized opportunity board for students",
    longDescription: "A platform designed to help students discover and apply for career opportunities. Features include job listings, application tracking, and a user-friendly interface built with Flask and MongoDB.",
    image: "/images/career-portal.jpeg",
    technologies: ["Flask", "HTML", "CSS", "MongoDB"],
    demo: "https://career-portal-37i9.onrender.com",
    github: "https://github.com/ShreyashSri/career-portal",
  },
]