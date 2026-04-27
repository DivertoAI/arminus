import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  Globe2,
  Handshake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { LottieMoment } from "@/components/LottieMoment";
import { Magnetic, ParallaxLayer, Reveal } from "@/components/Motion";
import { withSiteBasePath } from "@/lib/site-path";
import { serviceItems } from "@/lib/services";

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

const industries = ["IT", "Telecom", "Automotive", "Insurance", "Cloud", "Data", "AI", "DevOps"];

const steps = [
  {
    title: "Requirement intelligence",
    copy: "Recruiters clarify skills, domain context, seniority, budget, location, and deployment model before sourcing begins."
  },
  {
    title: "Specialist sourcing",
    copy: "Arminus combines database depth, recruiter networks, and market outreach to identify relevant candidates faster."
  },
  {
    title: "Evaluation and shortlist",
    copy: "Profiles are screened for aptitude, commitment, communication, technical match, and practical joining readiness."
  },
  {
    title: "Onboarding support",
    copy: "The team supports interview movement, offer closure, joining, payroll coordination, and consultant care."
  }
];

const testimonials = [
  {
    quote:
      "Arminus has consistently delivered high quality candidates and provided strong support in bringing people into our teams.",
    name: "Venkata Ramana",
    role: "HR, Majesco"
  },
  {
    quote:
      "We look at Arminus as an extension of our office. They understand the requirement and help us get the right talent when needed most.",
    name: "Rajiv Das",
    role: "Capgemini"
  },
  {
    quote:
      "I was hired through Arminus for a reputed project and had a strong experience with timely support and professional coordination.",
    name: "Jyoti Kalbhor",
    role: "Consultant"
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy-block">
            <Reveal>
              <span className="eyebrow">Global IT Staffing</span>
              <h1>
                Hire technology talent with the <span>Power of Us.</span>
              </h1>
              <p className="hero-copy">
                Arminus is a manpower consulting and staffing partner for employers that need qualified technology,
                telecom, automotive, and insurance talent across permanent recruitment, contract staffing, executive
                search, and staff augmentation.
              </p>
              <div className="hero-actions">
                <Magnetic>
                  <Link className="button button-primary" href="/contact">
                    Hire Talent <ArrowRight size={18} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link className="button button-secondary" href="/careers">
                    Explore Jobs
                  </Link>
                </Magnetic>
              </div>
              <div className="hero-proof">
                {[
                  ["2009", "Founded"],
                  ["80+", "Recruitment team"],
                  ["India", "Kolkata, Gurugram, Bengaluru"],
                ].map(([value, label]) => (
                  <div className="proof-item" key={label}>
                    <div className="proof-value">{value}</div>
                    <div className="proof-label">{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <ParallaxLayer className="hero-visual" distance={-42}>
            <div className="hero-feature image-frame hero-feature-prominent">
              <Image
                src={withSiteBasePath("/arminus/team-banner.jpg")}
                alt="Arminus recruitment team"
                fill
                sizes="(max-width: 980px) 100vw, 58vw"
                priority
              />
            </div>
          </ParallaxLayer>
        </div>
      </section>

      <section className="section">
        <div className="container home-solutions">
          <div>
            <Reveal>
              <span className="eyebrow">Solutions</span>
              <h2 className="section-title">Recruitment services built around real hiring needs.</h2>
              <p className="section-copy">
                Arminus helps employers move from open requirements to shortlisted, interviewed, and onboarded talent
                through staffing, executive hiring, contract deployment, resume advisory, and training support.
              </p>
            </Reveal>
          </div>
          <div className="solutions-grid">
            {serviceItems.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal delay={index * 0.08} key={service.title}>
                  <Link className="home-solution-card" href={`/services/${service.slug}`}>
                    <span className="home-solution-accent" aria-hidden="true" />
                    <div className="home-solution-head">
                      <span className="service-icon-chip" aria-hidden="true">
                        <Icon size={24} strokeWidth={2.1} />
                      </span>
                      <span className="home-solution-tag">{service.kicker}</span>
                    </div>
                    <h3>{service.shortTitle}</h3>
                    <p>{service.summary}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container process-grid">
          <Reveal>
            <div className="lottie-panel">
              <LottieMoment />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">Talent Pipeline</span>
              <h2 className="section-title">From manpower brief to joined candidate.</h2>
              <p className="section-copy">
                A clear, controlled process from open requirement to joined candidate — built around how the best
                employers actually hire.
              </p>
            </Reveal>
            <div className="steps" style={{ marginTop: 30 }}>
              {steps.map((step, index) => (
                <Reveal delay={index * 0.06} key={step.title}>
                  <div className="step">
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <Reveal>
              <span className="eyebrow">Global Delivery</span>
              <h2 className="section-title">India delivery strength with international reach.</h2>
              <p className="section-copy">
                Arminus operates across Kolkata, Gurugram, Bengaluru, USA, and Europe-facing entities, giving employers
                a practical partner for local, offshore, onsite, and hybrid staffing needs.
              </p>
              <div className="badge-list">
                {industries.map((industry) => (
                  <span className="badge" key={industry}>
                    {industry}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <ParallaxLayer className="image-stack" distance={58}>
            <div className="image-main">
              <Image
                src={withSiteBasePath("/arminus/home-about-banner.jpg")}
                alt="Arminus home about banner"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
              />
            </div>
            <div className="image-small">
              <Image
                src={withSiteBasePath("/arminus/banner-one.jpg")}
                alt="Arminus banner one"
                fill
                sizes="(max-width: 980px) 100vw, 32vw"
              />
            </div>
          </ParallaxLayer>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our Team</span>
            <h2 className="section-title">People behind every placement.</h2>
            <p className="section-copy">
              Arminus has operated since 2009 with a recruitment team that understands technology, telecom, automotive,
              and insurance hiring from the inside.
            </p>
          </Reveal>
          <div className="image-strip" style={{ marginTop: 34 }}>
            {[
              ["/arminus/team-banner.jpg", "Arminus recruitment team"],
              ["/arminus/team-banner-one.jpg", "Arminus team at work"],
              ["/arminus/home-about-banner.jpg", "Arminus office"]
            ].map(([src, label], index) => (
              <Reveal delay={index * 0.06} key={label as string}>
                <div className="image-frame">
                  <Image src={withSiteBasePath(src as string)} alt={label as string} fill sizes="(max-width: 980px) 100vw, 30vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--soft-sky)" }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Why Arminus</span>
            <h2 className="section-title">Practical staffing support for serious hiring conversations.</h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 34 }}>
            {[
              [ShieldCheck, "Process clarity", "Requirement, shortlist, interview, onboarding, and support shown as one controlled path."],
              [BrainCircuit, "Technology fluency", "Recruiters understand software, cloud, analytics, AI, DevOps, and enterprise delivery roles."],
              [Globe2, "Multi-location support", "Useful for organizations hiring across India, USA, and Europe-linked operations."],
              [BadgeCheck, "Qualified recruiters", "Recruitment strength is presented as a core Arminus operating advantage."],
              [Handshake, "Consultant care", "Payroll, joining, and support coordination are part of the staffing experience."],
              [Building2, "Enterprise mindset", "The page is designed for employer confidence, not just resume forwarding."]
            ].map(([Icon, title, copy], index) => {
              const TypedIcon = Icon as LucideIcon;
              return (
                <Reveal delay={index * 0.05} key={title as string}>
                  <div className="card service-card">
                    <span className="icon-chip">
                      <TypedIcon size={23} />
                    </span>
                    <h3>{title as string}</h3>
                    <p>{copy as string}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Proof</span>
            <h2 className="section-title">Client and consultant trust, made readable.</h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 34 }}>
            {testimonials.map((testimonial, index) => (
              <Reveal delay={index * 0.08} key={testimonial.name}>
                <article className="card testimonial">
                  <p>“{testimonial.quote}”</p>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <h2>Ready to turn an open requirement into a shortlist?</h2>
              <p>
                Start with the role, location, hiring model, urgency, and skills. Arminus can map the right staffing
                path and move the requirement into action.
              </p>
              <Link className="button button-secondary" href="/contact">
                Talk to Arminus <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
