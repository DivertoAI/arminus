"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import pipelineAnimation from "@/public/lottie/pipeline.json";

type LottieComponent = ComponentType<{
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
}>;

export function LottieMoment() {
  const [reduced, setReduced] = useState(false);
  const [Lottie, setLottie] = useState<LottieComponent | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handleChange = () => setReduced(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let mounted = true;
    import("lottie-react").then((module) => {
      if (mounted) {
        setLottie(() => module.default as LottieComponent);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ width: "min(430px, 88%)" }} aria-hidden="true">
      {Lottie ? (
        <Lottie animationData={pipelineAnimation} loop={!reduced} autoplay={!reduced} />
      ) : (
        <svg viewBox="0 0 520 360" role="img">
          <path
            d="M70 188 C145 118, 198 54, 260 180 S378 264, 450 172"
            fill="none"
            stroke="#18C7F3"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="70" cy="188" r="25" fill="#0A8FD8" />
          <circle cx="198" cy="68" r="25" fill="#FFFFFF" />
          <circle cx="330" cy="272" r="25" fill="#E31E24" />
          <circle cx="450" cy="172" r="25" fill="#18C7F3" />
        </svg>
      )}
    </div>
  );
}
