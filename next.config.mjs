/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mksales.co.in',
      },
      {
        protocol: 'https',
        hostname: 'cms.mksales.co.in',
      },
    ],
  },
};

export default nextConfig;
