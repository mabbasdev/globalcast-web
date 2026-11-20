"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import {
    ArrowRight,
    ArrowUpRight,
    Briefcase,
    MapPin,
    Clock,
    Radio,
    Server,
    Wifi,
    Video,
    CheckCircle2,
    Send,
    Sparkles,
    ShieldCheck,
    ChevronDown,
    Check,
    Upload,
    FileText,
    X,
} from "lucide-react";

interface JobOpening {
    id: string;
    title: string;
    department: "Broadcast & OB" | "Cloud & IP" | "Satellite & NOC";
    location: string;
    type: string;
    summary: string;
    requirements: string[];
    tags: string[];
}

const jobOpenings: JobOpening[] = [
    {
        id: "ob-broadcast-engineer",
        title: "Broadcast & OB Systems Engineer",
        department: "Broadcast & OB",
        location: "Islamabad & On-Site (Nationwide)",
        type: "Full-Time",
        summary:
            "Operate and configure multi-camera SDI/IP routing, vision switchers, replay servers, and intercom systems for live sports and summit productions.",
        requirements: [
            "Hands-on experience with live video switchers, SDI/IP signal flow, and broadcast audio/intercom",
            "Calm execution under live transmission pressure during sports leagues and major events",
            "Strong diagnostic troubleshooting in field and studio environments",
        ],
        tags: ["SDI / IP", "OB Vans", "Live Switchers", "4K HDR"],
    },
    {
        id: "cloud-streaming-engineer",
        title: "Cloud Media & Streaming Engineer",
        department: "Cloud & IP",
        location: "Islamabad (Hybrid)",
        type: "Full-Time",
        summary:
            "Build and maintain low-latency SRT/RIST contribution pipelines, automated transcoding workflows, and Media Asset Management (MAM) integrations.",
        requirements: [
            "Solid understanding of video codecs, ABR streaming, and SRT/RIST/RTMP/HLS protocols",
            "Experience with Linux servers, automation scripts, and cloud storage/media pipelines",
            "Focus on fault tolerance, stream telemetry, and sub-50ms routing reliability",
        ],
        tags: ["SRT / RIST", "Cloud MAM", "Transcoding", "Linux"],
    },
    {
        id: "noc-satellite-specialist",
        title: "NOC & Satellite Uplink Specialist",
        department: "Satellite & NOC",
        location: "Islamabad (Shift Rotation)",
        type: "Full-Time",
        summary:
            "Monitor active satellite teleports, C/Ku-band uplinks, and live contribution feeds 24/7 with proactive signal diagnostics and rapid failover response.",
        requirements: [
            "Familiarity with RF/satellite uplink telemetry, signal monitoring, and carrier escalation workflows",
            "Disciplined incident logging, root-cause documentation, and SLA adherence",
            "Dependable shift coverage supporting round-the-clock broadcast operations",
        ],
        tags: ["C / Ku Band", "24/7 NOC", "Telemetry", "99.99% SLA"],
    },
    {
        id: "av-systems-integration-intern",
        title: "Broadcast & A/V Engineering Intern",
        department: "Broadcast & OB",
        location: "Islamabad",
        type: "Internship (3-6 Months)",
        summary:
            "Work alongside senior broadcast and systems engineers on studio commissioning, signal rack patching, network diagnostics, and live event prep.",
        requirements: [
            "Background in Computer Science, Electrical/Electronics Engineering, or Media Technology",
            "Practical mindset with networking basics, hardware testing, and technical documentation",
            "Eagerness to learn real-world broadcast infrastructure from the ground up",
        ],
        tags: ["Studio A/V", "Networking", "Diagnostics", "Hands-On"],
    },
];

const culturePillars = [
    {
        title: "Real Production Scale",
        detail: "Ship and support infrastructure used in live broadcasts, sports coverage, and high-stakes media feeds.",
        icon: Video,
    },
    {
        title: "Ground-to-Cloud Stack",
        detail: "Bridge physical studio/OB hardware and teleport links with modern IP and cloud media workflows.",
        icon: Server,
    },
    {
        title: "Direct Engineering Ownership",
        detail: "Clear responsibilities, direct technical feedback, and fast execution without unnecessary bureaucracy.",
        icon: Sparkles,
    },
    {
        title: "Carrier-Grade Standards",
        detail: "Build habits around redundancy, signal integrity, documentation, and measurable uptime SLAs.",
        icon: ShieldCheck,
    },
];

