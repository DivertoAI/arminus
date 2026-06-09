import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TrustedBy } from "@/components/TrustedBy";
import { NetworkSvg } from "@/components/NetworkSvg";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";
import { MatchConsole } from "@/components/MatchConsole";
import { withSiteBasePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Arminus | IT Staffing & Recruitment Company India",
  description:
    "Arminus is a pan-India IT staffing company with 17+ years experience. We deliver permanent placement, contract staffing, executive search & Gov-Tech deployments across Kolkata, Gurugram & Bangalore.",
  keywords: [
    "IT staffing company India", "IT recruitment agency India", "permanent placement India",
    "contract staffing services India", "executive search India", "manpower consulting India",
    "IT staff augmentation", "Gov-Tech staffing India", "technology recruitment India", "offshore staffing India",
  ],
  alternates: { canonical: "https://arminus.co.in" },
};

const pillars = [
  { n: "01", t: "17 years curated", d: "Proprietary database refined over nearly two decades of specialist recruitment.", k: "Precision matching" },
  { n: "02", t: "Big 4 trusted", d: "PWC, Deloitte, KPMG, EY — alongside QCI and the Indian Chamber of Commerce.", k: "Partners of record" },
  { n: "03", t: "Pan-India reach", d: "200+ professionals on payroll across 10+ states, including Niti Ayog & national programs.", k: "10+ states" },
  { n: "04", t: "Offshore capable", d: "Specialists deployed globally to execute projects within agreed delivery windows.", k: "Global execution" },
];

const leaders = [
  { name: "Pankaj Kathuria", role: "MD & CEO", bio: "44 years architecting global software. ODCs for HBO Singapore, Puerto Rico Telephone. Thapar · IIM Calcutta.", img: "/pankaj.jpg" },
  { name: "Ashok Jindal", role: "Director — Operations", bio: "40 years. Senior leadership at Tata, PCL. Multi-million-dollar deals for Tata Motors, Mahindra, HAL. Runs NCR.", img: "/ashok.jpg" },
  { name: "Tania Kathuria", role: "Director — Strategy & Growth", bio: "Global GTM at Accenture and TCS. Scaling Arminus's international expansion. NMIMS Mumbai MBA.", img: "/tania.jpg" },
];

const clientTestimonials = [
  { q: "Today, we look at Arminus as an extension of our office. I really appreciate the amount of effort Arminus has put in to understand it and get us the appropriate talent when it needed the most.", n: "Rajiv Das", r: "Capgemini" },
  { q: "We have received excellent service from Arminus over some very difficult assignments. They have clearly understood our briefs, consistently delivered high quality candidates and provided great support and assistance in bringing people on board.", n: "Venkata Ramana", r: "HR · Majesco" },
  { q: "It was a REAL JOY working with Arminus. They are incredibly responsive and operate at the highest level of professionalism. They are very knowledgeable in all aspects of software development and only have your best interest in mind when working on a project.", n: "Jeff Stealey", r: "ICI Information Centers International" },
];

