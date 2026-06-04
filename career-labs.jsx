/* ============================================================
   B2C ARMINUS CAREER LABS
   PRD: High-conversion product page for job seekers.
   Free AI Resume Score · ATS-Dominator · Interview Masterclass · Pricing
============================================================ */
const { useState: useStateCL } = React;

/* ----- Free AI Resume Score tool ----- */
function ResumeScore() {
  const [stage, setStage] = useStateCL("idle"); // idle | scanning | result
  const [pct, setPct] = useStateCL(0);

  const run = () => {
    setStage("scanning");
    setPct(0);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setStage("result"), 350); }
      setPct(Math.round(p));
    }, 160);
  };

  const score = 65;
  const circ = 2 * Math.PI * 80;

  return (
    <section className="ats-section" id="resume-score" data-screen-label="resume-score">
      <div className="wrap">
        <div className="ats-head">
          <div className="sec-eyebrow"><span className="ln" /> Free AI Resume Score</div>
          <h2 className="sec-title">How well does your résumé <span className="ital">beat the bots?</span></h2>
          <p className="sec-sub">Upload your CV and our tool scores it against modern Applicant Tracking Systems — instantly, and free.</p>
        </div>

        <div className="ats-card">
          {stage === "idle" && (
            <div className="ats-drop" onClick={run}>
              <div className="ats-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4M12 4l-4 4M12 4l4 4" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                </svg>
              </div>
              <div className="ats-drop-title">Drop your résumé to get scored</div>
              <div className="ats-drop-sub">PDF or DOCX · analysed in seconds · nothing stored</div>
              <span className="ats-pick"><span className="btn btn-blue btn-sm">Upload &amp; score my CV</span></span>
            </div>
          )}

          {stage === "scanning" && (
            <div className="ats-drop">
              <div className="ats-scanning">
                <div className="ats-scan-title">Scanning your résumé…</div>
                <div className="ats-scan-bar"><div className="bar" style={{ width: pct + "%" }} /></div>
                <div className="ats-scan-steps">
                  <span className={pct > 20 ? "ok" : ""}>Parsing structure</span>
                  <span className={pct > 50 ? "ok" : ""}>Keyword relevance</span>
                  <span className={pct > 75 ? "ok" : ""}>Formatting check</span>
                  <span className={pct > 92 ? "ok" : ""}>Impact scoring</span>
                </div>
              </div>
            </div>
          )}

          {stage === "result" && (
            <div className="ats-result">
              <div className="ats-gauge">
                <svg className="ats-gauge-svg" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--bg-2)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad)" strokeWidth="16" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)}
                    transform="rotate(-90 100 100)" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0080D0" /><stop offset="100%" stopColor="#E02020" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="ats-gauge-val">
                  <div className="big">{score}<span>/100</span></div>
                  <div className="grade" style={{ color: "var(--coral)" }}>Needs work</div>
                </div>
              </div>
              <div className="ats-findings">
                <div className="ats-find-title">Top fixes we'd make</div>
                <div className="ats-find"><span className="ats-find-n">1</span><div><strong>Low keyword relevance</strong><p>Your CV misses 11 of the role's high-signal terms — costing you the recruiter shortlist.</p></div></div>
                <div className="ats-find"><span className="ats-find-n">2</span><div><strong>Impact not quantified</strong><p>Bullets describe duties, not outcomes. We rewrite them to lead with measurable results.</p></div></div>
                <div className="ats-find"><span className="ats-find-n">3</span><div><strong>ATS-unfriendly formatting</strong><p>Tables and columns confuse parsers. We rebuild it to score clean every time.</p></div></div>
                <div className="ats-result-cta">
                  <a href="#pricing" className="btn btn-blue btn-sm">Get to 90+ with the ATS-Dominator <span className="arrow">→</span></a>
                  <button className="btn btn-ghost btn-sm" onClick={() => setStage("idle")}>Score another</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ----- ATS-Dominator feature ----- */
function AtsDominator() {
  return (
    <section className="ats-feature" id="ats-dominator" data-screen-label="ats-dominator">
      <div className="wrap">
        <div className="ats-feat-grid">
          <Reveal>
            <div>
              <div className="sec-eyebrow"><span className="ln" /> Product 01 · Resume &amp; LinkedIn</div>
              <h2 className="sec-title">The <span className="ital">ATS-Dominator.</span></h2>
              <div className="feat-list">
                <div className="feat-item">
                  <div className="feat-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.6 5.7 21l2.3-7.1-6-4.5h7.6z"/></svg></div>
                  <div><h4>AI-Optimization</h4><p>Résumés built to trigger high-relevance scores in modern Applicant Tracking Systems.</p></div>
                </div>
                <div className="feat-item">
                  <div className="feat-ico coral"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></div>
                  <div><h4>Editorial Polish</h4><p>Narrative refinement that highlights leadership impact, not just job duties.</p></div>
                </div>
                <div className="feat-item">
                  <div className="feat-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg></div>
                  <div><h4>LinkedIn SEO</h4><p>A complete profile overhaul so you surface in recruiter headhunting searches.</p></div>
                </div>
              </div>
              <a href="#pricing" className="btn btn-blue">See packages <span className="arrow">→</span></a>
            </div>
          </Reveal>
          <Reveal>
            <div className="ats-mock">
              <div className="ats-mock-bg" />
              <div className="ats-mock-paper">
                <div className="ats-paper-head">
                  <div className="ats-paper-name">Priya Sharma</div>
                  <div className="ats-paper-role">Senior Product Manager · Fintech</div>
                </div>
                <span className="ats-paper-tag green">ATS score 94/100</span>
                <div className="ats-paper-bullet">Drove <span className="hl">₹42Cr</span> in new ARR by launching 3 platform features</div>
                <div className="ats-paper-bullet">Scaled team from <span className="hl">6 → 19</span> across two product lines</div>
                <div className="ats-paper-line w-9" />
                <div className="ats-paper-line w-7" />
                <div className="ats-paper-line w-8" />
                <span className="ats-paper-tag blue">Keywords matched: 24 / 26</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----- Interview Masterclass ----- */
function InterviewMasterclass() {
  return (
    <section className="mc-feature" id="interview" data-screen-label="interview">
      <div className="wrap">
        <div className="mc-grid">
          <Reveal>
            <div className="mc-art">
              <div className="mc-window">
                <div className="mc-tb"><span className="rec" /> Mock session · live <span className="duration">42:18</span></div>
                <div className="mc-stage">
                  <div className="mc-tile"><img src={IMG.p3} alt="Coach" /><span className="mc-tag">Coach</span></div>
                  <div className="mc-tile mc-you"><img src={IMG.p4} alt="You" /><span className="mc-tag">You</span></div>
                </div>
                <div className="mc-transcript">
                  <div className="mc-line"><span className="mc-spkr">Coach</span>Walk me through a time you turned around a failing project.</div>
                  <div className="mc-line you"><span className="mc-spkr">You</span>Sure — at my last role the migration was three weeks behind…</div>
                  <div className="mc-feedback"><span className="mc-fb-tag">Editorial feedback</span>Strong STAR opening. Quantify the outcome and slow your pace by ~15%.</div>
                </div>
              </div>
              <div className="mc-meter">
                <div className="mc-meter-lbl">Performance report</div>
                <div className="mc-bar"><span>Structure (STAR)</span><div className="track"><div className="fill" style={{ width: "86%" }} /></div><b>86</b></div>
                <div className="mc-bar"><span>Body language</span><div className="track"><div className="fill" style={{ width: "72%" }} /></div><b>72</b></div>
                <div className="mc-bar"><span>Storytelling</span><div className="track"><div className="fill" style={{ width: "80%" }} /></div><b>80</b></div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="sec-eyebrow"><span className="ln" /> Product 02 · Mock Sessions</div>
              <h2 className="sec-title">The <span className="ital coral">Interview Masterclass.</span></h2>
              <div className="feat-list">
                <div className="feat-item">
                  <div className="feat-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 10l4.5-3v10L15 14M3 6h12v12H3z"/></svg></div>
                  <div><h4>Simulated environment</h4><p>60-minute mock sessions tailored to IT, Fintech, or Automotive standards.</p></div>
                </div>
                <div className="feat-item">
                  <div className="feat-ico coral"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
                  <div><h4>The "Editorial Feedback" Report</h4><p>A detailed breakdown of performance, body language and storytelling (STAR method).</p></div>
                </div>
                <div className="feat-item">
                  <div className="feat-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                  <div><h4>Negotiation strategy</h4><p>Learn how to benchmark your worth and negotiate your CTC with confidence.</p></div>
                </div>
              </div>
              <a href="#pricing" className="btn btn-blue">Book a mock session <span className="arrow">→</span></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----- Pricing ----- */
function Pricing() {
  const tiers = [
    { tag: "Jumpstart", name: "The Jumpstart", price: "₹4,999", sub: "one-time", feats: ["ATS-optimized résumé rewrite", "Editorial narrative polish", "1 revision round"], popular: false },
    { tag: "Career Catalyst", name: "The Career Catalyst", price: "₹6,999", sub: "one-time", feats: ["Everything in Jumpstart", "Full LinkedIn SEO overhaul", "1 mock interview + feedback report"], popular: true },
    { tag: "Leadership Suite", name: "The Leadership Suite", price: "₹9,999", sub: "one-time", feats: ["Everything in Career Catalyst", "Unlimited mock interviews", "Salary negotiation coaching"], popular: false },
  ];
  return (
    <section className="pricing-section" id="pricing" data-screen-label="pricing">
      <div className="wrap">
        <SectionHead
          align="center"
          eyebrow="Choose your plan"
          title={<>Three tiers. <span className="ital">One outcome.</span></>}
          sub="Whatever you pick, you walk away a better-prepared candidate for the global market."
        />
        <div className="pricing-grid">
          {tiers.map((t) => (
            <Reveal key={t.name}>
              <div className={`tier ${t.popular ? "tier-popular" : ""}`}>
                {t.popular && <div className="tier-pop">Most popular</div>}
                <div>
                  <div className="tier-tag">{t.tag}</div>
                  <h3>{t.name}</h3>
                </div>
                <div className="tier-price"><span className="amt">{t.price}</span><span className="sub">{t.sub}</span></div>
                <ul className="tier-feat">
                  {t.feats.map((f) => <li key={f}><span className="chk">✓</span>{f}</li>)}
                </ul>
                <a href="contact.html" className={`btn ${t.popular ? "btn-blue" : "btn-ghost"}`} style={{ justifyContent: "center" }}>Get started</a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="guardrail">
          <div className="guardrail-ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h4>Conflict of interest guardrail</h4>
            <p>Purchasing Career Labs services does not guarantee a placement through Arminus recruitment — but it does guarantee you are a better-prepared candidate for the global market.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav active="career-labs" />
      <PageHero
        accent="coral"
        eyebrow="B2C · Arminus Career Labs"
        title={<>Become the best version of <span className="ital coral">yourself.</span></>}
        lede="Résumés that beat the bots, mock interviews that build confidence, and negotiation coaching that pays for itself — start with a free AI résumé score."
      >
        <div className="hero-cta" style={{ marginTop: "28px" }}>
          <a href="#resume-score" className="btn btn-blue">Score my résumé free <span className="arrow">→</span></a>
          <a href="#pricing" className="btn btn-ghost">See pricing</a>
        </div>
      </PageHero>
      <ResumeScore />
      <AtsDominator />
      <InterviewMasterclass />
      <Pricing />
      <BigCTA
        heading={<>Your next role is <span className="ital">closer than you think.</span></>}
        lede="Start with a free résumé score, or jump straight into a package. Either way, you'll walk into your next interview prepared."
        primary={{ href: "#resume-score", label: "Score my résumé free" }}
        secondary={{ href: "contact.html", label: "Talk to a coach" }}
      />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
