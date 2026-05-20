import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Server, Zap, GitBranch, Database, TrendingDown, BrainCircuit, Shield } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";
import { ContactHeroLottie } from "@/components/ContactHeroLottie";

export const metadata: Metadata = {
  title: "Nubo Native Platform — Private Cloud Solutions",
  description:
    "NNP provides a Public Cloud experience on private infrastructure, reducing TCO while enabling AI-ready development for modern enterprises.",
  alternates: { canonical: "https://arminus.co.in/nubo" }
};

const features = [
  {
    icon: Server,
    title: "Managed Kubernetes",
    copy: "AI-enabled deep observability and close-loop automation for container orchestration at scale."
  },
  {
    icon: Zap,
    title: "Accelerated Software Dev",
    copy: "Low-Code utility, SDLC AI Agents, and pre-built frameworks to ship faster without sacrificing quality."
  },
  {
    icon: GitBranch,
    title: "DevSecOps & GitOps",
    copy: "End-to-end lifecycle automation with security baked in — from code commit to production deployment."
  },
  {
    icon: Database,
    title: "Data Management",
    copy: "Specialized platform for AI/ML solution development with governed, scalable data infrastructure."
  }
] as const;

const whyCards = [
  {
    icon: TrendingDown,
    title: "Reduce TCO",
    copy: "Eliminate hyperscaler premiums while maintaining cloud-native development workflows."
  },
  {
    icon: BrainCircuit,
    title: "AI-Ready",
    copy: "Pre-configured for ML pipelines, GPU workloads, and LLM deployment at enterprise scale."
  },
  {
    icon: Shield,
    title: "Compliance-First",
    copy: "Data sovereignty and regulatory compliance built into the platform architecture."
  }
] as const;

const sideCards = [
  { value: "FinOps", label: "TCO Reduction", tone: "blue" },
  { value: "K8s",   label: "Orchestration",  tone: "red"  },
  { value: "AI",    label: "Ready",           tone: "blue" },
] as const;

export default function NuboPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero-v2 inner-hero">
        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading inner-heading">
            The Sovereign{" "}
            <span className="hero-v2-blue">Private Cloud</span> Alternative.
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            NNP provides a Public Cloud experience on private infrastructure — reducing TCO while
            enabling AI-ready development.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="/contact">
              Talk to Our Team <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="#features">
              Learn More
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
            <ContactHeroLottie />
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

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Platform Capabilities</span>
            <h2 className="section-title">Everything your enterprise cloud needs.</h2>
          </Reveal>
          <div className="grid-4" style={{ marginTop: 36 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal delay={index * 0.06} key={feature.title}>
                  <article className="feature-card">
                    <span className="feature-card-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why NNP ── */}
      <section className="section-soft">
        <div className="container split-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Platform</span>
              <h2 className="section-title">Built for India&apos;s AI-first enterprises.</h2>
              <p className="section-copy">
                As enterprises accelerate AI adoption, the need for sovereign, cost-efficient, and
                developer-friendly infrastructure has never been greater. NNP bridges the gap between
                public cloud convenience and private infrastructure control.
              </p>
              <Link className="button button-primary" href="/contact" style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Schedule a Call <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="contact-meta-grid">
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div className="detail-card" key={card.title}>
                    <span className="icon-badge" aria-hidden="true">
                      <Icon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="nnp-cta">
              <h2>Ready to explore NNP?</h2>
              <p>
                Talk to our platform team about deployment models, pricing, and integration with your
                existing stack.
              </p>
              <Link className="button" href="/contact" style={{ background: "#fff", color: "#1b4fd8", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Schedule a Call <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
