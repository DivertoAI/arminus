"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withSiteBasePath } from "@/lib/site-path";

const NAV_ITEMS = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Solutions",   href: "/solutions" },
  { label: "Career Labs", href: "/career-labs" },
  { label: "Nubo",        href: "/nubo" },
  { label: "Careers",     href: "/careers" },
  { label: "Contact Us",  href: "/contact#contact-form" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <Link href="/" className="logo-wrap" aria-label="Arminus home">
          <img
            src={withSiteBasePath("/arminus-logo.png")}
            alt="Arminus"
            className="logo-img"
          />
        </Link>

        <div className={`nav-links${open ? " open" : ""}`}>
          {NAV_ITEMS.map(item => {
            const baseHref = item.href.split("#")[0];
            const isActive = baseHref === "/" ? pathname === "/" : pathname.startsWith(baseHref);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-right">
          <Link href="/contact" className="nav-cta">
            Hire Talent <span className="cta-arrow">→</span>
          </Link>
          <button
            className="nav-burger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
