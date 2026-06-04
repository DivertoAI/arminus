import { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arminus.co.in";
  return [
    { url: base,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/career-labs`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nubo`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
