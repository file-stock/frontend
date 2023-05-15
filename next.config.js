/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  images: {
    domains: ["ipfs.io"],
  },
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
