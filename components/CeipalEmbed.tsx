"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Search } from "lucide-react";

const CEIPAL_IFRAME_SRC =
  "https://jobsapi.ceipal.com/APISource/v1/index.html?bgcolor=1ba1ff&api_key=N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09&cp_id=Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09&job_id=";

export function CeipalEmbed() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("Loading live openings...");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStatus("error");
      setMessage("Live openings are temporarily unavailable. You can still share your resume directly.");
    }, 60000);

    return () => window.clearTimeout(timeout);
  }, []);

  const showFallback = status === "error";

  return (
    <section className="career-search-shell">
      <div className="career-search-card">
        <div className="career-live-bar">
          <div>
            <span className="eyebrow">Live Jobs</span>
            <h2>Browse Ceipal openings inside the live Arminus careers portal.</h2>
            <p className="career-live-copy">
              The embedded portal loads the active job board directly, so candidates see real roles instead of a mock
              listing shell.
            </p>
          </div>
          <div className="career-live-actions">
            <a className="button button-primary" href="mailto:contactus@arminus.com?subject=Resume%20submission">
              Submit Resume <ArrowRight size={18} />
            </a>
            <Link className="button button-secondary" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="career-widget-shell">
        {showFallback ? (
          <div className="career-status career-status-fallback">
            <p>{message}</p>
            <div className="career-fallback-actions">
              <a className="button button-primary" href="mailto:contactus@arminus.com?subject=Resume%20submission">
                Submit Resume
              </a>
              <Link className="button button-secondary" href="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        ) : (
          <div className="career-widget-canvas">
            <div className="career-widget-intro">
              {status === "loading" ? <Loader2 size={16} className="is-spinning" /> : <Search size={16} />}
              <span>{message}</span>
            </div>
            <iframe
              id="careers_api_source"
              title="Ceipal careers portal"
              src={CEIPAL_IFRAME_SRC}
              className="career-live-iframe"
              onLoad={() => {
                setStatus("ready");
                setMessage("");
              }}
              onError={() => {
                setStatus("error");
                setMessage("Live openings are temporarily unavailable. You can still share your resume directly.");
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
