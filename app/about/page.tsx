import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Building2, Globe2, UsersRound, ArrowRight, Users, MapPin, Briefcase } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "About Arminus Software",
  description:
    "Learn about Arminus Software, a manpower consulting and IT staffing company serving IT, Telecom, Automotive, and Insurance hiring across India, USA, and Europe.",
  alternates: { canonical: "https://arminus.co.in/about" },
  keywords: [
    "Arminus Software", "manpower consulting company", "IT staffing company India",
    "technology recruitment agency", "global staffing company", "HR staffing firm"
  ]
};

const sideCards = [
  { icon: Briefcase, value: "15+",    label: "Years Active",   tone: "blue" },
  { icon: Users,     value: "150+",   label: "Clients Served", tone: "red"  },
  { icon: MapPin,    value: "3",      label: "Cities",         tone: "blue" },
] as const;

const footprint = [
  [Building2, "Kolkata",      "Bengal Eco Intelligent Park, Sector V, Salt Lake City."],
  [Building2, "Gurugram",     "JMD Megapolis, Sohna Road, Gurugram."],
  [Building2, "Bengaluru",    "HSR Layout 5th Sector, Bengaluru."],
  [Globe2,    "USA and Europe","Operations that support India, USA, and Europe-facing work."],
];

const valueCards = [
  [UsersRound, "Team-first delivery", "Delivery feels collaborative, responsive, and practical."],
  [Award,      "Long-view support",   "The firm balances immediate hiring support with long-term trust."],
  [Globe2,     "Cross-market reach",  "Content and structure support both local and global staffing conversations."],
];

export default function AboutPage() {
  return (
    <main>
      <section className="hero-v2 inner-hero about-layer-fix">

        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading inner-heading">
            We are <span className="hero-v2-blue">Arminus</span> —<br />
            <span className="inner-gradient-text">your IT staffing partner.</span>
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            Two decades of placing the right talent across contract, permanent, and executive
            roles in India and the USA.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="/services">
              Our Services <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="/contact">
              Contact Us
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
            <Image
              src={withSiteBasePath("/team-banner.jpg")}
              alt="Arminus team collaborating"
              fill priority
              sizes="52vw"
              className="hero-v2-photo"
            />
          </div>
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

        <Image
          src={withSiteBasePath("/hero-art/bottom-ribbon.png")}
          alt="" aria-hidden="true"
          width={480} height={260}
          className="hero-v2-swoosh inner-swoosh"
        />
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="info-band">
              <div className="contact-card">
                <h3>Founded in 2009</h3>
                <p>A staffing practice shaped around the realities of tech-led hiring.</p>
              </div>
              <div className="contact-card">
                <h3>Multi-location team</h3>
                <p>Delivery support spans Kolkata, Gurugram, Bengaluru, and offshore-facing work.</p>
              </div>
              <div className="contact-card">
                <h3>Business focus</h3>
                <p>IT, Telecom, Automotive, Insurance, and adjacent enterprise hiring needs.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-soft">
        <div className="container split-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Story</span>
              <h2 className="section-title">Collective strength, practical delivery.</h2>
              <p className="section-copy">
                The original "Power of Us" idea becomes a cleaner visual and editorial system here: the team, the
                process, and the service promise work together instead of competing for attention.
              </p>
              <p className="section-copy">
                That approach keeps the brand readable while still supporting actual hiring conversations, candidate
                support, and service discovery.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="contact-meta-grid">
              {valueCards.map(([Icon, title, copy]) => {
                const TypedIcon = Icon as React.ElementType;
                return (
                  <div className="detail-card" key={title as string}>
                    <span className="icon-badge" aria-hidden="true">
                      <TypedIcon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{title as string}</h3>
                    <p>{copy as string}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Operating Footprint</span>
            <h2 className="section-title">A staffing partner across business regions.</h2>
          </Reveal>
          <div className="grid-4" style={{ marginTop: 34 }}>
            {footprint.map(([Icon, title, copy], index) => {
              const TypedIcon = Icon as React.ElementType;
              return (
                <Reveal delay={index * 0.05} key={title as string}>
                  <article className="feature-card">
                    <span className="feature-card-icon" aria-hidden="true">
                      <TypedIcon size={22} strokeWidth={2.1} />
                    </span>
                    <h3>{title as string}</h3>
                    <p>{copy as string}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
