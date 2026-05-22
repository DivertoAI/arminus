"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Search, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, Users, Star, BarChart3, RotateCcw, X, Briefcase, Globe, Tag, Mail } from "lucide-react";

/* ── Types ── */
interface Job {
  id: string;
  job_id: number;
  position_title: string;
  public_job_title: string;
  city: string;
  state: string;
  country: string;
  remote_opportunities: number;
  updated: string;
  created: string;
  public_job_desc: string;
  apply_job: string;
  tax_terms: string;
  industry: string;
}

interface ApiResponse {
  count: number;
  num_pages: number;
  results: Job[];
}

const API_BASE = "https://apiin.ceipal.com/N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09/CareerPortalJobPostings/";
const CP_ID = "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09";
const PAGE_SIZE = 20;

function formatCity(raw: string): string {
  return raw.replace(/^\[/, "").replace(/\]$/, "").split(",")[0]?.trim() ?? raw;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function timeAgo(dateStr: string): string {
  if (!dateStr || dateStr === "Today") return "Today";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 30) return `${diff} days ago`;
  return `${Math.floor(diff / 30)} months ago`;
}

function JobIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("hr") || t.includes("recruiter") || t.includes("talent") || t.includes("ops"))
    return <span className="cjob-icon cjob-icon-blue"><Users size={20} strokeWidth={1.8} /></span>;
  if (t.includes("android") || t.includes("mobile") || t.includes("ios") || t.includes("app"))
    return <span className="cjob-icon cjob-icon-red"><Star size={20} strokeWidth={1.8} /></span>;
  return <span className="cjob-icon cjob-icon-blue"><BarChart3 size={20} strokeWidth={1.8} /></span>;
}

function dedupe(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter((j) => (seen.has(j.id) ? false : seen.add(j.id) && true));
}

