"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ServicesBento() {
    return (
        <section
            id="services"
            className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-0 w-[450px] h-[350px] bg-[#1A73E8]/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[350px] h-[250px] bg-[#38BDF8]/5 blur-[110px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                            OUR CAPABILITIES &amp; SERVICES
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                            End-to-End <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                            <span className="text-[#38BDF8]">Cloud</span> Infrastructure
                        </h2>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3">
                        <p className="text-slate-300 text-xs sm:text-sm max-w-md lg:text-right leading-relaxed">
                            From live stadium OB production to carrier-grade satellite teleports and automated cloud workflows.
                        </p>
                        <Link
                            href="/services"
                            className="group bg-white/[0.04] hover:bg-[#1A73E8] text-white border border-white/15 hover:border-[#1A73E8] rounded-lg px-5 h-10 text-xs font-mono uppercase tracking-wider transition-all self-start lg:self-end shadow-sm inline-flex items-center"
                        >
                            <span>Explore All Services</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Compact 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {servicesData.map((service) => {
                        const IconComponent = service.icon;

                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className="group relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-[#1A73E8]/60 overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                            >
                                {/* Background Glow Accent */}
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#1A73E8]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#1A73E8]/20 transition-colors" />

                                {/* Top Row: Icon + Badge */}
                                <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
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

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug mb-0.5">
                                                {service.title}
                                            </h3>
                                            <p className="text-[11px] font-mono text-[#38BDF8]/90 tracking-wide">
                                                {service.subtitle}
                                            </p>
                                        </div>

                                        <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#1A73E8] flex items-center justify-center text-white shrink-0 transition-colors">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>

                                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Result Pills / Tags */}
                                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] font-mono font-medium text-slate-200 hover:bg-[#1A73E8]/25 hover:border-[#1A73E8]/50 hover:text-[#38BDF8] transition-all cursor-default shadow-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}