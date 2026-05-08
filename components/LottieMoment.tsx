import Image from "next/image";
import { withSiteBasePath } from "@/lib/site-path";

export function LottieMoment() {
  return (
    <div className="pipeline-visual image-frame" aria-hidden="true">
      <div className="pipeline-visual-scrim" />
      <div className="pipeline-track" />
      <div className="pipeline-node pipeline-node-top">
        <strong>Requirement</strong>
        <span>Role clarity, location, urgency, and deployment model.</span>
      </div>
      <div className="pipeline-node pipeline-node-middle">
        <strong>Shortlist</strong>
        <span>Specialist recruiters surface relevant candidates faster.</span>
      </div>
      <div className="pipeline-node pipeline-node-bottom">
        <strong>Joined talent</strong>
        <span>Interview movement, offer closure, and joining support.</span>
      </div>
      <Image
        src={withSiteBasePath("/home-about-banner.jpg")}
        alt=""
        fill
        sizes="(max-width: 980px) 88vw, 430px"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />
    </div>
  );
}
