/* ============================================================
   ABOUT / MANAGEMENT PROFILES
   PRD: Detailed leadership pedigree + brand mission.
============================================================ */

function Mission() {
  return (
    <section className="about-mission" data-screen-label="mission">
      <div className="wrap">
        <div className="about-mission-grid">
          <Reveal>
            <div>
              <div className="sec-eyebrow"><span className="ln" /> Our philosophy</div>
              <h2 className="sec-title">The Power of <span className="ital">Us.</span></h2>
              <p className="sec-sub" style={{ maxWidth: "56ch", marginTop: "18px" }}>
                The 'Power of Us' is a fusion of technology and empathy. By empowering our teams with
                generative AI tools, we spend less time on paperwork and more time on what matters —
                building relationships with India's top professionals.
              </p>
              <div className="pow-tagline" style={{ marginTop: "24px" }}>
                <span className="pow-tagline-pre">Powered by Humans.</span>
                <span className="pow-tagline-post">Accelerated by AI.</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-stats">
              <div className="ast"><div className="ast-num">17+</div><div className="ast-lbl">Years of recruiting</div></div>
              <div className="ast"><div className="ast-num">175+</div><div className="ast-lbl">Clients served</div></div>
              <div className="ast"><div className="ast-num">15K+</div><div className="ast-lbl">Professionals placed</div></div>
              <div className="ast"><div className="ast-num">600K+</div><div className="ast-lbl">Active talent pool</div></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Offices() {
  const offices = [
    { tag: "Headquarters", name: "Kolkata", d: "Strategy, leadership and our central recruitment engine.", img: IMG.city },
    { tag: "NCR Operations", name: "Gurugram", d: "Account operations and large-scale Gov-Tech deployments.", img: IMG.office },
    { tag: "Engineering Desk", name: "Bangalore", d: "IT and engineering specialist recruitment.", img: IMG.team1 },
  ];
  return (
    <section className="section tint" data-screen-label="offices">
      <div className="wrap">
        <SectionHead
          eyebrow="Where we are"
          title={<>Three cities. <span className="ital">One team.</span></>}
          sub="A pan-India footprint that puts our recruiters close to both clients and talent."
        />
        <Reveal stagger className="office-grid">
          {offices.map((o) => (
            <article className="office-card" key={o.name}>
              <div className="office-photo">
                <img src={o.img} alt={o.name} />
                <div className="ovl" />
                <span className="office-tag">{o.tag}</span>
              </div>
              <div className="office-body">
                <h3>{o.name}</h3>
                <p>{o.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Leaders() {
  const leaders = [
    {
      name: "Pankaj Kathuria", role: "MD & CEO", img: IMG.pankaj, rev: false,
      pull: "44 years architecting the global software landscape.",
      bio: "A veteran architect of the global software landscape, Pankaj's expertise encompasses the entire lifecycle of technology delivery — from hands-on engineering to orchestrating mission-critical projects and establishing large-scale Offshore Development Centers (ODCs) for world-class enterprises. His portfolio includes leading multi-million dollar initiatives for organizations such as HBO Singapore and the Puerto Rico Telephone Company (USA).",
      edu: [["Engineering", "Thapar Institute of Engineering & Technology"], ["Management", "IIM Calcutta"]],
    },
    {
      name: "Ashok Jindal", role: "Director — Operations", img: IMG.ashok, rev: true,
      pull: "40 years; the operational backbone of Arminus.",
      bio: "Before joining forces with Pankaj in 2012, Ashok held senior leadership roles at Tata and PCL. A specialist in high-value account management, he has orchestrated multi-million dollar deals for industry leaders including Tata Motors, Mahindra, and HAL. He oversees Gurugram and NCR operations with a technology-first approach.",
      edu: [["Engineering", "B.Tech, IIT Delhi"], ["Management", "Masters, University of Waterloo, Canada"]],
    },
    {
      name: "Tania Kathuria", role: "Director — Strategy & Growth", img: IMG.tania, rev: false,
      pull: "Building scalable revenue engines and global partnerships.",
      bio: "A growth-focused leader, Tania spearheads strategic direction and international expansion at Arminus. Her background includes key positions at Accenture and Tata Consultancy Services (TCS), where she led go-to-market initiatives across global markets.",
      edu: [["Education", "MBA, NMIMS Mumbai"], ["Leads", "Strategy & global growth"]],
    },
  ];
  return (
    <section className="leaders-section" id="leadership" data-screen-label="leadership">
      <div className="wrap">
        <SectionHead
          eyebrow="Leadership"
          title={<>Built by people who've <span className="ital">done it before.</span></>}
          sub="Three leaders. 84+ combined years of building global delivery, large-account operations, and revenue engines that scale across markets."
        />
        <div className="leaders-stack">
          {leaders.map((l) => (
            <Reveal key={l.name}>
              <div className={`leader-grid ${l.rev ? "rev" : ""}`}>
                <div className="leader-photo">
                  <img src={l.img} alt={l.name} />
                  <span className="leader-photo-tag">{l.role}</span>
                </div>
                <div className="leader-text">
                  <div className="leader-name">{l.name}</div>
                  <p className="leader-pull">{l.pull}</p>
                  <p className="leader-bio">{l.bio}</p>
                  <div className="leader-edu">
                    {l.edu.map((e) => (
                      <div key={e[0]}><div className="ek">{e[0]}</div><div className="ed">{e[1]}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="about" />
      <PageHero
        accent="blue"
        eyebrow="About Arminus"
        title={<>Empowering innovation through <span className="ital blue">top talent.</span></>}
        lede="Nearly two decades of specialist recruitment, a proprietary talent database, and a leadership team with deep pedigree across global delivery and large-account operations."
      />
      <Mission />
      <Offices />
      <Leaders />
      <BigCTA
        heading={<>Let's build something <span className="ital">together.</span></>}
        lede="Whether you're hiring, looking for your next role, or exploring Nubo — our team is one conversation away."
        primary={{ href: "contact.html", label: "Get in touch" }}
        secondary={{ href: "careers.html", label: "See open roles" }}
      />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
