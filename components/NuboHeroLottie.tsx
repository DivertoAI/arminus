"use client";

import Lottie from "lottie-react";
import nuboAnimation from "@/data/lottie/nubo-hero.json";

export function NuboHeroLottie() {
  return (
    <div className="hero-v2-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={nuboAnimation}
        loop
        autoplay
        className="hero-v2-lottie"
      />
    </div>
  );
}
