"use client";

import { Cpu, Server, Network, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AchievementCard {
    title: string;
    description: string;
    icon: React.ElementType;
}

const achievements: AchievementCard[] = [
    {
        title: "Acquisition Partners Systems",
        description: "Multi-camera ingest, professional matrix switching, and lossless SDI/IP signal routing for live broadcasts.",
        icon: CameraIconRef,
    },
    {
        title: "Network & Cloud Ecosystems",
        description: "Automated Media Asset Management (MAM), secure cloud storage tiers, and lightning-fast transcoding engines.",
        icon: Server,
    },
    {
        title: "Communication Systems & Ottflow",
        description: "Dedicated VoIP, multi-channel intercom integration, and robust OTT multi-platform delivery pipelines.",
        icon: Network,
    },
    {
        title: "Custom Engineering Services",
        description: "Tailored mobile Outside Broadcast (OB) van fabrication and turnkey earth station teleport installations.",
        icon: Layers,
    },
];

function CameraIconRef(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    );
}

export function Achievements() {
    const router = useRouter();

    return (
        <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#1A73E8]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                        DELIVERING PRECISION, ENSURING IMPACT
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
                        Engineered for Uncompromised Performance
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        Explore our core technical achievements and infrastructure pillars designed to power next-generation digital broadcasting.
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {achievements.map((item, idx) => {
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

                {/* Bottom CTA Banner */}
                <div className="bg-gradient-to-r from-[#1A73E8]/20 via-white/[0.03] to-transparent border border-[#1A73E8]/40 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Elevate Your Broadcast Infrastructure?</h3>
                        <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                            Consult with our senior broadcast engineers to design a custom high-capacity streaming solution for your network.
                        </p>
                    </div>
                    <Button
                        onClick={() => router.push("/contact")}
                        className="bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-7 h-12 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2 cursor-pointer shrink-0"
                    >
                        <span>Schedule Technical Audit</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

            </div>
        </section>
    );
}