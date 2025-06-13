import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cloudflare Pages Optimierungen
  trailingSlash: false,
  
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
    STRAPI_BASE_URL: process.env.STRAPI_BASE_URL || 'http://128.140.68.0',
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

export default nextConfig;