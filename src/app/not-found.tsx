"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Home,
    Compass,
    ArrowRight,
    Radio,
    Orbit,
    Sparkles,
} from "lucide-react";

const quickRoutes = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

const INITIAL_STATE = {
    x: 180,
    y: 165,
    vx: 1.7,
    vy: 1.25,
    speed: 2.1,
    angle: -12,
    omega: 0.25,
    scale: 1,
};

function generateClientPhysicsState() {
    const isSmall = window.innerWidth < 640;
    const satSize = isSmall ? 156 : 204;
    const pad = 16;
    const topSafe = isSmall ? 88 : 136;

    const maxX = Math.max(pad + satSize + 20, window.innerWidth - satSize - pad);
    const maxY = Math.max(topSafe + satSize + 20, window.innerHeight - satSize - pad);

    const x = pad + Math.random() * Math.max(40, maxX - pad);
    const y = topSafe + Math.random() * Math.max(40, maxY - topSafe);

    let launchAngle = Math.random() * Math.PI * 2;
    if (Math.abs(Math.cos(launchAngle)) < 0.25) {
        launchAngle += 0.45;
    }

    const speed = 1.55 + Math.random() * 0.85;
    const vx = Math.cos(launchAngle) * speed;
    const vy = Math.sin(launchAngle) * speed;

    const angle = Math.round(-45 + Math.random() * 90);
    const omega = (Math.random() > 0.5 ? 1 : -1) * (0.18 + Math.random() * 0.45);

    return {
        x,
        y,
        vx,
        vy,
        speed,
        angle,
        omega,
        scale: 1,
    };
}

