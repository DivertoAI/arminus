/* ============================================================
   B2B STRATEGIC TALENT SOLUTIONS
   PRD: Deep-dive into recruitment and enterprise staffing.
   Five service lines + industries + process.
============================================================ */

/* ----- Five service lines ----- */
function ServiceLines() {
  const lines = [
    {
      n: "01", t: "Permanent Placement", tag: "Strategic Talent Acquisition",
      d: "We identify leaders and specialists who align with your technical roadmap and corporate culture. Access to our proprietary, 17-year curated database ensures precision matching for IT, Telecom, and Automotive sectors — and our offshore desk deploys highly skilled professionals across the world to execute projects within your deadlines.",
      tags: ["IT", "Telecom", "Automotive", "Offshore"], accent: "",
    },
    {
      n: "02", t: "Flexible Staffing & Compliance", tag: "Operational Agility",
      d: "Scale your workforce seamlessly while we manage the complexities of the employment lifecycle. Arminus acts as the legal employer — taking over all HR management tasks including total management of payroll, statutory benefits, and HR administration.",
      tags: ["Legal employer", "Payroll", "Statutory benefits"], accent: "coral",
    },
    {
      n: "03", t: "Contract-to-Hire (C2H)", tag: "The Performance-First framework",
      d: "Evaluate a candidate's technical proficiency and cultural fit in a real-world environment before making a long-term commitment. Effective recruitment for companies who prefer to select candidates on the basis of first-hand experience.",
      tags: ["Try-before-hire", "Cultural fit", "Real-world"], accent: "",
    },
    {
      n: "05", t: "Executive Search & Board Advisory", tag: "Discretion-led identification",
      d: "CXO and Board-level talent, sourced with absolute discretion. Our network extends beyond core senior software professionals to functions like Finance and HR. We hold a proven track record of placing board-level executives in the most reputed multinationals — especially within the Global IT ecosystem.",
      tags: ["CXO", "Board-level", "Finance & HR"], accent: "",
    },
  ];
  return (
    <section className="section" id="services" data-screen-label="services">
      <div className="wrap">
        <SectionHead
          eyebrow="Five service lines"
          title={<>Everything from a single specialist to a <span className="ital">multi-state deployment.</span></>}
          sub="Built around the entire talent lifecycle — permanent, flexible, contract-to-hire, Gov-Tech, and executive search."
        />
        <div className="services">
          {lines.map((l) => (
            <Reveal key={l.n}>
              <article className={`svc-card ${l.accent}`}>
                <div className="num">
                  <span>{l.n}</span>
                  <span className="arrow-up">↗</span>
                </div>
                <div className="cap-tag" style={{ color: l.accent === "coral" ? "var(--coral)" : "var(--blue)" }}>{l.tag}</div>
                <h3>{l.t}</h3>
                <p>{l.d}</p>
                <div className="svc-tags">
                  {l.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Gov-Tech deep dive (service line 04) ----- */
function GovTechRow() {
  const projects = [
    { role: "Skill Development", meta: "Multi-state", ok: true },
    { role: "Sanitation", meta: "National", ok: true },
    { role: "Agriculture", meta: "Field teams", ok: true },
    { role: "Niti Ayog", meta: "Policy desk", ok: true },
    { role: "Social Services & Education", meta: "10+ states", ok: true },
  ];
  return (
    <section className="sd-row sd-accent" id="govtech" data-screen-label="govtech">
      <div className="wrap">
        <div className="sd-grid">
          <div className="sd-text">
            <div className="sd-num">04</div>
            <div className="sec-eyebrow"><span className="ln" /> Gov-Tech & Large Scale Initiatives</div>
            <h2 className="sd-title">Powering <span className="ital" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--blue)" }}>national transformation.</span></h2>
            <p className="sd-body">
              A trusted partner to the Big 4 (PWC, Deloitte, KPMG, EY), QCI (Quality Council of India)
              and ICC (Indian Chamber of Commerce), Arminus deploys specialized manpower for critical
              public sector projects. Over 200 professionals on our payroll work across national
              programs in 10+ Indian states.
            </p>
            <ul className="sd-bullets">
              <li><span className="bcheck">✓</span>200+ on Gov payroll</li>
              <li><span className="bcheck">✓</span>10+ states deployed</li>
              <li><span className="bcheck">✓</span>Big 4 trusted partner</li>
              <li><span className="bcheck">✓</span>QCI &amp; ICC empanelled</li>
            </ul>
            <a href="contact.html" className="btn btn-blue">Discuss a public-sector mandate <span className="arrow">→</span></a>
          </div>
          <div className="sd-art">
            <div className="sd-ico">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />
              </svg>
            </div>
            <div className="sd-card">
              <div className="sd-card-head">
                <span>Active Gov programs</span>
                <span className="dot-live">●</span>
              </div>
              <div className="mm-content">
                {projects.map((p) => (
                  <div className="mm-row" key={p.role}>
                    <span>{p.role}</span>
                    <span className="mm-pill ok">{p.meta}</span>
                  </div>
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
  );
}

/* ----- Industries ----- */
function Industries() {
  const inds = [
    { t: "Information Technology", d: "Engineering, cloud, data & AI/ML talent.", img: IMG.it, badge: "Core", roles: "Senior & specialist" },
    { t: "Telecom", d: "Network, RF and infrastructure specialists.", img: IMG.telecom, badge: "Core", roles: "Pan-India" },
    { t: "Automotive", d: "Product, manufacturing & quality leaders.", img: IMG.manuf, badge: "Core", roles: "OEM & tier-1" },
    { t: "Finance & GCC", d: "Finance, HR and shared-services functions.", img: IMG.finance, badge: "Growth", roles: "CXO to analyst" },
  ];
  return (
    <section className="section tint" id="industries" data-screen-label="industries">
      <div className="wrap">
        <SectionHead
          eyebrow="Sectors we serve"
          title={<>Deep benches in the industries that <span className="ital">move India.</span></>}
          sub="Seventeen years of specialist recruitment across IT, Telecom, Automotive — and a fast-growing finance and GCC practice."
        />
        <Reveal stagger className="ind-grid">
          {inds.map((i) => (
            <article className="ind" key={i.t}>
              <div className="photo">
                <img src={i.img} alt={i.t} />
                <span className="badge">{i.badge}</span>
              </div>
              <div className="body">
                <h4>{i.t}</h4>
                <p>{i.d}</p>
                <div className="roles">{i.roles} <span className="arr">→</span></div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ----- Process ----- */
function Process() {
  const steps = [
    { n: "1", t: "Calibrate", d: "We map the role to your technical roadmap and culture before a single CV is shared.", s: "Day 0–2" },
    { n: "2", t: "Source", d: "AI-assisted search across our 17-year curated database and active network.", s: "Day 2–7" },
    { n: "3", t: "Assess", d: "Human-led screening for proficiency, fit and intent — honest conversations, both ways.", s: "Day 7–12" },
    { n: "4", t: "Place & support", d: "We stay close through onboarding and beyond — including day-60 check-ins.", s: "Ongoing" },
  ];
  return (
    <section className="section process" data-screen-label="process">
      <div className="wrap">
        <SectionHead
          eyebrow="How we work"
          title={<>A high-velocity process, <span className="ital">built on relationships.</span></>}
          sub="Generative AI does the paperwork so our recruiters can spend their time where it matters."
        />
        <Reveal stagger className="steps">
          {steps.map((s) => (
            <div className="step-card" key={s.n}>
              <div className="step-card-top">
                <div className="step-badge">{s.n}</div>
                <div className="step-when">{s.s}</div>
              </div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="solutions" />
      <PageHero
        accent="blue"
        eyebrow="B2B · Strategic Talent Solutions"
        title={<>Enterprise staffing, engineered for <span className="ital blue">velocity.</span></>}
        lede="From individual specialists to multi-state Gov-Tech deployments — five service lines built around the entire talent lifecycle, powered by AI-driven precision and deep human insight."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <a href="contact.html" className="btn btn-blue">Submit a hiring brief <span className="arrow">→</span></a>
          <a href="#services" className="btn btn-ghost">Explore service lines</a>
        </div>
      </PageHero>
      <ServiceLines />
      <GovTechRow />
      <Industries />
      <Process />
      <BigCTA
        heading={<>Hand us your<br />most <span className="ital">critical hires.</span></>}
        lede="Share a brief in three minutes. We'll come back within one business day with our approach, a research plan, and a market read on the role."
        primary={{ href: "contact.html", label: "Submit a hiring brief" }}
        secondary={{ href: "contact.html", label: "Book a 20-min call" }}
      />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
