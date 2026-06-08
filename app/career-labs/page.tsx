import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";
import { ResumeScore } from "@/components/ResumeScore";

export const metadata: Metadata = {
  title: "Career Labs | ATS Resume Writing & Mock Interview Prep",
  description:
    "Level up your job search with Arminus Career Labs. ATS-optimized resume writing, LinkedIn SEO, mock interview sessions with STAR feedback, and free AI Resume Score tool. Plans from ₹4,999.",
  keywords: [
    "resume writing service India", "ATS resume optimization India", "mock interview preparation India",
    "LinkedIn profile optimization", "career coaching India", "job interview preparation",
    "resume writing India", "ATS resume score", "career labs India", "interview coaching India",
  ],
  alternates: { canonical: "https://arminus.co.in/career-labs" },
};

const services = [
  {
    title: "The ATS-Dominator",
    sub: "Resume & LinkedIn Optimization",
    bullets: [
      "AI-Optimization: Resumes built to trigger high-relevance scores in modern Applicant Tracking Systems.",
      "Editorial Polish: Narrative refinement to highlight leadership impact and quantifiable achievements.",
      "LinkedIn SEO: Complete profile overhaul to ensure maximum visibility in recruiter headhunting searches.",
    ],
  },
  {
    title: "The Interview Masterclass",
    sub: "Mock Sessions & Negotiation",
    bullets: [
      "Simulated Environment: 60-minute mock sessions tailored to IT, Fintech, or Automotive interview standards.",
      "Editorial Feedback Report: Detailed breakdown of performance, body language, and storytelling (STAR method).",
      "Negotiation Strategy: Learn how to benchmark your market worth and negotiate your CTC with confidence.",
    ],
  },
];

const tiers = [
  { name: "The Jumpstart", price: "₹4,999", badge: null, items: ["ATS-optimized resume rewrite", "Keyword & formatting audit", "1-round revision included", "48-hour turnaround"], cta: "Get started" },
  { name: "The Career Catalyst", price: "₹6,999", badge: "Most popular", items: ["Everything in The Jumpstart", "LinkedIn profile overhaul", "1 × 60-min mock interview", "STAR feedback report", "Salary benchmarking guide"], cta: "Get the Catalyst" },
  { name: "The Leadership Suite", price: "₹9,999", badge: null, items: ["Everything in The Career Catalyst", "Unlimited mock interviews (30 days)", "Executive narrative coaching", "Salary negotiation roleplay", "Priority 24-hr turnaround"], cta: "Go leadership" },
];

export default function CareerLabsPage() {
  return (
    <main>
      <PageHero
        accent="coral"
        eyebrow="B2C · Arminus Career Labs"
        title={<>Level up your career with <span className="ital coral">Career Labs.</span></>}
        lede="From ATS-optimized resumes to executive mock interviews — get the unfair advantage in India's most competitive job market."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <Link href="#pricing" className="btn btn-blue">View pricing <span className="arrow">→</span></Link>
          <Link href="#resume-score" className="btn btn-ghost">Get a free resume score</Link>
        </div>
      </PageHero>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="Our programmes"
            title={<>Tools that give you <span className="ital">the edge.</span></>}
            sub="Built to make every candidate the best version of themselves — before the first interview."
          />
          <Reveal stagger className="cl-grid">
            {services.map(s => (
              <article className="cl-card" key={s.title}>
                <h3>{s.title}</h3>
                <div className="cl-sub">{s.sub}</div>
                <ul className="cl-bullets">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* AI RESUME SCORE */}
      <ResumeScore />

      {/* PRICING */}
      <section className="section tint" id="pricing">
        <div className="wrap">
          <SectionHead
            eyebrow="Pricing"
            title={<>Choose your <span className="ital">career upgrade.</span></>}
            sub="All plans include a human review by an Arminus recruiter — not just an algorithm."
            align="center"
          />
          <Reveal stagger className="pricing-grid">
            {tiers.map(t => (
              <div className={`pricing-card ${t.badge ? "pricing-featured" : ""}`} key={t.name}>
                {t.badge && <div className="pricing-badge">{t.badge}</div>}
                <div className="pricing-name">{t.name}</div>
                <div className="pricing-price">{t.price}</div>
                <ul className="pricing-items">
                  {t.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <Link href="/contact" className={`btn ${t.badge ? "btn-white" : "btn-blue"}`}>
                  {t.cta} <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <p className="cl-disclaimer">
              <strong>Conflict of Interest Guardrail:</strong> Purchasing Career Labs services does not guarantee
              a placement through Arminus recruitment. It does guarantee you become a better-prepared candidate
              for the global market.
            </p>
          </Reveal>
        </div>
      </section>

      <BigCTA
        heading={<>Ready to <span className="ital">stand out?</span></>}
        lede="Most Career Labs clients report more callbacks within two weeks of their resume rewrite. Your next move starts with a better application."
        primary={{ href: "/contact", label: "Start with Career Labs" }}
        secondary={{ href: "/careers", label: "Browse open roles" }}
      />
    </main>
  );
}
