"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface Slide {
    id: number;
    alignment: "left" | "center" | "right" | "minimal";
    badge: string;
    title: string;
    description: string;
    metaInfo?: { date: string; location: string };
    primaryAction: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
    bgImage: string;
    bgVideo?: string;
    youtubeId?: string;
    directVideoUrl?: string;
    showContent?: boolean;
}

const slides: Slide[] = [
    {
        id: 1,
        alignment: "left",
        badge: "UPCOMING EVENT",
        title: "Islamabad International Broadcast & Media Summit 2026",
        description: "Connect with global media leaders and explore next-generation digital broadcast distribution across international networks.",
        metaInfo: { date: "Oct 12-15, 2026", location: "Jinnah Convention Centre, Islamabad" },
        primaryAction: { label: "Register for Summit", href: "/contact" },
        secondaryAction: { label: "Explore Services", href: "/services" },
        bgImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=85",
        youtubeId: "jiYF257LMAY",
        showContent: true,
    },
    {
        id: 2,
        alignment: "center",
        badge: "CLOUD INFRASTRUCTURE",
        title: "Enterprise Cloud Workflows & IP Distribution",
        description: "Empowering television networks with automated media asset management and ultra-low latency live streaming.",
        metaInfo: { date: "August 04, 2026", location: "Globalcast Operations Hub, Islamabad" },
        primaryAction: { label: "View Cloud Solutions", href: "/services/cloud" },
        secondaryAction: { label: "Request Demo", href: "/contact" },
        bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=85",
        showContent: true,
    },
    {
        id: 3,
        alignment: "right",
        badge: "SATELLITE & TELEPORT",
        title: "Global Satellite Uplinks with 99.99% Uptime",
        description: "Redundant C/Ku band earth stations delivering high-capacity transmission for international broadcasters and live sports.",
        metaInfo: { date: "24/7 Operations", location: "Teleport Earth Station, Islamabad" },
        primaryAction: { label: "View Facilities", href: "/services/satellite" },
        secondaryAction: { label: "Contact Engineering", href: "/contact" },
        bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85",
        showContent: true,
    },
    {
        id: 4,
        alignment: "minimal",
        badge: "TURNKEY BROADCASTING",
        title: "Master Control Rooms & Outside Broadcast Vans",
        description: "Custom-engineered OB vans and production hubs built with precision switchers and pristine broadcast audio systems.",
        metaInfo: { date: "Custom Deployments", location: "Nationwide & Regional" },
        primaryAction: { label: "View Portfolio", href: "/our-work" },
        secondaryAction: { label: "Consult Experts", href: "/contact" },
        bgImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85",
        showContent: true,
    },
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const router = useRouter();

    // Simulate initial mount skeleton loader for 700ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Auto-rotate slides smoothly every 5 seconds
    useEffect(() => {
        if (isPaused || isLoading) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused, isLoading, nextSlide]);

    if (isLoading) {
        return (
            <section className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] flex items-center pt-16 sm:pt-20 overflow-hidden bg-[#0B0F19]">
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 w-full">
                    <div className="max-w-3xl flex flex-col items-start gap-4">
                        <Skeleton className="w-36 h-6 rounded-full" />
                        <Skeleton className="w-full h-12 rounded-xl" />
                        <Skeleton className="w-3/4 h-12 rounded-xl" />
                        <Skeleton className="w-5/6 h-6 rounded-lg" />
                        <div className="flex gap-4 pt-4">
                            <Skeleton className="w-36 h-11 rounded-lg" />
                            <Skeleton className="w-36 h-11 rounded-lg" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] flex items-center pt-16 sm:pt-20 overflow-hidden bg-[#0B0F19]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {slides.map((s, idx) => {
                const isActive = idx === currentSlide;

                return (
                    <div
                        key={s.id}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 flex items-center pt-16 sm:pt-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                                ? "z-10 opacity-100 scale-100 pointer-events-auto"
                                : "z-0 opacity-0 scale-95 pointer-events-none"
                            }`}
                    >
                        {/* Background Media Layer */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            {s.youtubeId ? (
                                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none scale-125 opacity-70">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${s.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${s.youtubeId}&controls=0&showinfo=0&autohide=1&modestbranding=1&disablekb=1&iv_load_policy=3`}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] border-0"
                                        allow="autoplay; encrypted-media"
                                        title="Background YouTube Video"
                                    />
                                </div>
                            ) : s.directVideoUrl ? (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 scale-105"
                                >
                                    <source src={s.directVideoUrl} type="video/mp4" />
                                </video>
                            ) : s.bgVideo ? (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60"
                                >
                                    <source src={s.bgVideo} type="video/mp4" />
                                </video>
                            ) : (
                                <div
                                    className={`w-full h-full bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "scale-100" : "scale-110"
                                        }`}
                                    style={{ backgroundImage: `url(${s.bgImage})` }}
                                />
                            )}

                            {/* Editorial Vignettes */}
                            <div
                                className={`absolute inset-0 ${s.alignment === "right"
                                        ? "bg-gradient-to-l from-[#0B0F19] via-[#0B0F19]/85 to-[#0B0F19]/45"
                                        : s.alignment === "center"
                                            ? "bg-[#0B0F19]/75"
                                            : "bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/85 to-[#0B0F19]/45"
                                    }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/50" />
                        </div>

                        {/* Slide Content Container */}
                        {s.showContent !== false && (
                            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 w-full">
                                <div
                                    className={`flex flex-col ${s.alignment === "center"
                                            ? "items-center text-center mx-auto max-w-3xl"
                                            : s.alignment === "right"
                                                ? "items-start sm:items-end text-left sm:text-right sm:ml-auto max-w-3xl"
                                                : "items-start text-left max-w-3xl"
                                        }`}
                                >
                                    {/* 1. Eyebrow Badge */}
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3.5 sm:mb-4 transition-all duration-700 ease-out ${isActive
                                                ? "opacity-100 translate-y-0 delay-100"
                                                : "opacity-0 translate-y-3 delay-0"
                                            }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                                        {s.badge}
                                    </div>

                                    {/* 2. Main Title */}
                                    <h1
                                        className={`text-2xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white mb-3.5 sm:mb-4 leading-[1.2] font-sans line-clamp-2 transition-all duration-700 ease-out ${isActive
                                                ? "opacity-100 translate-y-0 delay-200"
                                                : "opacity-0 translate-y-4 delay-0"
                                            }`}
                                    >
                                        {s.title}
                                    </h1>

                                    {/* 3. Subtitle / Paragraph */}
                                    <p
                                        className={`text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed mb-5 sm:mb-6 max-w-2xl line-clamp-2 transition-all duration-700 ease-out ${isActive
                                                ? "opacity-100 translate-y-0 delay-300"
                                                : "opacity-0 translate-y-4 delay-0"
                                            }`}
                                    >
                                        {s.description}
                                    </p>

                                    {/* 4. Meta Info Row */}
                                    {s.metaInfo && (
                                        <div
                                            className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300 mb-6 sm:mb-7 font-medium transition-all duration-700 ease-out ${s.alignment === "center"
                                                    ? "justify-center"
                                                    : s.alignment === "right"
                                                        ? "justify-start sm:justify-end"
                                                        : "justify-start"
                                                } ${isActive
                                                    ? "opacity-100 translate-y-0 delay-[350ms]"
                                                    : "opacity-0 translate-y-4 delay-0"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#1A73E8] shrink-0" />
                                                <span>{s.metaInfo.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-[#1A73E8] shrink-0" />
                                                <span>{s.metaInfo.location}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* 5. Action Buttons */}
                                    <div
                                        className={`flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-700 ease-out ${s.alignment === "center"
                                                ? "justify-center"
                                                : s.alignment === "right"
                                                    ? "justify-start sm:justify-end"
                                                    : "justify-start"
                                            } ${isActive
                                                ? "opacity-100 translate-y-0 delay-[420ms]"
                                                : "opacity-0 translate-y-4 delay-0"
                                            }`}
                                    >
                                        <Button
                                            onClick={() => router.push(s.primaryAction.href)}
                                            className="group bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold shadow-xs hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                                        >
                                            <span>{s.primaryAction.label}</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                        </Button>

                                        {s.secondaryAction && (
                                            <Button
                                                onClick={() => router.push(s.secondaryAction!.href)}
                                                className="group bg-white/10 hover:bg-[#1A73E8] text-white border border-white/25 hover:border-[#1A73E8] font-semibold shadow-xs hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                                            >
                                                <span>{s.secondaryAction.label}</span>
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Navigation Controls */}
            <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-12 z-20 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-transparent border-0 p-0 shadow-none sm:px-3.5 sm:h-11 sm:bg-black/50 sm:backdrop-blur-md sm:rounded-lg sm:border sm:border-white/15 sm:shadow-xs">
                    {slides.map((s, idx) => (
                        <button
                            key={s.id}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? "w-6 bg-[#1A73E8]" : "w-2 bg-white/45 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <button
                        onClick={prevSlide}
                        className="group w-11 h-11 rounded-lg bg-white/10 hover:bg-[#1A73E8] text-white border border-white/20 hover:border-[#1A73E8] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md shadow-xs hover:shadow-md"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="group w-11 h-11 rounded-lg bg-white/10 hover:bg-[#1A73E8] text-white border border-white/20 hover:border-[#1A73E8] flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md shadow-xs hover:shadow-md"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </section>
    );
}