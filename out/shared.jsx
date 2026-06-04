/* ============================================================
   SHARED CHROME — used by every page
   Exposes IMG, useReveal, Reveal, Nav, Footer, NetworkSvg,
   PageHero, SectionHead as window globals.
============================================================ */
const { useState, useEffect, useRef } = React;

/* ----- Image bank ----- */
const IMG = {
  // Professional portraits (used in candidate cards / testimonials)
  heroLead: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop",
  p1: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop&crop=faces",
  p2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=faces",
  p3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&crop=faces",
  p4: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=faces",
  p5: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=faces",
  p6: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80&auto=format&fit=crop&crop=faces",

  // Teams / office
  team1: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop",
  team2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop",
  team3: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80&auto=format&fit=crop",
  team4: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
  handshake: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop",
  whiteboard: "https://images.unsplash.com/photo-1552581234-26160f608093?w=900&q=80&auto=format&fit=crop",
  training: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&auto=format&fit=crop",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=900&q=80&auto=format&fit=crop",

  // Industries
  it: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&q=80&auto=format&fit=crop",
  finance: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop",
  manuf: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format&fit=crop",
  health: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop",
  engg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80&auto=format&fit=crop",
  retail: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=600&q=80&auto=format&fit=crop",
  telecom: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600&q=80&auto=format&fit=crop",
  logistics: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop",

  // Cloud / tech (Nubo)
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",

  // Management portraits (placeholders — distinct from candidate portraits)
  pankaj: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop&crop=faces",
  ashok: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80&auto=format&fit=crop&crop=faces",
  tania: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop&crop=faces",
};

/* ----- Reveal-on-scroll ----- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as = "div", className = "", stagger = false, ...rest }) {
  const ref = useReveal();
  const Comp = as;
  return (
    <Comp ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

/* ----- Animated SVG network orb ----- */
function NetworkSvg() {
  return (
    <svg className="network-svg" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E6FB8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1E6FB8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#ng)" />
      <line className="link" x1="40" y1="60" x2="100" y2="100" />
      <line className="link" x1="160" y1="50" x2="100" y2="100" />
      <line className="link" x1="50" y1="150" x2="100" y2="100" />
      <line className="link" x1="160" y1="160" x2="100" y2="100" />
      <line className="link" x1="40" y1="60" x2="160" y2="50" />
      <line className="link" x1="50" y1="150" x2="160" y2="160" />
      <circle className="pulse" cx="100" cy="100" r="5" />
      <circle className="pulse b" cx="100" cy="100" r="5" />
      <circle className="pulse c" cx="100" cy="100" r="5" />
      <circle className="node" cx="40" cy="60" r="6" />
      <circle className="node" cx="160" cy="50" r="5" />
      <circle className="node" cx="50" cy="150" r="5" />
      <circle className="node" cx="160" cy="160" r="6" />
      <circle className="node-c" cx="100" cy="100" r="9" />
    </svg>
  );
}

/* ----- Nav ----- */
const NAV_ITEMS = [
  { key: "home",    label: "Home",        href: "index.html" },
  { key: "about",   label: "About Us",    href: "about.html" },
  { key: "solutions", label: "Solutions", href: "solutions.html" },
  { key: "career-labs", label: "Career Labs", href: "career-labs.html" },
  { key: "nubo",    label: "Nubo",        href: "nubo.html" },
  { key: "careers", label: "Careers",     href: "careers.html" },
  { key: "contact", label: "Contact Us",  href: "contact.html" },
];

function Nav({ active = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} data-screen-label="nav">
      <div className="wrap nav-inner">
        <a href="index.html" className="logo-wrap" aria-label="Arminus">
          <img src="assets/arminus-logo.png" alt="Arminus team work" className="logo-img" />
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {NAV_ITEMS.map(n => (
            <a key={n.key} href={n.href}
               className={`nav-link ${active === n.key ? "active" : ""}`}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <a href="contact.html" className="nav-cta">
            Hire talent <span className="cta-arrow">→</span>
          </a>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ----- Footer ----- */
function Footer({ stats = false }) {
  return (
    <footer className="footer" data-screen-label="footer">
      <div className="wrap">
        {stats && (
          <div className="footer-stats">
            <div className="fstat"><div className="fstat-num">17+</div><div className="fstat-lbl">Years of recruiting</div></div>
            <div className="fstat"><div className="fstat-num">175+</div><div className="fstat-lbl">Clients served</div></div>
            <div className="fstat"><div className="fstat-num">15K+</div><div className="fstat-lbl">Professionals placed</div></div>
            <div className="fstat"><div className="fstat-num">600K+</div><div className="fstat-lbl">Active talent pool</div></div>
          </div>
        )}
        <div className="footer-top">
          <div className="footer-brand">
            <img src="assets/arminus-logo.png" alt="Arminus" className="logo-img" />
            <p>
              <em style={{ fontFamily: "var(--font-serif)" }}>Powered by Humans. Accelerated by AI.</em><br /><br />
              Headquartered in Kolkata, with offices in Gurugram & Bangalore.
              Strategic talent solutions, Career Labs, and Nubo Native Platform — since 2009.
            </p>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><a href="solutions.html#permanent">Permanent Placement</a></li>
              <li><a href="solutions.html#flexible">Flexible Staffing</a></li>
              <li><a href="solutions.html#c2h">Contract-to-Hire</a></li>
              <li><a href="solutions.html#govtech">Gov-Tech</a></li>
              <li><a href="solutions.html#executive">Executive Search</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="career-labs.html">Career Labs</a></li>
              <li><a href="nubo.html">Nubo (NNP)</a></li>
              <li><a href="careers.html">Careers · Jobs portal</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Reach us</h5>
            <ul>
              <li><a href="mailto:contactus@arminus.com">contactus@arminus.com</a></li>
              <li><a href="tel:+913340601004">+91 33 40601004</a></li>
              <li><a href="tel:+17324819410">+1 732 481 9410 (USA)</a></li>
              <li><a href="#">Kolkata · Gurugram · Bangalore</a></li>
              <li><a href="https://www.linkedin.com/company/665038" target="_blank">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Arminus Consulting Pvt Ltd. All rights reserved.</div>
          <div className="links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----- Sub-page hero header ----- */
function PageHero({ eyebrow, title, lede, accent = "blue", children }) {
  return (
    <section className={`page-hero accent-${accent}`} data-screen-label="page-hero">
      <div className="page-hero-mesh" />
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow"><span className="ln" /> {eyebrow}</div>
          <h1 className="page-hero-title">{title}</h1>
          {lede && <p className="page-hero-lede">{lede}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/* ----- Section head (reusable) ----- */
function SectionHead({ eyebrow, title, sub, align = "split" }) {
  return (
    <Reveal>
      <div className={`sec-head ${align === "center" ? "center" : ""}`}>
        <div>
          <div className="sec-eyebrow"><span className="ln" /> {eyebrow}</div>
          <h2 className="sec-title">{title}</h2>
        </div>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ----- Big CTA shared across pages ----- */
function BigCTA({ heading, lede, primary, secondary }) {
  return (
    <section className="section" id="cta" data-screen-label="cta">
      <div className="bigcta">
        <h2>{heading}</h2>
        {lede && <p>{lede}</p>}
        <div className="bigcta-row">
          {primary && <a href={primary.href} className="btn btn-blue">{primary.label} <span className="arrow">→</span></a>}
          {secondary && <a href={secondary.href} className="btn btn-ghost">{secondary.label}</a>}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  IMG,
  useReveal, Reveal,
  Nav, Footer,
  NetworkSvg,
  PageHero, SectionHead, BigCTA,
});
