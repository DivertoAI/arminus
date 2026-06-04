/* ============================================================
   NUBO NATIVE PLATFORM (NNP)
   PRD: Specialized technical page for partner cloud solutions.
   Sovereign private cloud · Managed K8s · Accelerated dev · DevSecOps · Data
============================================================ */

function NuboWindow() {
  return (
    <div className="nubo-window">
      <div className="nubo-tb">
        <div className="dots"><span /><span /><span /></div>
        <div className="url">console.nubo.platform / clusters</div>
      </div>
      <div className="nubo-app">
        <div className="nubo-sidebar">
          <div className="si active">◆</div>
          <div className="si">⬡</div>
          <div className="si">⟲</div>
          <div className="si">▤</div>
        </div>
        <div className="nubo-main">
          <div className="nubo-card">
            <div className="kpi-row">
              <div className="kpi"><div className="v up">99.98%</div><div className="l">Uptime</div></div>
              <div className="kpi"><div className="v">-38%</div><div className="l">TCO vs public</div></div>
              <div className="kpi"><div className="v up">4.2×</div><div className="l">Deploy velocity</div></div>
            </div>
          </div>
          <div className="nubo-card">
            <div className="nubo-chart">
              {[40, 55, 48, 62, 70, 58, 80, 72, 90, 84, 96, 88].map((h, i) => (
                <div key={i} className={`bar ${i % 4 === 3 ? "hi" : ""}`} style={{ height: h + "%" }} />
              ))}
            </div>
          </div>
          <div className="nubo-card">
            <div className="nubo-list">
              <div className="nubo-list-item"><span className="role">payments-api · k8s</span><span className="stat">healthy</span></div>
              <div className="nubo-list-item"><span className="role">ml-inference · gpu</span><span className="stat">scaling</span></div>
              <div className="nubo-list-item"><span className="role">gitops pipeline</span><span className="stat">passing</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Capabilities() {
  const caps = [
    {
      n: "01", tag: "Orchestration", t: "Managed Kubernetes",
      d: "AI-enabled deep observability and closed-loop automation keep your clusters self-healing and right-sized.",
      bullets: ["Deep observability", "Closed-loop automation", "Self-healing", "Right-sizing"],
      ico: <path d="M12 2l9 5v10l-9 5-9-5V7z M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5z" />,
    },
    {
      n: "02", tag: "Velocity", t: "Accelerated Software Dev",
      d: "Low-code utilities, SDLC AI agents, and pre-built frameworks compress delivery timelines without sacrificing rigor.",
      bullets: ["Low-code utility", "SDLC AI agents", "Pre-built frameworks", "Faster delivery"],
      ico: <path d="M13 2L3 14h7l-1 8 10-12h-7z" />,
    },
    {
      n: "03", tag: "Security", t: "DevSecOps & GitOps",
      d: "End-to-end lifecycle automation bakes security and compliance into every commit, build, and deploy.",
      bullets: ["End-to-end automation", "Policy as code", "GitOps flows", "Compliance baked-in"],
      ico: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    },
    {
      n: "04", tag: "Intelligence", t: "Data Management",
      d: "A specialized platform purpose-built for AI/ML solution development — from ingestion to inference.",
      bullets: ["AI/ML ready", "Unified ingestion", "Governed access", "Inference-ready"],
      ico: <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />,
    },
  ];
  return (
    <section className="section" id="capabilities" data-screen-label="capabilities">
      <div className="wrap">
        <SectionHead
          eyebrow="Platform capabilities"
          title={<>A public-cloud experience, <span className="ital">on infrastructure you own.</span></>}
          sub="Four pillars that take total cost of ownership down and engineering velocity up."
        />
        <div className="cap-grid">
          {caps.map((c) => (
            <Reveal key={c.n}>
              <article className="cap-card">
                <div className="cap-n">{c.n}</div>
                <div className="cap-ico">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.ico}</svg>
                </div>
                <div className="cap-tag">{c.tag}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <ul className="cap-bullets">
                  {c.bullets.map((b) => <li key={b}><span>✓</span>{b}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    ["Infrastructure ownership", "Vendor-owned, multi-tenant", "Sovereign &amp; private"],
    ["Total cost of ownership", "Scales unpredictably", "Up to 38% lower"],
    ["Data residency", "Region-dependent", "Fully in your control"],
    ["AI/ML readiness", "Add-on services", "Built into the platform"],
    ["Lifecycle automation", "Fragmented tooling", "End-to-end DevSecOps"],
  ];
  return (
    <section className="section tint" id="compare" data-screen-label="compare">
      <div className="wrap">
        <SectionHead
          eyebrow="Why NNP"
          title={<>The sovereign alternative to <span className="ital">public cloud.</span></>}
          sub="Everything teams love about public cloud — without surrendering control, residency, or margin."
        />
        <Reveal>
          <div className="cmp-table">
            <div className="cmp-head">
              <div>Capability</div>
              <div>Public cloud</div>
              <div className="hi">Nubo Native Platform</div>
            </div>
            {rows.map((r) => (
              <div className="cmp-row" key={r[0]}>
                <div className="cmp-feat" dangerouslySetInnerHTML={{ __html: r[0] }} />
                <div className="cmp-pub" dangerouslySetInnerHTML={{ __html: r[1] }} />
                <div className="cmp-nubo" dangerouslySetInnerHTML={{ __html: r[2] }} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="nubo" />
      <section className="page-hero accent-dark" data-screen-label="page-hero">
        <div className="page-hero-mesh" />
        <div className="wrap">
          <Reveal>
            <div className="nubo-logo">
              <span className="mark">N</span> Nubo Native Platform
            </div>
            <h1 className="page-hero-title">The sovereign <span className="ital" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--peach)" }}>private cloud</span> alternative.</h1>
            <p className="page-hero-lede">NNP delivers a public-cloud experience on private infrastructure — reducing total cost of ownership while enabling AI-ready development.</p>
            <div className="hero-cta" style={{ marginTop: "28px" }}>
              <a href="contact.html" className="btn btn-blue">Request a platform demo <span className="arrow">→</span></a>
              <a href="#capabilities" className="btn btn-ghost" style={{ background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.25)" }}>Explore capabilities</a>
            </div>
          </Reveal>
          <Reveal>
            <div className="nubo-hero-art" style={{ marginTop: "48px" }}>
              <NuboWindow />
            </div>
          </Reveal>
        </div>
      </section>
      <Capabilities />
      <Comparison />
      <BigCTA
        heading={<>TCO down.<br /><span className="ital">Velocity up.</span></>}
        lede="See how NNP runs a public-cloud experience on infrastructure you control — book a technical walkthrough with our platform team."
        primary={{ href: "contact.html", label: "Request a platform demo" }}
        secondary={{ href: "contact.html", label: "Talk to an architect" }}
      />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
