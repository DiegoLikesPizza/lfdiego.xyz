import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Export every route as <route>/index.html. Without this, /claude exports as
  // claude.html next to an empty claude/ directory — which nginx resolves to
  // the directory, finds no index, and answers 403.
  trailingSlash: true,
  images: {
    unoptimized: true, // Wichtig! Next.js Image Optimization geht nicht ohne Node-Server
  },
};
export default nextConfig;