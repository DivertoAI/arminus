import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Nubo Native Platform | Private Cloud & Managed Kubernetes India",
  description:
    "NNP provides a Public Cloud experience on private infrastructure. Managed Kubernetes, DevSecOps & GitOps, AI-ready data management — reduce TCO while accelerating software delivery.",
  keywords: [
    "private cloud India", "managed Kubernetes India", "DevSecOps platform India",
    "sovereign cloud India", "cloud infrastructure India", "AI-ready platform",
    "private cloud alternative", "NNP Nubo", "IT infrastructure India", "GitOps India",
  ],
  alternates: { canonical: "https://arminus.co.in/nubo" },
};

const features = [
  { icon: "🖧", t: "Managed Kubernetes", d: "AI-enabled deep observability and close loop automation." },
  { icon: "⚡", t: "Accelerated Software Dev", d: "Low-Code utility, SDLC AI Agents, and pre-built frameworks." },
  { icon: "⑂", t: "DevSecOps & GitOps", d: "End-to-end lifecycle automation." },
  { icon: "🗄", t: "Data Management", d: "Specialized platform for AI/ML solution development." },
];

const why = [
  { t: "Reduce TCO", d: "Eliminate hyperscaler premiums while maintaining cloud-native development workflows and toolchains." },
  { t: "AI-Ready", d: "Pre-configured for ML pipelines, GPU workloads, and LLM deployment at enterprise scale." },
  { t: "Compliance-First", d: "Data sovereignty and regulatory compliance built into the platform architecture from day one." },
];

export default function NuboPage() {
  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="Nubo Native Platform (NNP)"
        title={<>The Sovereign <span className="ital blue">Private Cloud</span> Alternative.</>}
        lede="NNP provides a Public Cloud experience on private infrastructure, reducing TCO while enabling AI-ready development."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <Link href="/contact" className="btn btn-blue">Talk to our platform team <span className="arrow">→</span></Link>
          <Link href="#features" className="btn btn-ghost">Explore features</Link>
        </div>
      </PageHero>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="wrap">
          <SectionHead
            eyebrow="Platform capabilities"
            title={<>Everything your engineering team <span className="ital">needs to ship.</span></>}
            sub="Four integrated capabilities that cover the full software lifecycle — from infrastructure to deployment to data."
          />
          <Reveal stagger className="nubo-grid">
            {features.map(f => (
              <article className="nubo-card" key={f.t}>
                <div className="nubo-icon">{f.icon}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY NNP */}
      <section className="section-soft section">
        <div className="wrap">
          <div className="nubo-why-grid">
            <Reveal>
              <div>
                <div className="sec-eyebrow"><span className="ln" /> Why NNP</div>
                <h2 className="sec-title">Built for India&apos;s <span className="ital">AI-first enterprises.</span></h2>
                <p className="sec-sub" style={{ marginTop: "18px" }}>
                  As enterprises accelerate AI adoption, the need for sovereign, cost-efficient, and developer-friendly
                  infrastructure has never been greater. NNP bridges the gap between public cloud convenience and
                  private infrastructure control — giving Indian enterprises the best of both worlds.
                </p>
              </div>
            </Reveal>
            <Reveal stagger className="nubo-why-cards">
              {why.map(w => (
                <div className="nubo-why-card" key={w.t}>
                  <h4>{w.t}</h4>
                  <p>{w.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="nnp-cta-block">
              <h2>Ready to explore NNP?</h2>
              <p>Talk to our platform team about deployment models, pricing, and integration with your existing stack.</p>
              <Link href="/contact" className="btn btn-blue">Schedule a call <span className="arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
