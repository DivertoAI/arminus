"use client";

import Lottie from "lottie-react";
import careerLabsAnimation from "@/data/lottie/career-labs-hero.json";

export function CareerLabsHeroLottie() {
  return (
    <div className="hero-v2-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={careerLabsAnimation}
        loop
        autoplay
        className="hero-v2-lottie"
      />
    </div>
  );
}
