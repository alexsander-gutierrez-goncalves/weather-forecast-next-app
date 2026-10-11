/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.weatherapi.com',
      },
    ],
  },
};

export default nextConfig;
