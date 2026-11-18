"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VideoModal } from "@/components/video-modal";
import {
    ArrowRight,
    Star,
    Radio,
    Sparkles,
    Server,
    ShieldCheck,
    Play,
    Globe,
    Cloud,
    Tv,
    Wifi,
    Cpu,
    Database,
    Layers,
    Activity,
    Zap,
} from "lucide-react";

// Content mapped for each of the 5 categories
const categoryData: Record<string, {
    title: string;
    icon: React.ElementType;
    boxes: { title: string; icon: React.ElementType; desc: string }[];
}> = {
    "GLOBAL REACH": {
        title: "Global Reach & Infrastructure",
        icon: Globe,
        boxes: [
            { title: "LIVE UPLINKS", icon: Radio, desc: "Redundant satellite links" },
            { title: "4K/8K STUDIO", icon: Sparkles, desc: "Pristine visual fidelity" },
            { title: "CLOUD MAM", icon: Server, desc: "Automated asset workflows" },
        ],
    },
    "SATELLITE": {
        title: "Satellite & Teleport Uplinks",
        icon: Wifi,
        boxes: [
            { title: "C/KU BAND", icon: Radio, desc: "Global earth station access" },
            { title: "99.99% SLA", icon: ShieldCheck, desc: "Uninterrupted uptime" },
            { title: "TELEMETRY", icon: Activity, desc: "24/7 NOC signal tracking" },
        ],
    },
    "CLOUD": {
        title: "Cloud Media Workflows",
        icon: Cloud,
        boxes: [
            { title: "IP TRANSCODER", icon: Cpu, desc: "Low-latency adaptive bitrate" },
            { title: "STORAGE POOL", icon: Database, desc: "Secure multi-region storage" },
            { title: "FAST INGEST", icon: Zap, desc: "High-speed media routing" },
        ],
    },
    "ON-GROUND": {
        title: "On-Ground & OB Production",
        icon: Layers,
        boxes: [
            { title: "OB VANS", icon: Radio, desc: "Mobile broadcast units" },
            { title: "SWITCHERS", icon: Cpu, desc: "Multi-camera SDI/IP routing" },
            { title: "PRO AUDIO", icon: Sparkles, desc: "Pristine acoustic mastering" },
        ],
    },
    "OTT": {
        title: "OTT & Digital Streaming",
        icon: Tv,
        boxes: [
            { title: "GLOBAL CDN", icon: Globe, desc: "Instant worldwide delivery" },
            { title: "AD INSERTION", icon: Zap, desc: "Dynamic monetization tools" },
            { title: "ANALYTICS", icon: Activity, desc: "Real-time viewer telemetry" },
        ],
    },
};

const categories = Object.keys(categoryData);

// Scroll-Triggered Rating Counter Component
function RatingCounter() {
    const [rating, setRating] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        const duration = 1500;
        const target = 5.0;

        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress));
            setRating(current);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        const frameId = requestAnimationFrame(animateCount);
        return () => cancelAnimationFrame(frameId);
    }, [hasStarted]);

    return (
        <div ref={counterRef} className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-5 sm:right-6 bg-[#0B0F19]/95 backdrop-blur-xl border border-[#38BDF8]/40 rounded-xl px-5 py-4 shadow-2xl">
            <div className="flex items-center gap-1.5 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] font-sans tracking-tight">
                    {rating.toFixed(1)} / 5
                </span>
                <div className="flex items-center gap-0.5 ml-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                </div>
            </div>
            <div className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-slate-300">
                ENTERPRISE CLIENT RATING
            </div>
        </div>
    );
}