const hiringSteps = [
    {
        step: "01",
        title: "Apply & Share Proof",
        desc: "Submit your role selection, background, and relevant technical work or field experience.",
    },
    {
        step: "02",
        title: "Technical Screening",
        desc: "Practical discussion focused on real troubleshooting, signal/network fundamentals, and problem solving.",
    },
    {
        step: "03",
        title: "Practical / Scenario Task",
        desc: "Walk through a realistic broadcast, streaming, or infrastructure fault-handling scenario.",
    },
    {
        step: "04",
        title: "Team Alignment & Offer",
        desc: "Final conversation on expectations, shift/on-site readiness, and onboarding start date.",
    },
];

const departments: Array<"All" | JobOpening["department"]> = [
    "All",
    "Broadcast & OB",
    "Cloud & IP",
    "Satellite & NOC",
];

const roleOptions = [
    ...jobOpenings.map((job) => job.title),
    "General Technical Application",
];

const inputClassName =
    "w-full px-3.5 rounded-xl bg-black/35 border border-white/12 hover:border-white/25 focus:border-[#38BDF8] focus:bg-black/50 focus:ring-2 focus:ring-[#1A73E8]/25 outline-none text-sm text-white placeholder:text-slate-500 transition-all duration-300 ease-out";

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function TelemetryCounter({
    target,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 1200,
}: {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();
        const factor = Math.pow(10, decimals);

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = Math.round(target * eased * factor) / factor;
            setValue(next);

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            } else {
                setValue(target);
            }
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [target, decimals, duration]);

    const formatted = decimals > 0 ? value.toFixed(decimals) : String(value);

    return (
        <span className="tabular-nums">
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}

