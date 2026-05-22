"use client";

import { useEffect, useRef } from "react";

export function CeipalWidget() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    // Remove any previously injected script to avoid duplicates on hot-reload
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
    };
  }, []);

  return (
    <div className="ceipal-widget-wrap">
      <div id="example-widget-container" />
    </div>
  );
}
