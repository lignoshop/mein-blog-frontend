/** @type {import('next').NextConfig} */
const nextConfig = {
  // Edge Runtime als Standard
  experimental: {
    runtime: 'edge',
  },
  
  // Cloudflare Pages Optimierungen
  trailingSlash: false,
  swcMinify: true,
  
  // Output für Cloudflare Pages
  output: 'export',
  distDir: 'out',
  
  // Images für Edge Runtime
  images: {
    unoptimized: true,
    domains: ['128.140.68.0'], // Dein Strapi Server
  },
  
  // Environment Variables
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || 'http://128.140.68.0/api',
  },
  
  // Cloudflare spezifische Einstellungen
  assetPrefix: '',
  
  // Webpack Konfiguration für Edge
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  
  // Headers für API Calls
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;