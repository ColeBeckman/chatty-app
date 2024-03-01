/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/General',
        permanent: true,
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
};

export default nextConfig;
