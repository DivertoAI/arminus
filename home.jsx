/* ============================================================
   HOME PAGE
   Per PRD: Brand mission, Trust Pillars, Service Teasers.
   Headline: Empowering Innovation Through Top Talent.
   Tagline: Powered by Humans. Accelerated by AI.
============================================================ */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gradientStyle": "balanced"
}/*EDITMODE-END*/;

/* ----- HERO ----- */
function HomeHero({ tweaks }) {
  const meshClass = {
    balanced: "",
    warm: "alt-warm",
    cool: "alt-cool",
    mono: "alt-mono",
  }[tweaks.gradientStyle] || "";

  return (
    <section className="hero" id="top" data-screen-label="hero">
      <div className={`hero-mesh ${meshClass}`} />
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
                Arminus delivers high-velocity, pan-India staffing solutions for the world's
                fastest-growing economy — combining AI-driven precision with deep human insight.
                With 200+ professionals deployed across 10+ states and delivery hubs in Kolkata,
                Gurugram and Bangalore, our reach extends wherever the talent and the opportunity are.
              </p>
            </Reveal>
            <Reveal>
              <div className="hero-cta">
                <a href="solutions.html" className="btn btn-blue">
                  Explore Solutions <span className="arrow">→</span>
                </a>
                <a href="careers.html" className="btn btn-ghost">
                  Browse open roles
                </a>
              </div>
            </Reveal>
            <Reveal stagger className="hero-stats">
              <div className="stat"><span className="num">17+</span><div className="lbl">Years of recruiting</div></div>
              <div className="stat"><span className="num">175+</span><div className="lbl">Clients served</div></div>
              <div className="stat"><span className="num">15K+</span><div className="lbl">Professionals placed</div></div>
              <div className="stat"><span className="num">600K+</span><div className="lbl">Active talent pool</div></div>
            </Reveal>
          </div>

          <HomeHeroArt />
        </div>
      </div>
    </section>
  );
}

function HomeHeroArt() {
  return (
    <div className="hero-art">
      <div className="hero-orb"><NetworkSvg /></div>

      <div className="photo-main">
        <img src={IMG.heroLead} alt="Strategic talent" />
        <div className="hub-badge">
          <span className="hub-lbl">Delivery hubs</span>
          <span className="hub-cities">Kolkata · Gurugram · Bangalore</span>
        </div>
      </div>
    </div>
  );
}

