import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users2, Sparkles, BarChart3, ArrowRight } from "lucide-react";
import { withSiteBasePath } from "@/lib/site-path";
import { CeipalWidget } from "@/components/CeipalWidget";
import { CareersHeroLottie } from "@/components/CareersHeroLottie";

export const metadata: Metadata = {
  title: "IT Jobs and Ceipal Careers",
  description:
    "Explore current IT jobs through the Arminus Ceipal careers portal and apply for contract, permanent, project, and staffing opportunities.",
  alternates: { canonical: "https://arminus.co.in/careers" },
  keywords: [
    "Arminus careers", "Arminus jobs", "IT jobs India",
    "contract IT jobs", "Ceipal careers", "submit resume IT staffing",
  ]
};

const sideCards = [
  { icon: Users2,   value: "52+",       label: "Open Roles",       tone: "blue" },
  { icon: Sparkles, value: "Join Our",  label: "Team",             tone: "red"  },
  { icon: BarChart3,value: "Build Your",label: "Career",           tone: "blue" },
] as const;

export default function CareersPage() {
  return (
    <main>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero-v2 careers-hero">

        {/* LEFT ── copy */}
        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading careers-heading">
            Find current openings<br />
            through the{" "}
            <span className="hero-v2-blue">Arminus</span>
            <br />
            <span className="careers-gradient-text">careers portal.</span>
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            Discover exciting career opportunities across project, contract, and
            permanent roles. Apply easily through our portal and take the next
            step in your career.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="mailto:contactus@arminus.com?subject=Resume%20submission">
              Submit Resume <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="/contact">
              Contact Us
            </Link>
          </div>

        </div>

        {/* RIGHT ── photo + floating cards */}
        <div className="hero-v2-visual">
          <Image
            src={withSiteBasePath("/hero-art/dots-grid.png")}
            alt="" aria-hidden="true"
            width={220} height={180}
            className="hero-v2-dotgrid"
          />

          <div className="hero-v2-photo-wrap">
            <span className="hero-v2-blob" aria-hidden="true" />
            <CareersHeroLottie />
          </div>

          {/* Floating stat cards */}
          <div className="careers-side-cards">
            {sideCards.map((card) => {
              const Icon = card.icon;
              return (
                <div className={`careers-side-card ${card.tone === "red" ? "careers-side-card-red" : ""}`} key={card.label}>
                  <span className={`careers-side-icon ${card.tone === "red" ? "careers-side-icon-red" : ""}`}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="careers-side-value">{card.value}</div>
                    <div className="careers-side-label">{card.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ribbon inside section — clipped naturally by section overflow:hidden */}
        <Image
          src={withSiteBasePath("/hero-art/bottom-ribbon.png")}
          alt="" aria-hidden="true"
          width={480} height={260}
          className="hero-v2-swoosh careers-swoosh"
        />

      </section>

      {/* ══════════════════ SEARCH + JOBS ══════════════════ */}
      <CeipalWidget />

    </main>
  );
}