function BigPanelAntennaSatelliteSvg({ className = "w-40 h-40 sm:w-52 sm:h-52" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="3D Broadcast Satellite with Large Solar Panels and Antennas"
        >
            <defs>
                <linearGradient id="goldFoilGrad" x1="92" y1="98" x2="148" y2="156" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="40%" stopColor="#D97706" />
                    <stop offset="80%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>

                <linearGradient id="chassisMetalGrad" x1="96" y1="92" x2="144" y2="148" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                <linearGradient id="bigSolarGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="48%" stopColor="#1A73E8" />
                    <stop offset="100%" stopColor="#091326" />
                </linearGradient>

                <radialGradient id="dishInnerGrad" cx="42%" cy="35%" r="68%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                    <stop offset="55%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#090D16" />
                </radialGradient>

                <linearGradient id="dishRimGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="55%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                <radialGradient id="plumeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#1A73E8" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Long Whip / Telemetry Antennas */}
            <line x1="126" y1="92" x2="188" y2="16" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="188" cy="16" r="4.5" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.2" />

            <line x1="104" y1="104" x2="42" y2="24" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="42" cy="24" r="4" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.1" />

            <line x1="142" y1="138" x2="212" y2="188" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="212" cy="188" r="3.8" fill="#38BDF8" />

            {/* Signal Arcs Around High-Gain Antenna */}
            <path
                d="M168 38C184 45 196 58 202 74"
                stroke="#38BDF8"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeOpacity="0.8"
            />
            <path
                d="M179 25C199 35 214 52 222 73"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.45"
            />

            {/* Rear Thruster Plume */}
            <ellipse cx="82" cy="158" rx="24" ry="12" transform="rotate(42 82 158)" fill="url(#plumeGrad)" />
            <polygon
                points="90,142 101,153 94,160 83,149"
                fill="url(#chassisMetalGrad)"
                stroke="#E2E8F0"
                strokeWidth="1.3"
            />

            {/* Extra-Large Left Solar Panel Wing */}
            <g transform="translate(8, 72) rotate(-25)">
                <rect x="2" y="5" width="76" height="38" rx="4" fill="#070B14" />
                <rect x="0" y="0" width="76" height="38" rx="4" fill="url(#bigSolarGrad)" stroke="#E2E8F0" strokeWidth="1.7" />
                <line x1="5" y1="5" x2="32" y2="5" stroke="#E0F2FE" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="15" y1="0" x2="15" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="30" y1="0" x2="30" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="45" y1="0" x2="45" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="60" y1="0" x2="60" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="0" y1="13" x2="76" y2="13" stroke="#BAE6FD" strokeOpacity="0.26" strokeWidth="1" />
                <line x1="0" y1="26" x2="76" y2="26" stroke="#BAE6FD" strokeOpacity="0.26" strokeWidth="1" />
            </g>

            {/* Extra-Large Right Solar Panel Wing */}
            <g transform="translate(154, 134) rotate(-25)">
                <rect x="2" y="5" width="76" height="38" rx="4" fill="#070B14" />
                <rect x="0" y="0" width="76" height="38" rx="4" fill="url(#bigSolarGrad)" stroke="#E2E8F0" strokeWidth="1.7" />
                <line x1="8" y1="5" x2="35" y2="5" stroke="#E0F2FE" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="15" y1="0" x2="15" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="30" y1="0" x2="30" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="45" y1="0" x2="45" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="60" y1="0" x2="60" y2="38" stroke="#BAE6FD" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="0" y1="13" x2="76" y2="13" stroke="#BAE6FD" strokeOpacity="0.26" strokeWidth="1" />
                <line x1="0" y1="26" x2="76" y2="26" stroke="#BAE6FD" strokeOpacity="0.26" strokeWidth="1" />
            </g>

            {/* Wing Support Yokes */}
            <line x1="76" y1="104" x2="100" y2="116" stroke="#CBD5E1" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="140" y1="134" x2="160" y2="144" stroke="#CBD5E1" strokeWidth="3.2" strokeLinecap="round" />

            {/* 3D Octagonal Spacecraft Bus */}
            <g>
                <polygon
                    points="98,104 122,90 146,104 146,138 122,152 98,138"
                    fill="url(#chassisMetalGrad)"
                    stroke="#F8FAFC"
                    strokeWidth="2.1"
                />
                <polygon
                    points="101,108 122,96 143,108 143,134 122,146 101,134"
                    fill="url(#goldFoilGrad)"
                />
                <polygon
                    points="122,120 146,104 146,138 122,152"
                    fill="#090D16"
                    fillOpacity="0.48"
                />
                <polygon
                    points="98,104 122,90 146,104 122,118"
                    fill="#FFFFFF"
                    fillOpacity="0.2"
                />
                <circle cx="122" cy="121" r="10" fill="#0B0F19" stroke="#38BDF8" strokeWidth="2.2" />
                <circle cx="122" cy="121" r="4" fill="#38BDF8" />
                <circle cx="139" cy="109" r="2.8" fill="#34D399" />
            </g>

            {/* Large Parabolic Dish + Feed Horn Mast */}
            <line x1="122" y1="90" x2="142" y2="50" stroke="#E2E8F0" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="112" y1="84" x2="142" y2="50" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="142" cy="50" r="5" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.3" />

            <g transform="rotate(-26 116 70)">
                <ellipse cx="116" cy="73" rx="44" ry="15.5" fill="#1E293B" stroke="#64748B" strokeWidth="1.6" />
                <ellipse cx="116" cy="69.5" rx="43" ry="15" fill="url(#dishInnerGrad)" stroke="url(#dishRimGrad)" strokeWidth="2.6" />
                <ellipse cx="116" cy="69.5" rx="27" ry="9.2" stroke="#38BDF8" strokeWidth="1.3" strokeOpacity="0.65" />
            </g>
        </svg>
    );
}

