"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onClose: () => void;
}

export function SubmitResumeModal({ onClose }: Props) {
  const [status, setStatus]       = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fileName, setFileName]   = useState<string | null>(null);
  const [errorMsg, setErrorMsg]   = useState("");
  const fileInputRef              = useRef<HTMLInputElement>(null);
  const firstInputRef             = useRef<HTMLInputElement>(null);

  /* lock body scroll + focus trap */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const file = fileInputRef.current?.files?.[0];
    if (!file) { setErrorMsg("Please attach a resume file."); return; }

    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData();
    fd.append("name",  (form.elements.namedItem("name")  as HTMLInputElement).value);
    fd.append("email", (form.elements.namedItem("email") as HTMLInputElement).value);
    fd.append("phone", (form.elements.namedItem("phone") as HTMLInputElement).value);
    fd.append("file",  file);

    try {
      const res  = await fetch("/api/send-resume", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    /* backdrop */
    <div
      className="srm-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Submit Resume"
    >
      <div className="srm-panel" onClick={e => e.stopPropagation()}>
        {/* ── header ── */}
        <div className="srm-head">
          <div>
            <p className="srm-eyebrow">General Application</p>
            <h2 className="srm-title">Submit Your Resume</h2>
          </div>
          <button className="jm-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── success state ── */}
        {status === "success" ? (
          <div className="srm-success">
            <div className="srm-success-icon">✓</div>
            <h3>Resume Sent!</h3>
            <p>Our team will review it and reach out if there's a great match. Thank you!</p>
            <button className="btn btn-blue" onClick={onClose} style={{ marginTop: "8px" }}>
              Close
            </button>
          </div>
        ) : (
          <form className="srm-form" onSubmit={handleSubmit} noValidate>
            {/* name row */}
            <div className="srm-row">
              <label className="srm-label">
                <span>Full Name <span className="srm-req">*</span></span>
                <input
                  ref={firstInputRef}
                  name="name"
                  type="text"
                  className="srm-input"
                  placeholder="Jane Smith"
                  required
                />
              </label>
              <label className="srm-label">
                <span>Phone Number <span className="srm-req">*</span></span>
                <input
                  name="phone"
                  type="tel"
                  className="srm-input"
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>

            {/* email */}
            <label className="srm-label">
              <span>Email Address <span className="srm-req">*</span></span>
              <input
                name="email"
                type="email"
                className="srm-input"
                placeholder="jane@example.com"
                required
              />
            </label>

            {/* file picker */}
            <div className="srm-file-zone" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                style={{ display: "none" }}
                onChange={e => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              {fileName ? (
                <div className="srm-file-chosen">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span>{fileName}</span>
                  <button
                    type="button"
                    className="srm-file-clear"
                    onClick={e => { e.stopPropagation(); setFileName(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    aria-label="Remove file"
                  >×</button>
                </div>
              ) : (
                <div className="srm-file-prompt">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span className="srm-file-label">Click to upload resume</span>
                  <span className="srm-file-hint">PDF, DOC, DOCX, PNG, JPG accepted</span>
                </div>
              )}
            </div>

            {errorMsg && (
              <p className="srm-error">{errorMsg}</p>
            )}

            <div className="srm-actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-blue" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <><span className="srm-spinner"/> Sending…</>
                ) : (
                  <>Send Resume</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
