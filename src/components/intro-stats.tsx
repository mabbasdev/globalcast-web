"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio, Globe, ShieldCheck, Award } from "lucide-react";

interface StatItem {
    numericValue: number;
    suffix: string;
    label: string;
    description: string;
    icon: React.ElementType;
}

interface ClientLogo {
    name: string;
    logoUrl: string;
}

const stats: StatItem[] = [
    {
        numericValue: 5,
        suffix: "+",
        label: "Years of Excellence",
        description:
            "Delivering world-class broadcast engineering and cloud workflows.",
        icon: Award,
    },
    {
        numericValue: 150,
        suffix: "+",
        label: "Global Broadcasters",
        description:
            "Trusted by international television networks and digital media platforms.",
        icon: Globe,
    },
    {
        numericValue: 99.99,
        suffix: "%",
        label: "Live Feeds Uptime",
        description:
            "Redundant satellite uplinks and carrier-grade cloud transmission.",
        icon: ShieldCheck,
    },
    {
        numericValue: 2500,
        suffix: "+",
        label: "Live Events",
        description:
            "Managed high-profile summits, sports broadcasts, and live news feeds.",
        icon: Radio,
    },
];

// All 18 client logos with individual image URLs ready to be updated
const clients: ClientLogo[] = [
    {
        name: "SPEL",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/1630605197182-removebg-preview.png",
    },
    {
        name: "Aur Life HD",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Aur-life-Logo-png.png",
    },
    {
        name: "BAT",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/LMKT-Website-removebg-preview.png?updatedAt=1794638399029",
    },
    {
        name: "Geo News",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/GEO_News_logo_in_Urdu.png",
    },
    {
        name: "HEC Pakistan",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/HEC_LOGO_WEBSITE-removebg-preview.png",
    },
    {
        name: "Hum Network",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Hum_Network_logo.png",
    },
    {
        name: "World Squash",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/images-removebg-preview-2.png?updatedAt=1794638399104",
    },
    {
        name: "Leverify",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/leverifyllc_logo-removebg-preview.png?updatedAt=1794638398864",
    },
    {
        name: "LMKT",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/LMKT-Website-removebg-preview.png?updatedAt=1794638399029",
    },
    {
        name: "Myco",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/myco-logo-variation-4-500px-300x124-1.png?updatedAt=1794638398936",
    },
    {
        name: "National Incubation Center",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/NIC.png?updatedAt=1794638398886",
    },
    {
        name: "Pakistan Tobacco Company",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PAKT.PK_BIG.D-c8fe4a3c.png?updatedAt=1794638398870",
    },
    {
        name: "PCB",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/pcb-star-logo-png_seeklogo-474792.png?updatedAt=1794638398870",
    },
    {
        name: "PFF",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PFF_LOGO_WEBSITE__1_-removebg-preview.png?updatedAt=1794638399051",
    },
    {
        name: "HBL PSL 2025",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Picture1.png?updatedAt=1794638398896",
    },
    {
        name: "PTV Sports",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PTV_Sports.png?updatedAt=1794638399110",
    },
    {
        name: "Black Box Sounds",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/static1.squarespace.png?updatedAt=1794638398995",
    },
    {
        name: "Walee",
        logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/walee-logo-1536x528.png?updatedAt=1794638399097",
    },
];

export function IntroStats() {
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Hover & Drag states
    const isHovered = useRef(false);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Smooth Auto-Scroll Ticker that pauses on hover or drag
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || isLoading) return;

        let animationFrameId: number;
        const scrollSpeed = 0.7; // Gentle continuous scroll speed

        const step = () => {
            if (container && !isHovered.current && !isDragging.current) {
                container.scrollLeft += scrollSpeed;
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isLoading]);

    // Mouse & Touch Drag Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        if (scrollContainerRef.current) {
            startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
            scrollLeft.current = scrollContainerRef.current.scrollLeft;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const infiniteClients = [...clients, ...clients];

    if (isLoading) {
        return (
            <section className="py-16 bg-[#0B0F19] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-12">
                    <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
                        <Skeleton className="w-32 h-5 mx-auto rounded-full" />
                        <Skeleton className="w-3/4 h-10 mx-auto rounded-xl" />
                        <Skeleton className="w-full h-5 mx-auto rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-44 rounded-2xl bg-slate-800/40" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#1A73E8]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                        FROM GROUND TO CLOUD
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-sans">
                        We Power <span className="text-[#38BDF8]">Every Frame</span> 
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        Delivering uncompromised media transmission, automated cloud asset
                        management, and turnkey broadcast infrastructure worldwide.
                    </p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
                    {stats.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-[#1A73E8]/15 hover:to-white/[0.04] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-5 sm:p-7 transition-all duration-300 shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] transition-transform duration-300 group-hover:scale-110">
                                            <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1.5 font-sans tracking-tight">
                                        <Counter target={item.numericValue} suffix={item.suffix} />
                                    </div>
                                    <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1.5 font-sans line-clamp-1">
                                        {item.label}
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-slate-400 leading-snug sm:leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 18 Client Logos Slider with Hover Pause & Non-Clickable Cards */}
                <div className="pt-8 sm:pt-12 border-t border-white/10">
                    <p className="text-center text-[11px] sm:text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 sm:mb-8">
                        Trusted by 18+ Leading Broadcasters & Media Networks
                    </p>

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => {
                            isHovered.current = true;
                        }}
                        onMouseLeave={() => {
                            isHovered.current = false;
                            isDragging.current = false;
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        className="relative w-full overflow-x-hidden no-scrollbar cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                        <div className="flex items-center gap-6 w-max">
                            {infiniteClients.map((client, idx) => (
                                <div
                                    key={`${client.name}-${idx}`}
                                    className="w-44 sm:w-52 h-20 sm:h-24 shrink-0 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#1A73E8]/50 flex items-center justify-center p-3 transition-all duration-300 group shadow-sm select-none pointer-events-none sm:pointer-events-auto"
                                >
                                    <img
                                        src={client.logoUrl}
                                        alt={client.name}
                                        className="max-h-[50px] max-w-[140px] w-auto h-auto object-contain rounded-md opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Smooth number counter component
function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const duration = 2000;

        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current =
                progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress));
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        const frameId = requestAnimationFrame(animateCount);
        return () => cancelAnimationFrame(frameId);
    }, [target]);

    const formattedNumber =
        target % 1 !== 0
            ? count.toFixed(2)
            : target >= 1000
                ? Math.floor(count).toLocaleString()
                : Math.floor(count);

    return (
        <span>
            {formattedNumber}
            {suffix}
        </span>
    );
}
