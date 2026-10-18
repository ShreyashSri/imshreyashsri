/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/blog", destination: "/#writing", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/Shreyash_Resume.pdf", destination: "/resume/Shreyash_Resume.pdf", permanent: true },
    ]
  },
}

export default nextConfig
