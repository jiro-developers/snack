/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/order/snack',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
