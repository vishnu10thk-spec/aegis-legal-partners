const defaultRuntimeCaching = require("next-pwa/cache");

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "aegis-unsplash-images",
      expiration: {
        maxEntries: 80,
        maxAgeSeconds: 60 * 60 * 24 * 30
      },
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  },
  {
    urlPattern: /^https:\/\/.*\/api\/.*/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "aegis-api-responses",
      networkTimeoutSeconds: 4,
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 10
      },
      cacheableResponse: {
        statuses: [0, 200]
      }
    }
  },
  ...defaultRuntimeCaching
];

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920, 2560],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on"
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin"
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
      }
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/favicon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate"
          }
        ]
      }
    ];
  }
};

module.exports = withPWA(nextConfig);
