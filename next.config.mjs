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
  // Configure for Netlify deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

export default nextConfig
