"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { withSiteBasePath } from "@/lib/site-path";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home",       href: "/" },
  { label: "About Us",  href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Careers",   href: "/careers" },
  { label: "Contact Us",href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const navItems = NAV_ITEMS;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Arminus home">
          <Image
            className="brand-logo"
            src={withSiteBasePath("/arminus-logo.png")}
            alt="Arminus team work"
            width={170}
            height={108}
            priority
          />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            const sharedProps = {
              className: active ? "nav-link nav-link-active" : "nav-link"
            };

            return item.href.startsWith("mailto:") ? (
              <a key={item.label} href={item.href} {...sharedProps}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} {...sharedProps}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <Link className="button button-primary nav-cta" href="/contact">
            Get Started <ArrowRight size={18} />
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
        <div className="container mobile-nav-panel">
          {navItems.map((item) =>
            item.href.startsWith("mailto:") ? (
              <a key={item.label} className="mobile-nav-link" href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} className="mobile-nav-link" href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <Link className="button button-primary mobile-nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
            Get Started <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