const consultantTestimonials = [
  { q: "I was hired through Arminus Software for a project with PwC and DFID and it was indeed an amazing work opportunity. They place individuals in good reputed companies. I was on their payroll and faced absolutely no difficulties during the one year tenure. Given a chance I would love to work with them again.", n: "Jyoti Kalbhor", r: "Placed at PwC & DFID" },
  { q: "Arminus Software is a wonderful place to work, to learn and grow as a professional. The company stands out from the crowd in terms of environment, procedures and protocols. Every individual is heard and is given an apt chance to grow.", n: "Surangama Chakraborty", r: "Arminus Consultant" },
  { q: "If you are a performer, you will be promoted. Work life balance is there. Transparent incentive policies, quarterly paid. The best part is I have earned incentives almost double of CTC. Are you a recruiter looking for change in Kolkata's market? Join Arminus.", n: "Mehurnnesa Khatun", r: "Recruiter · Kolkata" },
  { q: "Happy employee is not a myth any more. Flexible timings, good co-workers, cooperative top management, good workplace.", n: "Mamta Kumar", r: "Arminus Employee" },
  { q: "I was hired through Arminus to work for Cognizant. The best thing is that Arminus never let me feel that I was not part of Arminus. Every small thing was taken care of. All issues are addressed within 24 hours. I was confirmed with Cognizant in their permanent role after working for a year with Arminus.", n: "Laxman Belupukonda", r: "Placed at Cognizant" },
];

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <Reveal>
                <h1 className="h-display">
                  Empowering Innovation Through{" "}
                  <span className="ital">Top Talent.</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="h-sub">
                  Headquartered in Kolkata with a powerful presence in Gurugram and Bangalore,
                  Arminus combines AI-driven precision with deep human insight. We deliver
                  high-velocity, pan-India staffing solutions for the world&apos;s fastest-growing economy.
                </p>
              </Reveal>
              <Reveal>
                <div className="hero-cta">
                  <Link href="/solutions" className="btn btn-blue">
                    Explore Solutions <span className="arrow">→</span>
                  </Link>
                  <Link href="/careers" className="btn btn-ghost">Browse open roles</Link>
                </div>
              </Reveal>
              <Reveal stagger className="hero-stats">
                <div className="stat"><span className="num">17+</span><div className="lbl">Years of recruiting</div></div>
                <div className="stat"><span className="num">175+</span><div className="lbl">Clients served</div></div>
                <div className="stat"><span className="num">15K+</span><div className="lbl">Professionals placed</div></div>
                <div className="stat"><span className="num">600K+</span><div className="lbl">Active talent pool</div></div>
              </Reveal>
            </div>
            <div className="hero-art">
              <div className="hero-orb"><NetworkSvg /></div>
              <div className="photo-main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop" alt="Strategic talent professional" className="hero-photo" />
                <div className="hub-badge">
                  <span className="hub-lbl">Delivery hubs</span>
                  <span className="hub-cities">Kolkata · Gurugram · Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* ── TRUST PILLARS ── */}
      <section className="section" id="trust">
        <div className="wrap">
          <SectionHead
            eyebrow="Trust pillars"
            title={<>Why teams hand us their <span className="ital">most critical hires.</span></>}
            sub="A 17-year track record across IT, Telecom, Automotive, and large-scale Government initiatives — built on precision, discretion, and accountability."
          />
          <Reveal stagger className="pillar-grid">
            {pillars.map(p => (
              <article key={p.n} className="pillar">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="pillar-key">{p.k}</div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── POWER OF US ── */}
      <section className="section pow-section" id="power-of-us">
        <div className="wrap">
          <Reveal className="pow-grid">
            <div>
              <div className="sec-eyebrow"><span className="ln" /> Our philosophy</div>
              <h2 className="sec-title pow-title">The Power of <span className="ital">Us.</span></h2>
              <p className="pow-lede">
                The &lsquo;Power of Us&rsquo; is a fusion of technology and empathy. By empowering our teams with
                generative AI tools, we spend less time on paperwork and more time on what matters —
                building relationships with India&apos;s top professionals.
              </p>
              <div className="pow-tagline">
                <span className="pow-tagline-pre">Powered by Humans.</span>
                <span className="pow-tagline-post">Accelerated by AI.</span>
              </div>
            </div>
            <div className="pow-art">
              <MatchConsole />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LEADERSHIP TEASER ── */}
      <section className="section leader-teaser-section" id="leadership">
        <div className="wrap">
          <SectionHead
            eyebrow="Leadership"
            title={<>Built by people who&apos;ve <span className="ital">done it before.</span></>}
            sub="Three leaders. 84+ combined years of building global delivery, large account operations, and revenue engines that scale across markets."
          />
          <Reveal stagger className="lt-grid">
            {leaders.map(l => (
              <article className="lt-card" key={l.name}>
                <div className="lt-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withSiteBasePath(l.img)} alt={l.name} className="lt-img" />
                  <div className="lt-ovl" />
                </div>
                <div className="lt-body">
                  <div className="lt-role">{l.role}</div>
                  <h3>{l.name}</h3>
                  <p>{l.bio}</p>
                </div>
              </article>
            ))}
          </Reveal>
          <Reveal className="lt-cta-row">
            <Link href="/about" className="btn-link">Read full leadership profiles →</Link>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Testimonials"
            title={<>The kind of <span className="ital">long relationships</span> we build.</>}
            sub="Most of our clients come from referrals — and most of our candidates come back to us for their next move."
          />

          {/* Client testimonials */}
          <div className="test-group-label">What our clients say</div>
          <Reveal stagger className="test-grid">
            {clientTestimonials.map((t, i) => (
              <div className="test" key={i}>
                <div className="stars">★★★★★</div>
                <p className="q">{t.q}</p>
                <div className="test-foot">
                  <div>
                    <div className="name">{t.n}</div>
                    <div className="role">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Consultant / placed professional testimonials */}
          <div className="test-group-label" style={{ marginTop: "48px" }}>What our placed professionals say</div>
          <Reveal stagger className="test-grid">
            {consultantTestimonials.map((t, i) => (
              <div className="test" key={i}>
                <div className="stars">★★★★★</div>
                <p className="q">{t.q}</p>
                <div className="test-foot">
                  <div>
                    <div className="name">{t.n}</div>
                    <div className="role">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <BigCTA
        heading={<>Ready to build<br />your <span className="ital">dream team?</span></>}
        lede="Share a brief in three minutes. We'll come back within one business day with our approach, a research plan, and a market read on the role."
        primary={{ href: "/contact", label: "Submit a hiring brief" }}
        secondary={{ href: "/contact", label: "Book a 20-min call" }}
      />
    </main>
  );
}
