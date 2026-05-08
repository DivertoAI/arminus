/** @type {import('next').NextConfig} */
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? "/arminus" : "",
  assetPrefix: isGithubPagesBuild ? "/arminus/" : "",
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: isGithubPagesBuild ? "/arminus" : ""
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
