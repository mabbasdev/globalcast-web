"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio, Globe, ShieldCheck, Award, Video, Shield, Zap, Server, Briefcase, Users, Star, Activity, Cpu } from "lucide-react";

interface TechMetric {
    value: string;
    label: string;
    sublabel: string;
}

const techMetrics: TechMetric[] = [
    { value: "<50ms", label: "Stream Latency", sublabel: "Ultra-low global delivery" },
    { value: "99.99%", label: "Carrier Uptime", sublabel: "Redundant teleports" },
    { value: "4K/8K", label: "HDR Transcode", sublabel: "Pristine visual fidelity" },
    { value: "24/7", label: "Active Telemetry", sublabel: "Real-time NOC monitoring" },
];

const achievementCards = [
    { title: "Projects Delivered", target: 100, suffix: "+", icon: Briefcase },
    { title: "Active Clients", target: 25, suffix: "+", icon: Users },
    { title: "Global Brands", target: 50, suffix: "+", icon: Star },
];

// All 18 authentic client logo URLs mapped accurately
const clients = [
    { name: "SPEL", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/1630605197182-removebg-preview.png" },
    { name: "Aur Life HD", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Aur-life-Logo-png.png" },
    { name: "BAT", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/LMKT-Website-removebg-preview.png?updatedAt=1794638399029" },
    { name: "Geo News", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/GEO_News_logo_in_Urdu.png" },
    { name: "HEC Pakistan", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/HEC_LOGO_WEBSITE-removebg-preview.png" },
    { name: "Hum Network", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Hum_Network_logo.png" },
    { name: "World Squash", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/images-removebg-preview-2.png?updatedAt=1794638399104" },
    { name: "Leverify", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/leverifyllc_logo-removebg-preview.png?updatedAt=1794638398864" },
    { name: "LMKT", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/LMKT-Website-removebg-preview.png?updatedAt=1794638399029" },
    { name: "Myco", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/myco-logo-variation-4-500px-300x124-1.png?updatedAt=1794638398936" },
    { name: "National Incubation Center", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/NIC.png?updatedAt=1794638398886" },
    { name: "Pakistan Tobacco Company", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PAKT.PK_BIG.D-c8fe4a3c.png?updatedAt=1794638398870" },
    { name: "PCB", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/pcb-star-logo-png_seeklogo-474792.png?updatedAt=1794638398870" },
    { name: "PFF", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PFF_LOGO_WEBSITE__1_-removebg-preview.png?updatedAt=1794638399051" },
    { name: "HBL PSL 2025", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/Picture1.png?updatedAt=1794638398896" },
    { name: "PTV Sports", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/PTV_Sports.png?updatedAt=1794638399110" },
    { name: "Black Box Sounds", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/static1.squarespace.png?updatedAt=1794638398995" },
    { name: "Walee", logoUrl: "https://ik.imagekit.io/ghostshooter/globalcast/walee-logo-1536x528.png?updatedAt=1794638399097" },
];

export function ImpactBento() {
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Smooth Auto-Scroll Ticker for Client Marquee
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || isLoading) return;

        let animationFrameId: number;
        const scrollSpeed = 0.6;

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
                    <Skeleton className="w-full h-96 rounded-3xl bg-slate-800/40" />
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1A73E8]/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-12">
                
                {/* Journey & Vision Section with Highlighted Keywords */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                        OUR JOURNEY & VISION
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-sans">
                        Engineering the <span className="text-[#38BDF8]">Future</span> of Global <span className="text-[#38BDF8]">Media Networks</span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        From visionary satellite links to hyper-scalable cloud architectures, we architect the digital backbone that empowers broadcasters to reach billions worldwide with <span className="text-white font-semibold">zero compromise</span>.
                    </p>
                </div>

                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                    
                    {/* Left Column: Technical Performance Metrics (Span 6 Cols on LG) */}
                    <div className="lg:col-span-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#1A73E8]/50 transition-all">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#1A73E8]/10 rounded-full blur-3xl pointer-events-none" />
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">Technical Benchmarks</span>
                                <Activity className="w-5 h-5 text-[#38BDF8] animate-pulse" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                Unmatched <span className="text-[#38BDF8]">Transmission</span> Standards
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 mb-6">
                                Engineered from the ground up for high-throughput media ingest, ultra-low latency routing, and fault-tolerant telemetry.
                            </p>
                        </div>

                        {/* 2x2 Sub-Grid for Technical Metrics */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/10">
                            {techMetrics.map((tm, i) => (
                                <div key={i} className="bg-black/20 rounded-xl p-3 sm:p-4 border border-white/5">
                                    <div className="text-xl sm:text-3xl font-extrabold text-[#38BDF8] font-sans tracking-tight mb-0.5">
                                        {tm.value}
                                    </div>
                                    <div className="text-xs font-bold text-white mb-0.5">{tm.label}</div>
                                    <div className="text-[10px] text-slate-400">{tm.sublabel}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: 4 Uniform Service Cards (Span 6 Cols on LG) */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Card 1: Global Productions */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#1A73E8]/50 transition-all group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                                    <Video className="w-5 h-5" />
                                </div>
                                <h4 className="text-[16px] font-bold text-white mb-1"><span className="text-[#38BDF8]">Global</span> Productions</h4>
                                <p className="text-[12px] text-slate-400 leading-relaxed">
                                    Cinematic broadcast coverage and multi-camera setups for sports leagues and summit events.
                                </p>
                            </div>
                            <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-[#38BDF8]">
                                Multi-Camera SDI/IP →
                            </div>
                        </div>

                        {/* Card 2: Cloud Workflows */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#1A73E8]/50 transition-all group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                                    <Server className="w-5 h-5" />
                                </div>
                                <h4 className="text-[16px] font-bold text-white mb-1"><span className="text-[#38BDF8]">Cloud</span> Ecosystems</h4>
                                <p className="text-[12px] text-slate-400 leading-relaxed">
                                    Automated Media Asset Management (MAM) and secure cloud transcoding pipelines.
                                </p>
                            </div>
                            <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-[#38BDF8]">
                                Low Latency OTT →
                            </div>
                        </div>

                        {/* Card 3: Satellite & Teleport */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#1A73E8]/50 transition-all group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h4 className="text-[16px] font-bold text-white mb-1"><span className="text-[#38BDF8]">Satellite</span> Uplinks</h4>
                                <p className="text-[12px] text-slate-400 leading-relaxed">
                                    C/Ku band earth station teleport facilities ensuring uninterrupted international transmission.
                                </p>
                            </div>
                            <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-[#38BDF8]">
                                24/7 Operations →
                            </div>
                        </div>

                        {/* Card 4: OB Vans */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#1A73E8]/50 transition-all group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform">
                                    <Radio className="w-5 h-5" />
                                </div>
                                <h4 className="text-[16px] font-bold text-white mb-1"><span className="text-[#38BDF8]">OB</span> Vans</h4>
                                <p className="text-[12px] text-slate-400 leading-relaxed">
                                    Custom-engineered OB vans equipped with precision switchers and pristine broadcast audio.
                                </p>
                            </div>
                            <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-[#38BDF8]">
                                Turnkey Deployments →
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom Row: 3 Achievement Cards with Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 ">
                    {achievementCards.map((card, i) => {
                        const IconComp = card.icon;
                        return (
                            <div
                                key={i}
                                className="bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-[#1A73E8]/50 rounded-2xl p-6 text-center shadow-md transition-all duration-300 group hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <IconComp className="w-6 h-6" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-1">
                                    <Counter target={card.target} suffix={card.suffix} />
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-widest font-mono">
                                    {card.title}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Integrated 18-Client Marquee Strip */}
                {/* <div className="pt-6 border-t border-white/10">
                    <p className="text-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
                        Trusted by 18+ Leading Broadcasters & Media Networks
                    </p>

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => { isHovered.current = true; }}
                        onMouseLeave={() => { isHovered.current = false; isDragging.current = false; }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        className="relative w-full overflow-x-hidden no-scrollbar cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
                    >
                        <div className="flex items-center gap-4 w-max">
                            {infiniteClients.map((client, idx) => (
                                <div
                                    key={`${client.name}-${idx}`}
                                    className="w-36 sm:w-44 h-16 sm:h-20 shrink-0 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#1A73E8]/50 flex items-center justify-center p-2.5 transition-all duration-300 group shadow-sm select-none pointer-events-none sm:pointer-events-auto"
                                >
                                    <img
                                        src={client.logoUrl}
                                        alt={client.name}
                                        className="max-h-[38px] max-w-[110px] w-auto h-auto object-contain rounded-md opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}

            </div>
        </section>
    );
}

// Smooth Number Counter Component
function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const duration = 2000;

        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress));
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        const frameId = requestAnimationFrame(animateCount);
        return () => cancelAnimationFrame(frameId);
    }, [target]);

    const formattedNumber = target % 1 !== 0
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