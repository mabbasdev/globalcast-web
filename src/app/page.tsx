"use client";

import { HeroSlider } from "@/components/hero-slider";
import { IntroStats } from "@/components/intro-stats";
import { ImpactBento } from "@/components/impact-bento";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19]">
      <HeroSlider />
      <IntroStats />
      <ImpactBento />
      <AboutSection />
    </div>
  );
}