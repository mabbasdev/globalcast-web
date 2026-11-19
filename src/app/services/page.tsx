"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import { servicesData } from "@/data/services";
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Radio,
    Server,
    ShieldCheck,
} from "lucide-react";

interface MetricConfig {
    label: string;
    target: number;
    decimals: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
}

const reliabilityMetrics: MetricConfig[] = [
    {
        label: "Transmission SLA",
        target: 99.99,
        decimals: 2,
        suffix: "%",
    },
    {
        label: "IP Stream Latency",
        target: 50,
        decimals: 0,
        prefix: "<",
        suffix: "ms",
    },
    {
        label: "NOC & Telemetry",
        target: 24,
        decimals: 0,
        suffix: "/7",
    },
];

function formatCounterValue(
    current: number,
    decimals: number,
    prefix = "",
    suffix = "",
    separator = ""
) {
    const fixed = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
    const parts = fixed.split(".");
    if (separator) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return `${prefix}${parts.join(".")}${suffix}`;
}

function MetricCounter({
    target,
    decimals,
    prefix = "",
    suffix = "",
    separator = "",
    duration = 1400,
}: MetricConfig & { duration?: number }) {
    const [displayValue, setDisplayValue] = useState<string>(() =>
        formatCounterValue(0, decimals, prefix, suffix, separator)
    );

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * eased;

            setDisplayValue(
                formatCounterValue(currentVal, decimals, prefix, suffix, separator)
            );

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            } else {
                setDisplayValue(
                    formatCounterValue(target, decimals, prefix, suffix, separator)
                );
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [target, decimals, prefix, suffix, separator, duration]);

    return <span>{displayValue}</span>;
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans pt-16 sm:pt-[122px] overflow-x-hidden">
            <main>
                {/* 1. SERVICES HERO */}
                <section className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
                    <div className="absolute top-1/4 right-0 w-[450px] h-[350px] bg-[#1A73E8]/15 blur-[130px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 left-0 w-[350px] h-[250px] bg-[#38BDF8]/10 blur-[110px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                                    OUR CAPABILITIES &amp; SERVICES
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    End-to-End <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Cloud</span> Infrastructure
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                                    From live stadium OB production to carrier-grade satellite teleports and automated cloud workflows, every service is engineered for continuous signal reliability.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                                    <Link
                                        href="/contact"
                                        className="group bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-semibold rounded-lg px-5 sm:px-6 h-10 sm:h-11 text-xs sm:text-sm inline-flex items-center gap-2 transition-all duration-300 ease-out"
                                    >
                                        <span>Request Deployment</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                    </Link>

                                    <a
                                        href="#all-services"
                                        className="bg-white/[0.06] hover:bg-[#1A73E8] text-white border border-white/15 hover:border-[#1A73E8] font-semibold rounded-lg px-5 sm:px-6 h-10 sm:h-11 text-xs sm:text-sm inline-flex items-center gap-2 transition-all duration-300 ease-out"
                                    >
                                        <span>Browse Capabilities</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Infrastructure Summary Card */}
                            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-8 shadow-xl space-y-5">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                        INFRASTRUCTURE OVERVIEW
                                    </span>
                                    <Radio className="w-4 h-4 text-[#38BDF8] animate-pulse" />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {reliabilityMetrics.map((metric) => (
                                        <div
                                            key={metric.label}
                                            className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06]"
                                        >
                                            <div className="text-lg sm:text-xl font-extrabold font-mono text-[#38BDF8] tabular-nums">
                                                <MetricCounter {...metric} />
                                            </div>
                                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Server className="w-4 h-4 text-[#38BDF8]" />
                                        <span>Ground-to-Cloud Ready</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                                        <span>Redundant Signal Paths</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. ALL CENTRALIZED SERVICES */}
                <section
                    id="all-services"
                    className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                                    OUR CAPABILITIES &amp; SERVICES
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Complete <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Cloud</span> Service Suite
                                </h2>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm max-w-md lg:text-right leading-relaxed">
                                Every capability from our core broadcast and cloud architecture, unified in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {servicesData.map((service) => {
                                const IconComponent = service.icon;

                                return (
                                    <div
                                        key={service.id}
                                        className="group relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-[#1A73E8]/60 overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#1A73E8]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#1A73E8]/20 transition-colors" />

                                        <div className="relative z-10">
                                            {/* Top Row: Icon + Badge */}
                                            <div className="flex items-center justify-between gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/25 border border-[#1A73E8]/50 backdrop-blur-md flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                                                    <IconComponent className="w-5 h-5" />
                                                </div>

                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-wider uppercase text-[#38BDF8]">
                                                    {service.badge.includes("HDR") ||
                                                        service.badge.includes("ACTIVE") ||
                                                        service.badge.includes("LIVE") ? (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                    ) : null}
                                                    <span>{service.badge}</span>
                                                </div>
                                            </div>

                                            {/* Title & Subtitle */}
                                            <div className="mb-2">
                                                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug mb-0.5">
                                                    {service.title}
                                                </h3>
                                                <p className="text-[11px] font-mono text-[#38BDF8]/90 tracking-wide">
                                                    {service.subtitle}
                                                </p>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                                                {service.description}
                                            </p>

                                            {/* Service Highlights */}
                                            <ul className="space-y-2 mb-5">
                                                {service.highlights.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Tags + Working Service Link */}
                                        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {service.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] font-mono font-medium text-slate-200 hover:bg-[#1A73E8]/25 hover:border-[#1A73E8]/50 hover:text-[#38BDF8] transition-all cursor-default shadow-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {service.isLinkEnabled && (
                                                <Link
                                                    href={service.href}
                                                    className="group/link w-full h-10 px-4 rounded-lg bg-white/[0.04] hover:bg-[#1A73E8] border border-white/15 hover:border-[#1A73E8] text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-between"
                                                >
                                                    <span>View Service Route</span>
                                                    <ArrowUpRight className="w-4 h-4 text-[#38BDF8] group-hover/link:text-white transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}