/* ----- POWER OF US ----- */
function PowerOfUs() {
  return (
    <section className="section pow-section" id="power-of-us" data-screen-label="power-of-us">
      <div className="wrap">
        <Reveal className="pow-grid">
          <div>
            <div className="sec-eyebrow"><span className="ln" /> Our philosophy</div>
            <h2 className="sec-title pow-title">
              The Power of <span className="ital">Us.</span>
            </h2>
            <p className="pow-lede">
              The 'Power of Us' is a fusion of technology and empathy. By empowering our teams with
              generative AI tools, we spend less time on paperwork and more time on what matters —
              building relationships with India's top professionals.
            </p>
            <div className="pow-tagline">
              <span className="pow-tagline-pre">Powered by Humans.</span>
              <span className="pow-tagline-post">Accelerated by AI.</span>
            </div>
          </div>

          <div className="pow-art">
            <div className="pow-circle pow-circle-h">
              <div className="pow-icon-bg">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="pow-circle-lbl">Humans</div>
            </div>
            <div className="pow-link">
              <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
                <path d="M 5 60 Q 30 30, 55 60 T 5 60" stroke="url(#powg)" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
                </path>
                <defs>
                  <linearGradient id="powg" x1="0" x2="60" y1="0" y2="0">
                    <stop offset="0%" stopColor="#0080D0" />
                    <stop offset="100%" stopColor="#E02020" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="pow-circle pow-circle-a">
              <div className="pow-icon-bg">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="pow-circle-lbl">AI</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----- TRUST PILLARS ----- */
function TrustPillars() {
  const pillars = [
    { n: "01", t: "17 years curated", d: "Proprietary database refined over nearly two decades of specialist recruitment.", k: "Precision matching" },
    { n: "02", t: "Big 4 trusted", d: "PWC, Deloitte, KPMG, EY — alongside QCI and the Indian Chamber of Commerce.", k: "Partners of record" },
    { n: "03", t: "Pan-India reach", d: "200+ professionals on payroll across 10+ states, including Niti Ayog & national programs.", k: "10+ states" },
    { n: "04", t: "Offshore capable", d: "Specialists deployed globally to execute projects within agreed delivery windows.", k: "Global execution" },
  ];
  return (
    <section className="section" id="trust" data-screen-label="trust">
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
  );
}

/* ----- SERVICE TEASERS ----- */
function ServiceTeasers() {
  return (
    <section className="section tint" id="solutions-teaser" data-screen-label="solutions-teaser">
      <div className="wrap">
        <SectionHead
          eyebrow="What we do"
          title={<>Three businesses. <span className="ital">One philosophy.</span></>}
          sub="From enterprise staffing to candidate-side training to a sovereign cloud platform — every Arminus business begins with a human relationship."
        />

        <div className="teaser-grid">
          <Reveal>
            <a href="solutions.html" className="teaser teaser-blue">
              <div className="teaser-photo">
                <img src={IMG.handshake} alt="Strategic talent" />
                <div className="ovl" />
                <span className="teaser-tag">B2B</span>
              </div>
              <div className="teaser-body">
                <div className="teaser-eyebrow">Strategic Talent Solutions</div>
                <h3>Permanent · Flexible · Executive · Gov-Tech</h3>
                <p>Five service lines built around the entire talent lifecycle — from individual specialists to multi-state Gov-Tech deployments.</p>
                <span className="teaser-cta">See solutions <span className="arrow">→</span></span>
              </div>
            </a>
          </Reveal>

          <Reveal>
            <a href="career-labs.html" className="teaser teaser-coral">
              <div className="teaser-photo">
                <img src={IMG.training} alt="Career Labs" />
                <div className="ovl" />
                <span className="teaser-tag">B2C</span>
              </div>
              <div className="teaser-body">
                <div className="teaser-eyebrow">Arminus Career Labs</div>
                <h3>Resumes, interviews, and the negotiation</h3>
                <p>The ATS-Dominator, the Interview Masterclass, and our free AI Resume Score — built to make every candidate the best version of themselves.</p>
                <span className="teaser-cta">Visit Career Labs <span className="arrow">→</span></span>
              </div>
            </a>
          </Reveal>

          <Reveal>
            <a href="nubo.html" className="teaser teaser-dark">
              <div className="teaser-photo">
                <img src={IMG.cloud} alt="Nubo Native Platform" />
                <div className="ovl" />
                <span className="teaser-tag">PLATFORM</span>
              </div>
              <div className="teaser-body">
                <div className="teaser-eyebrow">Nubo Native Platform</div>
                <h3>The sovereign private cloud alternative</h3>
                <p>A public-cloud experience on private infrastructure. Managed Kubernetes, AI-ready DevSecOps, and low-code accelerators — TCO down, velocity up.</p>
                <span className="teaser-cta">Discover NNP <span className="arrow">→</span></span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----- TRUSTED BY (Big 4 + QCI + ICC) ----- */
function TrustedBy() {
  const partners = [
    { n: "PWC",      sub: "Big 4 partner" },
    { n: "Deloitte", sub: "Big 4 partner" },
    { n: "KPMG",     sub: "Big 4 partner" },
    { n: "EY",       sub: "Big 4 partner" },
    { n: "QCI",      sub: "Quality Council of India" },
    { n: "ICC",      sub: "Indian Chamber of Commerce" },
  ];
  const loop = [...partners, ...partners, ...partners];
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, paused: false });

  const onDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft, scrollLeft: el.scrollLeft, paused: true };
    el.style.animationPlayState = "paused";
    el.style.cursor = "grabbing";
  };
  const onUp = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    el.style.animationPlayState = "running";
    el.style.cursor = "grab";
  };
  const onMove = (e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const el = trackRef.current;
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft;
    const walk = (x - drag.current.startX) * 1.4;
    el.scrollLeft = drag.current.scrollLeft - walk;
  };

  return (
    <section className="trusted-section" aria-label="Trusted by">
      <div className="wrap">
        <div className="trusted-lbl-center">A trusted partner to</div>
      </div>
      <div className="marquee marquee-draggable"
        ref={trackRef}
        onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp} onMouseMove={onMove}
        onTouchStart={onDown} onTouchEnd={onUp} onTouchMove={onMove}
      >
        <div className="marquee-track">
          {loop.map((p, i) => (
            <div className="trusted-card" key={i} aria-hidden={i >= partners.length}>
              <div className="trusted-name">{p.n}</div>
              <div className="trusted-sub">{p.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- LEADERSHIP TEASER ----- */
function LeadershipTeaser() {
  const leaders = [
    { name: "Pankaj Kathuria",  role: "MD & CEO",                   bio: "44 years architecting global software. ODCs for HBO Singapore, Puerto Rico Telephone. Thapar · IIM Calcutta.", img: IMG.pankaj },
    { name: "Ashok Jindal",      role: "Director — Operations",      bio: "40 years. Senior leadership at Tata, PCL. Multi-million-dollar deals for Tata Motors, Mahindra, HAL. Runs NCR.", img: IMG.ashok },
    { name: "Tania Kathuria",    role: "Director — Strategy & Growth", bio: "Global GTM at Accenture and TCS. Scaling Arminus's international expansion. NMIMS Mumbai MBA.", img: IMG.tania },
  ];

  return (
    <section className="section leader-teaser-section" id="leadership" data-screen-label="leadership">
      <div className="wrap">
        <SectionHead
          eyebrow="Leadership"
          title={<>Built by people who've <span className="ital">done it before.</span></>}
          sub="Three leaders. 84+ combined years of building global delivery, large account operations, and revenue engines that scale across markets."
        />
        <Reveal stagger className="lt-grid">
          {leaders.map(l => (
            <article className="lt-card" key={l.name}>
              <div className="lt-photo">
                <img src={l.img} alt={l.name} />
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
          <a href="about.html" className="btn-link">Read full leadership profiles →</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ----- TESTIMONIALS ----- */
function Testimonials() {
  const items = [
    { q: "Arminus closed three director-level roles for us in a quarter we had given up on. They didn't just send résumés — they sent the right three people.", n: "Anand Menon", r: "Head of HR · Series C fintech", img: IMG.p2 },
    { q: "Most agencies disappear after a placement. Our Arminus partner still WhatsApps me on day 60 to check in on each engineer. That's the difference.", n: "Sarita Venkat", r: "VP Engineering · SaaS platform", img: IMG.p6 },
    { q: "They moved me from a Tier-2 product co to a Series B founding role. Two months of honest conversations before a single CV was shared.", n: "Rohit Kapur", r: "Director of Product · placed candidate", img: IMG.p4 },
  ];
  return (
    <section className="section" data-screen-label="testimonials">
      <div className="wrap">
        <SectionHead
          eyebrow="Word of mouth"
          title={<>The kind of <span className="ital">long relationships</span> we build.</>}
          sub="Most of our clients come from referrals — and most of our candidates come back to us for their next move."
        />
        <Reveal stagger className="test-grid">
          {items.map((t, i) => (
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
  );
}

/* ----- APP ----- */
function App() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <Nav active="home" />
      <HomeHero tweaks={tweaks} />
      <TrustedBy />
      <TrustPillars />
      <PowerOfUs />
      <ServiceTeasers />
      <LeadershipTeaser />
      <Testimonials />
      <BigCTA
        heading={<>Ready to build<br />your <span className="ital">dream team?</span></>}
        lede="Share a brief in three minutes. We'll come back within one business day with our approach, a research plan, and a market read on the role."
        primary={{ href: "contact.html", label: "Submit a hiring brief" }}
        secondary={{ href: "contact.html", label: "Book a 20-min call" }}
      />
      <Footer stats />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio
            label="Gradient"
            value={tweaks.gradientStyle}
            onChange={(v) => setTweaks("gradientStyle", v)}
            options={[
              { value: "balanced", label: "Balanced" },
              { value: "warm", label: "Warm" },
              { value: "cool", label: "Cool" },
              { value: "mono", label: "Mono" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
