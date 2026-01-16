import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Wichtig! Next.js Image Optimization geht nicht ohne Node-Server
  },
};
export default nextConfig;