"use client";

import { HeroSlider } from "@/components/hero-slider";
import { IntroStats } from "@/components/intro-stats";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Achievements } from "@/components/achievements";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19]">
      <HeroSlider />
      <IntroStats />
      <WhyChooseUs />
      <Achievements />
    </div>
  );
}