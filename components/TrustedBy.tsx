"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { withSiteBasePath } from "@/lib/site-path";

const CLIENTS = [
  { name: "Cognizant",       logo: "/logos/cognizant.png",     scale: 1    },
  { name: "Capgemini",       logo: "/logos/capgemini.png",     scale: 1    },
  { name: "Deloitte",        logo: "/logos/deloitte.png",      scale: 1    },
  { name: "PwC",             logo: "/logos/pwc.png",           scale: 1    },
  { name: "Indorama",        logo: "/logos/indorama.png",      scale: 1    },
  { name: "Hyland",          logo: "/logos/hyland.png",        scale: 1    },
  { name: "Xerox Lexmark",   logo: "/logos/lexmark.png",       scale: 1    },
  { name: "LabVantage",      logo: "/logos/labvantage.png",    scale: 1    },
  { name: "UST Global",      logo: "/logos/ust.png",           scale: 1    },
  { name: "QCI",             logo: "/logos/qci.webp",          scale: 1    },
  { name: "Malomatia",       logo: "/logos/malomatia.svg",     scale: 1    },
  { name: "First American",  logo: "/logos/firstamerican.png", scale: 1    },
];

// Clone 4× for seamless infinite loop
const ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

const SPEED = 0.6; // px per frame

export function TrustedBy() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const dragging  = useRef(false);
  const startX    = useRef(0);
  const startScroll = useRef(0);
  const paused    = useRef(false);
  const touching  = useRef(false);
  const exactScroll = useRef<number | null>(null);

  /* ── Auto-scroll via rAF ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Start in the middle clone so we can scroll both ways
    el.scrollLeft = el.scrollWidth / 4;
    exactScroll.current = el.scrollLeft;

    function tick() {
      if (!el) return;
      if (!dragging.current && !paused.current && !touching.current) {
        if (exactScroll.current === null) exactScroll.current = el.scrollLeft;
        
        exactScroll.current += SPEED;
        el.scrollLeft = exactScroll.current;

        // Seamless loop: when we reach 3/4 through, jump back to 1/4
        const quarter = el.scrollWidth / 4;
        if (el.scrollLeft >= quarter * 3) {
          el.scrollLeft = quarter;
          exactScroll.current = quarter;
        }
        if (el.scrollLeft <= 0) {
          el.scrollLeft = quarter * 2;
          exactScroll.current = quarter * 2;
        }
      } else {
        // Sync accumulator with manual user scroll
        exactScroll.current = el.scrollLeft;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    dragging.current = true;
    startX.current    = e.pageX;
    startScroll.current = el.scrollLeft;
    el.style.cursor  = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !wrapRef.current) return;
    e.preventDefault();
    wrapRef.current.scrollLeft = startScroll.current - (e.pageX - startX.current);
    exactScroll.current = wrapRef.current.scrollLeft;
  };
  const onMouseUp = () => {
    dragging.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  };

  /* ── Touch: pause auto-scroll, let iOS native scroll take over ── */
  const touchResumeTimer = useRef<NodeJS.Timeout | null>(null);
  const onTouchStart = () => { 
    touching.current = true; 
    if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
  };
  const onTouchEnd   = () => { 
    // Wait for momentum scroll to finish before resuming auto-scroll
    touchResumeTimer.current = setTimeout(() => {
      touching.current = false;
      paused.current = false; // Fix iOS "sticky hover" bug
    }, 800);
  };

  /* ── Hover: pause auto-scroll ── */
  const onMouseEnter = () => { paused.current = true; };
  const onMouseLeave = () => { paused.current = false; dragging.current = false; if (wrapRef.current) wrapRef.current.style.cursor = "grab"; };

  return (
    <section className="clients-section">
      <div className="wrap">
        <p className="clients-label">Trusted by India&apos;s leading organisations</p>
      </div>
      <div className="clients-marquee">
        <div
          ref={wrapRef}
          className="clients-track-wrap"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div className="clients-track">
            {ITEMS.map((c, i) => (
              <div className="client-logo-card" key={i}>
                <Image
                  src={withSiteBasePath(c.logo)}
                  alt={c.name}
                  width={140}
                  height={48}
                  className="client-logo-img"
                  style={c.scale !== 1 ? { transform: `scale(${c.scale})` } : undefined}
                  unoptimized
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
