/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost'],
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_API_BASE_PATH || "/friend-app",
  basePath: process.env.NEXT_PUBLIC_API_BASE_PATH || "/friend-app",
  trailingSlash: false,
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
 }
 
 module.exports = nextConfig
