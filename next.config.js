const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */
 const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    externalDir: true,
  },
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['*'],
  },
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 사이드에서 사용되는 경우 fs 모듈 제외
      if (!config.resolve.fallback) {
        config.resolve.fallback = {};
      }
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
const withVideos = require("next-videos");
module.exports =  withVideos({
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: "/:path*", // automatically handles all locales
        destination: `${
          process.env.NEXT_PUBLIC_SERVER_BASE_URL
            ? process.env.NEXT_PUBLIC_SERVER_BASE_URL
            : "https://new-dev-erp.swadpia.co.kr"
        }/:path*` // automatically passes the locale on
      }
    ];
  },
});
