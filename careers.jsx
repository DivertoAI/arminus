/* ============================================================
   CAREERS / JOBS PORTAL — Live Ceipal widget
============================================================ */

/* Culture section */
function Culture() {
  const cards = [
    { m: "✦", t: "Honest conversations", d: "We'd rather tell you the hard truth than place you in the wrong role." },
    { m: "◆", t: "AI as a teammate", d: "Generative AI does the paperwork so you can do the work that matters." },
    { m: "▲", t: "Relationships over transactions", d: "Most of our candidates come back to us for their next move." },
    { m: "●", t: "Pan-India impact", d: "From private fintech to national Gov-Tech programs across 10+ states." },
  ];
  return (
    <section className="culture-section" data-screen-label="culture">
      <div className="wrap">
        <SectionHead
          eyebrow="Why Arminus"
          title={<>The kind of firm <span className="ital">people stay in touch with.</span></>}
          sub="Most of our candidates come back to us for their next move. Here's why."
          align="center"
        />
        <Reveal stagger className="culture-grid">
          {cards.map(c => (
            <div className="culture-card" key={c.t}>
              <div className="culture-mark">{c.m}</div>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* Live Ceipal job widget */
function JobPortal() {
  useEffect(() => {
    if (document.querySelector('script[data-ceipal-api-key]')) return;
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://jobsapi.ceipal.com/APISource/widget.js";
    s.setAttribute("data-ceipal-api-key", "N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09");
    s.setAttribute("data-ceipal-career-portal-id", "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09");
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="section" id="openings" data-screen-label="openings">
      <div className="wrap">
        <SectionHead
          eyebrow="Live openings"
          title={<>Current roles across <span className="ital">our client network.</span></>}
          sub="Positions updated daily — permanent, contract, and Gov-Tech roles across India."
        />
        <div id="example-widget-container" style={{ marginTop: "40px" }} />
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="careers" />
      <PageHero
        accent="blue"
        eyebrow="Careers · Jobs Portal"
        title={<>Find a role worth <span className="ital blue">moving for.</span></>}
        lede="Live openings across our client network — from private fintech to national Gov-Tech programs. Every application is read by a human."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <a href="#openings" className="btn btn-blue">Browse open roles <span className="arrow">→</span></a>
          <a href="career-labs.html" className="btn btn-ghost">Prep with Career Labs</a>
        </div>
      </PageHero>
      <JobPortal />
      <Culture />
      <BigCTA
        heading={<>Don't see the <span className="ital">right role?</span></>}
        lede="Send us your résumé anyway. Most of our placements start with a conversation long before the perfect opening appears."
        primary={{ href: "mailto:contactus@arminus.com?subject=Resume Submission", label: "Send your résumé" }}
        secondary={{ href: "career-labs.html", label: "Get interview-ready" }}
      />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
