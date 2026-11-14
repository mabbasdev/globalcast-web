"use client";

import { Video, Shield, Radio, Zap, Globe, Cpu } from "lucide-react";

interface FeatureCard {
    title: string;
    description: string;
    icon: React.ElementType;
}

const features: FeatureCard[] = [
    {
        title: "Global Productions",
        description: "Cinematic broadcast coverage and turnkey multi-camera setups for international sports leagues, news agencies, and summits.",
        icon: Video,
    },
    {
        title: "Corporate Communications",
        description: "Secure, high-definition internal and external video conferencing architectures engineered for executive briefings.",
        icon: Shield,
    },
    {
        title: "Virtual & Hybrid Events",
        description: "Immersive virtual staging, multi-stream encoding, and robust audience engagement dashboards for global conferences.",
        icon: Radio,
    },
    {
        title: "End-to-End Streaming",
        description: "Ultra-low latency delivery pipelines distributed across global CDN nodes ensuring flawless 99.99% carrier uptime.",
        icon: Zap,
    },
];

export function WhyChooseUs() {
    return (
        <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#1A73E8]/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                        YOUR SUCCESS STORY BEGINS WITH GLOBALCAST
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
                        Creating Experiences That Shine Through In A Crowded Digital World
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        We transform complex media distribution challenges into seamless, high-performance broadcasting realities for elite organizations.
                    </p>
                </div>

                {/* 4 Core Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-6 transition-transform duration-300 group-hover:scale-110">
                                        <IconComp className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 font-sans tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}