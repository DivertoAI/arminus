"use client";

import { useEffect, useRef } from "react";

interface CeipalWidgetProps {
  /** If provided, widget opens directly to that job detail */
  jobId?: string;
  /** Container id — must be unique per instance */
  containerId?: string;
}

export function CeipalWidget({ jobId, containerId = "example-widget-container" }: CeipalWidgetProps) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // If a jobId is passed, put it in the URL so the widget reads it
    if (jobId) {
      const url = new URL(window.location.href);
      url.searchParams.set("job_id", jobId);
      window.history.replaceState({}, "", url.toString());
    }

    const existing = document.querySelector('script[data-ceipal-api-key]');
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://jobsapi.ceipal.com/APISource/widget.js";
    script.setAttribute("data-ceipal-api-key", "N1M4Zy9jcFlNa0F2OTRXS1Zjc2hkUT09");
    script.setAttribute("data-ceipal-career-portal-id", "Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      mounted.current = false;
      // Clean job_id from URL on unmount
      const url = new URL(window.location.href);
      url.searchParams.delete("job_id");
      window.history.replaceState({}, "", url.toString());
    };
  }, [jobId]);

  return (
    <div className="ceipal-widget-wrap">
      <div id={containerId} />
    </div>
  );
}
