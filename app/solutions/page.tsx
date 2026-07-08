import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";

export const metadata: Metadata = {
  title: "IT Staffing Solutions | Permanent, Contract, Executive Search",
  description:
    "Five B2B talent solutions: permanent placement, flexible staffing & compliance, contract-to-hire, Gov-Tech & large-scale deployments, and executive search. Trusted by Big 4 consulting firms across India.",
  keywords: [
    "permanent placement services India", "flexible staffing India", "contract to hire staffing",
    "Gov-Tech staffing India", "executive search India", "IT manpower solutions",
    "Big 4 staffing partner India", "contract staffing compliance India", "CXO search India",
  ],
  alternates: { canonical: "https://arminus.co.in/solutions" },
};

const services = [
  { n: "01", t: "Permanent Placement", tag: "Strategic Talent Acquisition", accent: "blue", d: "We identify leaders and specialists who align with your technical roadmap and corporate culture. Access to our proprietary, 17-year curated database ensures precision matching for IT, Telecom, and Automotive sectors. Our services also meet the offshore requirements of our clients who need highly skilled professionals to be deployed across the world to execute projects within desired deadlines.", tags: ["IT", "Telecom", "Automotive", "Offshore"] },
  { n: "02", t: "Flexible Staffing & Compliance", tag: "Operational Agility", accent: "coral", d: "Scale your workforce seamlessly while we manage the complexities of the employment lifecycle. Arminus acts as the legal employer — taking over all HR management tasks including total management of payroll, statutory benefits, and HR administration.", tags: ["Legal employer", "Payroll", "Statutory benefits"] },
  { n: "03", t: "Contract-to-Hire (C2H)", tag: "The Performance-First Framework", accent: "teal", d: "Evaluate a candidate's technical proficiency and cultural fit in a real-world environment before making a long-term commitment. This service provides effective recruitment for companies who like to select candidates on the basis of first-hand experience.", tags: ["Try-before-hire", "Cultural fit", "Real-world"] },
  { n: "05", t: "Executive Search & Board Advisory", tag: "Discretion-Led Identification", accent: "purple", d: "Discretion-led identification of CXO and Board-level talent. Our network extends not just to core senior software professionals but to various other functions like Finance and HR. We have a proven track record of placing board-level executives in the most reputed multinational companies, especially within the Global IT ecosystem.", tags: ["CXO", "Board-level", "Finance & HR"] },
];

