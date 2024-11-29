/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.themealdb.com'],
  },
  output: 'export', 
  basePath: '/recipes', 
  assetPrefix: '/recipes'
};

export default nextConfig;
