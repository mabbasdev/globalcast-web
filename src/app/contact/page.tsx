"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import {
    ArrowRight,
    ArrowUpRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    Radio,
    Send,
    CheckCircle2,
    ShieldCheck,
    Globe,
    Navigation,
    Check,
    Copy,
    SignalHigh,
    ChevronDown,
} from "lucide-react";

const inquiryTopics = [
    "Satellite & Teleport Uplink",
    "Cloud Media Workflows",
    "Sports & OB Production",
    "Engineering Systems Design",
    "24/7 NOC & Telemetry",
];

const deskHighlights = [
    {
        label: "TRANSMISSION SLA",
        value: "99.99% Uptime",
        icon: ShieldCheck,
    },
    {
        label: "STREAM LATENCY",
        value: "<50ms IP Routing",
        icon: Radio,
    },
    {
        label: "OPERATIONS HUB",
        value: "G-6 Markaz, Islamabad",
        icon: Globe,
    },
    {
        label: "MONITORING",
        value: "24/7 NOC Telemetry",
        icon: Clock,
    },
];

const OFFICE_MAPS_SHORT_URL = "https://maps.app.goo.gl/Vxe3dofTEc1i5QTJ6";
const OFFICE_ADDRESS = "Civic Centre, G-6 Markaz Block 8 G-6, Melody, 44000, Islamabad";
const OFFICE_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
    "Globalcast Technical Solutions, Civic Centre, G-6 Markaz Block 8 G-6, Melody, Islamabad"
)}&output=embed`;

const inputClassName =
    "w-full px-3.5 rounded-xl bg-black/35 border border-white/12 hover:border-white/25 focus:border-[#38BDF8] focus:bg-black/50 focus:ring-2 focus:ring-[#1A73E8]/25 outline-none text-sm text-white placeholder:text-slate-500 transition-all duration-300 ease-out";

export default function ContactPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        topic: inquiryTopics[0],
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const buildMailtoUrl = () => {
        const subject = `Globalcast Inquiry: ${formData.topic} — ${formData.fullName.trim()}`;
        const bodyLines = [
            `Name: ${formData.fullName.trim()}`,
            `Email: ${formData.email.trim()}`,
            `Phone / WhatsApp: ${formData.phone.trim() || "Not provided"}`,
            `Organization / Network: ${formData.company.trim() || "Not provided"}`,
            `Service Scope: ${formData.topic}`,
            "",
            "Technical Requirements & Timeline:",
            formData.message.trim(),
        ];
        return `mailto:enquiry@theglobalcast.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
            return;
        }
        setIsSending(true);
        const mailtoUrl = buildMailtoUrl();
        window.location.href = mailtoUrl;

        setTimeout(() => {
            setIsSending(false);
            setSubmitted(true);
        }, 250);
    };

    const handleCopy = (value: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(value);
            setCopiedValue(value);
            setTimeout(() => setCopiedValue(null), 1800);
        }
    };

    const contactCards = [
        {
            id: "mobile",
            label: "MOBILE DISPATCH",
            icon: Phone,
            items: [
                {
                    display: "(+92) 331-6758817",
                    href: "tel:+923316758817",
                    copyText: "+923316758817",
                    sub: "Direct Engineer Line",
                },
            ],
        },
        {
            id: "office",
            label: "OFFICE & UAN LINES",
            icon: Phone,
            items: [
                {
                    display: "+92-51-2261175",
                    href: "tel:+92512261175",
                    copyText: "+92512261175",
                    sub: "Islamabad Switchboard",
                },
                {
                    display: "+92-51-111-CAST",
                    href: "tel:+92511112278",
                    copyText: "+92511112278",
                    sub: "Universal Access Number",
                },
            ],
        },
        {
            id: "email",
            label: "EMAIL DESK",
            icon: Mail,
            items: [
                {
                    display: "enquiry@theglobalcast.com",
                    href: "mailto:enquiry@theglobalcast.com",
                    copyText: "enquiry@theglobalcast.com",
                    sub: "Project & Uplink Briefs",
                },
                {
                    display: "info@theglobalcast.com",
                    href: "mailto:info@theglobalcast.com",
                    copyText: "info@theglobalcast.com",
                    sub: "General Desk",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans pt-16 sm:pt-[122px] overflow-x-hidden">
            <main>
                {/* 1. CONTACT HERO */}
                <section className="relative py-16 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
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

                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                                    CONTACT ENGINEERING
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.15] font-sans">
                                    Connect With <span className="text-[#38BDF8]">Globalcast</span> Broadcast &amp;{" "}
                                    <span className="text-[#38BDF8]">Cloud</span> Engineers
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl">
                                    Planning a live sports broadcast, redundant satellite uplink, cloud media workflow, or turnkey studio integration? Reach our engineering desk directly from Islamabad or worldwide.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const el = document.getElementById("inquiry-form");
                                            el?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="group bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-semibold shadow-sm hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>Send Project Inquiry</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={() => router.push("/services")}
                                        className="group bg-white/[0.06] hover:bg-[#1A73E8] active:scale-[0.98] text-white border border-white/15 hover:border-[#1A73E8] font-semibold shadow-sm hover:shadow-md rounded-lg px-5 sm:px-6 h-10 sm:h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                                    >
                                        <span>Explore Services</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 p-6 sm:p-7 shadow-2xl overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />

                                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <Radio className="w-4 h-4 text-[#38BDF8]" />
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                                ENGINEERING DESK
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            ACTIVE
                                        </span>
                                    </div>

                                    <div className="space-y-3.5">
                                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/[0.06] hover:border-[#38BDF8]/30 transition-colors duration-300">
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
                                                <div>
                                                    <div className="text-xs font-semibold text-white">Transmission Redundancy</div>
                                                    <div className="text-[11px] text-slate-400">Dual-path satellite &amp; IP routing</div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-[#38BDF8]">99.99%</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/[0.06] hover:border-[#38BDF8]/30 transition-colors duration-300">
                                            <div className="flex items-center gap-3">
                                                <SignalHigh className="w-4 h-4 text-[#38BDF8] shrink-0" />
                                                <div>
                                                    <div className="text-xs font-semibold text-white">Contribution Latency</div>
                                                    <div className="text-[11px] text-slate-400">Low-latency SRT &amp; RIST feeds</div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-white">&lt;50ms</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/[0.06] hover:border-[#38BDF8]/30 transition-colors duration-300">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                                                <div>
                                                    <div className="text-xs font-semibold text-white">Operations Coverage</div>
                                                    <div className="text-[11px] text-slate-400">24/7 NOC &amp; live event support</div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-white">24/7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top 3 Cards: Phone Numbers & Emails Only */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 sm:mt-14">
                            {contactCards.map((card) => {
                                const IconComp = card.icon;
                                return (
                                    <div
                                        key={card.id}
                                        className="relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] hover:from-[#1A73E8]/15 hover:to-white/[0.03] border border-white/10 hover:border-[#38BDF8]/45 p-6 shadow-xl transition-all duration-300 ease-out group overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform duration-300 shrink-0">
                                                <IconComp className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                                {card.label}
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            {card.items.map((entry) => {
                                                const isCopied = copiedValue === entry.copyText;
                                                return (
                                                    <div
                                                        key={entry.copyText}
                                                        className="flex items-center justify-between gap-2 rounded-xl bg-black/30 border border-white/[0.06] px-3.5 py-2.5"
                                                    >
                                                        <div className="min-w-0">
                                                            <a
                                                                href={entry.href}
                                                                className="text-sm sm:text-[15px] font-bold text-white hover:text-[#38BDF8] transition-colors block truncate"
                                                            >
                                                                {entry.display}
                                                            </a>
                                                            <span className="text-[11px] text-slate-400 block truncate">
                                                                {entry.sub}
                                                            </span>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleCopy(entry.copyText)}
                                                            title={`Copy ${entry.display}`}
                                                            aria-label={`Copy ${entry.display}`}
                                                            className="p-2 rounded-lg bg-white/[0.05] hover:bg-[#1A73E8]/30 text-slate-300 hover:text-white border border-white/10 transition-all duration-200 cursor-pointer shrink-0"
                                                        >
                                                            {isCopied ? (
                                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 2. INQUIRY FORM & TECHNICAL DESK */}
                <section
                    id="inquiry-form"
                    className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left 7 Cols: Upgraded Branded Inquiry Form */}
                            <div className="lg:col-span-7 relative rounded-2xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.02] border border-white/12 p-6 sm:p-10 shadow-2xl overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />

                                <div className="mb-6">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3">
                                        PROJECT &amp; TECHNICAL BRIEF
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                                        Request a <span className="text-[#38BDF8]">Broadcast</span> or{" "}
                                        <span className="text-[#38BDF8]">Cloud</span> Consultation
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                        Submitting launches your email brief directly to{" "}
                                        <span className="text-slate-200 font-medium">enquiry@theglobalcast.com</span>{" "}
                                        with your project details pre-filled.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="p-6 rounded-xl bg-[#1A73E8]/15 border border-[#38BDF8]/40 space-y-4 transition-all duration-300 ease-out">
                                        <div className="flex items-center gap-2.5 text-[#38BDF8] font-bold text-base">
                                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                                            <span>Email Dispatch Opened — {formData.topic}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                            Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Your inquiry brief has been prepared for{" "}
                                            <a
                                                href={buildMailtoUrl()}
                                                className="text-[#38BDF8] underline font-medium"
                                            >
                                                enquiry@theglobalcast.com
                                            </a>
                                            . If your mail client did not open automatically, click below to launch it.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <a
                                                href={buildMailtoUrl()}
                                                className="group inline-flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold rounded-lg px-5 h-10 text-xs transition-all duration-300 ease-out"
                                            >
                                                <Mail className="w-3.5 h-3.5" />
                                                <span>Open Email Draft</span>
                                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </a>

                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setFormData({
                                                        fullName: "",
                                                        email: "",
                                                        phone: "",
                                                        company: "",
                                                        topic: inquiryTopics[0],
                                                        message: "",
                                                    });
                                                }}
                                                className="bg-white/10 hover:bg-[#1A73E8] text-white border border-white/20 rounded-lg px-5 h-10 text-xs font-semibold transition-all duration-300 ease-out cursor-pointer"
                                            >
                                                New Inquiry
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="group/field">
                                                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="Your name"
                                                    className={`${inputClassName} h-11`}
                                                />
                                            </div>

                                            <div className="group/field">
                                                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                    Work Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="name@company.com"
                                                    className={`${inputClassName} h-11`}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="group/field">
                                                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                    Phone / WhatsApp
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+92 3XX XXXXXXX"
                                                    className={`${inputClassName} h-11`}
                                                />
                                            </div>

                                            <div className="group/field">
                                                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                    Organization / Network
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="Network, broadcaster, or brand"
                                                    className={`${inputClassName} h-11`}
                                                />
                                            </div>
                                        </div>

                                        {/* Branded Custom Dropdown */}
                                        <div ref={dropdownRef} className="relative">
                                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                                                Service Scope
                                            </label>
                                            <button
                                                type="button"
                                                aria-haspopup="listbox"
                                                aria-expanded={dropdownOpen}
                                                onClick={() => setDropdownOpen((prev) => !prev)}
                                                className={`w-full h-11 px-4 rounded-xl bg-black/35 border text-left text-sm text-white flex items-center justify-between gap-3 transition-all duration-300 ease-out cursor-pointer ${dropdownOpen
                                                    ? "border-[#38BDF8] bg-black/55 ring-2 ring-[#1A73E8]/25"
                                                    : "border-white/12 hover:border-[#38BDF8]/45 hover:bg-black/45"
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2.5 truncate">
                                                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
                                                    <span className="font-medium text-white truncate">
                                                        {formData.topic}
                                                    </span>
                                                </span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-[#38BDF8] shrink-0 transition-transform duration-300 ease-out ${dropdownOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            <div
                                                role="listbox"
                                                className={`absolute z-30 left-0 right-0 mt-2 rounded-xl bg-[#0E1525]/98 backdrop-blur-xl border border-[#38BDF8]/30 shadow-2xl overflow-hidden transition-all duration-250 ease-out origin-top ${dropdownOpen
                                                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                    : "opacity-0 scale-[0.98] -translate-y-1.5 pointer-events-none"
                                                    }`}
                                            >
                                                <div className="py-1.5">
                                                    {inquiryTopics.map((topic) => {
                                                        const isSelected = formData.topic === topic;
                                                        return (
                                                            <button
                                                                key={topic}
                                                                type="button"
                                                                role="option"
                                                                aria-selected={isSelected}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, topic });
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${isSelected
                                                                    ? "bg-[#1A73E8]/25 text-[#38BDF8] font-semibold"
                                                                    : "text-slate-200 hover:bg-white/[0.07] hover:text-white hover:pl-5"
                                                                    }`}
                                                            >
                                                                <span>{topic}</span>
                                                                <Check
                                                                    className={`w-4 h-4 text-[#38BDF8] shrink-0 transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group/field">
                                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                Technical Requirements &amp; Timeline *
                                            </label>
                                            <textarea
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us about your signal routing, uplink band, OB camera/switcher setup, OTT workflow, or schedule..."
                                                className={`${inputClassName} py-3 resize-y`}
                                            />
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isSending}
                                                className="group/submit relative w-full sm:w-auto bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-semibold rounded-xl px-7 h-11 text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:shadow-[#1A73E8]/25 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
                                            >
                                                <Send className="w-4 h-4 transition-transform duration-300 ease-out group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5" />
                                                <span>{isSending ? "Opening Email..." : "Submit Inquiry"}</span>
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/submit:translate-x-1.5" />
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Right 5 Cols: Desk Specs & Routing */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                            OPERATIONS &amp; SLA DESK
                                        </span>
                                        <Radio className="w-4 h-4 text-[#38BDF8] animate-pulse" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {deskHighlights.map((item) => {
                                            const IconComp = item.icon;
                                            return (
                                                <div
                                                    key={item.label}
                                                    className="p-4 rounded-xl bg-black/25 border border-white/5 hover:border-[#38BDF8]/30 transition-colors duration-300 space-y-1.5"
                                                >
                                                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                                        <IconComp className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                                                        <span>{item.label}</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">{item.value}</div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                                        For live event dispatch, teleport bookings, or urgent signal coordination, call our direct lines so engineers can align with your broadcast schedule.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. LOCATION & MAP SECTION */}
                <section
                    id="location-map"
                    className="relative py-20 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="absolute bottom-0 right-1/4 w-[420px] h-[260px] bg-[#1A73E8]/10 blur-[140px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                                    OFFICE LOCATION
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Visit Our <span className="text-[#38BDF8]">Islamabad</span> Office
                                </h2>
                            </div>

                            <a
                                href={OFFICE_MAPS_SHORT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#1A73E8] text-white border border-white/25 hover:border-[#1A73E8] font-semibold rounded-lg px-5 h-11 text-xs sm:text-sm transition-all duration-300 self-start lg:self-auto"
                            >
                                <Navigation className="w-4 h-4 text-[#38BDF8]" />
                                <span>Open in Google Maps</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            <div className="lg:col-span-4 relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6 overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3">
                                            G-6 MARKAZ, ISLAMABAD
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            NOC 24/7
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white leading-snug">
                                        Globalcast Technical Solutions
                                    </h3>

                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-black/30 border border-white/[0.08]">
                                        <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                                            {OFFICE_ADDRESS}
                                        </p>
                                    </div>

                                    {/* Structured Office Hours + Side Status */}
                                    <div className="rounded-xl bg-black/30 border border-white/[0.08] p-3.5 space-y-2.5">
                                        <div className="flex items-center justify-between gap-3 text-xs">
                                            <span className="font-mono font-semibold text-slate-300">Mon – Sat</span>
                                            <span className="font-mono text-[#38BDF8] font-medium">10:00 AM – 11:00 PM</span>
                                        </div>
                                        <div className="h-px bg-white/[0.06]" />
                                        <div className="flex items-center justify-between gap-3 text-xs">
                                            <span className="font-mono font-semibold text-slate-300">Sunday</span>
                                            <span className="font-mono text-slate-200 font-medium">2:00 PM – 9:30 PM</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={() => window.open(OFFICE_MAPS_SHORT_URL, "_blank", "noopener,noreferrer")}
                                    className="group w-full bg-[#1A73E8] hover:bg-[#1557B0] active:scale-[0.98] text-white font-semibold rounded-lg px-5 h-11 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-out cursor-pointer"
                                >
                                    <span>Get Directions</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                </Button>
                            </div>

                            <div className="lg:col-span-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl min-h-[340px] sm:min-h-[400px] relative">
                                <iframe
                                    title="Globalcast Technical Solutions Office Map"
                                    src={OFFICE_EMBED_URL}
                                    className="w-full h-full min-h-[340px] sm:min-h-[400px] border-0 grayscale-[20%] contrast-[1.05]"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}