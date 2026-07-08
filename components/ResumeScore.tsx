"use client";
import { useState } from "react";
import Link from "next/link";

export function ResumeScore() {
  const [stage, setStage] = useState<"idle" | "scanning" | "result">("idle");
  const [pct, setPct] = useState(0);

  const run = () => {
    setStage("scanning");
    setPct(0);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setStage("result"), 350);
      }
      setPct(Math.round(p));
    }, 160);
  };

  const score = 65;
  const circ = 2 * Math.PI * 80;

  return (
    <section className="ats-section" id="resume-score">
      <div className="wrap">
        <div className="ats-head">
          <div className="sec-eyebrow"><span className="ln" /> Free AI Resume Score</div>
          <h2 className="sec-title">How well does your resume <span className="ital">beat the bots?</span></h2>
          <p className="sec-sub">Upload your CV and our tool scores it against modern Applicant Tracking Systems — instantly, and free.</p>
        </div>

        <div className="ats-card">
          {stage === "idle" && (
            <div className="ats-drop" onClick={run}>
              <div className="ats-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4M12 4l-4 4M12 4l4 4"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>
                </svg>
              </div>
              <div className="ats-drop-title">Drop your resume to get scored</div>
              <div className="ats-drop-sub">PDF or DOCX · Free · No account needed</div>
              <div className="ats-drop-btn">Get my score</div>
            </div>
          )}

          {stage === "scanning" && (
            <div className="ats-scanning">
              <div className="ats-scan-ring">
                <svg viewBox="0 0 180 180" className="ats-ring-svg">
                  <circle cx="90" cy="90" r="80" fill="none" stroke="var(--line)" strokeWidth="8"/>
                  <circle cx="90" cy="90" r="80" fill="none" stroke="var(--blue)" strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={circ - (circ * pct) / 100}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.2s ease", transformOrigin: "90px 90px", transform: "rotate(-90deg)" }}/>
                </svg>
                <div className="ats-ring-pct">{pct}%</div>
              </div>
              <div className="ats-scanning-lbl">Analysing your resume…</div>
            </div>
          )}

          {stage === "result" && (
            <div className="ats-result">
              <div className="ats-score-wrap">
                <svg viewBox="0 0 180 180" className="ats-ring-svg">
                  <circle cx="90" cy="90" r="80" fill="none" stroke="var(--line)" strokeWidth="8"/>
                  <circle cx="90" cy="90" r="80" fill="none" stroke="var(--blue)" strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={circ - (circ * score) / 100}
                    strokeLinecap="round" style={{ transformOrigin: "90px 90px", transform: "rotate(-90deg)" }}/>
                </svg>
                <div className="ats-score-num">{score}<span>/100</span></div>
              </div>
              <div className="ats-result-body">
                <div className="ats-result-title">Your resume scored {score}/100</div>
                <p className="ats-result-sub">There&apos;s room to improve. Our Career Labs team can help you close the gap and push your score above 85 — the threshold most ATS systems use to surface candidates for human review.</p>
                <div className="ats-result-issues">
                  <div className="ats-issue red"><span>✗</span> Missing quantified achievements</div>
                  <div className="ats-issue red"><span>✗</span> Keyword density below threshold</div>
                  <div className="ats-issue amber"><span>~</span> Formatting could be cleaner</div>
                  <div className="ats-issue green"><span>✓</span> Good contact section</div>
                </div>
                <Link href="/contact" className="btn btn-blue" style={{ marginTop: "20px" }}>
                  Fix my resume with Career Labs
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
