"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/about-section";
import { Achievements } from "@/components/achievements";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GlobalNetworkCTA } from "@/components/broadcast-network-cta";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Radio,
    Globe,
    Activity,
    Wifi,
    Server,
    Video,
    Cpu,
} from "lucide-react";
import Footer from "@/components/footer";

const coreCapabilities = [
    {
        title: "Satellite & Teleport Uplinks",
        detail: "C/Ku-band earth stations with 99.99% transmission SLA and 24/7 NOC telemetry.",
        icon: Wifi,
    },
    {
        title: "Cloud Media Ecosystems",
        detail: "Automated MAM, transcoding, and <50ms SRT/RIST IP routing pipelines.",
        icon: Server,
    },
    {
        title: "OB & Live Sports Production",
        detail: "Multi-camera SDI/IP mobile units with 4K/8K HDR and live graphics.",
        icon: Video,
    },
    {
        title: "MCR & Systems Integration",
        detail: "SMPTE ST 2110 IP broadcast design, playout setup, and A/V engineering.",
        icon: Cpu,
    },
];

function TelemetryCounter({
    target,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 1200,
}: {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();
        const factor = Math.pow(10, decimals);

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = Math.round(target * eased * factor) / factor;
            setValue(next);

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            } else {
                setValue(target);
            }
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [target, decimals, duration]);

    const formatted = decimals > 0 ? value.toFixed(decimals) : String(value);

    return (
        <span className="tabular-nums">
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}

export default function AboutPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#0B0F19] text-white font-sans pt-16 sm:pt-[122px] overflow-hidden">
            {/* 1. MISSION & COMMITMENT (LEFT) | 4-CARD CORE CAPABILITIES (RIGHT) */}
            <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
                {/* Subtle Engineering Grid & Ambient Telemetry Glows */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div className="absolute top-1/3 left-1/4 w-[480px] h-[320px] bg-[#1A73E8]/12 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[280px] bg-[#38BDF8]/10 blur-[130px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-12 sm:mb-14">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                            MISSION &amp; CORE CAPABILITIES
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                            Engineered For <span className="text-[#38BDF8]">Reliability</span>, Built For{" "}
                            <span className="text-[#38BDF8]">Global Scale</span>
                        </h2>
                    </div>

                    {/* Single Row: Left = Mission & Commitment | Right = 4-Card Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                        {/* Left Column: Mission & Commitment */}
                        <div className="lg:col-span-6 group bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 ease-out relative overflow-hidden">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent" />
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#1A73E8]/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3">
                                        Mission &amp; Commitment
                                    </span>
                                    <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-[1.2]">
                                    Delivering <span className="text-[#38BDF8]">Broadcast</span> Excellence When Every{" "}
                                    <span className="text-[#38BDF8]">Frame Matters</span>
                                </h3>

                                <p className="text-slate-300 text-sm leading-relaxed">
                                    We unite on-ground broadcast engineering with resilient satellite and cloud infrastructure so media networks, sports leagues, and enterprises operate with clarity, compliance, and zero compromise.
                                </p>

                                {/* Compact Telemetry Strip with Animated Counters */}
                                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                                        <div className="flex items-center gap-1.5 text-[#38BDF8] font-extrabold font-mono text-base sm:text-lg">
                                            <Radio className="w-3.5 h-3.5 shrink-0" />
                                            <TelemetryCounter target={99.99} decimals={2} suffix="%" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                            Carrier SLA
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                                        <div className="flex items-center gap-1.5 text-white font-extrabold font-mono text-base sm:text-lg">
                                            <Activity className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                            <TelemetryCounter target={50} prefix="&lt;" suffix="ms" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                            Stream Latency
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                                        <div className="flex items-center gap-1.5 text-white font-extrabold font-mono text-base sm:text-lg">
                                            <Globe className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                            <TelemetryCounter target={24} suffix="/7" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                            NOC Telemetry
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Elevated Primary & Secondary Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/10 relative z-10">
                                <Button
                                    type="button"
                                    onClick={() => router.push("/services")}
                                    className="group/btn relative overflow-hidden bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-semibold shadow-md border border-[#38BDF8]/25 rounded-xl px-6 h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2.5 cursor-pointer"
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                                    <span>Explore Services</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1.5" />
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() => router.push("/contact")}
                                    className="group/sec bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.98] text-slate-100 hover:text-white border border-white/15 hover:border-[#38BDF8]/45 font-semibold shadow-xs rounded-xl px-6 h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                                >
                                    <span>Contact Engineering</span>
                                    <ArrowRight className="w-4 h-4 text-[#38BDF8] transition-transform duration-300 ease-out group-hover/sec:translate-x-1" />
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: 4-Card Core Capabilities Grid */}
                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {coreCapabilities.map((cap) => {
                                const IconComp = cap.icon;
                                return (
                                    <div
                                        key={cap.title}
                                        className="relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl overflow-hidden transition-all duration-300 ease-out group hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent opacity-65 group-hover:opacity-100 transition-opacity" />

                                        <div>
                                            <div className="flex items-center justify-between mb-3.5">
                                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform duration-300">
                                                    <IconComp className="w-5 h-5" />
                                                </div>
                                                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]/80" />
                                            </div>

                                            <h4 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors mb-1.5">
                                                {cap.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                {cap.detail}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT SECTION */}
            <AboutSection />

            {/* 3. HOW WE OPERATE */}
            <Achievements />

            {/* 4. WHY CHOOSE US */}
            <WhyChooseUs />

            {/* 5. CTA */}
            <GlobalNetworkCTA />

            {/* 6. Footer */}
            <Footer />
        </main>
    );
}