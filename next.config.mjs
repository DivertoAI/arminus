/** @type {import('next').NextConfig} */
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: ""
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
