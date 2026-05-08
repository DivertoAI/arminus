"use client";

import Lottie from "lottie-react";
import recruitmentAnimation from "@/data/lottie/recruitment.json";

export function LottieMoment() {
  return (
    <div className="hero-v2-lottie-shell" aria-hidden="true">
      <Lottie
        animationData={recruitmentAnimation}
        loop
        autoplay
        className="hero-v2-lottie"
      />
    </div>
  );
}