export default function CareersPage() {
    const router = useRouter();
    const [selectedDepartment, setSelectedDepartment] = useState<"All" | JobOpening["department"]>("All");
    const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>(jobOpenings[0].title);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        portfolioUrl: "",
        notes: "",
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvError, setCvError] = useState<string | null>(null);
    const [isDraggingCv, setIsDraggingCv] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const filteredJobs =
        selectedDepartment === "All"
            ? jobOpenings
            : jobOpenings.filter((job) => job.department === selectedDepartment);

    const handleCvSelection = (file: File | undefined) => {
        setCvError(null);
        if (!file) return;

        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const lowerName = file.name.toLowerCase();
        const hasValidExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));

        if (!hasValidExt) {
            setCvError("Please upload a PDF, DOC, or DOCX file.");
            return;
        }
        if (file.size > MAX_CV_SIZE_BYTES) {
            setCvError("CV / Resume file must be 5MB or smaller.");
            return;
        }

        setCvFile(file);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleApplyForRole = (roleTitle: string) => {
        setSelectedRoleTitle(roleTitle);
        setSubmitted(false);
        const formEl = document.getElementById("apply-form");
        if (formEl) {
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const buildApplicationMailto = () => {
        const subject = `Application: ${selectedRoleTitle} — ${formData.fullName.trim()}`;
        const bodyLines = [
            `Applicant Name: ${formData.fullName.trim()}`,
            `Email: ${formData.email.trim()}`,
            `Phone: ${formData.phone.trim() || "Not provided"}`,
            `Target Role: ${selectedRoleTitle}`,
            `Portfolio / GitHub / LinkedIn: ${formData.portfolioUrl.trim() || "Not provided"}`,
            `CV / Resume File: ${cvFile
                ? `${cvFile.name} (${formatFileSize(cvFile.size)}) — please attach from your device`
                : "Not attached yet"
            }`,
            "",
            "Relevant Experience & Proof of Work:",
            formData.notes.trim() || "Not provided",
        ];
        return `mailto:enquiry@theglobalcast.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName.trim() || !formData.email.trim()) return;
        setIsSubmitting(true);
        window.location.href = buildApplicationMailto();

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 250);
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans pt-16 sm:pt-[122px] overflow-x-hidden">
            <main>
                {/* 1. CAREERS HERO */}
                <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[320px] bg-[#1A73E8]/15 blur-[150px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[260px] bg-[#38BDF8]/10 blur-[130px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                                    CAREERS AT GLOBALCAST
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.15] font-sans">
                                    Build <span className="text-[#38BDF8]">Broadcast</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Cloud</span> Systems That Never Miss A Frame
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                                    Join our engineering, field production, and NOC teams delivering reliable satellite uplinks, low-latency IP streaming, and live broadcast infrastructure from Islamabad to global audiences.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const el = document.getElementById("open-roles");
                                            el?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="group relative overflow-hidden bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-semibold shadow-md border border-[#38BDF8]/25 rounded-xl px-6 h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2.5 cursor-pointer"
                                    >
                                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                                        <span>View Open Roles</span>
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={() => router.push("/about")}
                                        className="group bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.98] text-slate-100 hover:text-white border border-white/15 hover:border-[#38BDF8]/45 font-semibold shadow-xs rounded-xl px-6 h-11 transition-all duration-300 ease-out text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-xs"
                                    >
                                        <span>About Globalcast</span>
                                        <ArrowRight className="w-4 h-4 text-[#38BDF8] transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>

                            {/* Right Snapshot Card */}
                            <div className="lg:col-span-5 relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden space-y-5">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent" />

                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                        OPERATIONS SNAPSHOT
                                    </span>
                                    <Radio className="w-4 h-4 text-[#38BDF8] animate-pulse" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-black/35 border border-white/[0.07]">
                                        <div className="text-2xl font-extrabold font-mono text-[#38BDF8]">
                                            <TelemetryCounter target={99.99} decimals={2} suffix="%" />
                                        </div>
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                                            Transmission SLA
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/35 border border-white/[0.07]">
                                        <div className="text-2xl font-extrabold font-mono text-white">
                                            <TelemetryCounter target={50} prefix="&lt;" suffix="ms" />
                                        </div>
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                                            IP Stream Latency
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/35 border border-white/[0.07]">
                                        <div className="text-2xl font-extrabold font-mono text-white">
                                            <TelemetryCounter target={24} suffix="/7" />
                                        </div>
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                                            NOC &amp; Telemetry
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/35 border border-white/[0.07]">
                                        <div className="text-base font-extrabold font-mono text-[#38BDF8] flex items-center gap-1.5">
                                            <Wifi className="w-4 h-4 shrink-0" />
                                            <span>Islamabad</span>
                                        </div>
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                                            Primary Hub
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 leading-relaxed">
                                    We value engineers and operators who prioritize clean signal flow, practical problem solving, and dependable execution over hype.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. OPEN ROLES */}
                <section
                    id="open-roles"
                    className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                                    OPEN POSITIONS
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Current <span className="text-[#38BDF8]">Engineering</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Broadcast</span> Roles
                                </h2>
                            </div>

                            {/* Department Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {departments.map((dept) => {
                                    const active = selectedDepartment === dept;
                                    return (
                                        <button
                                            key={dept}
                                            type="button"
                                            onClick={() => setSelectedDepartment(dept)}
                                            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${active
                                                    ? "bg-gradient-to-r from-[#1A73E8] to-[#2563EB] text-white border-[#38BDF8]/40 shadow-sm"
                                                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-[#38BDF8]/40 hover:text-white"
                                                }`}
                                        >
                                            {dept}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="group relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1"
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/65 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#38BDF8]/35 text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                                                <Briefcase className="w-3 h-3" />
                                                {job.department}
                                            </span>
                                            <span className="text-[11px] font-mono text-slate-400">
                                                {job.type}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                                            {job.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4 font-mono">
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                                                {job.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                                                {job.type}
                                            </span>
                                        </div>

                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                                            {job.summary}
                                        </p>

                                        <ul className="space-y-2 mb-5">
                                            {job.requirements.map((req) => (
                                                <li
                                                    key={req}
                                                    className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[10px] font-mono text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={() => handleApplyForRole(job.title)}
                                            className="group/btn bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-semibold rounded-xl px-4 h-10 text-xs flex items-center gap-1.5 border border-[#38BDF8]/25 shadow-sm transition-all duration-300 ease-out cursor-pointer shrink-0"
                                        >
                                            <span>Apply Now</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. WHY JOIN US & HIRING PROCESS */}
                <section className="relative py-20 sm:py-28 bg-[#0B0F19] border-t border-white/10 overflow-hidden">
                    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                        <div>
                            <div className="max-w-3xl mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A73E8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                                    WHY JOIN GLOBALCAST
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight font-sans leading-[1.15]">
                                    Hands-On <span className="text-[#38BDF8]">Engineering</span> &amp;{" "}
                                    <span className="text-[#38BDF8]">Live Production</span> Impact
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {culturePillars.map((pillar) => {
                                    const IconComp = pillar.icon;
                                    return (
                                        <div
                                            key={pillar.title}
                                            className="relative bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 hover:border-[#38BDF8]/45 rounded-2xl p-6 flex flex-col justify-between shadow-xl overflow-hidden transition-all duration-300 ease-out group hover:-translate-y-1"
                                        >
                                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent opacity-65 group-hover:opacity-100 transition-opacity" />

                                            <div>
                                                <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#38BDF8]/35 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-105 transition-transform duration-300">
                                                    <IconComp className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#38BDF8] transition-colors">
                                                    {pillar.title}
                                                </h3>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    {pillar.detail}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 4-Step Process */}
                        <div className="pt-8 border-t border-white/10">
                            <div className="mb-8">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3">
                                    HIRING PROCESS
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {hiringSteps.map((item) => (
                                    <div
                                        key={item.step}
                                        className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-[#38BDF8]/35 rounded-2xl p-5 space-y-2 transition-colors duration-300"
                                    >
                                        <div className="text-xs font-mono font-bold text-[#38BDF8]">
                                            STEP {item.step}
                                        </div>
                                        <h4 className="text-base font-bold text-white">{item.title}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. DIRECT APPLICATION FORM (MATCHING CONTACT FORM STYLE + CV UPLOAD) */}
                <section
                    id="apply-form"
                    className="relative py-20 sm:py-24 bg-[#0B0F19] border-t border-white/10 overflow-hidden"
                >
                    <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-12">
                        <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.015] border border-white/12 p-6 sm:p-10 shadow-2xl overflow-hidden">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent" />

                            <div className="mb-6">
                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] border-l-2 border-[#1A73E8] pl-3">
                                    QUICK APPLICATION
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                                    Apply to <span className="text-[#38BDF8]">Globalcast</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                    Share your details, selected role, CV/resume, and proof of work. Submitting opens a pre-filled application email to{" "}
                                    <span className="text-slate-200 font-medium">enquiry@theglobalcast.com</span>.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="p-6 rounded-xl bg-[#1A73E8]/15 border border-[#38BDF8]/40 space-y-4 transition-all duration-300 ease-out">
                                    <div className="flex items-center gap-2.5 text-[#38BDF8] font-bold text-base">
                                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                                        <span>Application Ready — {selectedRoleTitle}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        Thanks, <span className="text-white font-semibold">{formData.fullName}</span>. Your application details have been prepared for{" "}
                                        <a
                                            href={buildApplicationMailto()}
                                            className="text-[#38BDF8] underline font-medium"
                                        >
                                            enquiry@theglobalcast.com
                                        </a>
                                        {cvFile ? (
                                            <>
                                                {" "}
                                                (remember to attach{" "}
                                                <span className="text-white font-semibold">{cvFile.name}</span> to your email draft).
                                            </>
                                        ) : (
                                            "."
                                        )}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <a
                                            href={buildApplicationMailto()}
                                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] text-white font-semibold rounded-xl px-5 h-10 text-xs border border-[#38BDF8]/25 transition-all duration-300 ease-out"
                                        >
                                            <span>Open Email Draft</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </a>

                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setSubmitted(false);
                                                setCvFile(null);
                                                setCvError(null);
                                                setFormData({
                                                    fullName: "",
                                                    email: "",
                                                    phone: "",
                                                    portfolioUrl: "",
                                                    notes: "",
                                                });
                                            }}
                                            className="bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-[#38BDF8]/40 rounded-xl px-5 h-10 text-xs font-semibold transition-all duration-300 ease-out cursor-pointer"
                                        >
                                            Submit Another Application
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
                                                placeholder="Your full name"
                                                className={`${inputClassName} h-11`}
                                            />
                                        </div>

                                        <div className="group/field">
                                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="you@example.com"
                                                className={`${inputClassName} h-11`}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Branded Custom Dropdown for Target Role */}
                                        <div ref={dropdownRef} className="relative">
                                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                                                Target Role
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
                                                        {selectedRoleTitle}
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
                                                    {roleOptions.map((role) => {
                                                        const isSelected = selectedRoleTitle === role;
                                                        return (
                                                            <button
                                                                key={role}
                                                                type="button"
                                                                role="option"
                                                                aria-selected={isSelected}
                                                                onClick={() => {
                                                                    setSelectedRoleTitle(role);
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${isSelected
                                                                        ? "bg-[#1A73E8]/25 text-[#38BDF8] font-semibold"
                                                                        : "text-slate-200 hover:bg-white/[0.07] hover:text-white hover:pl-5"
                                                                    }`}
                                                            >
                                                                <span>{role}</span>
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
                                                Portfolio / GitHub / LinkedIn
                                            </label>
                                            <input
                                                type="url"
                                                value={formData.portfolioUrl}
                                                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                                                placeholder="https://github.com/your-handle"
                                                className={`${inputClassName} h-11`}
                                            />
                                        </div>
                                    </div>

                                    {/* Upload CV / Resume */}
                                    <div>
                                        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                                            Upload CV / Resume (PDF, DOC, DOCX — Max 5MB)
                                        </label>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={(e) => handleCvSelection(e.target.files?.[0])}
                                            className="sr-only"
                                        />

                                        {cvFile ? (
                                            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-black/40 border border-[#38BDF8]/40 transition-all duration-300">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-9 h-9 rounded-lg bg-[#1A73E8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs sm:text-sm font-semibold text-white truncate">
                                                            {cvFile.name}
                                                        </p>
                                                        <p className="text-[11px] font-mono text-slate-400">
                                                            {formatFileSize(cvFile.size)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-[#1A73E8]/30 text-[11px] font-mono text-slate-200 hover:text-white border border-white/10 transition-colors cursor-pointer"
                                                    >
                                                        Replace
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label="Remove uploaded CV"
                                                        onClick={() => {
                                                            setCvFile(null);
                                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                                        }}
                                                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 transition-colors cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => fileInputRef.current?.click()}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        fileInputRef.current?.click();
                                                    }
                                                }}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    setIsDraggingCv(true);
                                                }}
                                                onDragLeave={() => setIsDraggingCv(false)}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    setIsDraggingCv(false);
                                                    handleCvSelection(e.dataTransfer.files?.[0]);
                                                }}
                                                className={`w-full px-4 py-4 rounded-xl border border-dashed flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 ease-out cursor-pointer ${isDraggingCv
                                                        ? "border-[#38BDF8] bg-[#1A73E8]/15"
                                                        : "border-white/15 bg-black/30 hover:border-[#38BDF8]/45 hover:bg-black/45"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-[#1A73E8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                                                        <Upload className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs sm:text-sm font-medium text-slate-200">
                                                            Click to upload CV / Resume or drag and drop
                                                        </p>
                                                        <p className="text-[11px] font-mono text-slate-400">
                                                            PDF, DOC, DOCX up to 5MB
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/12 text-[11px] font-mono font-semibold text-[#38BDF8] shrink-0">
                                                    Choose File
                                                </span>
                                            </div>
                                        )}

                                        {cvError && (
                                            <p className="text-xs text-red-400 font-mono mt-1.5">{cvError}</p>
                                        )}
                                    </div>

                                    <div className="group/field">
                                        <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 group-focus-within/field:text-[#38BDF8] transition-colors duration-200 mb-1.5">
                                            Relevant Experience &amp; Proof of Work
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="Briefly share your hands-on experience with broadcast systems, networking, streaming pipelines, or field production..."
                                            className={`${inputClassName} py-3 resize-y`}
                                        />
                                    </div>

                                    <div className="pt-2 flex flex-wrap items-center gap-3">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group/submit relative overflow-hidden bg-gradient-to-r from-[#1A73E8] to-[#2563EB] hover:from-[#1557B0] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-semibold rounded-xl px-7 h-11 text-xs sm:text-sm inline-flex items-center gap-2.5 border border-[#38BDF8]/25 shadow-md hover:shadow-lg hover:shadow-[#1A73E8]/25 transition-all duration-300 ease-out cursor-pointer"
                                        >
                                            <span className="absolute inset-0 -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                                            <Send className="w-4 h-4 transition-transform duration-300 ease-out group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5" />
                                            <span>{isSubmitting ? "Preparing Application..." : "Submit Application"}</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/submit:translate-x-1.5" />
                                        </Button>

                                        <a
                                            href={buildApplicationMailto()}
                                            className="inline-flex items-center justify-center px-5 h-11 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.98] text-slate-100 hover:text-white border border-white/15 hover:border-[#38BDF8]/45 text-xs sm:text-sm font-semibold backdrop-blur-xs transition-all duration-300 ease-out"
                                        >
                                            Email Directly
                                        </a>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}