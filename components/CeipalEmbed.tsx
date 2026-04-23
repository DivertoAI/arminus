"use client";

import { BriefcaseBusiness } from "lucide-react";

export function CeipalEmbed() {
  return (
    <div className="career-embed">
      <div className="career-toolbar">
        <strong>Live openings via Ceipal ATS</strong>
        <a className="button button-light" href="mailto:contactus@arminus.com?subject=Resume%20submission">
          Submit Resume
        </a>
      </div>
      <div className="career-frame">
        <div>
          <BriefcaseBusiness size={44} color="#0A8FD8" />
          <h3>Ceipal jobs will appear here</h3>
          <p>
            This area is isolated as a client-side embed surface. Once Ceipal provides the generated embed code, it can
            be placed here without blocking the server-rendered careers content or SEO metadata.
          </p>
          <a className="button button-primary" href="mailto:contactus@arminus.com?subject=Resume%20submission">
            Share your resume
          </a>
        </div>
      </div>
    </div>
  );
}
