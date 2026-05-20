import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Mic2, Upload } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";
import { CareerLabsHeroLottie } from "@/components/CareerLabsHeroLottie";

export const metadata: Metadata = {
  title: "Career Labs",
  description:
    "From ATS-optimized resumes to executive mock interviews — get the unfair advantage in India's most competitive job market with Arminus Career Labs.",
  alternates: { canonical: "https://arminus.co.in/career-labs" }
};

const sideCards = [
  { value: "ATS", label: "Optimized",   tone: "blue" },
  { value: "1:1", label: "Coaching",    tone: "red"  },
  { value: "AI",  label: "Resume Score",tone: "blue" },
] as const;

export default function CareerLabsPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero-v2 inner-hero">
        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading inner-heading">
            Level up your career with{" "}
            <span className="hero-v2-blue">Arminus</span> Career Labs.
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            From ATS-optimized resumes to executive mock interviews — get the unfair advantage
            in India&apos;s most competitive job market.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="#pricing">
              View Pricing <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="#resume-score">
              Get a Free Resume Score
            </Link>
          </div>
        </div>

        <div className="hero-v2-visual">
          <Image
            src={withSiteBasePath("/hero-art/dots-grid.png")}
            alt="" aria-hidden="true"
            width={220} height={180}
            className="hero-v2-dotgrid"
          />
          <div className="hero-v2-photo-wrap">
            <span className="hero-v2-blob" aria-hidden="true" />
            <CareerLabsHeroLottie />
          </div>
          <div className="careers-side-cards">
            {sideCards.map((card) => (
              <div
                key={card.label}
                className={`careers-side-card ${card.tone === "red" ? "careers-side-card-red" : ""}`}
              >
                <div>
                  <div className="careers-side-value">{card.value}</div>
                  <div className="careers-side-label">{card.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Image
          src={withSiteBasePath("/hero-art/bottom-ribbon.png")}
          alt="" aria-hidden="true"
          width={480} height={260}
          className="hero-v2-swoosh inner-swoosh"
        />
      </section>

      {/* ── Services ── */}
      <section className="section" id="services">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What We Offer</span>
            <h2 className="section-title">Two flagship programmes.</h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: 36, gap: 28 }}>
            <Reveal delay={0.04}>
              <article className="feature-card">
                <span className="feature-card-icon" aria-hidden="true">
                  <FileText size={24} strokeWidth={2.1} />
                </span>
                <h3>The ATS-Dominator</h3>
                <p style={{ marginBottom: 16 }}>
                  Resume and LinkedIn optimization engineered to get you noticed by recruiters before a human ever
                  reads your profile.
                </p>
                <ul className="service-detail-list">
                  <li>
                    <strong>AI-Optimization:</strong> Resumes built to trigger high-relevance scores in modern ATS
                  </li>
                  <li>
                    <strong>Editorial Polish:</strong> Narrative refinement to highlight leadership impact
                  </li>
                  <li>
                    <strong>LinkedIn SEO:</strong> Complete profile overhaul to ensure recruiter visibility
                  </li>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="feature-card">
                <span className="feature-card-icon" aria-hidden="true">
                  <Mic2 size={24} strokeWidth={2.1} />
                </span>
                <h3>The Interview Masterclass</h3>
                <p style={{ marginBottom: 16 }}>
                  High-fidelity mock interview sessions tailored to your target sector — with structured feedback and
                  negotiation coaching.
                </p>
                <ul className="service-detail-list">
                  <li>
                    <strong>Simulated Environment:</strong> 60-minute mock sessions tailored to IT, Fintech, or
                    Automotive standards
                  </li>
                  <li>
                    <strong>Editorial Feedback Report:</strong> Detailed breakdown of performance, body language, and
                    storytelling (STAR method)
                  </li>
                  <li>
                    <strong>Negotiation Strategy:</strong> Learn to benchmark your worth and negotiate your CTC with
                    confidence
                  </li>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section-soft" id="pricing">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Pricing</span>
            <h2 className="section-title">Simple, transparent tiers.</h2>
            <p className="section-copy" style={{ maxWidth: 560 }}>
              Pick the programme that matches where you are in your career journey. All tiers
              include a personal consultation call.
            </p>
          </Reveal>

          <div className="pricing-grid" style={{ marginTop: 40 }}>
            {/* Starter */}
            <Reveal delay={0.04}>
              <div className="pricing-card">
                <div className="pricing-name">The Jumpstart</div>
                <div className="pricing-price">
                  ₹4,999
                  <span className="pricing-price-muted"> / one-time</span>
                </div>
                <ul className="pricing-items">
                  <li>Resume Only</li>
                  <li>ATS keyword optimisation</li>
                  <li>Editorial polish and formatting</li>
                  <li>1 revision round</li>
                </ul>
                <Link className="button button-outline" href="/contact" style={{ marginTop: "auto" }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>

            {/* Popular / Featured */}
            <Reveal delay={0.08}>
              <div className="pricing-card pricing-card-featured">
                <span className="pricing-badge">Most Popular</span>
                <div className="pricing-name">The Career Catalyst</div>
                <div className="pricing-price">
                  ₹6,999
                  <span className="pricing-price-muted"> / one-time</span>
                </div>
                <ul className="pricing-items">
                  <li>Resume + LinkedIn + 1 Mock Interview</li>
                  <li>ATS-optimised resume</li>
                  <li>Full LinkedIn profile overhaul</li>
                  <li>1 × 60-minute mock interview</li>
                  <li>Feedback report (STAR method)</li>
                </ul>
                <Link className="button" href="/contact" style={{ marginTop: "auto", background: "#fff", color: "#1b4fd8", fontWeight: 700 }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={0.12}>
              <div className="pricing-card">
                <div className="pricing-name">The Leadership Suite</div>
                <div className="pricing-price">
                  ₹9,999
                  <span className="pricing-price-muted"> / one-time</span>
                </div>
                <ul className="pricing-items">
                  <li>Unlimited Mocks + Salary Negotiation Coaching</li>
                  <li>Everything in Career Catalyst</li>
                  <li>Unlimited mock interview sessions</li>
                  <li>Salary benchmarking analysis</li>
                  <li>CTC negotiation strategy session</li>
                </ul>
                <Link className="button button-outline" href="/contact" style={{ marginTop: "auto" }}>
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AI Resume Score ── */}
      <section className="section" id="resume-score">
        <div className="container" style={{ maxWidth: 720 }}>
          <Reveal>
            <span className="eyebrow">Free Tool</span>
            <h2 className="section-title">Get your Free AI Resume Score</h2>
            <p className="section-copy">
              Upload your CV and get an instant score out of 100 with actionable feedback.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="resume-score-box" style={{ marginTop: 32 }}>
              <Upload size={40} strokeWidth={1.6} style={{ color: "#1b4fd8", marginBottom: 16 }} aria-hidden="true" />
              <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 8, color: "#0c183a" }}>
                Upload your CV (PDF or DOCX)
              </p>
              <p style={{ fontSize: "0.875rem", color: "#5d6787", marginBottom: 24 }}>
                Drag &amp; drop or click to select a file
              </p>
              <a
                className="button button-primary"
                href="mailto:resume@arminus.in?subject=Free Resume Score Request"
              >
                Get Score <ArrowRight size={16} />
              </a>
              <p style={{ marginTop: 20, fontSize: "0.8rem", color: "#6b7280", fontStyle: "italic" }}>
                This is a preview — our team will review and email your score within 24 hours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 720 }}>
          <Reveal>
            <p style={{ fontSize: "0.8rem", color: "#9ca3af", textAlign: "center", lineHeight: 1.7 }}>
              Purchasing Career Labs services does not guarantee a placement through Arminus recruitment. It does
              guarantee you become a better-prepared candidate for the global market.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
