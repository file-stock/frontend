/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    if (options.isServer) {
      return config;
    } else {
      config.resolve.fallback.fs = false;
      return config;
    }
  },
};

module.exports = nextConfig;
