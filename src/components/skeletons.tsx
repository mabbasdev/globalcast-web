"use client";

import React from "react";

interface SkeletonBlockProps {
    className?: string;
}

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
    return (
        <div
            aria-hidden="true"
            className={`relative overflow-hidden rounded-lg bg-white/[0.06] border border-white/[0.05] ${className}`}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
    );
}

export function AboutPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-16 sm:pt-[122px] pb-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                {/* Hero Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
                    <div className="lg:col-span-6 space-y-4">
                        <SkeletonBlock className="h-6 w-36 rounded-full" />
                        <SkeletonBlock className="h-11 w-full max-w-xl" />
                        <SkeletonBlock className="h-11 w-4/5" />
                        <SkeletonBlock className="h-20 w-full max-w-lg" />
                        <div className="flex gap-3 pt-2">
                            <SkeletonBlock className="h-11 w-36 rounded-lg" />
                            <SkeletonBlock className="h-11 w-36 rounded-lg" />
                        </div>
                    </div>
                    <div className="lg:col-span-6">
                        <SkeletonBlock className="h-72 sm:h-80 w-full rounded-2xl" />
                    </div>
                </div>

                {/* Single-Row Mission + 4-Card Capabilities Skeleton */}
                <div className="space-y-6 pt-8 border-t border-white/10">
                    <SkeletonBlock className="h-6 w-48 rounded-full" />
                    <SkeletonBlock className="h-10 w-96 max-w-full" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-6 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 space-y-5">
                            <SkeletonBlock className="h-4 w-44" />
                            <SkeletonBlock className="h-8 w-full" />
                            <SkeletonBlock className="h-16 w-full" />
                            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                                <SkeletonBlock className="h-12 w-full" />
                                <SkeletonBlock className="h-12 w-full" />
                                <SkeletonBlock className="h-12 w-full" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <SkeletonBlock className="h-10 w-32" />
                                <SkeletonBlock className="h-10 w-36" />
                            </div>
                        </div>

                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <SkeletonBlock className="h-10 w-10 rounded-xl" />
                                        <SkeletonBlock className="h-4 w-4 rounded-full" />
                                    </div>
                                    <SkeletonBlock className="h-5 w-3/4" />
                                    <SkeletonBlock className="h-10 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lower Section Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 border-t border-white/10">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <SkeletonBlock key={idx} className="h-44 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CareersPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-16 sm:pt-[122px] pb-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                {/* Careers Hero Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
                    <div className="lg:col-span-7 space-y-4">
                        <SkeletonBlock className="h-6 w-40 rounded-full" />
                        <SkeletonBlock className="h-11 w-full" />
                        <SkeletonBlock className="h-11 w-4/5" />
                        <SkeletonBlock className="h-16 w-full max-w-2xl" />
                        <div className="flex gap-3 pt-2">
                            <SkeletonBlock className="h-11 w-36" />
                            <SkeletonBlock className="h-11 w-36" />
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <SkeletonBlock className="h-64 w-full rounded-2xl" />
                    </div>
                </div>

                {/* Open Roles Grid Skeleton */}
                <div className="space-y-6 pt-8 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <SkeletonBlock className="h-10 w-72" />
                        <div className="flex gap-2">
                            <SkeletonBlock className="h-9 w-20" />
                            <SkeletonBlock className="h-9 w-28" />
                            <SkeletonBlock className="h-9 w-24" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 space-y-4"
                            >
                                <div className="flex justify-between">
                                    <SkeletonBlock className="h-6 w-32 rounded-full" />
                                    <SkeletonBlock className="h-4 w-20" />
                                </div>
                                <SkeletonBlock className="h-6 w-3/4" />
                                <SkeletonBlock className="h-12 w-full" />
                                <SkeletonBlock className="h-16 w-full" />
                                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                    <SkeletonBlock className="h-6 w-40" />
                                    <SkeletonBlock className="h-10 w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form Skeleton */}
                <div className="max-w-4xl mx-auto pt-8 border-t border-white/10">
                    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-10 space-y-4">
                        <SkeletonBlock className="h-7 w-56" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                        </div>
                        <SkeletonBlock className="h-24 w-full" />
                        <SkeletonBlock className="h-28 w-full" />
                        <SkeletonBlock className="h-11 w-44" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ContactPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-16 sm:pt-[122px] pb-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                {/* Split Hero + 3 Cards Skeleton */}
                <div className="space-y-12 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            <SkeletonBlock className="h-6 w-44 rounded-full" />
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-3/4" />
                            <SkeletonBlock className="h-16 w-full max-w-2xl" />
                            <div className="flex gap-3 pt-2">
                                <SkeletonBlock className="h-11 w-40" />
                                <SkeletonBlock className="h-11 w-36" />
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <SkeletonBlock className="h-64 w-full rounded-2xl" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    <SkeletonBlock className="h-10 w-10 rounded-xl" />
                                    <SkeletonBlock className="h-4 w-28" />
                                </div>
                                <SkeletonBlock className="h-14 w-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form + Desk Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/10">
                    <div className="lg:col-span-7 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-10 space-y-4">
                        <SkeletonBlock className="h-8 w-80 max-w-full" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                            <SkeletonBlock className="h-11 w-full" />
                        </div>
                        <SkeletonBlock className="h-11 w-full" />
                        <SkeletonBlock className="h-28 w-full" />
                        <SkeletonBlock className="h-11 w-40" />
                    </div>
                    <div className="lg:col-span-5">
                        <SkeletonBlock className="h-80 w-full rounded-2xl" />
                    </div>
                </div>

                {/* Location & Map Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 border-t border-white/10">
                    <div className="lg:col-span-4">
                        <SkeletonBlock className="h-80 w-full rounded-2xl" />
                    </div>
                    <div className="lg:col-span-8">
                        <SkeletonBlock className="h-80 w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ServicesPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-16 sm:pt-[122px] pb-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                {/* Services Hero Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
                    <div className="lg:col-span-7 space-y-4">
                        <SkeletonBlock className="h-6 w-48 rounded-full" />
                        <SkeletonBlock className="h-11 w-full max-w-xl" />
                        <SkeletonBlock className="h-11 w-4/5" />
                        <SkeletonBlock className="h-16 w-full max-w-2xl" />
                        <div className="flex gap-3 pt-2">
                            <SkeletonBlock className="h-11 w-44 rounded-lg" />
                            <SkeletonBlock className="h-11 w-40 rounded-lg" />
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 space-y-5">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <SkeletonBlock className="h-4 w-44" />
                            <SkeletonBlock className="h-4 w-4 rounded-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                        </div>
                        <div className="flex justify-between pt-2 border-t border-white/10">
                            <SkeletonBlock className="h-4 w-36" />
                            <SkeletonBlock className="h-4 w-36" />
                        </div>
                    </div>
                </div>

                {/* All Centralized Services Grid Skeleton */}
                <div className="space-y-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="space-y-3">
                            <SkeletonBlock className="h-6 w-48 rounded-full" />
                            <SkeletonBlock className="h-10 w-96 max-w-full" />
                        </div>
                        <SkeletonBlock className="h-10 w-80 max-w-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-5"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <SkeletonBlock className="h-10 w-10 rounded-xl" />
                                        <SkeletonBlock className="h-6 w-24 rounded-full" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <SkeletonBlock className="h-6 w-3/4" />
                                        <SkeletonBlock className="h-3.5 w-1/2" />
                                    </div>
                                    <SkeletonBlock className="h-12 w-full" />
                                    <div className="space-y-2">
                                        <SkeletonBlock className="h-4 w-full" />
                                        <SkeletonBlock className="h-4 w-5/6" />
                                        <SkeletonBlock className="h-4 w-4/5" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10 space-y-3">
                                    <div className="flex gap-2">
                                        <SkeletonBlock className="h-7 w-16 rounded-lg" />
                                        <SkeletonBlock className="h-7 w-24 rounded-lg" />
                                        <SkeletonBlock className="h-7 w-20 rounded-lg" />
                                    </div>
                                    <SkeletonBlock className="h-10 w-full rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TeamPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white pt-16 sm:pt-[122px] pb-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-12 space-y-16">
                {/* Team Hero Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6">
                    <div className="lg:col-span-7 space-y-4">
                        <SkeletonBlock className="h-6 w-44 rounded-full" />
                        <SkeletonBlock className="h-11 w-full max-w-xl" />
                        <SkeletonBlock className="h-11 w-4/5" />
                        <SkeletonBlock className="h-16 w-full max-w-2xl" />
                        <div className="flex gap-3 pt-2">
                            <SkeletonBlock className="h-11 w-40 rounded-xl" />
                            <SkeletonBlock className="h-11 w-36 rounded-xl" />
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 space-y-5">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <SkeletonBlock className="h-4 w-44" />
                            <SkeletonBlock className="h-4 w-4 rounded-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                            <SkeletonBlock className="h-20 w-full rounded-xl" />
                        </div>
                        <div className="flex justify-between pt-2 border-t border-white/10">
                            <SkeletonBlock className="h-4 w-36" />
                            <SkeletonBlock className="h-4 w-36" />
                        </div>
                    </div>
                </div>

                {/* Executive Leadership Spotlight Skeleton */}
                <div className="space-y-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-3">
                            <SkeletonBlock className="h-6 w-44 rounded-full" />
                            <SkeletonBlock className="h-9 w-80 max-w-full" />
                        </div>
                        <SkeletonBlock className="h-8 w-72 max-w-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden grid grid-cols-1 sm:grid-cols-12"
                            >
                                <div className="sm:col-span-5">
                                    <SkeletonBlock className="h-64 w-full rounded-none" />
                                </div>
                                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <SkeletonBlock className="h-6 w-28 rounded-full" />
                                            <SkeletonBlock className="h-4 w-24" />
                                        </div>
                                        <SkeletonBlock className="h-7 w-3/4" />
                                        <SkeletonBlock className="h-4 w-1/2" />
                                        <SkeletonBlock className="h-14 w-full" />
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <SkeletonBlock className="h-4 w-28" />
                                        <SkeletonBlock className="h-4 w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Broadcast & Production Roster Grid Skeleton */}
                <div className="space-y-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="space-y-3">
                            <SkeletonBlock className="h-6 w-52 rounded-full" />
                            <SkeletonBlock className="h-10 w-96 max-w-full" />
                        </div>
                        <SkeletonBlock className="h-10 w-80 max-w-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden flex flex-col justify-between"
                            >
                                <div>
                                    <SkeletonBlock className="aspect-[4/4] w-full rounded-none" />
                                    <div className="p-5 sm:p-6 space-y-2">
                                        <SkeletonBlock className="h-4 w-full" />
                                        <SkeletonBlock className="h-4 w-5/6" />
                                    </div>
                                </div>
                                <div className="px-5 sm:px-6 py-3.5 border-t border-white/[0.08] flex justify-between">
                                    <SkeletonBlock className="h-4 w-32" />
                                    <SkeletonBlock className="h-4 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}