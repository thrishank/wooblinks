/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "testwoo.com", // Added hostname here
        port: "",
        pathname: "/**", // Allows all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "cdn.woo.com", // Added hostname here
        port: "",
        pathname: "/**", // Allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
