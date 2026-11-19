"use client";

import { HeroSlider } from "@/components/hero-slider";
import { IntroStats } from "@/components/key-metrics";
import { ImpactBento } from "@/components/impact-showcase";
import { AboutSection } from "@/components/about-section";
import { ServicesBento } from "@/components/services-bento";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GlobalNetworkCTA } from "@/components/broadcast-network-cta";
import Footer from "@/components/footer";

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