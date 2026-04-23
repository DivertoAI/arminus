"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label="Arminus home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">A</span>
          <span className="brand-text">
            <span className="brand-name">
              Armin<span>us</span>
            </span>
            <span className="brand-tagline">The Power of Us</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="button button-primary nav-cta" href="/contact">
            Hire Talent <ArrowRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${menuOpen ? "mobile-nav-open" : ""}`} id="mobile-nav">
        <div className="mobile-nav-inner container">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-primary mobile-nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
            Hire Talent <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
