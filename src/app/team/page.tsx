"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import {
    Users,
    ArrowRight,
    Radio,
    ShieldCheck,
    Award,
    Layers,
} from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    group: "Leadership" | "Production & Content" | "Operations & Finance";
    image: string;
    badge: string;
    focus: string;
    isFounder?: boolean;
}

const IMAGEKIT_TEAM_BASE =
    "https://ik.imagekit.io/ghostshooter/globalcast/team";

const teamMembers: TeamMember[] = [
    {
        id: "asif-ur-rehman",
        name: "Asif ur Rehman",
        role: "Co-Founder & CEO",
        group: "Leadership",
        image: `${IMAGEKIT_TEAM_BASE}/asif-ur-rehman.png`,
        badge: "CO-FOUNDER",
        focus: "Steering enterprise vision, strategic broadcast partnerships, and international media expansion.",
        isFounder: true,
    },
    {
        id: "mian-junaid-manzoor",
        name: "Mian Junaid Manzoor",
        role: "Co-Founder & Director",
        group: "Leadership",
        image: `${IMAGEKIT_TEAM_BASE}/mian-junaid-manzoor.png`,
        badge: "CO-FOUNDER",
        focus: "Directing operational governance, turnkey broadcast infrastructure, and institutional delivery.",
        isFounder: true,
    },
    {
        id: "misbah-uz-zaman-asher",
        name: "Misbah uz Zaman Asher",
        role: "Director, Strategic Comms Specialist & Development Sector Campaigns",
        group: "Leadership",
        image: `${IMAGEKIT_TEAM_BASE}/misbah-uz-zaman-asher.png`,
        badge: "STRATEGIC COMMS",
        focus: "Strategic communications architecture and high-impact development sector campaign leadership.",
    },
    {
        id: "asad-rehman",
        name: "Asad Rehman",
        role: "Director, Ops & Logistics",
        group: "Operations & Finance",
        image: `${IMAGEKIT_TEAM_BASE}/asad-rehman.png`,
        badge: "OPS & LOGISTICS",
        focus: "Field deployment coordination, OB unit readiness, and mission-critical site logistics.",
    },
    {
        id: "changez-khan",
        name: "Changez Khan",
        role: "Technical Producer",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/changez-khan.png`,
        badge: "PRODUCTION",
        focus: "Live show execution, multi-camera signal workflows, and technical broadcast direction.",
    },
    {
        id: "umair-khan",
        name: "Umair Khan",
        role: "Director of Photography",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/umair-khan.png`,
        badge: "CINEMATOGRAPHY",
        focus: "Visual framing, optical direction, lighting design, and broadcast shot composition.",
    },
    {
        id: "mahroo-sajid",
        name: "Mahroo Sajid",
        role: "Project Lead / Content Strategist",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/mahroo-sajid.png`,
        badge: "STRATEGY",
        focus: "Campaign roadmaps, editorial milestones, and cross-platform content architecture.",
    },
    {
        id: "kiran-khan",
        name: "Kiran Khan",
        role: "Content & Talent Manager",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/kiran-khan.png`,
        badge: "CONTENT & TALENT",
        focus: "On-air talent coordination, programming schedules, and creative production delivery.",
    },
    {
        id: "khadija-tariq",
        name: "Khadija Tariq",
        role: "Media Relations Officer",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/khadija-tariq.png`,
        badge: "MEDIA RELATIONS",
        focus: "Press outreach, institutional partner communications, and media coordination.",
    },
    {
        id: "masood-ahmed-khan",
        name: "Masood Ahmed Khan",
        role: "Video Editor / Post-Production Lead",
        group: "Production & Content",
        image: `${IMAGEKIT_TEAM_BASE}/masood-ahmed-khan.png`,
        badge: "POST-PRODUCTION",
        focus: "Editorial finishing, narrative pacing, color grading, and post-production pipeline quality.",
    },
    {
        id: "rafqat-mehmood",
        name: "Rafqat Mehmood",
        role: "Broadcast Management",
        group: "Operations & Finance",
        image: `${IMAGEKIT_TEAM_BASE}/rafqat-mehmood.png`,
        badge: "BROADCAST OPS",
        focus: "Transmission schedules, MCR playout coordination, and continuous feed reliability.",
    },
    {
        id: "faheem-abbas",
        name: "Faheem Abbas",
        role: "Manager, Accounts & Finance",
        group: "Operations & Finance",
        image: `${IMAGEKIT_TEAM_BASE}/faheem-abbas.png`,
        badge: "FINANCE",
        focus: "Financial governance, production budgeting, vendor settlements, and corporate accounting.",
    },
];

function RosterCounter({
    target,
    prefix = "",
    suffix = "",
    duration = 1200,
}: {
    target: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            } else {
                setValue(target);
            }
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [target, duration]);

    return (
        <span className="tabular-nums">
            {prefix}
            {value}
            {suffix}
        </span>
    );
}

export default function TeamPage() {
    const founders = teamMembers.filter((m) => m.isFounder);
    const crewMembers = teamMembers.filter((m) => !m.isFounder);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans pt-16 sm:pt-[122px] overflow-x-hidden">
            <main>
                {/* 1. TEAM HERO */}
                <section className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute top-1/4 right-0 w-[460px] h-[340px] bg-[#1A73E8]/15 blur-[135px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 left-0 w-[360px] h-[260px] bg-[#38BDF8]/10 blur-[115px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                                    TEAM BEHIND GLOBALCAST
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Leadership, <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Production</span> Crew
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                                    Meet the founders, directors, producers, strategists, and broadcast specialists engineering live transmissions and high-impact media campaigns across Globalcast.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                                    <a
                                        href="#executive-leadership"
                                        className="group relative overflow-hidden bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-semibold rounded-xl px-6 h-11 text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md border border-[#38BDF8]/25 transition-all duration-300 ease-out"
                                    >
                                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                                        <span>Meet Leadership</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                    </a>

                                    <Link
                                        href="/careers"
                                        className="group bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.98] text-slate-100 hover:text-white border border-white/15 hover:border-[#38BDF8]/45 font-semibold rounded-xl px-6 h-11 text-xs sm:text-sm inline-flex items-center gap-2 backdrop-blur-xs transition-all duration-300 ease-out"
                                    >
                                        <span>Join Our Crew</span>
                                        <ArrowRight className="w-4 h-4 text-[#38BDF8] transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Crew Snapshot Card */}
                            <div className="lg:col-span-5 relative rounded-2xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 p-6 sm:p-8 shadow-2xl overflow-hidden space-y-5">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent" />

                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                        CORE ROSTER SNAPSHOT
                                    </span>
                                    <Radio className="w-4 h-4 text-[#38BDF8] animate-pulse" />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07]">
                                        <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#38BDF8]">
                                            <RosterCounter target={teamMembers.length} />
                                        </div>
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                                            Specialists
                                        </div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07]">
                                        <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">
                                            <RosterCounter target={3} />
                                        </div>
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                                            Divisions
                                        </div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07]">
                                        <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#38BDF8]">
                                            <RosterCounter target={24} suffix="/7" />
                                        </div>
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                                            Readiness
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-[#38BDF8]" />
                                        <span>End-to-End Execution</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                                        <span>Executive Governance</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. EXECUTIVE LEADERSHIP SPOTLIGHT */}
                <section
                    id="executive-leadership"
                    className="relative py-16 sm:py-20 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
                                    <Award className="w-3.5 h-3.5" />
                                    <span>EXECUTIVE LEADERSHIP</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Founding <span className="text-[#38BDF8]">Directors</span> &amp; Vision
                                </h2>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-md md:text-right">
                                Guiding strategic partnerships, enterprise broadcast standards, and institutional growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            {founders.map((founder) => (
                                <div
                                    key={founder.id}
                                    className="group relative rounded-2xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 overflow-hidden shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1"
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/75 to-transparent" />
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                                    <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                                        {/* Editorial Studio Portrait */}
                                        <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto sm:min-h-[260px] bg-gradient-to-b from-[#131B2E] to-[#090D16] overflow-hidden border-b sm:border-b-0 sm:border-r border-white/10">
                                            <img
                                                src={founder.image}
                                                alt={founder.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0F19]/85 to-transparent pointer-events-none" />
                                        </div>

                                        {/* Executive Details */}
                                        <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#38BDF8]/35 text-[10px] font-mono font-bold tracking-widest uppercase text-[#38BDF8]">
                                                        {founder.badge}
                                                    </span>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                                        GLOBALCAST HQ
                                                    </span>
                                                </div>

                                                <div>
                                                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                                                        {founder.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm font-mono text-[#38BDF8]/90 mt-1">
                                                        {founder.role}
                                                    </p>
                                                </div>

                                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-white/10">
                                                    {founder.focus}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
                                                <span>Division: Leadership</span>
                                                <span className="text-[#38BDF8]/80">Active Node</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. CORE BROADCAST & PRODUCTION ROSTER */}
                <section
                    id="team-roster"
                    className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
                                    <Layers className="w-3.5 h-3.5" />
                                    <span>OPERATIONAL &amp; CREATIVE ROSTER</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Dedicated <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Production</span> Team
                                </h2>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm max-w-md lg:text-right leading-relaxed">
                                Directors, producers, strategists, and finance operators delivering seamless execution across every broadcast workflow.
                            </p>
                        </div>

                        {/* Editorial Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                            {crewMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="group relative rounded-2xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5"
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-20" />
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

                                    <div>
                                        {/* Large Portrait Header */}
                                        <div className="relative aspect-[4/4] w-full bg-gradient-to-b from-[#131B2E] to-[#0B0F19] overflow-hidden border-b border-white/10">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/55 to-transparent pointer-events-none" />

                                            {/* Top-Right Role Pill */}
                                            <span className="absolute top-3.5 right-3.5 inline-flex items-center px-3 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-wider uppercase text-[#38BDF8]">
                                                {member.badge}
                                            </span>

                                            {/* Name & Title Anchored Over Bottom Vignette */}
                                            <div className="absolute inset-x-5 bottom-4">
                                                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                                                    {member.name}
                                                </h3>
                                                <p className="text-xs font-mono text-[#38BDF8]/90 mt-0.5 line-clamp-2">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Focus Description */}
                                        <div className="p-5 sm:p-6">
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                                {member.focus}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Subtle Division Footer */}
                                    <div className="px-5 sm:px-6 py-3.5 border-t border-white/[0.08] bg-black/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                                        <span>{member.group}</span>
                                        <span className="text-[#38BDF8]/80 group-hover:translate-x-0.5 transition-transform">
                                            Globalcast
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}