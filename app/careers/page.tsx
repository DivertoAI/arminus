import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";
import { CareersClient } from "@/components/CareersClient";
import type { Job } from "@/components/CareersClient";

export const metadata: Metadata = {
  title: "IT Jobs in India | Current Openings | Arminus Careers",
  description:
    "Browse live IT job openings across permanent, contract, and Gov-Tech roles in Bengaluru, Gurugram, Kolkata and remote. Engineering, product, telecom, and finance positions updated daily.",
  keywords: [
    "IT jobs India", "software jobs India", "engineering jobs India", "IT career opportunities",
    "contract IT jobs India", "permanent IT jobs India", "technology jobs Bengaluru",
    "technology jobs Gurugram", "Gov-Tech jobs India", "IT jobs Kolkata",
  ],
  alternates: { canonical: "https://arminus.co.in/careers" },
};

export const revalidate = 300; // Refetch jobs from Ceipal every 5 minutes

const API_KEY = "N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09";
const CP_ID   = "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09";

/* ── Fetch all jobs at build time (server-side) ──
 *  Priority:
 *  1. v1 authenticated API  — full requisition_description + apply links
 *     (generates fresh token securely on the server)
 *  2. Public CareerPortalJobPostings fallback (descriptions truncated ~184 chars)
 */
async function fetchAllJobs(): Promise<Job[]> {
  try {
    const email    = process.env.CEIPAL_EMAIL;
    const password = process.env.CEIPAL_PASSWORD;
    const apiKey   = process.env.CEIPAL_API_KEY;

    if (email && password && apiKey) {
      const authRes = await fetch("https://api.ceipal.com/v1/createAuthtoken", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password, api_key: apiKey }),
        signal: AbortSignal.timeout(10_000)
      });

      if (authRes.ok) {
        const authData = await authRes.json();
        const token = authData.access_token;
        if (token) {
          const jobs = await fetchV1Jobs(token);
          if (jobs.length > 0) {
            console.log(`[careers] v1 API: ${jobs.length} jobs fetched`);
            return jobs;
          }
        }
      }
    }
  } catch (e) {
    console.warn("[careers] v1 API failed, falling back to public API:", e);
  }

  console.log("[careers] using public CareerPortal API");
  return fetchPublicJobs();
}

/* v1 authenticated endpoint — returns full job data */
async function fetchV1Jobs(token: string): Promise<Job[]> {
  const jobs: Job[] = [];
  let url = "https://api.ceipal.com/v1/getJobPostingsList?post_on_careerportal=1&limit=50";

  for (;;) {
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) break;
    const data = await res.json();
    const batch: Job[] = Array.isArray(data) ? data : (data.results ?? []);
    if (!batch.length) break;
    jobs.push(...batch);
    const next: string | null = data.next ?? null;
    if (!next) break;
    url = next;
  }

  return dedupe(jobs);
}

/* Public career portal endpoint — fallback when no token */
async function fetchPublicJobs(): Promise<Job[]> {
  const fetchPage = async (page: number) => {
    const res = await fetch(
      `https://apiin.ceipal.com/${API_KEY}/CareerPortalJobPostings/`,
      {
        method: "POST",
        body: new URLSearchParams({ cp_id: CP_ID, page: String(page) }),
        signal: AbortSignal.timeout(15_000),
      }
    );
    if (!res.ok) return null;
    return res.json();
  };

  try {
    const first = await fetchPage(1);
    if (!first) return [];

    const jobs: Job[] = [...(first.results ?? [])];
    const totalPages: number = first.num_pages ?? 1;

    // Fetch remaining pages in parallel — the API takes ~7s per request,
    // so a sequential loop over 13 pages exceeds Vercel's 60s prerender budget.
    const rest = await Promise.allSettled(
      Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => fetchPage(i + 2))
    );
    for (const r of rest) {
      if (r.status === "fulfilled" && r.value) jobs.push(...(r.value.results ?? []));
    }

    return dedupe(jobs);
  } catch (e) {
    console.warn("[careers] public API failed:", e);
    return [];
  }
}

function dedupe(jobs: Job[]) {
  const seen = new Set<string>();
  return jobs.filter(j => seen.has(j.id) ? false : (seen.add(j.id), true));
}

/* ── Page ── */
const culture = [
  { n: "01", t: "Honest conversations", d: "We'd rather tell you the hard truth than place you in the wrong role." },
  { n: "02", t: "AI as a teammate", d: "Generative AI does the paperwork so you can do the work that matters." },
  { n: "03", t: "Relationships over transactions", d: "Most of our candidates come back to us for their next move." },
  { n: "04", t: "Pan-India impact", d: "From private fintech to national Gov-Tech programs across 10+ states." },
];

export default async function CareersPage() {
  const jobs = await fetchAllJobs();
  jobs.sort((a, b) => new Date(b.created || 0).getTime() - new Date(a.created || 0).getTime());

  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="Careers · Jobs Portal"
        title={<>Find a role worth <span className="ital blue">moving for.</span></>}
        lede="Live openings across our client network — from private fintech to national Gov-Tech programs. Every application is read by a human."
      >
        <div className="hero-cta" style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <Link href="#openings" className="btn btn-blue">Browse open roles</Link>
          <Link href="/career-labs" className="btn btn-ghost">Prep with Career Labs</Link>
        </div>
      </PageHero>

      {/* LIVE JOBS */}
      <section className="section" id="openings">
        <div className="wrap">
          <SectionHead
            eyebrow="Live openings"
            title={<>Current roles across <span className="ital">our client network.</span></>}
            sub="Positions updated daily — permanent, contract, and Gov-Tech roles across India."
          />
          <CareersClient initialJobs={jobs} />
        </div>
      </section>

      {/* CULTURE */}
      <section className="culture-section">
        <div className="wrap">
          <SectionHead
            eyebrow="Why Arminus"
            title={<>The kind of firm <span className="ital">people stay in touch with.</span></>}
            sub="Most of our candidates come back to us for their next move. Here's why."
            align="center"
          />
          <Reveal stagger className="culture-grid">
            {culture.map(c => (
              <div className="culture-card" key={c.t}>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <BigCTA
        heading={<>Don&apos;t see the <span className="ital">right role?</span></>}
        lede="Send us your resume anyway. Most of our placements start with a conversation long before the perfect opening appears."
        primary={{ href: "mailto:contactus@arminus.com?subject=Resume%20Submission", label: "Send your resume" }}
        secondary={{ href: "/career-labs", label: "Get interview-ready" }}
      />
    </main>
  );
}
