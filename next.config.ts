import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  allowedDevOrigins: ['wagecloud.ddns.net'],
  experimental: {
    serverActions: {
      allowedOrigins: ['wagecloud.ddns.net'],
    }
  }
}

export default nextConfig
