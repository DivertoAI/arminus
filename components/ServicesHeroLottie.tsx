"use client";

import Lottie from "lottie-react";
import recruiterHiringAnimation from "@/data/lottie/recruiter-hiring.json";

export function ServicesHeroLottie() {
  return (
    <div className="hero-v2-lottie-shell services-hero-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={recruiterHiringAnimation}
        loop
        autoplay
        className="hero-v2-lottie services-hero-lottie"
      />
    </div>
  );
}
