import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['bcryptjs'],
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
