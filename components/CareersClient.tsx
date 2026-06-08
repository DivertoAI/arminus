"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

/* ── Types ── */
export interface PayRate {
  pay_rate_currency: string;
  pay_rate: string;
  pay_rate_pay_frequency_type: string;
  pay_rate_employment_type: string;
  min_pay_rate: string;
  max_pay_rate?: string;
}

export interface Job {
  id: string;
  position_title: string;
  public_job_title: string;
  city: string;
  primary_city?: string;
  state: string;
  primary_state?: string;
  country: string;
  remote_opportunities: string | number;
  updated: string;
  created: string;
  public_job_desc: string;
  requisition_description?: string;
  requistion_description?: string; // public API typo (missing 'i')
  apply_job: string;
  apply_job_without_registration: string;
  tax_terms: string;
  industry: string;
  employment_type: string;
  skills: string;
  pay_rates: PayRate[];
  closing_date: string;
  job_code: string;
  job_status?: string;
}

const PAGE_SIZE = 12;

/* ── Helpers ── */
function formatCity(raw?: string) {
  if (!raw) return "";
  return String(raw).replace(/^\[/, "").replace(/\]$/, "").split(",")[0]?.trim() ?? raw;
}
function stripHtml(html?: string) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function timeAgo(d: string) {
  if (!d || d === "Today") return "Today";
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 30) return `${diff} days ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}
function isRemote(v: string | number) {
  return v === 1 || v === "1" || String(v).toLowerCase() === "yes";
}
function payLabel(pr: PayRate) {
  const rate = pr.pay_rate && pr.pay_rate !== "N/A" ? pr.pay_rate : null;
  const min  = pr.min_pay_rate && pr.min_pay_rate !== "" ? pr.min_pay_rate : null;
  const max  = pr.max_pay_rate && pr.max_pay_rate !== "N/A" && pr.max_pay_rate !== "" ? pr.max_pay_rate : null;
  if (!rate && !min && !max) return null;
  const amount = rate ?? (min && max ? `${min}–${max}` : min ?? max);
  return `${pr.pay_rate_currency ?? "USD"} ${amount} / ${pr.pay_rate_pay_frequency_type}`;
}
function getDesc(j: Job) {
  return j.public_job_desc?.trim() || j.requisition_description || j.requistion_description || "";
}

/* ── Job Detail Modal — uses pre-built data, no client-side fetch ── */
function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const title    = job.public_job_title || job.position_title;
  const location = [formatCity(job.city || job.primary_city), job.state || job.primary_state, job.country].filter(Boolean).join(", ");
  const desc     = getDesc(job);
  const applyUrl = job.apply_job_without_registration || job.apply_job;
  const skills   = job.skills ? job.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const taxTerms = job.tax_terms ? job.tax_terms.split(",").map(t => t.trim()).filter(Boolean) : [];
  const validPay = (job.pay_rates ?? []).map(payLabel).filter(Boolean) as string[];

  return (
    <div className="jm-overlay" onClick={onClose} role="dialog" aria-modal aria-label={title}>
      <div className="jm-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="jm-head">
          <div className="jm-head-left">
            <div className="jm-chips" style={{ marginBottom: 12 }}>
              {job.employment_type && <span className="jm-chip">{job.employment_type}</span>}
              {taxTerms.map(t => <span key={t} className="jm-chip">{t}</span>)}
              {isRemote(job.remote_opportunities) && <span className="jm-chip jm-chip-blue">Remote</span>}
              {job.industry && <span className="jm-chip">{job.industry}</span>}
            </div>
            <h2 className="jm-title">{title}</h2>
            {location && (
              <div className="jm-loc-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {location}
              </div>
            )}
          </div>
          <button className="jm-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="jm-body">
          <div className="jm-meta-strip">
            {job.job_code && (
              <div className="jm-meta-item">
                <span className="jm-meta-label">Job code</span>
                <span className="jm-meta-val">{job.job_code}</span>
              </div>
            )}
            {job.closing_date && job.closing_date.trim() && job.closing_date !== "null" && (
              <div className="jm-meta-item">
                <span className="jm-meta-label">Closes</span>
                <span className="jm-meta-val">{job.closing_date.split(" ")[0]}</span>
              </div>
            )}
            <div className="jm-meta-item">
              <span className="jm-meta-label">Posted</span>
              <span className="jm-meta-val">{timeAgo(job.created)}</span>
            </div>
          </div>

          {validPay.length > 0 && (
            <div className="jm-section">
              <p className="jm-section-label">Compensation</p>
              <div className="jm-pay-list">
                {validPay.map((p, i) => <span key={i} className="jm-pay-badge">{p}</span>)}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="jm-section">
              <p className="jm-section-label">Skills</p>
              <div className="jm-skills-list">
                {skills.map(s => <span key={s} className="jm-skill">{s}</span>)}
              </div>
            </div>
          )}

          {desc ? (
            <div className="jm-section">
              <p className="jm-section-label">About the role</p>
              <div className="jm-desc" dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
          ) : (
            <div className="jm-section">
              <p style={{ color: "var(--ink-3)", fontStyle: "italic" }}>Full description available after clicking Apply.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="jm-foot">
          {applyUrl ? (
            <a className="btn btn-blue" href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now →
            </a>
          ) : (
            <a className="btn btn-blue" href="mailto:contactus@arminus.in?subject=Job%20Application" target="_blank" rel="noopener noreferrer">
              Apply Now →
            </a>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main component — receives jobs pre-fetched at build time ── */
export function CareersClient({ initialJobs }: { initialJobs: Job[] }) {
  const [page,        setPage]        = useState(1);
  const [keyword,     setKeyword]     = useState("");
  const [pending,     setPending]     = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const closeModal = useCallback(() => setSelectedJob(null), []);

  const filtered = useMemo(() => {
    if (!keyword.trim()) return initialJobs;
    const kw = keyword.toLowerCase();
    return initialJobs.filter(j =>
      (j.public_job_title || j.position_title).toLowerCase().includes(kw) ||
      stripHtml(getDesc(j)).toLowerCase().includes(kw) ||
      (j.skills || "").toLowerCase().includes(kw) ||
      (j.city || "").toLowerCase().includes(kw) ||
      (j.country || "").toLowerCase().includes(kw) ||
      (j.industry || "").toLowerCase().includes(kw) ||
      (j.tax_terms || "").toLowerCase().includes(kw) ||
      (j.employment_type || "").toLowerCase().includes(kw)
    );
  }, [initialJobs, keyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageJobs   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const search = () => { setKeyword(pending); setPage(1); };
  const reset  = () => { setPending(""); setKeyword(""); setPage(1); };
  const goTo   = (pg: number) => {
    if (pg < 1 || pg > totalPages) return;
    setPage(pg);
    document.getElementById("jl-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pages: (number | "…")[] = [];
  if (totalPages <= 6) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
  else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="jl-root">
      {/* Search */}
      <div className="jl-search">
        <div className="jl-search-inner">
          <svg className="jl-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="jl-input"
            type="text"
            placeholder="Search by title, skill, location, or industry…"
            value={pending}
            onChange={e => setPending(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
          />
          {pending && (
            <button className="jl-clear" onClick={reset} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <button className="btn btn-blue jl-search-btn" onClick={search}>
          Search <span className="arrow">→</span>
        </button>
      </div>

      {/* Results header */}
      <div className="jl-meta" id="jl-results">
        <span className="jl-count">
          {filtered.length === 0
            ? "No roles found — try different keywords"
            : <>{filtered.length} open {filtered.length === 1 ? "role" : "roles"}{keyword ? ` for "${keyword}"` : ""}</>
          }
        </span>
        {totalPages > 1 && (
          <div className="jl-pagination">
            <button className="jl-pag-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>←</button>
            {pages.map((n, i) => n === "…"
              ? <span key={`e${i}`} className="jl-pag-ellipsis">…</span>
              : <button key={n} className={`jl-pag-btn ${page === n ? "active" : ""}`} onClick={() => goTo(n as number)}>{n}</button>
            )}
            <button className="jl-pag-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>→</button>
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="jl-state">
          <p>No roles match your search. <button className="jl-link" onClick={reset}>Clear filters</button></p>
        </div>
      ) : (
        <div className="jl-grid">
          {pageJobs.map(job => {
            const title    = job.public_job_title || job.position_title;
            const location = [formatCity(job.city || job.primary_city), job.country].filter(Boolean).join(", ");
            const desc     = stripHtml(getDesc(job));
            return (
              <article
                className="jl-card"
                key={job.id}
                onClick={() => setSelectedJob(job)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setSelectedJob(job)}
              >
                <div className="jl-card-top">
                  <div className="jl-card-tags">
                    {job.tax_terms    && <span className="jl-tag">{job.tax_terms.split(",")[0].trim()}</span>}
                    {job.industry     && <span className="jl-tag jl-tag-muted">{job.industry}</span>}
                    {isRemote(job.remote_opportunities) && <span className="jl-tag jl-tag-blue">Remote</span>}
                  </div>
                  <span className="jl-date">{timeAgo(job.created)}</span>
                </div>
                <h3 className="jl-title">{title}</h3>
                {location && (
                  <div className="jl-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {location}
                  </div>
                )}
                {desc && <p className="jl-excerpt">{desc.slice(0, 130)}…</p>}
                <span className="jl-cta">View details <span className="arrow">→</span></span>
              </article>
            );
          })}
        </div>
      )}

      {/* Bottom pagination */}
      {totalPages > 1 && (
        <div className="jl-pag-bottom">
          <div className="jl-pagination">
            <button className="jl-pag-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>←</button>
            {pages.map((n, i) => n === "…"
              ? <span key={`e${i}`} className="jl-pag-ellipsis">…</span>
              : <button key={n} className={`jl-pag-btn ${page === n ? "active" : ""}`} onClick={() => goTo(n as number)}>{n}</button>
            )}
            <button className="jl-pag-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>→</button>
          </div>
        </div>
      )}

      {selectedJob && <JobModal job={selectedJob} onClose={closeModal} />}
    </div>
  );
}