export function AboutSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [activeVideoSrc, setActiveVideoSrc] = useState("https://ik.imagekit.io/ghostshooter/showreel.mp4");

    const openVideoModal = (src?: string) => {
        if (src) setActiveVideoSrc(src);
        setIsVideoModalOpen(true);
    };

    // Auto-rotation timer (2.5 seconds per slide)
    useEffect(() => {
        if (isPaused) return;

        const intervalTime = 25;
        const totalDuration = 2500;
        const increment = (intervalTime / totalDuration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveTab((currentTab) => (currentTab + 1) % categories.length);
                    return 0;
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [isPaused, activeTab]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setProgress(0);
    };

    const currentCategoryKey = categories[activeTab];
    const currentContent = categoryData[currentCategoryKey];

    return (
        <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[520px] h-[520px] bg-[#1A73E8]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

                    {/* Left Column: Interactive Auto-Scrolling Slider */}
                    <div
                        className="lg:col-span-6"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="mb-4">
                            {/* Top Navigation Items: Horizontally Aligned & Equally Spaced */}
                            <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase mb-3 px-1">
                                {categories.map((cat, idx) => {
                                    const isActive = activeTab === idx;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => handleTabClick(idx)}
                                            className={`flex items-center gap-1.5 transition-colors cursor-pointer py-1 ${isActive ? "text-[#38BDF8]" : "text-slate-400 hover:text-slate-200"
                                                }`}
                                        >
                                            {isActive && <span className="w-2 h-2 rounded-full bg-[#1A73E8] animate-pulse" />}
                                            <span className="truncate">{cat}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Progress Bar Indicator */}
                            <div className="w-full h-1 bg-white/10 rounded-full mb-3 overflow-hidden">
                                <div
                                    className="h-full bg-[#1A73E8] transition-all duration-75"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* 3 Interactive Cards (Centered Content with Pulse Icons) */}
                            <div className="grid grid-cols-3 border border-white/15 rounded-xl overflow-hidden bg-white/[0.03]">
                                {currentContent.boxes.map((box, idx) => {
                                    const BoxIcon = box.icon;
                                    return (
                                        <div
                                            key={`${currentCategoryKey}-${idx}`}
                                            className={`p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 ${idx < 2 ? "border-r border-white/15" : ""
                                                }`}
                                        >
                                            <BoxIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#38BDF8] animate-pulse mb-3" />
                                            <div className="text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                                                {box.title}
                                            </div>
                                            <div className="text-[10px] text-slate-400 leading-snug">
                                                {box.desc}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Media Trigger Frame */}
                        <div className="relative p-2 sm:p-3 mt-6">
                            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#38BDF8]/60 pointer-events-none" />
                            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#38BDF8]/60 pointer-events-none" />
                            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#38BDF8]/60 pointer-events-none" />
                            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#38BDF8]/60 pointer-events-none" />

                            <div
                                onClick={() => openVideoModal("https://ik.imagekit.io/ghostshooter/showreel.mp4")}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85"
                                    alt="Globalcast Master Control"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-black/30 to-black/30" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-[#1A73E8]/90 group-hover:bg-[#1A73E8] border border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all">
                                        <Play className="w-7 h-7 fill-white ml-1" />
                                    </div>
                                </div>

                                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F19]/85 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-wider uppercase text-white">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                                    <span>ISO & CARRIER CERTIFIED</span>
                                </div>
                            </div>

                            {/* Bottom-Left Secondary Interactive Video Card (Matches your red box) */}
                            <div
                                onClick={() => openVideoModal("https://ik.imagekit.io/ghostshooter/showreel.mp4")}
                                className="hidden sm:block absolute -bottom-5 left-6 w-36 h-28 rounded-xl overflow-hidden border-2 border-[#0B0F19] shadow-2xl group cursor-pointer z-20"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80"
                                    alt="Broadcast Production Switcher"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-white shadow-md">
                                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* Scroll-Triggered Rating Counter Box */}
                            <RatingCounter />
                        </div>
                    </div>

                    {/* Right Column: Copy & Specs (Balanced Height) */}
                    <div className="lg:col-span-6 flex flex-col justify-center pt-4 lg:pt-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-4 self-start shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                            ABOUT GLOBALCAST
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight mb-4 font-sans leading-[1.15]">
                            Creating <span className="text-[#38BDF8]">Experiences</span> That Shine Through In A{" "}
                            <span className="text-[#38BDF8]">Crowded Digital World</span>
                        </h2>

                        <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                            <p>
                                We craft immersive broadcast and digital experiences that break through the noise, whether on ground or online. By blending technology, creativity, and precision execution, we help brands engage audiences with impact.
                            </p>
                            <p className="text-slate-400 text-xs sm:text-sm">
                                Our commitment to engineering excellence ensures every transmission and digital touchpoint exceeds international broadcasting standards.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-5 mb-7 border-t border-b border-white/10">
                            <div className="border-l-2 border-[#38BDF8] pl-3.5">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">BROADCAST SCALE</div>
                                <div className="text-sm sm:text-base font-bold text-white">2,500+ Live Events</div>
                            </div>
                            <div className="border-l-2 border-[#38BDF8] pl-3.5">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">TRANSMISSION SLA</div>
                                <div className="text-sm sm:text-base font-bold text-white">99.99% Uptime</div>
                            </div>
                            <div className="border-l-2 border-[#38BDF8] pl-3.5">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">CORE SECTORS</div>
                                <div className="text-sm sm:text-base font-bold text-white">Sports, TV & Corporate</div>
                            </div>
                            <div className="border-l-2 border-[#38BDF8] pl-3.5">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">OPERATIONS HUB</div>
                                <div className="text-sm sm:text-base font-bold text-white">Islamabad & Global</div>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="button"
                                onClick={() => router.push("/about")}
                                className="group bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold shadow-md hover:shadow-lg rounded-lg px-7 h-12 transition-all text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2.5 cursor-pointer"
                            >
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoSrc={activeVideoSrc}
            />
        </section>
    );
}