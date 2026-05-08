"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollManager() {
  const pathname = usePathname();

  // Restore scroll to top on route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  // Task 7 — Navbar scrolled shadow
  useEffect(() => {
    const header = document.querySelector(".site-header") as HTMLElement | null;
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Task 5 — Count-up animation for stat values
  useEffect(() => {
    const statValues = document.querySelectorAll<HTMLElement>(".stat-bar-v2-value[data-count]");
    if (!statValues.length) return;

    const animateCount = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count ?? "0", 10);
      const suffix = el.dataset.suffix ?? "";
      const duration = 1400;
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const bar = document.querySelector(".stat-bar-v2");
    if (!bar) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statValues.forEach(animateCount);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(bar);
    return () => observer.disconnect();
  }, [pathname]);


  return null;
}
