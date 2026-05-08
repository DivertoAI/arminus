"use client";

import Lottie from "lottie-react";
import deltaAnimation from "@/data/lottie/delta-animation.json";

export function CareersHeroLottie() {
  return (
    <div className="hero-v2-lottie-shell careers-hero-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={deltaAnimation}
        loop
        autoplay
        className="hero-v2-lottie careers-hero-lottie"
      />
    </div>
  );
}
