const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export function withSiteBasePath(path: string) {
  if (!siteBasePath) return path;
  if (path.startsWith(`${siteBasePath}/`)) return path;
  return `${siteBasePath}${path.startsWith("/") ? path : `/${path}`}`;
}
