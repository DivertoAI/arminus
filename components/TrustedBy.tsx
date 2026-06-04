"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { withSiteBasePath } from "@/lib/site-path";

const CLIENTS = [
  { name: "Cognizant",       logo: "/logos/cognizant.svg"      },
  { name: "Capgemini",       logo: "/logos/capgemini.svg"      },
  { name: "Deloitte",        logo: "/logos/deloitte.svg"       },
  { name: "PwC",             logo: "/logos/pwc.svg"            },
  { name: "Indorama",        logo: "/logos/indorama.svg"       },
  { name: "Hyland",          logo: "/logos/hyland.svg"         },
  { name: "Xerox",           logo: "/logos/xerox.svg"          },
  { name: "Lexmark",         logo: "/logos/lexmark.svg"        },
  { name: "LabVantage",      logo: "/logos/labvantage.svg"     },
  { name: "UST Global",      logo: "/logos/ust.svg"            },
  { name: "QCI",             logo: "/logos/qci.svg"            },
  { name: "Malomatia",       logo: "/logos/malomatia.svg"      },
  { name: "First American",  logo: "/logos/firstamerican.svg"  },
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

  /* ── Auto-scroll via rAF ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Start in the middle clone so we can scroll both ways
    el.scrollLeft = el.scrollWidth / 4;

    function tick() {
      if (!el) return;
      if (!dragging.current && !paused.current) {
        el.scrollLeft += SPEED;
        // Seamless loop: when we reach 3/4 through, jump back to 1/4
        const quarter = el.scrollWidth / 4;
        if (el.scrollLeft >= quarter * 3) el.scrollLeft = quarter;
        if (el.scrollLeft <= 0)           el.scrollLeft = quarter * 2;
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
  };
  const onMouseUp = () => {
    dragging.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  };

  /* ── Touch drag ── */
  const onTouchStart = (e: React.TouchEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    startX.current      = e.touches[0].pageX;
    startScroll.current = el.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!wrapRef.current) return;
    wrapRef.current.scrollLeft = startScroll.current - (e.touches[0].pageX - startX.current);
  };

  /* ── Hover: pause auto-scroll ── */
  const onMouseEnter = () => { paused.current = true; };
  const onMouseLeave = () => { paused.current = false; dragging.current = false; if (wrapRef.current) wrapRef.current.style.cursor = "grab"; };

  return (
    <section className="clients-section">
      <div className="wrap">
        <p className="clients-label">Trusted by India&apos;s leading organisations</p>
      </div>
      <div
        ref={wrapRef}
        className="clients-track-wrap"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
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
                unoptimized
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
