/* ============================================================
   CONTACT — hiring brief + offices + FAQ
============================================================ */
const { useState: useStateCF } = React;

function ContactForm() {
  const [done, setDone] = useStateCF(false);
  const submit = (e) => { e.preventDefault(); setDone(true); };

  return (
    <section className="section" data-screen-label="contact">
      <div className="wrap">
        <div className="cf-layout">
          <Reveal>
            <div>
              <div className="sec-eyebrow"><span className="ln" /> Let's talk</div>
              <h2 className="sec-title">Share a brief.<br /><span className="ital">Hear back in a day.</span></h2>
              <p className="sec-sub" style={{ marginTop: "16px" }}>
                Tell us about the role or the challenge. We'll come back within one business day with
                our approach, a research plan, and a market read.
              </p>
              <div className="cf-quick">
                <div className="cfq"><div className="cfq-lbl">Email</div><a className="cfq-val" href="mailto:contactus@arminus.com">contactus@arminus.com</a></div>
                <div className="cfq"><div className="cfq-lbl">Phone</div><a className="cfq-val" href="tel:+913340601004">+91 33 40601004</a></div>
                <div className="cfq"><div className="cfq-lbl">Response</div><div className="cfq-val">Within 1 business day</div></div>
                <div className="cfq"><div className="cfq-lbl">Offices</div><div className="cfq-val">Kolkata · Gurugram · Bangalore</div></div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="cf-card">
              {!done ? (
                <form className="cf-grid" onSubmit={submit}>
                  <label><span>Full name</span><input type="text" required placeholder="Your name" /></label>
                  <label><span>Work email</span><input type="email" required placeholder="you@company.com" /></label>
                  <label><span>Company</span><input type="text" placeholder="Company name" /></label>
                  <label><span>I'm here to…</span>
                    <select defaultValue="hire">
                      <option value="hire">Hire talent</option>
                      <option value="govtech">Discuss a Gov-Tech mandate</option>
                      <option value="nubo">Explore Nubo (NNP)</option>
                      <option value="career">Career Labs / job seeker</option>
                      <option value="other">Something else</option>
                    </select>
                  </label>
                  <label className="cf-wide"><span>Tell us about the role or challenge</span>
                    <textarea rows="4" placeholder="e.g. We're scaling our backend team in Bangalore and need 3 senior engineers in the next quarter…"></textarea>
                  </label>
                  <div className="cf-foot cf-wide">
                    <span className="sec-sub" style={{ fontSize: "13px", margin: 0 }}>No spam — your brief goes straight to a recruiter.</span>
                    <button type="submit" className="btn btn-blue">Submit brief <span className="arrow">→</span></button>
                  </div>
                </form>
              ) : (
                <div className="cf-done">
                  <div className="md-check">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
                  </div>
                  <h3>Brief received</h3>
                  <p>Thank you — a recruiter will reach out within one business day with our approach and a market read on your role.</p>
                  <div className="cf-done-meta">
                    <div><strong>Response time</strong>1 business day</div>
                    <div><strong>Next step</strong>Discovery call</div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactOffices() {
  const offices = [
    { name: "Kolkata", tag: "Headquarters", img: IMG.city, addr: "Bengal Eco Intelligent Park, Unit #21, Tower 1, Sector V", focus: "Strategy & leadership", email: "kolkata@arminus.co.in" },
    { name: "Gurugram", tag: "NCR Operations", img: IMG.office, addr: "Cyber City, Gurugram", focus: "Operations & Gov-Tech", email: "ncr@arminus.co.in" },
    { name: "Bangalore", tag: "Engineering Desk", img: IMG.team1, addr: "Outer Ring Road, Bangalore", focus: "IT & engineering", email: "blr@arminus.co.in" },
  ];
  return (
    <section className="section tint" data-screen-label="contact-offices">
      <div className="wrap">
        <SectionHead
          eyebrow="Our offices"
          title={<>Find us across <span className="ital">India.</span></>}
          sub="Three offices, one team — close to both our clients and the talent we place."
        />
        <Reveal stagger className="contact-offices">
          {offices.map((o) => (
            <article className="co-card" key={o.name}>
              <div className="co-photo">
                <img src={o.img} alt={o.name} />
                <div className="ovl" />
                <div className="co-name">{o.name}<span>{o.tag}</span></div>
              </div>
              <div className="co-body">
                <div className="co-line"><div className="co-lbl">Address</div><div className="co-val">{o.addr}</div></div>
                <div className="co-line"><div className="co-lbl">Focus</div><div className="co-val">{o.focus}</div></div>
                <div className="co-line"><div className="co-lbl">Email</div><a className="co-val" href={`mailto:${o.email}`}>{o.email}</a></div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useStateCF(0);
  const items = [
    { q: "How quickly can you start on a role?", a: "We typically calibrate within 48 hours and share a first slate of candidates within the first week, depending on the seniority and specialization of the role." },
    { q: "Do you work on contingency or retained search?", a: "Both. Permanent placement and Contract-to-Hire are usually contingency-based, while Executive Search and Board Advisory mandates are run on a retained basis." },
    { q: "Can you handle large, multi-state deployments?", a: "Yes — we currently have 200+ professionals on payroll across 10+ states for national Gov-Tech programs, and we're empanelled with the Big 4, QCI and ICC." },
    { q: "I'm a candidate — can Career Labs guarantee a placement?", a: "No. Purchasing Career Labs services does not guarantee a placement through Arminus recruitment, but it does guarantee you are a better-prepared candidate for the global market." },
  ];
  return (
    <section className="section" data-screen-label="faq">
      <div className="wrap">
        <SectionHead align="center" eyebrow="Questions" title={<>Good to <span className="ital">know.</span></>} />
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">{it.q}<span className="faq-tog">⌄</span></div>
              <div className="faq-a"><div>{it.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="contact" />
      <PageHero
        accent="blue"
        eyebrow="Contact"
        title={<>Start the <span className="ital blue">conversation.</span></>}
        lede="Hiring, job-seeking, or exploring Nubo — tell us what you need and the right person will get back to you within one business day."
      />
      <ContactForm />
      <ContactOffices />
      <Faq />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
