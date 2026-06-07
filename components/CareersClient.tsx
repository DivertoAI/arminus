"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

/* ── Types ── */
interface PayRate {
  pay_rate_currency: string;
  pay_rate: string;
  pay_rate_pay_frequency_type: string;
  pay_rate_employment_type: string;
  min_pay_rate: string;
  max_pay_rate?: string;
}

interface Job {
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
  requisition_description: string;  // v2 API spelling
  requistion_description?: string;  // public API typo (missing 'i')
  apply_job: string;
  apply_job_without_registration: string;
  tax_terms: string;
  industry: string;
  employment_type: string;
  skills: string;
  pay_rates: PayRate[];
  closing_date: string;
  job_code: string;
  job_status: string;
}

interface ApiResponse {
  count: number;
  num_pages: number;
  results: Job[];
}

// Authenticated v2 API (used in production via GH Actions token)
const API_V2        = "https://api.ceipal.com/v2/getJobPostingsList/";
const DETAIL_V2     = "https://api.ceipal.com/v2/getJobPostingDetails/";
// Public career-portal API (fallback for local dev — no token needed)
const API_PUBLIC    = "https://apiin.ceipal.com/N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09/CareerPortalJobPostings/";
const DETAIL_PUBLIC = "https://apiin.ceipal.com/N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09/CareerPortalJobPostingDetails/";
const CP_ID         = "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09";
const PAGE_SIZE     = 12;
const TOKEN         = process.env.NEXT_PUBLIC_CEIPAL_ACCESS_TOKEN;
const HAS_TOKEN     = !!TOKEN && TOKEN !== "undefined";
const API_BASE      = HAS_TOKEN ? API_V2 : API_PUBLIC;
const DETAIL_BASE   = HAS_TOKEN ? DETAIL_V2 : DETAIL_PUBLIC;
const AUTH_HEADERS  = HAS_TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} as Record<string, string>;

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
function dedupe(jobs: Job[]) {
  const seen = new Set<string>();
  return jobs.filter(j => seen.has(j.id) ? false : (seen.add(j.id), true));
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

/* ── Richer detail shape returned by Job Posting Details API ── */
interface JobDetail extends Job {
  duration: string;
  experience: string;
  min_experience: string;
  work_authorization: string;
  number_of_positions: number;
  address: string;
  department: string;
  contact_person: string;
  posted: string;
}

/* ── Job Detail Modal ── */
function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [detail, setDetail] = useState<JobDetail | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  // Fetch full job details — v2 (token) or public fallback
  useEffect(() => {
    setFetching(true);
    const url = HAS_TOKEN
      ? `${DETAIL_BASE}${encodeURIComponent(job.id)}/`
      : `${DETAIL_BASE}?job_id=${encodeURIComponent(job.id)}&cp_id=${CP_ID}`;
    fetch(url, { headers: AUTH_HEADERS })
      .then(r => r.json())
      .then(data => {
        const d = Array.isArray(data) ? data[0] : data;
        setDetail(d && d.id ? d : null);
        setFetching(false);
      })
      .catch(() => { setDetail(null); setFetching(false); });
  }, [job.id]);

  // Merge: detail wins where present, listing fills the rest
  const d         = detail ?? (job as unknown as JobDetail);
  const title     = d.public_job_title || d.position_title;
  const location  = [formatCity(d.city || d.primary_city), d.state || d.primary_state, d.country].filter(Boolean).join(", ");
  const desc      = d.public_job_desc?.trim() || d.requisition_description || d.requistion_description || "";
  const applyUrl  = d.apply_job_without_registration || d.apply_job;
  const skills    = d.skills ? d.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const taxTerms  = d.tax_terms ? d.tax_terms.split(",").map(t => t.trim()).filter(Boolean) : [];
  const validPay  = (d.pay_rates ?? []).map(payLabel).filter(Boolean) as string[];

  return (
    <div className="jm-overlay" onClick={onClose} role="dialog" aria-modal aria-label={title}>
      <div className="jm-panel" onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="jm-head">
          <div className="jm-head-left">
            <div className="jm-chips" style={{ marginBottom: 12 }}>
              {d.employment_type && <span className="jm-chip">{d.employment_type}</span>}
              {taxTerms.map(t => <span key={t} className="jm-chip">{t}</span>)}
              {isRemote(d.remote_opportunities) && <span className="jm-chip jm-chip-blue">Remote</span>}
              {d.industry && <span className="jm-chip">{d.industry}</span>}
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

        {/* ── Body ── */}
        <div className="jm-body">

          {fetching ? (
            <div className="jl-state"><div className="jl-spinner" /><p>Loading details…</p></div>
          ) : (
            <>
              {/* Meta strip */}
              <div className="jm-meta-strip">
                {d.job_code && (
                  <div className="jm-meta-item">
                    <span className="jm-meta-label">Job code</span>
                    <span className="jm-meta-val">{d.job_code}</span>
                  </div>
                )}
                {(detail as JobDetail)?.experience && (
                  <div className="jm-meta-item">
                    <span className="jm-meta-label">Experience</span>
                    <span className="jm-meta-val">{(detail as JobDetail).experience}</span>
                  </div>
                )}
                {(detail as JobDetail)?.duration && (
                  <div className="jm-meta-item">
                    <span className="jm-meta-label">Duration</span>
                    <span className="jm-meta-val">{(detail as JobDetail).duration}</span>
                  </div>
                )}
                {(detail as JobDetail)?.number_of_positions > 0 && (
                  <div className="jm-meta-item">
                    <span className="jm-meta-label">Openings</span>
                    <span className="jm-meta-val">{(detail as JobDetail).number_of_positions}</span>
                  </div>
                )}
                {d.closing_date && d.closing_date.trim() && d.closing_date !== "null" && (
                  <div className="jm-meta-item">
                    <span className="jm-meta-label">Closes</span>
                    <span className="jm-meta-val">{d.closing_date.split(" ")[0]}</span>
                  </div>
                )}
                <div className="jm-meta-item">
                  <span className="jm-meta-label">Posted</span>
                  <span className="jm-meta-val">{(detail as JobDetail)?.posted || timeAgo(d.created)}</span>
                </div>
              </div>

              {/* Pay */}
              {validPay.length > 0 && (
                <div className="jm-section">
                  <p className="jm-section-label">Compensation</p>
                  <div className="jm-pay-list">
                    {validPay.map((p, i) => <span key={i} className="jm-pay-badge">{p}</span>)}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="jm-section">
                  <p className="jm-section-label">Skills</p>
                  <div className="jm-skills-list">
                    {skills.map(s => <span key={s} className="jm-skill">{s}</span>)}
                  </div>
                </div>
              )}

              {/* Description */}
              {desc ? (
                <div className="jm-section">
                  <p className="jm-section-label">About the role</p>
                  <div className="jm-desc" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ) : (
                <div className="jm-section">
                  <p style={{ color: "var(--ink-3)", fontStyle: "italic" }}>
                    Full description available after clicking Apply.
                  </p>
                </div>
              )}

              {/* Contact person (from details API) */}
              {(detail as JobDetail)?.contact_person && (
                <div className="jm-section">
                  <p className="jm-section-label">Contact</p>
                  <div className="jm-desc" dangerouslySetInnerHTML={{ __html: (detail as JobDetail).contact_person }} />
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="jm-foot">
          {applyUrl && (
            <a className="btn btn-blue" href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now →
            </a>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export function CareersClient() {
  const [allJobs,     setAllJobs]     = useState<Job[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState(false);
  const [page,        setPage]        = useState(1);
  const [keyword,     setKeyword]     = useState("");
  const [pending,     setPending]     = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const closeModal = useCallback(() => setSelectedJob(null), []);

  /* Fetch page 1 immediately, rest in background */
  useEffect(() => {
    async function loadAll() {
      setLoading(true); setError(false);
      try {
        const r1 = await fetch(
          HAS_TOKEN ? `${API_BASE}?page=1` : API_BASE,
          HAS_TOKEN
            ? { headers: AUTH_HEADERS }
            : { method: "POST", body: new URLSearchParams({ cp_id: CP_ID, page: "1" }) }
        );
        if (!r1.ok) throw new Error();
        const d1: ApiResponse = await r1.json();
        const first = dedupe(d1.results ?? []).filter(j => !HAS_TOKEN || j.job_status?.toLowerCase() === "active");
        setAllJobs(first); setLoading(false);

        if ((d1.num_pages ?? 1) > 1) {
          setLoadingMore(true);
          const extra: Job[] = [];
          const totalRemaining = d1.num_pages - 1;
          const CHUNK_SIZE = 5; // Batch requests to avoid 429 Too Many Requests
          
          for (let i = 0; i < totalRemaining; i += CHUNK_SIZE) {
            const chunk = Array.from({ length: Math.min(CHUNK_SIZE, totalRemaining - i) }, (_, idx) =>
              fetch(
                HAS_TOKEN ? `${API_BASE}?page=${i + idx + 2}` : API_BASE,
                HAS_TOKEN
                  ? { headers: AUTH_HEADERS }
                  : { method: "POST", body: new URLSearchParams({ cp_id: CP_ID, page: String(i + idx + 2) }) }
              ).then(r => r.json() as Promise<ApiResponse>)
            );
            const results = await Promise.allSettled(chunk);
            results.forEach(r => { if (r.status === "fulfilled") extra.push(...(r.value.results ?? [])); });
            
            // Progressively update the UI with active jobs!
            const allActive = dedupe([...first, ...extra]).filter(j => !HAS_TOKEN || j.job_status?.toLowerCase() === "active");
            setAllJobs(allActive);
            
            // Sleep slightly to respect Ceipal's rate limit
            await new Promise(res => setTimeout(res, 300));
          }
          setLoadingMore(false);
        }
      } catch {
        setError(true); setLoading(false);
      }
    }
    loadAll();
  }, []);

  /* Client-side filter */
  const filtered = useMemo(() => {
    if (!keyword.trim()) return allJobs;
    const kw = keyword.toLowerCase();
    return allJobs.filter(j =>
      (j.public_job_title || j.position_title).toLowerCase().includes(kw) ||
      stripHtml(j.public_job_desc || j.requisition_description || j.requistion_description).toLowerCase().includes(kw) ||
      (j.skills || "").toLowerCase().includes(kw) ||
      (j.city || "").toLowerCase().includes(kw) ||
      (j.country || "").toLowerCase().includes(kw) ||
      (j.industry || "").toLowerCase().includes(kw) ||
      (j.tax_terms || "").toLowerCase().includes(kw) ||
      (j.employment_type || "").toLowerCase().includes(kw)
    );
  }, [allJobs, keyword]);

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
        {!loading && (
          <span className="jl-count">
            {filtered.length === 0
              ? "No roles found — try different keywords"
              : <>{filtered.length} open {filtered.length === 1 ? "role" : "roles"}{keyword ? ` for "${keyword}"` : ""}</>
            }
            {loadingMore && <span className="jl-loading-badge">Loading more…</span>}
          </span>
        )}
        {!loading && totalPages > 1 && (
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
      {loading ? (
        <div className="jl-state">
          <div className="jl-spinner" />
          <p>Loading openings…</p>
        </div>
      ) : error ? (
        <div className="jl-state">
          <p>Couldn&apos;t load jobs right now.</p>
          <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => window.location.reload()}>Try again</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="jl-state">
          <p>No roles match your search. <button className="jl-link" onClick={reset}>Clear filters</button></p>
        </div>
      ) : (
        <div className="jl-grid">
          {pageJobs.map(job => {
            const title    = job.public_job_title || job.position_title;
            const location = [formatCity(job.city || job.primary_city), job.country].filter(Boolean).join(", ");
            const desc     = stripHtml(job.public_job_desc || job.requisition_description || job.requistion_description || "");
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
      {!loading && totalPages > 1 && (
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
