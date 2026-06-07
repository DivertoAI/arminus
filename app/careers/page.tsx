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
    "Browse live IT job openings across permanent, contract, and Gov-Tech roles in Bangalore, Gurugram, Kolkata and remote. Engineering, product, telecom, and finance positions updated daily.",
  keywords: [
    "IT jobs India", "software jobs India", "engineering jobs India", "IT career opportunities",
    "contract IT jobs India", "permanent IT jobs India", "technology jobs Bangalore",
    "technology jobs Gurugram", "Gov-Tech jobs India", "IT jobs Kolkata",
  ],
  alternates: { canonical: "https://arminus.co.in/careers" },
};

const API_KEY = "N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09";
const CP_ID   = "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09";

/* ── Fetch all jobs at build time (server-side) ── */
async function fetchAllJobs(): Promise<Job[]> {
  const token  = process.env.CEIPAL_ACCESS_TOKEN;
  const useV2  = !!token && token !== "undefined" && token !== "null";
  const jobs: Job[] = [];

  try {
    let page = 1;
    let totalPages = 1;

    do {
      let res: Response;
      if (useV2) {
        res = await fetch(
          `https://api.ceipal.com/v2/getJobPostingsList/?page=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // If token is bad fall through to public API
        if (res.status === 401 || res.status === 403) throw new Error("auth");
      } else {
        res = await fetch(
          `https://apiin.ceipal.com/${API_KEY}/CareerPortalJobPostings/`,
          { method: "POST", body: new URLSearchParams({ cp_id: CP_ID, page: String(page) }) }
        );
      }

      if (!res.ok) break;
      const data = await res.json();
      const results: Job[] = data.results ?? [];
      jobs.push(...(useV2 ? results.filter(j => j.job_status?.toLowerCase() === "active") : results));
      totalPages = data.num_pages ?? 1;
      page++;
    } while (page <= totalPages);

  } catch (e: unknown) {
    // v2 auth failed — retry with public API
    if ((e as Error).message === "auth") return fetchPublicJobs();
    // Other error — return whatever we collected so far
  }

  return dedupe(jobs);
}

async function fetchPublicJobs(): Promise<Job[]> {
  const jobs: Job[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(
      `https://apiin.ceipal.com/${API_KEY}/CareerPortalJobPostings/`,
      { method: "POST", body: new URLSearchParams({ cp_id: CP_ID, page: String(page) }) }
    );
    if (!res.ok) break;
    const data = await res.json();
    jobs.push(...(data.results ?? []));
    totalPages = data.num_pages ?? 1;
    page++;
  } while (page <= totalPages);

  return dedupe(jobs);
}

function dedupe(jobs: Job[]) {
  const seen = new Set<string>();
  return jobs.filter(j => seen.has(j.id) ? false : (seen.add(j.id), true));
}

/* ── Page ── */
const culture = [
  { m: "✦", t: "Honest conversations", d: "We'd rather tell you the hard truth than place you in the wrong role." },
  { m: "◆", t: "AI as a teammate", d: "Generative AI does the paperwork so you can do the work that matters." },
  { m: "▲", t: "Relationships over transactions", d: "Most of our candidates come back to us for their next move." },
  { m: "●", t: "Pan-India impact", d: "From private fintech to national Gov-Tech programs across 10+ states." },
];

export default async function CareersPage() {
  const jobs = await fetchAllJobs();

  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="Careers · Jobs Portal"
        title={<>Find a role worth <span className="ital blue">moving for.</span></>}
        lede="Live openings across our client network — from private fintech to national Gov-Tech programs. Every application is read by a human."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <Link href="#openings" className="btn btn-blue">Browse open roles <span className="arrow">→</span></Link>
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
                <div className="culture-mark">{c.m}</div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <BigCTA
        heading={<>Don&apos;t see the <span className="ital">right role?</span></>}
        lede="Send us your résumé anyway. Most of our placements start with a conversation long before the perfect opening appears."
        primary={{ href: "mailto:contactus@arminus.com?subject=Resume%20Submission", label: "Send your résumé" }}
        secondary={{ href: "/career-labs", label: "Get interview-ready" }}
      />
    </main>
  );
}
