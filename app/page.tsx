import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TrustedBy } from "@/components/TrustedBy";
import { NetworkSvg } from "@/components/NetworkSvg";
import { SectionHead } from "@/components/SectionHead";
import { BigCTA } from "@/components/BigCTA";

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

const teasers = [
  { href: "/solutions", tag: "B2B", accent: "teaser-blue", eyebrow: "Strategic Talent Solutions", title: "Permanent · Flexible · Executive · Gov-Tech", desc: "Five service lines built around the entire talent lifecycle — from individual specialists to multi-state Gov-Tech deployments.", cta: "See solutions", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop" },
  { href: "/career-labs", tag: "B2C", accent: "teaser-coral", eyebrow: "Arminus Career Labs", title: "Resumes, interviews, and the negotiation", desc: "The ATS-Dominator, the Interview Masterclass, and our free AI Resume Score — built to make every candidate the best version of themselves.", cta: "Visit Career Labs", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&auto=format&fit=crop" },
  { href: "/nubo", tag: "PLATFORM", accent: "teaser-dark", eyebrow: "Nubo Native Platform", title: "The sovereign private cloud alternative", desc: "A public-cloud experience on private infrastructure. Managed Kubernetes, AI-ready DevSecOps, and low-code accelerators — TCO down, velocity up.", cta: "Discover NNP", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop" },
];

const leaders = [
  { name: "Pankaj Kathuria", role: "MD & CEO", bio: "44 years architecting global software. ODCs for HBO Singapore, Puerto Rico Telephone. Thapar · IIM Calcutta.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop&crop=faces" },
  { name: "Ashok Jindal", role: "Director — Operations", bio: "40 years. Senior leadership at Tata, PCL. Multi-million-dollar deals for Tata Motors, Mahindra, HAL. B.Tech IIT Delhi · Masters Univ of Waterloo.", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80&auto=format&fit=crop&crop=faces" },
  { name: "Tania Kathuria", role: "Director — Strategy & Growth", bio: "Global GTM at Accenture and TCS. Scaling Arminus's international expansion. MBA NMIMS Mumbai.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop&crop=faces" },
];

const testimonials = [
  { q: "Arminus closed three director-level roles for us in a quarter we had given up on. They didn't just send résumés — they sent the right three people.", n: "Anand Menon", r: "Head of HR · Series C fintech", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=faces" },
  { q: "Most agencies disappear after a placement. Our Arminus partner still WhatsApps me on day 60 to check in on each engineer. That's the difference.", n: "Sarita Venkat", r: "VP Engineering · SaaS platform", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80&auto=format&fit=crop&crop=faces" },
  { q: "They moved me from a Tier-2 product co to a Series B founding role. Two months of honest conversations before a single CV was shared.", n: "Rohit Kapur", r: "Director of Product · placed candidate", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=faces" },
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
                  Arminus delivers high-velocity, pan-India staffing solutions for the world&apos;s
                  fastest-growing economy — combining AI-driven precision with deep human insight.
                  With 200+ professionals deployed across 10+ states and delivery hubs in Kolkata,
                  Gurugram and Bangalore, our reach extends wherever the talent and the opportunity are.
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
                <div className="pillar-num">{p.n}</div>
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
              <div className="pow-circle pow-circle-h">
                <div className="pow-icon-bg">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="pow-circle-lbl">Humans</div>
              </div>
              <div className="pow-link">
                <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
                  <path d="M 5 60 Q 30 30, 55 60 T 5 60" stroke="url(#powg)" strokeWidth="2" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
                  </path>
                  <defs><linearGradient id="powg" x1="0" x2="60" y1="0" y2="0"><stop offset="0%" stopColor="#0080D0"/><stop offset="100%" stopColor="#E02020"/></linearGradient></defs>
                </svg>
              </div>
              <div className="pow-circle pow-circle-a">
                <div className="pow-icon-bg">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="pow-circle-lbl">AI</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE TEASERS ── */}
      <section className="section tint" id="solutions-teaser">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title={<>Three businesses. <span className="ital">One philosophy.</span></>}
            sub="From enterprise staffing to candidate-side training to a sovereign cloud platform — every Arminus business begins with a human relationship."
          />
          <div className="teaser-grid">
            {teasers.map(t => (
              <Reveal key={t.href}>
                <Link href={t.href} className={`teaser ${t.accent}`}>
                  <div className="teaser-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={t.eyebrow} className="teaser-img" />
                    <div className="ovl" />
                    <span className="teaser-tag">{t.tag}</span>
                  </div>
                  <div className="teaser-body">
                    <div className="teaser-eyebrow">{t.eyebrow}</div>
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                    <span className="teaser-cta">{t.cta} <span className="arrow">→</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
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
                  <img src={l.img} alt={l.name} className="lt-img" />
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
            eyebrow="Word of mouth"
            title={<>The kind of <span className="ital">long relationships</span> we build.</>}
            sub="Most of our clients come from referrals — and most of our candidates come back to us for their next move."
          />
          <Reveal stagger className="test-grid">
            {testimonials.map((t, i) => (
              <div className="test" key={i}>
                <div className="stars">★★★★★</div>
                <p className="q">{t.q}</p>
                <div className="test-foot">
                  <div className="ava-img" style={{ backgroundImage: `url(${t.img})` }} />
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
