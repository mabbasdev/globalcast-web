"use client";

import { X } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative w-full max-w-5xl bg-[#0B0F19] border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-black/60 hover:bg-[#1A73E8] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                    aria-label="Close video modal"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                    <video controls autoPlay className="w-full h-full object-cover">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}