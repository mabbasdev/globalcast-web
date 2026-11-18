"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Play } from "lucide-react";

export function AboutSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#1A73E8]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cinematic Visual Card & 5/5 Rating Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3 sm:p-4">
              
              {/* Background Image with Overlay */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85"
                  alt="Globalcast Broadcast Production"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/30 to-transparent" />
                
                {/* Floating Live Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE BROADCAST FEED
                </div>
              </div>

              {/* Floating 5/5 Star Rating Card */}
              <div className="absolute -bottom-6 left-6 sm:left-10 bg-[#0B0F19]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Star className="w-6 h-6 fill-[#38BDF8]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1.5">(5/5)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono">Verified Enterprise Rating</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Content & Copy from Reference */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Section Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4 self-start shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
              ABOUT US
            </div>

            {/* Main Heading matching the screenshot */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 font-sans leading-[1.2]">
              Creating <span className="text-[#38BDF8]">Experiences</span> That Shine Through In A <span className="text-[#38BDF8]">Crowded Digital World</span>
            </h2>

            {/* Paragraph Copy from Reference */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                We craft immersive broadcast and digital experiences that break through the noise, whether on ground or online. By blending technology, creativity, and precision execution, we help brands, institutions, and organizations engage their audiences with impact.
              </p>
              <p>
                From sports broadcasts and corporate live streams to academic events and development sector activations, our expertise lies in transforming ideas into compelling visual stories. Our agile, collaborative approach ensures seamless delivery, no matter the scale or sector. We don't just deliver events, we create experiences that resonate, elevate, and set our clients apart in an ever-evolving digital landscape.
              </p>
            </div>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Turnkey Studio Integration</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>99.99% Carrier Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Multi-Camera SDI/IP Routing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Dedicated 24/7 NOC Support</span>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <Button
                asChild
                className="group bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold shadow-md hover:shadow-lg rounded-xl px-7 h-12 transition-all text-sm flex items-center gap-2 cursor-pointer w-fit"
              >
                <Link href="/about">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </Link>
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}