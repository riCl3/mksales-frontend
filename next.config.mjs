/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mksales.co.in',
      },
    ],
  },
};

export default nextConfig;
