import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Target, Briefcase, Award } from "lucide-react";
import { withSiteBasePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "IT Staffing Company in India",
  description:
    "Hire technology talent with Arminus, an IT staffing company in India for contract staffing, permanent recruitment, executive search, IT staff augmentation, and workforce solutions.",
  alternates: {
    canonical: "https://arminus.co.in"
  },
  keywords: [
    "IT staffing company in India",
    "IT recruitment agency India",
    "contract staffing services India",
    "IT staff augmentation India",
    "permanent recruitment IT",
    "executive search technology",
    "manpower consulting company India"
  ]
};

const stats = [
  { icon: Users,     value: "500+",  count: 500,  suffix: "+", label: "Happy Clients" },
  { icon: Target,    value: "10+",   count: 10,   suffix: "+", label: "Years Experience" },
  { icon: Briefcase, value: "1000+", count: 1000, suffix: "+", label: "Projects Completed" },
  { icon: Award,     value: "98%",   count: 98,   suffix: "%", label: "Client Satisfaction" },
];

export default function Home() {
  return (
    <main>
      <section className="hero-v2">

        {/* ── LEFT COLUMN ── */}
        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading">
            Powered by Humans.<br />
            <span className="hero-v2-blue">Accelerated</span> by AI.
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            Arminus combines AI-driven precision with deep human insight. We deliver
            high-velocity, pan-India staffing solutions for the world's fastest-growing economy.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="/services">
              Explore Services <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="/careers">
              Get Hired <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-v2-visual">
          <Image
            src={withSiteBasePath("/hero-art/dots-grid.png")}
            alt=""
            aria-hidden="true"
            width={280}
            height={220}
            className="hero-v2-dotgrid"
          />
          <div className="hero-v2-photo-wrap">
            {/* White blob behind photo */}
            <span className="hero-v2-blob" aria-hidden="true" />
            <Image
              src={withSiteBasePath("/team-banner.jpg")}
              alt="Arminus team collaborating"
              fill
              priority
              sizes="52vw"
              className="hero-v2-photo"
            />
          </div>
        </div>

        {/* ── SWOOSH — anchored to section bottom-left ── */}
        <Image
          src={withSiteBasePath("/hero-art/bottom-ribbon.png")}
          alt=""
          aria-hidden="true"
          width={520}
          height={280}
          className="hero-v2-swoosh"
        />

      </section>

      {/* ── STATS BAR ── */}
      <div className="container">
        <div className="stat-bar-v2">
          {stats.map(({ icon: Icon, value, count, suffix, label }) => (
            <div className="stat-bar-v2-item" key={label}>
              <Icon size={32} strokeWidth={1.6} className="stat-bar-v2-icon" />
              <span
                className="stat-bar-v2-value"
                data-count={count}
                data-suffix={suffix}
              >{value}</span>
              <span className="stat-bar-v2-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
