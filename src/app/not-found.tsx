"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Radio, Home, ArrowLeft, Compass, Signal, RotateCcw } from "lucide-react";

const TARGET_FREQ = 104.8;

export default function NotFound() {
    const [frequency, setFrequency] = useState<number>(88.0);

    const delta = Math.abs(frequency - TARGET_FREQ);
    const signalStrength = Math.max(0, Math.min(100, Math.round(100 - delta * 8)));
    const isLocked = delta <= 0.4;

    return (
        <main className="min-h-screen bg-[#0B0F19] text-slate-200 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-20 relative overflow-hidden font-sans">
            {/* Ambient Telemetry Glows */}
            <div className="absolute top-1/4 left-1/4 w-[480px] h-[300px] bg-[#1A73E8]/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[280px] bg-[#38BDF8]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10">
                {/* Status Badge & Code */}
                <div className="space-y-4 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-white/10 text-xs font-mono tracking-wider uppercase text-[#38BDF8]">
                        <Radio className="w-3.5 h-3.5 animate-pulse" />
                        <span>Signal Lost // Route 404</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-white">
                            404
                        </h1>
                        <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                            Requested broadcast node is off-air or moved.
                        </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                        The endpoint you tried to reach could not be resolved on the Globalcast route table. Use the interactive signal scanner below or return to an active route.
                    </p>
                </div>

                {/* Interactive Signal Scanner Card */}
                <div className="bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1A73E8]/20 border border-[#1A73E8]/40 flex items-center justify-center text-[#38BDF8]">
                                <Signal className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8] block">
                                    Interactive Carrier Scanner
                                </span>
                                <h2 className="text-base font-bold text-white">
                                    Tune Frequency to <span className="font-mono text-[#38BDF8]">{TARGET_FREQ.toFixed(1)} MHz</span>
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${isLocked
                                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/40"
                                        : "bg-amber-500/10 text-amber-300 border-amber-400/30"
                                    }`}
                            >
                                {isLocked ? "CARRIER LOCKED" : `SCANNING (${signalStrength}%)`}
                            </span>
                            <button
                                type="button"
                                onClick={() => setFrequency(88.0)}
                                aria-label="Reset tuner"
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Slider & Telemetry Readout */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                            <span>88.0 MHz</span>
                            <span className="text-white font-bold text-sm">
                                Current: {frequency.toFixed(1)} MHz
                            </span>
                            <span>120.0 MHz</span>
                        </div>

                        <input
                            type="range"
                            min={88}
                            max={120}
                            step={0.1}
                            value={frequency}
                            onChange={(e) => setFrequency(parseFloat(e.target.value))}
                            aria-label="Broadcast frequency tuner"
                            className="w-full accent-[#38BDF8] cursor-pointer h-2 bg-slate-800 rounded-lg"
                        />

                        {/* Signal Bar Meter */}
                        <div className="grid grid-cols-20 gap-1 pt-1" aria-hidden="true">
                            {Array.from({ length: 20 }).map((_, idx) => {
                                const threshold = ((idx + 1) / 20) * 100;
                                const active = signalStrength >= threshold;
                                return (
                                    <div
                                        key={idx}
                                        className={`h-2 rounded-sm transition-colors duration-150 ${active
                                                ? isLocked
                                                    ? "bg-emerald-400"
                                                    : "bg-[#38BDF8]"
                                                : "bg-white/10"
                                            }`}
                                    />
                                );
                            })}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 pt-1">
                            {isLocked
                                ? "Telemetry restored: Lock confirmed on Globalcast Main Routing Bus. Head back to Home or Services to continue."
                                : "Slide the tuner toward 104.8 MHz to test signal lock, or use the direct navigation links below."}
                        </p>
                    </div>
                </div>

                {/* Primary Navigation Actions */}
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A73E8] hover:bg-[#155ec0] text-white font-semibold text-sm transition-all shadow-lg shadow-[#1A73E8]/25"
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>

                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-sm transition-all"
                    >
                        <Compass className="w-4 h-4 text-[#38BDF8]" />
                        <span>Explore Services</span>
                    </Link>

                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-300 hover:text-[#38BDF8] font-medium text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>About Globalcast</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}