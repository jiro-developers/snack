/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-dev.wefun.kr',
        pathname: '/item/**',
      },
    ],
  },
};

module.exports = nextConfig;
