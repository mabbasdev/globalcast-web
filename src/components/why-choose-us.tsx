"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Layers, Radio, Globe, Zap, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

// Reusable micro-counter component with smooth ease-out acceleration
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = 0;
        const endValue = Number(target);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOutQuad = progress * (2 - progress);
            setCount(Math.floor(easeOutQuad * (endValue - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return <>{count}</>;
}

const corePillars = [
    {
        title: "Expertise Across Platforms",
        desc: "Delivering seamless solutions across digital, broadcast, and hybrid communication platforms.",
        icon: Globe,
    },
    {
        title: "Comprehensive Service Offering",
        desc: "Comprehensive A/V, broadcast, corporate, and tech solutions tailored to elevate experiences across all industries.",
        icon: Layers,
    },
    {
        title: "Broadcast-Driven Engagement",
        desc: "Integrated broadcast and A/V solutions designed to connect, engage, and inspire diverse communities.",
        icon: Radio,
    },
    {
        title: "Flexible Services",
        desc: "Seamlessly adaptable services and solutions designed to meet evolving client needs across varied industries.",
        icon: Zap,
    },
];

const testimonials = [
    {
        quote: "Globalcast's OB production and ultra-low latency routing during the HBL PSL coverage set a new benchmark for live sports broadcasting in Pakistan.",
        name: "Usman Tariq",
        designation: "Head of Broadcast Operations",
        company: "PCB",
    },
    {
        quote: "Their satellite teleport infrastructure and 24/7 telemetry monitoring give us absolute peace of mind for our international news feeds.",
        name: "Bilal Ahmed",
        designation: "Chief Technical Officer",
        company: "Geo News",
    },
    {
        quote: "The cloud media workflows and automated MAM deployment transformed how quickly we push out high-definition content across our digital networks.",
        name: "Ayesha Malik",
        designation: "Director of Engineering",
        company: "Hum Network",
    },
    {
        quote: "Reliable, carrier-grade redundancy. Globalcast delivered our hybrid corporate summit with uncompromised visual fidelity and zero downtime.",
        name: "Farhan Qureshi",
        designation: "VP of Digital Infrastructure",
        company: "Pakistan Tobacco Company",
    },
];

export function WhyChooseUs() {
    const router = useRouter();
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Auto-rotating testimonials ticker effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative w-full bg-[#0B0F19] text-white py-20 sm:py-28 px-5 sm:px-12 overflow-hidden border-t border-b border-white/10">
            {/* Abstract Background Decorative Curved Lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
                <svg className="w-full h-full text-[#38BDF8]" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-100 600C200 400 400 700 800 500C1200 300 1300 600 1600 450" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M-50 650C250 450 450 750 850 550C1250 350 1350 650 1650 500" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" fill="none" />
                </svg>
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1A73E8]/15 blur-[160px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">

                {/* Left Column: Vision & Value Proposition */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                            WHY CHOOSE US
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12]">
                            Delivering <span className="text-[#38BDF8]">Precision</span>, Ensuring <span className="text-[#38BDF8]">Impact</span>
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            Empowering every frame with purpose and technical rigor to shape how stories are broadcast and consumed worldwide with zero compromise.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="button"
                            onClick={() => router.push("/about")}
                            className="group bg-white/[0.04] hover:bg-[#1A73E8] text-white border border-white/15 hover:border-[#1A73E8] rounded-lg px-6 h-11 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm inline-flex items-center gap-2"
                        >
                            <span>Learn More</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                {/* Center Column: 3D Interactive Crystal Star Trophy Canvas */}
                <div className="lg:col-span-4 flex justify-center items-center py-6">
                    <Interactive3DTrophy />
                </div>

                {/* Right Column: 4 Small Integrated Core Cards */}
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {corePillars.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between backdrop-blur-xl shadow-lg transition-all duration-300 group hover:-translate-y-1"
                            >
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                                        <IconComp className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-[#38BDF8] transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Bottom Row 1: 4-Column Stats & Achievements Bar */}
            <div className="mx-auto max-w-7xl relative z-10 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">

                {/* Stat 1: Years Excellence */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-1 text-[#38BDF8] flex items-baseline justify-center">
                        <AnimatedCounter target={5} />
                        <span className="text-xl font-bold text-[#38BDF8] ml-0.5">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-1 uppercase font-mono tracking-wider">
                        Years Excellence
                    </div>
                    <div className="text-[11px] text-slate-400">Industry Leadership</div>
                </div>

                {/* Stat 2: Global Networks */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-1 text-[#38BDF8] flex items-baseline justify-center">
                        <AnimatedCounter target={150} />
                        <span className="text-xl font-bold text-[#38BDF8] ml-0.5">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-1 uppercase font-mono tracking-wider">
                        Global Networks
                    </div>
                    <div className="text-[11px] text-slate-400">Trusted Broadcasters</div>
                </div>

                {/* Stat 3: Carrier Uptime */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-1 text-[#38BDF8] flex items-center justify-center">
                        <AnimatedCounter target={99} />.<AnimatedCounter target={99} />%
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-1 uppercase font-mono tracking-wider">
                        Carrier Uptime
                    </div>
                    <div className="text-[11px] text-slate-400">Redundant Teleports</div>
                </div>

                {/* Stat 4: Live Events */}
                <div className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.01] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-1 text-[#38BDF8] flex items-baseline justify-center">
                        <AnimatedCounter target={2500} />
                        <span className="text-xl font-bold text-[#38BDF8] ml-0.5">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mb-1 uppercase font-mono tracking-wider">
                        Live Events
                    </div>
                    <div className="text-[11px] text-slate-400">Sports &amp; Summits</div>
                </div>

            </div>

            {/* Bottom Row 2: Full-Width Full-Space Testimonial Ticker */}
            <div className="mx-auto max-w-7xl relative z-10 w-full">
                <div className="bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/10 hover:border-[#1A73E8]/40 rounded-2xl p-6 sm:px-10 sm:py-7 backdrop-blur-xl shadow-xl flex flex-col items-center justify-between gap-6 transition-all w-full">

                    {/* Desktop Layout (md+) */}
                    <div className="hidden md:flex items-center justify-between w-full gap-6">
                        <div className="space-y-3 flex-1 w-full">
                            <div className="relative min-h-[50px] overflow-hidden w-full">
                                <div className="transition-all duration-500 transform">
                                    <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed">
                                        &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 w-full">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-white">
                                        {testimonials[activeTestimonial].name}
                                    </span>
                                    <span className="text-slate-500">•</span>
                                    <span className="text-[11px] text-slate-300 font-medium">
                                        {testimonials[activeTestimonial].designation}
                                    </span>
                                </div>

                                <div className="px-3 py-1 rounded-lg bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[11px] font-mono font-bold text-[#38BDF8]">
                                    {testimonials[activeTestimonial].company}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Controls */}
                        <div className="flex items-center gap-6 shrink-0 border-l border-white/10 pl-6">
                            <div className="flex flex-col items-center gap-1.5">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTestimonial(idx)}
                                        className={`transition-all duration-300 cursor-pointer rounded-full ${idx === activeTestimonial ? "w-1.5 h-5 bg-[#38BDF8]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1A73E8] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Previous Testimonial"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1A73E8] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Next Testimonial"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile & Small Devices Layout (<md): Centered 3 Rows & Centered Pagination */}
                    <div className="flex md:hidden flex-col items-center text-center w-full space-y-4">
                        <div className="w-full">
                            <p className="text-slate-200 text-xs italic leading-relaxed">
                                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                            </p>
                        </div>

                        <div className="w-full pt-3 border-t border-white/10 space-y-1.5 flex flex-col items-center">
                            {/* Row 1: Name */}
                            <span className="text-xs font-bold text-white block">
                                {testimonials[activeTestimonial].name}
                            </span>
                            {/* Row 2: Designation */}
                            <span className="text-[11px] text-slate-300 font-medium block">
                                {testimonials[activeTestimonial].designation}
                            </span>
                            {/* Row 3: Company Badge */}
                            <div className="pt-1">
                                <span className="inline-block px-3 py-1 rounded-lg bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[11px] font-mono font-bold text-[#38BDF8]">
                                    {testimonials[activeTestimonial].company}
                                </span>
                            </div>
                        </div>

                        {/* Centralized Horizontal Pagination for Small Devices */}
                        <div className="flex items-center justify-center gap-1.5 pt-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTestimonial(idx)}
                                    className={`transition-all duration-300 cursor-pointer rounded-full ${idx === activeTestimonial ? "w-6 h-1.5 bg-[#38BDF8]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function Interactive3DTrophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const card = containerRef.current;
        const rect = card.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        const rX = -(mouseY / height) * 35;
        const rY = (mouseX / width) * 35;

        setRotate({ x: rX, y: rY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-80 h-96 flex items-center justify-center cursor-pointer select-none"
            style={{ perspective: "1200px" }}
        >
            {/* Ambient Backlight Glow */}
            <div
                className={`absolute w-64 h-64 bg-[#1A73E8]/30 rounded-full filter blur-3xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-40'}`}
            />

            {/* Main Interactive Matrix */}
            <div
                className="w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-out relative"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Geometrical Background Orbit Ring */}
                <div
                    className="absolute border-2 border-dashed border-[#38BDF8]/30 rounded-full w-64 h-64 transition-transform duration-700 pointer-events-none"
                    style={{
                        transform: isHovered ? "translateZ(-30px) rotate(45deg) scale(1.05)" : "translateZ(-15px) rotate(0deg) scale(1)"
                    }}
                />

                {/* THE PILLAR & STAR TROPHY ASSEMBLY */}
                <div
                    className="relative flex flex-col items-center drop-shadow-[0_25px_60px_rgba(26,115,232,0.4)]"
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                >
                    {/* 1. Large Crowned Geometric Sharp Star */}
                    <div
                        className="w-32 h-32 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center relative z-30 transition-transform duration-500 shadow-xl"
                        style={{
                            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                            transform: isHovered ? "translateZ(30px) scale(1.1) rotate(12deg)" : "translateZ(10px) scale(1) rotate(0deg)"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full" style={{ transform: 'skewX(-30deg)' }} />
                    </div>

                    {/* 2. Abstract Geometric Crystal Pillar Column */}
                    <div
                        className="w-16 h-36 bg-gradient-to-b from-[#1A73E8]/80 via-[#1557B0]/90 to-[#0B0F19] border border-[#38BDF8]/40 mt-[-15px] relative z-20 shadow-xl backdrop-blur-xs"
                        style={{
                            clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)",
                            transform: "translateZ(0px)"
                        }}
                    >
                        <div className="absolute inset-x-4 top-0 bottom-0 bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />
                    </div>

                    {/* 3. Upper Pedestal Mount Ring */}
                    <div className="w-20 h-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-sm shadow-md relative z-20 mt-[-2px]" />

                    {/* 4. Tiered Heavy Architectural Base Blocks */}
                    <div className="w-36 h-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-t-md border-t border-slate-600 relative z-10 shadow-lg mt-1" />
                    <div className="w-44 h-8 bg-gradient-to-r from-slate-900 via-[#0B0F19] to-slate-900 rounded-t-lg border-t border-slate-700 shadow-2xl relative z-10 flex items-center justify-center">
                        <div className="w-32 h-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xs flex items-center justify-center border border-yellow-300/40 shadow-xs">
                            <span className="text-[6px] text-slate-950 font-extrabold tracking-widest uppercase">GLOBALCAST EXCELLENCE</span>
                        </div>
                    </div>
                </div>

                {/* Floating Ambient Sparks */}
                <div
                    className="absolute w-2 h-2 bg-[#38BDF8] rounded-full opacity-70 transition-all duration-500"
                    style={{
                        transform: isHovered ? "translate3d(-70px, -110px, 60px)" : "translate3d(0,0,0)",
                        boxShadow: "0 0 12px #38BDF8"
                    }}
                />
                <div
                    className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 transition-all duration-700"
                    style={{
                        transform: isHovered ? "translate3d(90px, -40px, 90px)" : "translate3d(0,0,0)",
                        boxShadow: "0 0 10px #fbbf24"
                    }}
                />
            </div>
        </div>
    );
}