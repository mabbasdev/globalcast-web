"use client";

import { HeroSlider } from "@/components/hero-slider";
import { IntroStats } from "@/components/intro-stats";
import { ImpactBento } from "@/components/impact-bento";
import { AboutSection } from "@/components/about-section";
import { ServicesBento } from "@/components/services-bento";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GlobalNetworkCTA } from "@/components/join-network";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19]">
      <HeroSlider />
      <IntroStats />
      <ImpactBento />
      <AboutSection />
      <ServicesBento />
      <WhyChooseUs />
      <GlobalNetworkCTA />
      <Footer />
    </div>
  );
}