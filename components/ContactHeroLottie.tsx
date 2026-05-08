"use client";

import Lottie from "lottie-react";
import callCenterSupportAnimation from "@/data/lottie/call-center-support.json";

export function ContactHeroLottie() {
  return (
    <div className="hero-v2-lottie-shell contact-hero-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={callCenterSupportAnimation}
        loop
        autoplay
        className="hero-v2-lottie contact-hero-lottie"
      />
    </div>
  );
}
