"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Radio } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/our-work" },
        { name: "Team", href: "/our-team" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#DADCE0] bg-white/95 backdrop-blur-md transition-colors shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

                {/* Brand Logo (Matching Official Asset Structure) */}
                <Link href="/" className="flex items-center gap-3 group py-2">
                    <div className="flex items-center gap-2.5">
                        {/* Logo Icon representation matching your uploaded graphic */}
                        <div className="w-10 h-10 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C63.2435 90 74.8878 83.5049 82 73.6667" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" />
                                <path d="M50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70C56.5 70 62.2 66.8 66 61.8" stroke="#1A73E8" strokeWidth="12" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-extrabold text-[#202124] tracking-wider text-base leading-tight font-sans">
                                GLOBALCAST
                            </span>
                            <span className="text-[10px] text-[#1A73E8] font-bold tracking-[0.2em] uppercase font-sans">
                                TECHNICAL SOLUTIONS
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F6368]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-[#1A73E8] transition-colors font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA Action */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        asChild
                        className="bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium shadow-xs rounded-lg px-6 h-10 transition-all text-sm"
                    >
                        <Link href="/contact">Get In Touch</Link>
                    </Button>
                </div>

                {/* Mobile Hamburger Trigger */}
                <div className="flex md:hidden items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-[#202124] hover:bg-[#F1F3F4] w-10 h-10 rounded-lg"
                                aria-label="Open Navigation Menu"
                            >
                                <Menu className="w-6 h-6 text-[#1A73E8]" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-white border-[#DADCE0] text-[#202124] w-[300px] sm:w-[350px] p-6 flex flex-col justify-between shadow-xl"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DADCE0]">
                                    <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-[#202124] tracking-wide text-sm">
                                            GLOBALCAST
                                        </span>
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-base font-medium text-[#5F6368] hover:text-[#1A73E8] transition-colors flex items-center justify-between py-1 border-b border-[#F1F3F4]"
                                        >
                                            <span>{link.name}</span>
                                            <span className="text-xs font-mono text-[#1A73E8]">/</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="pt-6 border-t border-[#DADCE0] flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-[#5F6368]">
                                    <Radio className="w-3.5 h-3.5 text-[#1A73E8] animate-pulse" />
                                    <span>Islamabad • Lahore • Global</span>
                                </div>
                                <Button
                                    asChild
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium h-11 rounded-lg shadow-xs text-sm"
                                >
                                    <Link href="/contact">Get In Touch</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    );
}