const industries = [
  { t: "Information Technology", d: "Engineering, cloud, data & AI/ML talent across product and services companies.", badge: "Core", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&q=80&auto=format&fit=crop" },
  { t: "Telecom", d: "Network, RF and infrastructure specialists across pan-India operators.", badge: "Core", img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600&q=80&auto=format&fit=crop" },
  { t: "Automotive", d: "Product, manufacturing & quality leaders across OEMs and Tier-1 suppliers.", badge: "Core", img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format&fit=crop" },
  { t: "Finance & GCC", d: "Finance, HR and shared-services functions for global captives and GCCs.", badge: "Growth", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop" },
];

const steps = [
  { n: "1", t: "Calibrate", d: "We map the role to your technical roadmap and culture before a single CV is shared.", s: "First 48 Hours" },
  { n: "2", t: "Source", d: "AI-assisted search across our 17-year curated database and active network.", s: "Week One" },
  { n: "3", t: "Assess", d: "Human-led screening for proficiency, fit and intent — honest conversations, both ways.", s: "Week Two" },
  { n: "4", t: "Place & support", d: "We stay close through onboarding and beyond — including day-60 check-ins.", s: "Post-Hire" },
];

const govProjects = ["Skill Development", "Sanitation", "Agriculture", "Niti Ayog", "Social Services & Education"];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        accent="blue"
        eyebrow="B2B · Strategic Talent Solutions"
        title={<>Enterprise staffing, engineered for <span className="ital blue">velocity.</span></>}
        lede="From individual specialists to multi-state Gov-Tech deployments — five service lines built around the entire talent lifecycle, powered by AI-driven precision and deep human insight."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <Link href="/contact" className="btn btn-blue">Submit a hiring brief</Link>
        </div>
      </PageHero>

      {/* SERVICE LINES */}
      <section className="section" id="services" style={{ paddingTop: "56px" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Our services"
            title={<>Everything from a single specialist to a <span className="ital">multi-state deployment.</span></>}
            sub="Built around the entire talent lifecycle — permanent, flexible, contract-to-hire, Gov-Tech, and executive search."
          />
          <div className="services">
            {services.map(s => (
              <Reveal key={s.n}>
                <article className={`svc-card ${s.accent}`}>
                  <div className="cap-tag">{s.tag}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <div className="svc-tags">{s.tags.map(tg => <span key={tg}>{tg}</span>)}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOV-TECH */}
      <section className="sd-row sd-accent" id="govtech">
        <div className="wrap">
          <div className="sd-grid">
            <div className="sd-text">
              <div className="sec-eyebrow"><span className="ln" /> Gov-Tech &amp; Large Scale Initiatives</div>
              <h2 className="sd-title">Powering <span className="ital" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--blue)" }}>national transformation.</span></h2>
              <p className="sd-body">A trusted partner to the Big 4 (PWC, Deloitte, KPMG, EY), QCI (Quality Council of India) and ICC (Indian Chamber of Commerce), Arminus deploys specialized manpower for critical public sector projects. We have over 200 persons on our payroll working with various Govt projects like Skill Development, Sanitation, Agriculture, Niti Ayog, Social Services, and Education across 10+ Indian states.</p>
              <ul className="sd-bullets">
                <li><span className="bcheck">✓</span>200+ on Gov payroll</li>
                <li><span className="bcheck">✓</span>10+ states deployed</li>
                <li><span className="bcheck">✓</span>Big 4 trusted partner</li>
                <li><span className="bcheck">✓</span>QCI &amp; ICC empanelled</li>
              </ul>
              <Link href="/contact" className="btn btn-blue">Discuss a public-sector mandate</Link>
            </div>
            <div className="sd-art">
              <div className="sd-ico">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"/></svg>
              </div>
              <div className="sd-card">
                <div className="sd-card-head"><span>Active Gov programs</span><span className="dot-live">●</span></div>
                <div className="mm-content">
                  {govProjects.map(p => (
                    <div className="mm-row" key={p}><span>{p}</span><span className="mm-pill ok">Active</span></div>
                  ))}
                  <div className="mm-stat-row">
                    <div className="mm-stat"><div className="v">200+</div><div className="l">On Gov-Tech payroll</div></div>
                    <div className="mm-stat"><div className="v">10+</div><div className="l">States deployed</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section tint" id="industries">
        <div className="wrap">
          <SectionHead
            eyebrow="Sectors we serve"
            title={<>Deep benches in the industries that <span className="ital">move India.</span></>}
            sub="17+ years of specialist recruitment across IT, Telecom, Automotive — and a fast-growing finance and GCC practice."
          />
          <Reveal stagger className="ind-grid">
            {industries.map(i => (
              <article className="ind" key={i.t}>
                <div className="photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.img} alt={i.t} />
                  <span className="badge">{i.badge}</span>
                </div>
                <div className="body">
                  <h4>{i.t}</h4>
                  <p>{i.d}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section process pb-0">
        <div className="wrap">
          <SectionHead
            eyebrow="How we work"
            title={<>A high-velocity process, <span className="ital">built on relationships.</span></>}
            sub="Generative AI does the paperwork so our recruiters can spend their time where it matters."
          />
          <Reveal stagger className="steps">
            {steps.map(s => (
              <div className="step-card" key={s.n}>
                <div className="step-card-top"><div className="step-when">{s.s}</div></div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <BigCTA
        heading={<>Hand us your<br />most <span className="ital">critical hires.</span></>}
        lede="Share a brief in three minutes. We'll come back within one business day with our approach, a research plan, and a market read on the role."
        primary={{ href: "/contact", label: "Submit a hiring brief" }}
        secondary={{ href: "/contact", label: "Book a 20-min call" }}
      />
    </main>
  );
}
