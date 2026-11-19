"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface SocialLink {
    name: string;
    href: string;
    path: string;
}

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let points: Point[] = [];
        const numPoints = 45;
        const maxDistance = 160;
        const mouseRadius = 180;

        const mouse: { x: number | null; y: number | null } = { x: null, y: null };

        const resizeCanvas = () => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        const initPoints = () => {
            resizeCanvas();
            points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                });
            }
        };

        const handleMouseMoveGlobal = (e: MouseEvent) => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeaveGlobal = () => {
            mouse.x = null;
            mouse.y = null;
        };

        initPoints();
        window.addEventListener("resize", resizeCanvas);

        const footerElem = footerRef.current;
        if (footerElem) {
            footerElem.addEventListener("mousemove", handleMouseMoveGlobal as EventListener);
            footerElem.addEventListener("mouseleave", handleMouseLeaveGlobal);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            points.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        const pushX = (dx / dist) * force * 4.5;
                        const pushY = (dy / dist) * force * 4.5;
                        p.x += pushX;
                        p.y += pushY;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(56, 189, 248, 0.5)"; // Telemetry cyan particle dots
                ctx.fill();
            });

            ctx.lineWidth = 1.0;
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const p1 = points[i];
                    const p2 = points[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.35;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`; // Telemetry cyan connecting lattice
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            if (footerElem) {
                footerElem.removeEventListener("mousemove", handleMouseMoveGlobal as EventListener);
                footerElem.removeEventListener("mouseleave", handleMouseLeaveGlobal);
            }
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const socialLinks: SocialLink[] = [
        {
            name: "Facebook",
            href: "#",
            path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        },
        {
            name: "LinkedIn",
            href: "#",
            path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        },
        {
            name: "Twitter",
            href: "#",
            path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        },
        {
            name: "Instagram",
            href: "#",
            path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
        },
        {
            name: "YouTube",
            href: "#",
            path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        }
    ];

    return (
        <footer
            ref={footerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-[#0B0F19] text-slate-300 relative overflow-hidden font-sans border-t border-white/10 transition-all duration-300"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#1A73E8]/10 blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-[#38BDF8]/10 blur-[130px] rounded-full pointer-events-none z-0" />

            {/* Interactive Particle Mesh Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0 block opacity-90"
            />

            {/* Radial Mouse Follow Glow */}
            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: isHovered
                        ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.06), transparent 80%)`
                        : "none"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10 relative z-20">

                {/* Main Reduced Grid Content (Brand, Our Pages, Quick Links) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">

                    {/* Brand Description Column with Navbar Logo */}
                    <div className="lg:col-span-6 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-full h-full drop-shadow-xs"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C63.2435 90 74.8878 83.5049 82 73.6667"
                                        stroke="#38BDF8"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70C56.5 70 62.2 66.8 66 61.8"
                                        stroke="#1A73E8"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-extrabold tracking-wider text-base text-white font-sans leading-tight">
                                    GLOBALCAST
                                </span>
                                <span className="text-[10px] text-[#38BDF8] font-bold tracking-[0.2em] uppercase font-sans">
                                    TECHNICAL SOLUTIONS
                                </span>
                            </div>
                        </Link>

                        <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                            Delivering innovative broadcast and A/V solutions across industries with commitment, clarity, and compliance.
                        </p>

                        <div className="flex items-center gap-2.5 pt-1">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    aria-label={`Follow Globalcast on ${social.name}`}
                                    className="w-9 h-9 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 flex items-center justify-center hover:bg-[#1A73E8] hover:border-[#38BDF8] transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Our Pages */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3 flex items-center h-4">
                            Our Pages
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                            <li>
                                <Link href="/" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3 flex items-center h-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
                            <li>
                                <Link href="/privacy" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    Term Of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all duration-200">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* 3 Prominent Contact Cards Row with Larger Readable Text */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-10 pt-2">

                    {/* Card 1: Direct Line */}
                    <div className="bg-[#111827]/70 backdrop-blur-md border border-white/10 hover:border-[#38BDF8]/50 p-5 rounded-xl transition-all duration-300 shadow-lg group">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8] block mb-0.5">
                                    Direct Line
                                </span>
                                <a href="tel:+923316758817" className="text-white font-extrabold text-base sm:text-lg hover:text-[#38BDF8] transition-colors block">
                                    (+92) 331-6758817
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Email Inquiry */}
                    <div className="bg-[#111827]/70 backdrop-blur-md border border-white/10 hover:border-[#38BDF8]/50 p-5 rounded-xl transition-all duration-300 shadow-lg group">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8] block mb-0.5">
                                    Email Support
                                </span>
                                <a href="mailto:enquiry@theglobalcast.com" className="text-white font-extrabold text-sm sm:text-base hover:text-[#38BDF8] transition-colors block truncate">
                                    enquiry@theglobalcast.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Headquarters */}
                    <div className="bg-[#111827]/70 backdrop-blur-md border border-white/10 hover:border-[#38BDF8]/50 p-5 rounded-xl transition-all duration-300 shadow-lg group">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8] block mb-0.5">
                                    Headquarters
                                </span>
                                <p className="text-white font-bold text-xs sm:text-sm leading-snug">
                                    10-A, Block 8, Level 2, Civic Center, G-6 Markaz, Islamabad
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Lower Footer Copyright */}
                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 relative z-30">
                    <p className="text-center sm:text-left">
                        Copyright &copy; 2026 <span className="text-white font-semibold">Globalcast Technical Solutions</span>
                    </p>
                    <p className="text-center sm:text-right">
                        Crafted by <a href="https://www.github.com/mabbasdev/" target="_blank" rel="noopener noreferrer" className="text-[#38BDF8] font-semibold hover:underline inline-flex items-center gap-0.5">Muhammad Abbas <ArrowUpRight className="w-3 h-3" /></a>
                    </p>
                </div>
            </div>
        </footer>
    );
}