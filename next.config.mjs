/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Default locale. Swap `uz` here if you ever change the primary market.
      { source: '/', destination: '/uz', permanent: false },
    ];
  },
};

export default nextConfig;