/* ── Job Detail Modal ── */
function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = job.public_job_title || job.position_title;
  const location = [formatCity(job.city), job.state, job.country].filter(Boolean).join(", ");
  const subject = encodeURIComponent(`Application: ${title}`);
  const body = encodeURIComponent(`Hi,\n\nI'd like to apply for the ${title} position (Job ID: ${job.job_id}) based in ${location}.\n\nPlease find my resume attached.\n\nRegards,`);

  return (
    <div className="cmodal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="cmodal" onClick={e => e.stopPropagation()}>
        <div className="cmodal-header">
          <div>
            <div className="cmodal-title">{title}</div>
            <div className="cmodal-meta">
              {location && <span><MapPin size={13} /> {location}</span>}
              {job.tax_terms && <span><Tag size={13} /> {job.tax_terms}</span>}
              {job.industry && <span><Briefcase size={13} /> {job.industry}</span>}
              {job.remote_opportunities === 1 && <span><Globe size={13} /> Remote</span>}
              <span><Clock size={13} /> Posted {timeAgo(job.created)}</span>
            </div>
          </div>
          <button className="cmodal-close" onClick={onClose} aria-label="Close"><X size={22} /></button>
        </div>
        <div
          className="cmodal-body"
          dangerouslySetInnerHTML={{ __html: job.public_job_desc || "<p>No description available.</p>" }}
        />
        <div className="cmodal-footer">
          <a
            className="button button-primary"
            href={`mailto:contactus@arminus.com?subject=${subject}&body=${body}`}
          >
            <Mail size={16} /> Apply via Email
          </a>
          <button className="button button-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function CareersClient() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [pendingKeyword, setPendingKeyword] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const closeModal = useCallback(() => setSelectedJob(null), []);

  /* Fetch page 1 immediately, then load remaining pages in the background */
  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      setError(false);
      try {
        const firstRes = await fetch(API_BASE, {
          method: "POST",
          body: new URLSearchParams({ cp_id: CP_ID, page: "1" }),
        });
        if (!firstRes.ok) throw new Error(`HTTP ${firstRes.status}`);
        const firstData: ApiResponse = await firstRes.json();
        const numPages = firstData.num_pages ?? 1;
        const firstPage = dedupe(firstData.results ?? []);

        // Show page 1 results immediately — user sees jobs without waiting for all pages
        setAllJobs(firstPage);
        setLoading(false);

        // Silently fetch remaining pages in the background
        if (numPages > 1) {
          setLoadingMore(true);
          const rest = await Promise.allSettled(
            Array.from({ length: numPages - 1 }, (_, i) =>
              fetch(API_BASE, {
                method: "POST",
                body: new URLSearchParams({ cp_id: CP_ID, page: String(i + 2) }),
              }).then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<ApiResponse>;
              })
            )
          );
          const extra: Job[] = [];
          for (const result of rest) {
            if (result.status === "fulfilled") extra.push(...(result.value.results ?? []));
          }
          setAllJobs(dedupe([...firstPage, ...extra]));
          setLoadingMore(false);
        }
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  /* Client-side keyword filter */
  const filtered = useMemo(() => {
    if (!keyword.trim()) return allJobs;
    const kw = keyword.toLowerCase();
    return allJobs.filter((j) =>
      (j.public_job_title || j.position_title).toLowerCase().includes(kw) ||
      j.position_title.toLowerCase().includes(kw) ||
      stripHtml(j.public_job_desc).toLowerCase().includes(kw) ||
      j.city.toLowerCase().includes(kw) ||
      j.country.toLowerCase().includes(kw)
    );
  }, [allJobs, keyword]);

  const numPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageJobs = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch() {
    setKeyword(pendingKeyword);
    setPage(1);
  }

  function handleReset() {
    setPendingKeyword("");
    setKeyword("");
    setPage(1);
  }

  function goTo(pg: number) {
    if (pg < 1 || pg > numPages) return;
    setPage(pg);
    document.getElementById("careers-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const pageNums: (number | "…")[] = [];
  if (numPages <= 5) {
    for (let i = 1; i <= numPages; i++) pageNums.push(i);
  } else {
    pageNums.push(1);
    if (page > 3) pageNums.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(numPages - 1, page + 1); i++) pageNums.push(i);
    if (page < numPages - 2) pageNums.push("…");
    pageNums.push(numPages);
  }

  const Pagination = () => (
    <div className="cpagination">
      <button className="cpagination-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>
        <ChevronLeft size={16} />
      </button>
      {pageNums.map((n, i) =>
        n === "…" ? (
          <span key={`e-${i}`} className="cpagination-ellipsis">…</span>
        ) : (
          <button
            key={n}
            className={`cpagination-btn ${page === n ? "active" : ""}`}
            onClick={() => goTo(n as number)}
          >
            {n}
          </button>
        )
      )}
      <button className="cpagination-btn" onClick={() => goTo(page + 1)} disabled={page === numPages}>
        <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <>
      {/* ── SEARCH BAR ── */}
      <div className="csearch-wrap">
        <div className="csearch-card">
          <div className="csearch-row">
            <div className="csearch-field csearch-keyword">
              <label className="csearch-label">Keyword</label>
              <div className="csearch-input-wrap">
                <Search size={16} className="csearch-input-icon" />
                <input
                  className="csearch-input"
                  type="text"
                  placeholder="Job title, skills, or keywords"
                  value={pendingKeyword}
                  onChange={(e) => setPendingKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <div className="csearch-actions">
              <button className="button button-primary csearch-btn" onClick={handleSearch}>
                <Search size={16} /> Search Jobs
              </button>
              <button className="csearch-reset" onClick={handleReset}>
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="container cresults-wrap" id="careers-results">
        {!loading && (
          <div className="cresults-meta">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {filtered.length === 0
                ? "No results found"
                : <>Showing <strong>{(page - 1) * PAGE_SIZE + 1}</strong> to{" "}
                  <strong>{Math.min(page * PAGE_SIZE, filtered.length)}</strong> of{" "}
                  <strong className="cresults-count">{filtered.length}</strong> results</>
              }
              {loadingMore && (
                <span style={{
                  fontSize: "0.72rem", fontWeight: 600, color: "#0287d4",
                  background: "#eef6fd", borderRadius: 999, padding: "2px 10px",
                  display: "inline-flex", alignItems: "center", gap: 5
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#0287d4",
                    display: "inline-block", animation: "spin 1s linear infinite"
                  }} />
                  Loading more…
                </span>
              )}
            </span>
            {numPages > 1 && <Pagination />}
          </div>
        )}

        {loading ? (
          <div className="cjobs-loading">
            <div className="cjobs-spinner" />
            <p>Loading openings…</p>
          </div>
        ) : error && allJobs.length === 0 ? (
          <div className="cjobs-loading">
            <p>Failed to load jobs.</p>
            <button className="button button-outline" style={{ marginTop: 12 }} onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="cjobs-grid">
            {pageJobs.map((job) => (
              <article className="cjob-card" key={job.id}>
                <JobIcon title={job.position_title} />
                <div className="cjob-body">
                  <h3 className="cjob-title">{job.public_job_title || job.position_title}</h3>
                  <div className="cjob-meta">
                    <span className="cjob-meta-item">
                      <MapPin size={13} /> {formatCity(job.city)}{job.country ? `, ${job.country}` : ""}
                    </span>
                    <span className="cjob-meta-item">
                      <Clock size={13} /> Posted {timeAgo(job.created)}
                    </span>
                  </div>
                  <p className="cjob-desc">{stripHtml(job.public_job_desc).slice(0, 140)}…</p>
                  <button
                    className="cjob-apply"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && numPages > 1 && (
          <div className="cresults-meta cresults-meta-bottom">
            <Pagination />
          </div>
        )}
      </div>
      {selectedJob && <JobModal job={selectedJob} onClose={closeModal} />}
    </>
  );
}
