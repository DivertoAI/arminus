"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { SubmitResumeModal } from "@/components/SubmitResumeModal";

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
  let text = String(html).replace(/<[^>]*>/g, " ");
  const entities: Record<string, string> = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', 
    "&apos;": "'", "&#39;": "'", "&ndash;": "–", "&mdash;": "—", 
    "&middot;": "·", "&nbsp;": " ", "&rsquo;": "'", "&lsquo;": "'",
    "&bull;": "•", "&copy;": "©", "&reg;": "®"
  };
  text = text.replace(/&[a-zA-Z0-9#]+;/g, (match) => entities[match] || " ");
  return text.replace(/\s+/g, " ").trim();
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

          <div className="jm-section">
            <p className="jm-section-label">About the role</p>
            {desc
              ? <div className="jm-desc" dangerouslySetInnerHTML={{ __html: desc }} />
              : <p style={{ color: "var(--ink-3)", fontStyle: "italic" }}>Full description available on the application page.</p>
            }
            {applyUrl && (
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: 12, fontSize: "0.875rem", color: "var(--blue)", textDecoration: "underline" }}
              >
                View full job description →
              </a>
            )}
          </div>
        </div>

        <div className="jm-foot">
          {applyUrl ? (
            <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
              Apply Now
            </a>
          ) : (
            <a href="mailto:contactus@arminus.in" className="btn btn-blue">
              Apply via Email
            </a>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main component — lazy load with background preload ── */
export function CareersClient() {
  const [pageJobs,       setPageJobs]       = useState<Job[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [currentPage,    setCurrentPage]    = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [totalCount,     setTotalCount]     = useState(0);
  const [keyword,        setKeyword]        = useState("");
  const [pending,        setPending]        = useState("");
  const [selectedJob,    setSelectedJob]    = useState<Job | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const closeModal = useCallback(() => setSelectedJob(null), []);
  const cache = useRef<Map<number, Job[]>>(new Map());
  const inFlight = useRef<Set<number>>(new Set());

  // Silent background preload — never blocks the UI
  const preloadPage = useCallback(async (pg: number) => {
    if (cache.current.has(pg) || inFlight.current.has(pg)) return;
    inFlight.current.add(pg);
    try {
      const res = await fetch(`/api/jobs?page=${pg}&v=2`);
      if (!res.ok) return;
      const data = await res.json();
      cache.current.set(pg, data.results ?? []);
    } catch { /* silent */ } finally {
      inFlight.current.delete(pg);
    }
  }, []);

  const preloadAll = useCallback(async (numPages: number) => {
    const BATCH = 5;
    for (let start = 2; start <= numPages; start += BATCH) {
      await Promise.allSettled(
        Array.from({ length: Math.min(BATCH, numPages - start + 1) }, (_, i) =>
          preloadPage(start + i)
        )
      );
    }
  }, [preloadPage]);

  const goTo = useCallback(async (pg: number) => {
    setKeyword(""); setPending("");
    // Serve instantly from cache if available
    if (cache.current.has(pg)) {
      setPageJobs(cache.current.get(pg)!);
      setCurrentPage(pg);
      document.getElementById("jl-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Not cached yet — fetch directly, independent of preload
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?page=${pg}&v=2`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      const jobs: Job[] = data.results ?? [];
      cache.current.set(pg, jobs);
      setPageJobs(jobs);
      setCurrentPage(pg);
    } catch (e) {
      console.error("[careers] goTo error:", e);
    } finally {
      setLoading(false);
      document.getElementById("jl-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      inFlight.current.add(1);
      try {
        const res = await fetch("/api/jobs?page=1&v=2");
        if (!res.ok || cancelled) return;
        const data = await res.json();
        const jobs: Job[] = data.results ?? [];
        const numPages: number = data.num_pages ?? 1;
        const count: number = data.count ?? 0;
        cache.current.set(1, jobs);
        if (!cancelled) {
          setPageJobs(jobs);
          setTotalPages(numPages);
          setTotalCount(count);
          setLoading(false);
          // Silently preload remaining pages in background
          preloadAll(numPages);
        }
      } finally {
        inFlight.current.delete(1);
      }
    })();
    return () => { cancelled = true; };
  }, [preloadAll]);

  // Search filters within the current page only
  const filtered = useMemo(() => {
    if (!keyword.trim()) return pageJobs;
    const kw = keyword.toLowerCase();
    return pageJobs.filter(j =>
      (j.public_job_title || j.position_title).toLowerCase().includes(kw) ||
      stripHtml(getDesc(j)).toLowerCase().includes(kw) ||
      (j.skills || "").toLowerCase().includes(kw) ||
      (j.city || "").toLowerCase().includes(kw) ||
      (j.country || "").toLowerCase().includes(kw) ||
      (j.industry || "").toLowerCase().includes(kw) ||
      (j.tax_terms || "").toLowerCase().includes(kw) ||
      (j.employment_type || "").toLowerCase().includes(kw)
    );
  }, [pageJobs, keyword]);

  const search = () => { setKeyword(pending); };
  const reset  = () => { setPending(""); setKeyword(""); };

  const pages: (number | "…")[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
  else {
    pages.push(1);
    if (currentPage > 3) pages.push("…");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  const Pagination = () => (
    <div className="jl-pagination">
      <button className="jl-pag-btn" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1 || loading}>←</button>
      {pages.map((n, i) => n === "…"
        ? <span key={`e${i}`} className="jl-pag-ellipsis">…</span>
        : <button key={n} className={`jl-pag-btn ${currentPage === n ? "active" : ""}`} onClick={() => goTo(n as number)} disabled={loading}>{n}</button>
      )}
      <button className="jl-pag-btn" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages || loading}>→</button>
    </div>
  );

  if (loading && pageJobs.length === 0) {
    return (
      <div className="jl-root">
        <div className="jl-loading">
          <div className="jl-spinner" />
          <p>Loading open roles…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jl-root">

      {/* Submit Resume Banner */}
      <div className="jl-resume-bar">
        <div className="jl-resume-bar-text">
          <strong>Don't see a perfect match?</strong>
          <span>Submit your resume and we'll reach out when the right role opens up.</span>
        </div>
        <button
          className="btn btn-blue jl-resume-bar-btn"
          onClick={() => setResumeModalOpen(true)}
        >
          Submit Resume
        </button>
      </div>

      {/* Search */}
      <div className="jl-search">
        <div className="jl-search-inner">
          <svg className="jl-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="jl-input"
            type="text"
            placeholder="Search by title, skill, location, or industry"
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
          Search
        </button>
      </div>

      {/* Results header */}
      <div className="jl-meta" id="jl-results">
        <span className="jl-count">
          {loading
            ? <><span className="jl-spinner" style={{ width: 16, height: 16, borderWidth: 2, display: "inline-block", verticalAlign: "middle", marginRight: 8 }} />Loading…</>
            : filtered.length === 0
              ? "No roles found — try different keywords"
              : <>{totalCount} open {totalCount === 1 ? "role" : "roles"}{keyword ? ` matching "${keyword}"` : ""} · page {currentPage} of {totalPages}</>
          }
        </span>
        {totalPages > 1 && <Pagination />}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="jl-state"><div className="jl-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="jl-state">
          <p>No roles match your search. <button className="jl-link" onClick={reset}>Clear filters</button></p>
        </div>
      ) : (
        <div className="jl-grid">
          {filtered.map(job => {
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
      {totalPages > 1 && !loading && (
        <div className="jl-pag-bottom"><Pagination /></div>
      )}

      {selectedJob && <JobModal job={selectedJob} onClose={closeModal} />}
      {resumeModalOpen && <SubmitResumeModal onClose={() => setResumeModalOpen(false)} />}
    </div>
  );
}
