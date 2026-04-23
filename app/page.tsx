import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  Clock3,
  Globe2,
  GraduationCap,
  Handshake,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { LottieMoment } from "@/components/LottieMoment";
import { Magnetic, ParallaxLayer, Reveal } from "@/components/Motion";

const services = [
  {
    title: "IT Staffing",
    copy: "Specialist recruiters for permanent, contractual, and project-based technology hiring.",
    icon: UsersRound,
    id: "it-staffing"
  },
  {
    title: "Executive Search",
    copy: "Confidential senior hiring for department heads, VPs, CXOs, directors, and strategic leaders.",
    icon: SearchCheck,
    id: "executive"
  },
  {
    title: "Contract Staffing",
    copy: "Flexible deployment models for short-term, long-term, onsite, offshore, and hybrid teams.",
    icon: Clock3,
    id: "contract"
  },
  {
    title: "Training",
    copy: "Recruitment, technology, and soft-skills training that strengthens employability and delivery.",
    icon: GraduationCap,
    id: "training"
  }
];

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
        <div className="logo-sweep" />
        <div className="container hero-grid">
          <div>
            <Reveal>
              <span className="eyebrow">Global IT Staffing</span>
              <h1>
                Hire sharper tech teams with the <span>Power of Us.</span>
              </h1>
              <p className="hero-copy">
                Arminus connects employers with qualified IT, Telecom, Automotive, and Insurance talent through
                permanent hiring, contract staffing, executive search, and workforce support across India, USA, and
                Europe.
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
                  ["4", "Office regions"],
                  ["24h", "Support mindset"]
                ].map(([value, label]) => (
                  <div className="proof-item" key={label}>
                    <div className="proof-value">{value}</div>
                    <div className="proof-label">{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <ParallaxLayer className="talent-orbit" distance={-42}>
            <div className="orbit-core">
              <div className="orbit-badge">
                <strong>360°</strong>
                <span>Hiring support from brief to onboarding</span>
              </div>
            </div>
            <div className="arc-card">
              <strong>Requirement</strong>
              <span>Role clarity, domain fit, hiring model, location, urgency.</span>
            </div>
            <div className="arc-card">
              <strong>Shortlist</strong>
              <span>Screened candidates matched to skills, attitude, and availability.</span>
            </div>
            <div className="arc-card">
              <strong>Deployment</strong>
              <span>Permanent, contract, onsite, offshore, and hybrid support.</span>
            </div>
          </ParallaxLayer>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Solutions</span>
            <h2 className="section-title">Workforce models built around hiring reality.</h2>
            <p className="section-copy">
              Arminus helps teams move from open requirements to onboarded talent with a practical mix of domain
              knowledge, recruiter reach, and flexible delivery models.
            </p>
          </Reveal>
          <div className="grid-4" style={{ marginTop: 38 }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal delay={index * 0.08} key={service.title}>
                  <Link className="card service-card" href={`/solutions#${service.id}`}>
                    <span className="icon-chip">
                      <Icon size={23} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
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
              <h2 className="section-title">A hiring journey that feels controlled from day one.</h2>
              <p className="section-copy">
                The new site turns Arminus’ operational process into a visible story: from requirements and sourcing to
                shortlist, interview movement, onboarding, and consultant support.
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
                Arminus operates from Kolkata, Gurugram, Bengaluru, USA, and Europe-facing entities, giving employers a
                practical partner for local, offshore, onsite, and hybrid hiring needs.
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
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80"
                alt="Recruitment team reviewing hiring pipeline"
              />
            </div>
            <div className="image-small">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Workforce planning discussion"
              />
            </div>
          </ParallaxLayer>
        </div>
      </section>

      <section className="section" style={{ background: "var(--soft-sky)" }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Why Arminus</span>
            <h2 className="section-title">Designed for serious hiring conversations.</h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 34 }}>
            {[
              [ShieldCheck, "Transparent control", "Regular reporting and clear communication across hiring movement."],
              [BrainCircuit, "Technology fluency", "Recruiters understand software, cloud, analytics, AI, DevOps, and enterprise delivery roles."],
              [Globe2, "Multi-location support", "Useful for organizations that need staffing support across multiple operating regions."],
              [BadgeCheck, "Qualified recruiters", "More than 80% of staff come from BE, BTech, or MBA backgrounds."],
              [Handshake, "Consultant care", "Payroll, joining, and support coordination are part of the staffing experience."],
              [Building2, "Enterprise mindset", "Built for long-term client relationships, not one-off resume forwarding."]
            ].map(([Icon, title, copy], index) => {
              const TypedIcon = Icon as typeof Sparkles;
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
            <h2 className="section-title">Client and consultant trust, cleaned up and made credible.</h2>
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
              <h2>Ready to make hiring move faster without losing quality?</h2>
              <p>
                Start with a role brief. Arminus can map the hiring model, shortlist path, and delivery support needed
                for your team.
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
