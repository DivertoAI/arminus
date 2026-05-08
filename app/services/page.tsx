import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";
import { serviceItems } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Arminus service lines across HR staffing, executive search, resume writing, and training.",
  alternates: { canonical: "https://arminus.co.in/services" }
};

const sideCards = [
  { icon: Users,    value: "HR",      label: "Staffing",       tone: "blue" },
  { icon: Award,    value: "Exec",    label: "Search",         tone: "red"  },
  { icon: BookOpen, value: "Skill",   label: "Training",       tone: "blue" },
] as const;

export default function ServicesPage() {
  return (
    <main>
      <section className="hero-v2 inner-hero">

        <div className="hero-v2-copy">
          <h1 className="hero-v2-heading inner-heading">
            End-to-end <span className="hero-v2-blue">IT staffing</span><br />
            <span className="inner-gradient-text">and workforce services.</span>
          </h1>

          <span className="hero-v2-redline" aria-hidden="true" />

          <p className="hero-v2-sub">
            Four core service lines, each with its own delivery model: HR Staffing,
            Executive Search, Resume Writing, and Training.
          </p>

          <div className="hero-v2-actions">
            <Link className="button button-primary" href="#services-grid">
              Explore Services <ArrowRight size={18} />
            </Link>
            <Link className="button button-outline" href="/contact">
              Get in Touch
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
              src={withSiteBasePath("/banner-one.jpg")}
              alt="Arminus services"
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

      <section className="section" id="services-grid">
        <div className="container services-overview-grid">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal delay={index * 0.06} key={service.slug}>
                <Link className="service-overview-card" href={`/services/${service.slug}`}>
                  <span className="feature-card-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <p className="service-kicker">{service.kicker}</p>
                  <h2>{service.shortTitle}</h2>
                  <p>{service.summary}</p>
                  <span className="service-overview-link">
                    View service page <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
