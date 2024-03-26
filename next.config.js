/** @type {import('next').NextConfig} */
const nextConfig = {
  /// ...
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
