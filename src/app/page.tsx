"use client";

import { HeroSlider } from "@/components/hero-slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Radio, Tv, Globe, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <HeroSlider />

      {/* Core Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#1A73E8] font-bold mb-3">
              Strategic Insights
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              Driving broadcast excellence with strategic innovation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Sports Production",
                desc: "Broadcasting every match with precision and ultra-low latency multi-camera feeds across television and digital networks.",
                icon: Tv,
              },
              {
                title: "Strategic Communications",
                desc: "Comprehensive public relations campaigns, media management, and high-impact institutional announcements.",
                icon: Globe,
              },
              {
                title: "Cloud Infrastructure",
                desc: "Secure, scalable cloud-native asset management, remote contribution workflows, and live stream delivery.",
                icon: Layers,
              },
              {
                title: "OB Van Engineering",
                desc: "Custom-built Outside Broadcast vans equipped with state-of-the-art switchers, audio consoles, and satellite uplinks.",
                icon: Radio,
              },
              {
                title: "Digital Archiving",
                desc: "Automated AI-powered tagging and long-term secure archival solutions for legacy broadcast tape libraries.",
                icon: CheckCircle2,
              },
              {
                title: "Global Distribution",
                desc: "Seamless multi-platform syndication connecting regional content directly to international broadcast networks.",
                icon: ArrowRight,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#DADCE0] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8] mb-5">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-[#202124] mb-2 group-hover:text-[#1A73E8] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[#5F6368] text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F1F3F4] flex items-center text-xs font-semibold text-[#1A73E8]">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}