export default function NotFoundPage() {
    const router = useRouter();

    const physicsRef = useRef({ ...INITIAL_STATE });
    const [coords, setCoords] = useState<{
        x: number;
        y: number;
        angle: number;
        scale: number;
    }>({
        x: INITIAL_STATE.x,
        y: INITIAL_STATE.y,
        angle: INITIAL_STATE.angle,
        scale: INITIAL_STATE.scale,
    });
    const [isHovered, setIsHovered] = useState(false);
    const [viewportSize, setViewportSize] = useState({ width: 1280, height: 800 });

    useEffect(() => {
        const updateSize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        const fresh = generateClientPhysicsState();
        physicsRef.current = fresh;
        setCoords({
            x: fresh.x,
            y: fresh.y,
            angle: fresh.angle,
            scale: fresh.scale,
        });

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        let frameId: number;
        let bounceTimer: ReturnType<typeof setTimeout> | null = null;

        const applyCollisionPhysics = (
            normalAxis: "x" | "y",
            incomingNormalVel: number,
            tangentVel: number
        ) => {
            const impactSpeed = Math.abs(incomingNormalVel);
            physicsRef.current.scale = Math.min(1.14, 1.04 + impactSpeed * 0.035);

            const randomJitter = (Math.random() - 0.5) * 0.7;
            const torque =
                (normalAxis === "x" ? tangentVel : -tangentVel) * 0.35 +
                (Math.random() > 0.5 ? 1 : -1) * (0.4 + impactSpeed * 0.22) +
                randomJitter;

            physicsRef.current.omega = Math.max(-2.8, Math.min(2.8, physicsRef.current.omega + torque));

            if (bounceTimer) clearTimeout(bounceTimer);
            bounceTimer = setTimeout(() => {
                physicsRef.current.scale = 1;
            }, 180);
        };

        const tick = () => {
            if (!isHovered) {
                const satSize = window.innerWidth < 640 ? 156 : 204;
                const pad = 12;
                const topSafe = window.innerWidth < 640 ? 86 : 136;
                const maxX = Math.max(pad + satSize, window.innerWidth - satSize - pad);
                const maxY = Math.max(topSafe + satSize, window.innerHeight - satSize - pad);

                let { x, y, vx, vy, speed, angle, omega } = physicsRef.current;

                vx += (Math.random() - 0.5) * 0.04;
                vy += (Math.random() - 0.5) * 0.04;

                const currentMag = Math.hypot(vx, vy) || 1;
                vx = (vx / currentMag) * speed;
                vy = (vy / currentMag) * speed;

                x += vx;
                y += vy;

                if (x <= pad) {
                    x = pad;
                    const prevVx = vx;
                    vx = Math.abs(vx);
                    applyCollisionPhysics("x", prevVx, vy);
                } else if (x >= maxX) {
                    x = maxX;
                    const prevVx = vx;
                    vx = -Math.abs(vx);
                    applyCollisionPhysics("x", prevVx, vy);
                }

                if (y <= topSafe) {
                    y = topSafe;
                    const prevVy = vy;
                    vy = Math.abs(vy);
                    applyCollisionPhysics("y", prevVy, vx);
                } else if (y >= maxY) {
                    y = maxY;
                    const prevVy = vy;
                    vy = -Math.abs(vy);
                    applyCollisionPhysics("y", prevVy, vx);
                }

                omega *= 0.992;
                angle = (angle + omega) % 360;

                physicsRef.current.x = x;
                physicsRef.current.y = y;
                physicsRef.current.vx = vx;
                physicsRef.current.vy = vy;
                physicsRef.current.angle = angle;
                physicsRef.current.omega = omega;

                setCoords({
                    x,
                    y,
                    angle,
                    scale: physicsRef.current.scale,
                });
            }

            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameId);
            if (bounceTimer) clearTimeout(bounceTimer);
        };
    }, [isHovered]);

    const nearRight = coords.x > viewportSize.width * 0.62;
    const nearBottom = coords.y > viewportSize.height * 0.62;

    return (
        <main className="relative min-h-screen bg-[#0B0F19] text-white font-sans pt-20 sm:pt-[128px] pb-20 flex items-center justify-center overflow-hidden">
            {/* Subtle Telemetry Grid & Ambient Depth */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />
            <div className="absolute -top-24 left-1/4 w-[520px] h-[340px] bg-[#1A73E8]/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/5 w-[420px] h-[280px] bg-[#38BDF8]/10 blur-[140px] rounded-full pointer-events-none" />

            {/* Bare Satellite With Big Panels & Antennas (No Glass Box When Unhovered) */}
            <div
                style={{
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                tabIndex={0}
                role="button"
                aria-label="Broadcast Satellite — hover for telemetry details"
                className="fixed z-30 cursor-pointer outline-none select-none"
            >
                <div className="relative flex flex-col items-center">
                    <div
                        style={{
                            transform: `rotate(${isHovered ? 0 : coords.angle}deg) scale(${isHovered ? 1.06 : coords.scale
                                })`,
                        }}
                        className="relative"
                    >
                        <BigPanelAntennaSatelliteSvg className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-[0_18px_28px_rgba(0,0,0,0.8)]" />
                    </div>

                    {/* Hover Telemetry Card */}
                    <div
                        className={`absolute w-72 sm:w-80 rounded-2xl bg-[#0E1525]/95 backdrop-blur-xl border border-[#38BDF8]/35 p-4 sm:p-5 shadow-2xl transition-all duration-200 ease-out z-40 ${nearRight ? "right-0" : "left-0"
                            } ${nearBottom ? "bottom-full mb-3" : "top-full mt-3"
                            } ${isHovered
                                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                : "opacity-0 translate-y-1 scale-[0.98] pointer-events-none"
                            }`}
                    >
                        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Orbit className="w-4 h-4 text-[#38BDF8]" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                    ORBITAL TELEMETRY
                                </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300">
                                <Radio className="w-3 h-3 animate-pulse" />
                                COLLISION ACTIVE
                            </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            SAT-404 ricochets off screen boundaries with angular spin and bounce impulses while scanning for your requested broadcast route.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3.5">
                            <div className="rounded-lg bg-black/35 border border-white/[0.06] p-2.5">
                                <span className="text-slate-400 block text-[9px] uppercase">ATTITUDE</span>
                                <span className="text-white font-semibold">{Math.round(coords.angle)}&deg; Spin</span>
                            </div>
                            <div className="rounded-lg bg-black/35 border border-white/[0.06] p-2.5">
                                <span className="text-slate-400 block text-[9px] uppercase">ROUTE STATUS</span>
                                <span className="text-[#38BDF8] font-semibold">404 Unresolved</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400">
                                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                                Paused on hover
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push("/contact");
                                }}
                                className="text-[11px] font-mono font-bold text-[#38BDF8] hover:underline cursor-pointer"
                            >
                                Contact Desk &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Main 404 Content */}
            <div className="relative z-10 max-w-4xl mx-auto w-full px-5 sm:px-12 text-center">
                <div className="max-w-2xl mx-auto space-y-5 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                        ROUTE NOT FOUND &bull; SIGNAL LOST
                    </div>

                    <div className="space-y-2">
                        <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-[#38BDF8] leading-none">
                            404
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.15] font-sans">
                            Requested <span className="text-[#38BDF8]">Broadcast</span> Node Is Off-Air
                        </h1>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                        The endpoint you tried to reach could not be resolved on the Globalcast route table. Hover the bouncing 3D satellite to inspect telemetry or jump straight to an active page.
                    </p>

                    {/* Primary & Secondary Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
                        <Button
                            type="button"
                            onClick={() => router.push("/")}
                            className="group bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-semibold shadow-sm hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                        >
                            <Home className="w-4 h-4" />
                            <span>Back to Home</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                        </Button>

                        <Button
                            type="button"
                            onClick={() => router.push("/services")}
                            className="group bg-white/[0.06] hover:bg-[#1A73E8] active:scale-[0.98] text-white border border-white/15 hover:border-[#1A73E8] font-semibold shadow-sm hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                        >
                            <Compass className="w-4 h-4 text-[#38BDF8] group-hover:text-white transition-colors" />
                            <span>Explore Services</span>
                        </Button>
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="pt-5 border-t border-white/10 w-full flex flex-col items-center">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2.5">
                            ACTIVE DESTINATIONS
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {quickRoutes.map((route) => (
                                <button
                                    key={route.href}
                                    type="button"
                                    onClick={() => router.push(route.href)}
                                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#1A73E8]/20 text-slate-300 hover:text-[#38BDF8] border border-white/10 hover:border-[#38BDF8]/40 text-xs font-mono transition-all duration-200 cursor-pointer"
                                >
                                    {route.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}