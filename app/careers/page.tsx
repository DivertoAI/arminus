import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";
import { CareersClient } from "@/components/CareersClient";
import { CeipalWidget } from "@/components/CeipalWidget";

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

const culture = [
  { m: "✦", t: "Honest conversations", d: "We'd rather tell you the hard truth than place you in the wrong role." },
  { m: "◆", t: "AI as a teammate", d: "Generative AI does the paperwork so you can do the work that matters." },
  { m: "▲", t: "Relationships over transactions", d: "Most of our candidates come back to us for their next move." },
  { m: "●", t: "Pan-India impact", d: "From private fintech to national Gov-Tech programs across 10+ states." },
];

export default function CareersPage() {
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
          {/* ── Custom API listing ── */}
          <div className="compare-label">Our design (API)</div>
          <CareersClient />

          {/* ── Ceipal widget ── */}
          <div className="compare-label" style={{ marginTop: "56px" }}>Ceipal widget</div>
          <CeipalWidget />

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
