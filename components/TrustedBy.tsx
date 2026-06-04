"use client";
import { useRef } from "react";
import Image from "next/image";
import { withSiteBasePath } from "@/lib/site-path";

const CLIENTS = [
  { name: "Cognizant",          logo: "/logos/cognizant.svg"      },
  { name: "Capgemini",          logo: "/logos/capgemini.svg"      },
  { name: "Deloitte",           logo: "/logos/deloitte.svg"       },
  { name: "PwC",                logo: "/logos/pwc.svg"            },
  { name: "Indorama",           logo: "/logos/indorama.svg"       },
  { name: "Hyland",             logo: "/logos/hyland.svg"         },
  { name: "Xerox",              logo: "/logos/xerox.svg"          },
  { name: "Lexmark",            logo: "/logos/lexmark.svg"        },
  { name: "LabVantage",         logo: "/logos/labvantage.svg"     },
  { name: "UST Global",         logo: "/logos/ust.svg"            },
  { name: "QCI",                logo: "/logos/qci.svg"            },
  { name: "Malomatia",          logo: "/logos/malomatia.svg"      },
  { name: "First American",     logo: "/logos/firstamerican.svg"  },
];

// Triple for seamless loop
const ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.animationPlayState = "paused";
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) { trackRef.current.style.animationPlayState = "running"; trackRef.current.style.cursor = "grab"; }
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };

  return (
    <section className="clients-section">
      <div className="wrap">
        <p className="clients-label">Trusted by India&apos;s leading organisations</p>
      </div>
      <div
        className="clients-track-wrap marquee-draggable"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <div className="clients-track">
          {ITEMS.map((c, i) => (
            <div className="client-logo-card" key={i} aria-hidden={i >= CLIENTS.length}>
              <Image
                src={withSiteBasePath(c.logo)}
                alt={c.name}
                width={140}
                height={48}
                className="client-logo-img"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
