/** @type {import('next').NextConfig} */
const nextConfig = {
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
