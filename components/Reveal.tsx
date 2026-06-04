"use client";
import { useEffect, useRef } from "react";

export function Reveal({ children, as = "div", className = "", stagger = false, ...rest }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }});
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Comp = as as any;
  return <Comp ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`} {...rest}>{children}</Comp>;
}
