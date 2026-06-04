"use client";
import { useRef, useEffect } from "react";

const PARTNERS = [
  { name: "PwC",     sub: "Big Four · Advisory" },
  { name: "Deloitte",sub: "Big Four · Consulting" },
  { name: "KPMG",    sub: "Big Four · Audit & Tax" },
  { name: "EY",      sub: "Big Four · Assurance" },
  { name: "QCI",     sub: "Quality Council of India" },
  { name: "ICC",     sub: "Indian Chamber of Commerce" },
];

// Triple to fill the marquee
const ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => { isDragging.current = false; };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="trusted-section">
      <div className="trusted-lbl-center">Trusted by India&apos;s leading firms</div>
      <div className="marquee">
        <div
          className="marquee-draggable"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="marquee-track">
            {ITEMS.map((p, i) => (
              <div key={i} className="trusted-card">
                <div className="trusted-name">{p.name}</div>
                <div className="trusted-sub">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
