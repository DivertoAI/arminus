/** @type {import('next').NextConfig} */
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? "/arminus" : "",
  assetPrefix: isGithubPagesBuild ? "/arminus/" : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
