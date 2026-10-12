/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/resume", destination: "/Kashish_Arora_Resume.pdf" },
    ];
  },
};

export default nextConfig;
