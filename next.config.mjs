/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  // Configure for Netlify deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Ensure all pages are statically generated
  generateStaticParams: async () => {
    return []
  }
}

export default nextConfig