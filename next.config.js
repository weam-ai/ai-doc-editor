/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_API_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_API_BASE_PATH,
  trailingSlash: false,
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
 }
 
 module.exports = nextConfig