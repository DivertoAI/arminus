"use client";

const candidates = [
  { init: "PS", name: "Priya S.", role: "Senior PM", sector: "Fintech", bg: "rgba(0,128,208,0.12)", color: "var(--blue)" },
  { init: "RK", name: "Rohit K.", role: "Director",  sector: "SaaS",    bg: "rgba(224,32,32,0.10)", color: "var(--coral)" },
  { init: "AM", name: "Aisha M.", role: "SRE",       sector: "Cloud",   bg: "rgba(31,138,91,0.10)", color: "#1F8A5B" },
];
const results = [
  { pct: "94%", co: "Payments Co.",   role: "Head of Product",   color: "var(--blue)" },
  { pct: "89%", co: "Series B SaaS",  role: "Director, Product", color: "#1F8A5B" },
  { pct: "96%", co: "Cloud Platform", role: "Staff Engineer",     color: "var(--blue)" },
];

export function MatchConsole() {
  return (
    <div className="pow-console">
      <div className="pow-con-head">
        <div className="pow-con-title">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="var(--blue)">
            <polygon points="6,0 7.5,4.5 12,4.5 8.5,7 9.8,11.5 6,9 2.2,11.5 3.5,7 0,4.5 4.5,4.5"/>
          </svg>
          Arminus Match Engine
        </div>
        <div className="pow-con-live"><span className="pow-con-dot" />Live · 17yr DB</div>
      </div>

      <div className="pow-con-body">
        <div className="pow-con-col">
          <div className="pow-con-col-lbl">Talent pipeline</div>
          {candidates.map((c, i) => (
            <div className="pow-con-candidate" key={i} style={{ animationDelay: `${i * 0.18}s` }}>
              <div className="pow-con-init" style={{ background: c.bg, color: c.color }}>{c.init}</div>
              <div>
                <div className="pow-con-name">{c.name}</div>
                <div className="pow-con-meta">{c.role} · {c.sector}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pow-con-core">
          <div className="pow-core-wrap">
            <div className="pow-core-ring pow-r3" />
            <div className="pow-core-ring pow-r2" />
            <div className="pow-core-ring pow-r1" />
            <div className="pow-core-center"><span>AI</span></div>
          </div>
          <div className="pow-flow-lines">
            <div className="pow-flow-line" style={{ animationDelay: "0s" }} />
            <div className="pow-flow-line" style={{ animationDelay: "0.6s" }} />
            <div className="pow-flow-line" style={{ animationDelay: "1.2s" }} />
          </div>
        </div>

        <div className="pow-con-col">
          <div className="pow-con-col-lbl">Match results</div>
          {results.map((r, i) => (
            <div className="pow-con-match" key={i} style={{ animationDelay: `${0.4 + i * 0.18}s` }}>
              <div className="pow-con-pct" style={{ color: r.color }}>{r.pct}</div>
              <div>
                <div className="pow-con-name">{r.co}</div>
                <div className="pow-con-meta">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pow-con-footer">
        <div className="pow-con-stat"><span className="pow-con-sn">15K+</span><span className="pow-con-sl">placed</span></div>
        <span className="pow-con-divider" />
        <div className="pow-con-stat"><span className="pow-con-sn">600K+</span><span className="pow-con-sl">talent pool</span></div>
        <span className="pow-con-divider" />
        <div className="pow-con-stat"><span className="pow-con-sn">200+</span><span className="pow-con-sl">on Gov payroll</span></div>
      </div>
    </div>
  );
}
