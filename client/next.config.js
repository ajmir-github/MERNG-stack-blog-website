/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com",
      },
      {
        hostname: "cloudflare-ipfs.com",
      },
    ],
  },
};

module.exports = nextConfig;
