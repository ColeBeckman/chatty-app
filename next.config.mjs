/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['img.clerk.com'] },
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
