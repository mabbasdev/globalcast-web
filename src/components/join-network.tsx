"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function GlobalNetworkCTA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hudNameRef = useRef<HTMLParagraphElement>(null);
    const hudTextRef = useRef<HTMLParagraphElement>(null);
    const hudContainerRef = useRef<HTMLDivElement>(null);
    const hudPlaceholderRef = useRef<HTMLParagraphElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [rotationX, setRotationX] = useState(0);
    const [speedMultiplierLevel, setSpeedMultiplierLevel] = useState<number>(1); // 0 = Stop, 1 = 1x, 2 = 2x, 3 = 3x

    const dragStartX = useRef(0);
    const currentRotationX = useRef(0);

    // Physics & Interpolation States
    const mousePos = useRef({ x: -999, y: -999, canvasX: -999, canvasY: -999, isHovered: false, targetHover: 0, currentHover: 0 });
    const tilt = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

    const baseSpeed = 0.0015;
    const mapDots = useRef<{ x: number; y: number; z: number }[]>([]);
    const radius = 135;

    // Soft signal pulses originating from or arriving at the antenna array
    const signalPulses = useRef<any[]>([]);

    // Generate Uniform Globe Dots
    if (mapDots.current.length === 0) {
        const numPoints = 600;
        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const theta = 2 * Math.PI * i / goldenRatio;

            mapDots.current.push({
                x: Math.cos(theta) * radiusAtY * radius,
                y: y * radius,
                z: Math.sin(theta) * radiusAtY * radius
            });
        }
    }

    // Array of orbiting satellites
    const satellites = useRef([
        {
            id: "satcom-1",
            name: "Globalcast | C-Band Teleport Alpha",
            msg: "Teleport Alpha: Carrier uplink locked. Signal-to-noise ratio nominal.",
            type: "station",
            angle: 0,
            baseSatSpeed: 0.012,
            orbitRadius: radius + 30,
            orbitHeightFactor: 0.2,
            orbitDepthFactor: 0.9,
            tiltOffset: 0.2,
            isHovered: false
        },
        {
            id: "cloud-relay",
            name: "Cloud MAM | SRT/RIST Uplink Node",
            msg: "Cloud Relay: Transcoding pipeline routing at <50ms latency.",
            type: "sat",
            angle: 2.1,
            baseSatSpeed: 0.016,
            orbitRadius: radius + 55,
            orbitHeightFactor: 0.5,
            orbitDepthFactor: 0.75,
            tiltOffset: -0.4,
            isHovered: false
        },
        {
            id: "ob-van",
            name: "OB Van 04 | Live Stadium Feeds",
            msg: "OB Van 04: Multi-camera SDI/IP stream active. 4K HDR feed secure.",
            type: "ship",
            angle: 4.3,
            baseSatSpeed: 0.01,
            orbitRadius: radius + 40,
            orbitHeightFactor: -0.35,
            orbitDepthFactor: 0.8,
            tiltOffset: 0.6,
            isHovered: false
        }
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animationFrameId: number;

        canvas.width = 500;
        canvas.height = 520;

        const drawSatelliteObject = (sat: any, x: number, y: number, scale: number, alpha: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(sat.angle + Math.PI / 4);

            const size = 6 * scale;

            if (sat.type === "ship") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(size * 0.6, size);
                ctx.lineTo(-size * 0.6, size);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.strokeStyle = `rgba(125, 211, 252, ${alpha * 0.7})`;
                ctx.beginPath();
                ctx.moveTo(0, size);
                ctx.lineTo(0, size * 1.5);
                ctx.stroke();
            }
            else if (sat.type === "station") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 1;

                ctx.fillRect(-size / 3, -size, (size * 2) / 3, size * 2);
                ctx.strokeRect(-size / 3, -size, (size * 2) / 3, size * 2);

                ctx.beginPath();
                ctx.moveTo(-size * 1.8, 0);
                ctx.lineTo(size * 1.8, 0);
                ctx.stroke();

                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.35})`;
                ctx.fillRect(-size * 1.8, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(-size * 1.1, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(size * 0.5, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(size * 1.2, -size * 0.6, size * 0.6, size * 1.2);
            }
            else {
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-size * 1.2, -size / 4);
                ctx.lineTo(size * 1.2, -size / 4);
                ctx.stroke();

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fillRect(-size * 0.3, -size * 0.6, size * 0.6, size * 0.6);
            }

            ctx.restore();
        };

        const updateHUDText = (sat: any) => {
            if (sat) {
                if (hudNameRef.current) hudNameRef.current.textContent = sat.name;
                if (hudTextRef.current) hudTextRef.current.textContent = sat.msg;
                if (hudContainerRef.current) hudContainerRef.current.style.display = "block";
                if (hudPlaceholderRef.current) hudPlaceholderRef.current.style.display = "none";
            } else {
                if (hudContainerRef.current) hudContainerRef.current.style.display = "none";
                if (hudPlaceholderRef.current) hudPlaceholderRef.current.style.display = "block";
            }
        };

        let pulseSpawnTimer = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = 185; // Perfectly centered upper globe position ensuring a space pocket below

            const m = mousePos.current;
            m.targetHover = m.isHovered ? 1 : 0;
            m.currentHover += (m.targetHover - m.currentHover) * 0.1;

            const t = tilt.current;
            t.currentX += (t.targetX - t.currentX) * 0.08;
            t.currentY += (t.targetY - t.currentY) * 0.08;

            const glowRadius = radius * (1.2 + m.currentHover * 0.3);
            const glowX = cx + (t.currentX * radius * 0.4 * m.currentHover);
            const glowY = cy - (t.currentY * radius * 0.4 * m.currentHover);

            const bgGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
            bgGlow.addColorStop(0, `rgba(56, 189, 248, ${0.15 + m.currentHover * 0.1})`);
            bgGlow.addColorStop(0.5, `rgba(26, 115, 232, ${0.05 + m.currentHover * 0.04})`);
            bgGlow.addColorStop(1, "rgba(26, 115, 232, 0)");

            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const hoverBoost = 1 + m.currentHover * 1.5;
            const totalSpeedFactor = speedMultiplierLevel * hoverBoost;

            if (!isDragging) {
                currentRotationX.current += baseSpeed * totalSpeedFactor;
            } else {
                currentRotationX.current = rotationX;
            }

            const cosX = Math.cos(currentRotationX.current);
            const sinX = Math.sin(currentRotationX.current);

            const projectedPoints = mapDots.current.map(p => {
                let x1 = p.x * cosX - p.z * sinX;
                let y1 = p.y;
                let z1 = p.x * sinX + p.z * cosX;

                if (m.currentHover > 0) {
                    const cosTiltY = Math.cos(t.currentY * m.currentHover);
                    const sinTiltY = Math.sin(t.currentY * m.currentHover);
                    const cosTiltX = Math.cos(t.currentX * m.currentHover);
                    const sinTiltX = Math.sin(t.currentX * m.currentHover);

                    const y2 = y1 * cosTiltY - z1 * sinTiltY;
                    const z2 = y1 * sinTiltY + z1 * cosTiltY;
                    const x3 = x1 * cosTiltX - z2 * sinTiltX;
                    const z3 = x1 * sinTiltX + z2 * cosTiltX;

                    x1 = x3; y1 = y2; z1 = z3;
                }

                const fov = 420;
                const scale = fov / (fov + z1);
                return {
                    x: x1 * scale + cx,
                    y: y1 * scale + cy,
                    z: z1,
                    scale,
                    alpha: Math.max(0.06, 1 - (z1 + radius) / (radius * 2))
                };
            });

            let hoverSatThisFrame = null;

            const projectedSats = satellites.current.map(sat => {
                const effectiveSatSpeed = speedMultiplierLevel === 0 ? 0 : sat.baseSatSpeed * speedMultiplierLevel;
                sat.angle = (sat.angle + effectiveSatSpeed * (isDragging ? 0.2 : hoverBoost)) % (2 * Math.PI);

                let sx = Math.cos(sat.angle) * sat.orbitRadius;
                let sy = Math.sin(sat.angle) * sat.orbitRadius * sat.orbitHeightFactor;
                let sz = Math.sin(sat.angle) * sat.orbitRadius * sat.orbitDepthFactor;

                if (m.currentHover > 0) {
                    const cosTiltY = Math.cos((t.currentY + sat.tiltOffset) * m.currentHover);
                    const sinTiltY = Math.sin((t.currentY + sat.tiltOffset) * m.currentHover);
                    const cosTiltX = Math.cos(t.currentX * m.currentHover);
                    const sinTiltX = Math.sin(t.currentX * m.currentHover);

                    const sy2 = sy * cosTiltY - sz * sinTiltY;
                    const sz2 = sy * sinTiltY + sz * cosTiltY;
                    const sx3 = sx * cosTiltX - sz2 * sinTiltX;
                    const sz3 = sx * sinTiltX + sz2 * cosTiltX;

                    sx = sx3; sy = sy2; sz = sz3;
                }

                const sFov = 420;
                const sScale = sFov / (sFov + sz);
                const projX = sx * sScale + cx;
                const projY = sy * sScale + cy;

                const hitDistance = Math.hypot(m.canvasX - projX, m.canvasY - projY);
                const isHoveredNow = hitDistance < 18;
                sat.isHovered = isHoveredNow;

                if (isHoveredNow) {
                    hoverSatThisFrame = sat;
                }

                return {
                    sat,
                    projX,
                    projY,
                    sz,
                    sScale,
                    alpha: Math.max(0.2, 1 - (sz + sat.orbitRadius) / (sat.orbitRadius * 2))
                };
            });

            updateHUDText(hoverSatThisFrame);

            projectedSats.forEach(({ sat, projX, projY, sz, sScale, alpha }) => {
                ctx.lineWidth = sat.isHovered ? 1.2 : 0.6;
                ctx.setLineDash([3, 6]);
                ctx.strokeStyle = sat.isHovered
                    ? `rgba(56, 189, 248, 0.6)`
                    : `rgba(56, 189, 248, ${0.05 + m.currentHover * 0.08})`;

                ctx.beginPath();
                ctx.ellipse(cx, cy, sat.orbitRadius, sat.orbitRadius * Math.abs(sat.orbitHeightFactor), t.currentY * 0.3 * m.currentHover, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.setLineDash([]);

                if (sz >= 0) {
                    drawSatelliteObject(sat, projX, projY, sScale, alpha * 0.4);
                }
            });

            projectedPoints.forEach(p => {
                if (p.z >= 0) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.12})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 0.8, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });

            if (m.currentHover > 0.05) {
                ctx.lineWidth = 0.5;
                const maxDist = 38;
                for (let i = 0; i < projectedPoints.length; i++) {
                    const p1 = projectedPoints[i];
                    if (p1.z >= 0 || p1.z > -40) continue;

                    for (let j = i + 1; j < projectedPoints.length; j++) {
                        const p2 = projectedPoints[j];
                        if (p2.z >= 0) continue;

                        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                        if (dist < maxDist) {
                            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / maxDist) * 0.15 * m.currentHover})`;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            projectedPoints.forEach(p => {
                if (p.z < 0) {
                    const sizeMultiplier = 1 + m.currentHover * 0.6;
                    const dotRadius = Math.max(1, p.scale * 1.3 * sizeMultiplier);
                    ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * (0.45 + m.currentHover * 0.45)})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, dotRadius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });

            projectedSats.forEach(({ sat, projX, projY, sz, sScale, alpha }) => {
                if (sz < 0) {
                    drawSatelliteObject(sat, projX, projY, sScale, alpha);
                }
            });

            // -------------------------------------------------------------------------
            // 5 ADVANCED TELECOM ANTENNAS (Stuck directly to bottom edge of CTA card)
            // -------------------------------------------------------------------------
            const floorY = canvas.height - 8; // Anchored flush to the bottom edge
            const antennas = [
                { x: 85, height: 90, type: 'lattice' },
                { x: 160, height: 62, type: 'pole' },
                { x: 250, height: 110, type: 'heavy' }, // Center tallest tower
                { x: 340, height: 70, type: 'dish' },
                { x: 415, height: 82, type: 'lattice' }
            ];

            if (speedMultiplierLevel > 0) {
                pulseSpawnTimer += speedMultiplierLevel;
                if (pulseSpawnTimer > 35) {
                    pulseSpawnTimer = 0;
                    const targetAntenna = antennas[Math.floor(Math.random() * antennas.length)];
                    const isIncoming = Math.random() > 0.5;
                    const softColors = ["rgba(56, 189, 248, 0.5)", "rgba(52, 211, 153, 0.5)", "rgba(96, 165, 250, 0.5)"];
                    const color = softColors[Math.floor(Math.random() * softColors.length)];

                    signalPulses.current.push({
                        x: targetAntenna.x,
                        y: floorY - targetAntenna.height - 12,
                        radius: isIncoming ? 45 : 3,
                        maxRadius: isIncoming ? 3 : 50,
                        isIncoming,
                        color,
                        alpha: isIncoming ? 0 : 0.6,
                        speed: 0.7 * speedMultiplierLevel
                    });
                }
            }

            // Update & draw soft signal transmission/reception rings
            signalPulses.current.forEach((pulse, index) => {
                if (pulse.isIncoming) {
                    pulse.radius -= pulse.speed;
                    pulse.alpha = Math.min(0.6, (45 - pulse.radius) / 25);
                } else {
                    pulse.radius += pulse.speed;
                    pulse.alpha = Math.max(0, 0.6 - pulse.radius / pulse.maxRadius);
                }

                ctx.save();
                ctx.strokeStyle = pulse.color;
                ctx.lineWidth = 1.2;
                ctx.globalAlpha = Math.max(0, pulse.alpha);
                ctx.beginPath();
                ctx.arc(pulse.x, pulse.y, Math.max(0, pulse.radius), 0, 2 * Math.PI);
                ctx.stroke();
                ctx.restore();

                if ((pulse.isIncoming && pulse.radius <= 3) || (!pulse.isIncoming && pulse.radius >= pulse.maxRadius)) {
                    signalPulses.current.splice(index, 1);
                }
            });

            // Draw each advanced antenna flush to the bottom floor
            antennas.forEach((ant) => {
                const topX = ant.x;
                const topY = floorY - ant.height;
                const distToMouse = Math.hypot(m.canvasX - topX, m.canvasY - topY);
                const isHovered = distToMouse < 32;

                ctx.save();
                ctx.translate(ant.x, floorY);

                // Base Concrete Platform (Stuck flush to bottom)
                ctx.fillStyle = "#1E293B";
                ctx.strokeStyle = isHovered ? "#38BDF8" : "#334155";
                ctx.lineWidth = 1;
                ctx.fillRect(-16, -8, 32, 8);
                ctx.strokeRect(-16, -8, 32, 8);

                if (ant.type === 'lattice' || ant.type === 'heavy') {
                    // Open-truss lattice tower structure
                    ctx.strokeStyle = isHovered ? "#38BDF8" : "#64748B";
                    ctx.lineWidth = ant.type === 'heavy' ? 1.5 : 1;
                    ctx.beginPath();
                    ctx.moveTo(-7, -8);
                    ctx.lineTo(-2, -ant.height);
                    ctx.moveTo(7, -8);
                    ctx.lineTo(2, -ant.height);
                    ctx.stroke();

                    // Cross bracketing webs
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    for (let y = 12; y < ant.height - 5; y += 14) {
                        ctx.moveTo(- (7 - (y / ant.height) * 4), -y);
                        ctx.lineTo((7 - (y / ant.height) * 4), -y - 7);
                        ctx.moveTo((7 - (y / ant.height) * 4), -y);
                        ctx.lineTo(- (7 - (y / ant.height) * 4), -y - 7);
                    }
                    ctx.stroke();
                } else {
                    // Solid cylindrical mast / pole
                    ctx.fillStyle = "#475569";
                    ctx.fillRect(-3, -ant.height, 6, ant.height - 8);
                    ctx.strokeStyle = isHovered ? "#38BDF8" : "#64748B";
                    ctx.strokeRect(-3, -ant.height, 6, ant.height - 8);
                }

                // Equipment drums / microwave receivers mounted on towers
                ctx.fillStyle = "#334155";
                ctx.strokeStyle = "#38BDF8";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, -ant.height * 0.5, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // Top antenna spike / broadcast rod
                ctx.strokeStyle = isHovered ? "#38BDF8" : "#94A3B8";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -ant.height);
                ctx.lineTo(0, -ant.height - 15);
                ctx.stroke();

                // Blinking Aviation Beacon Light (pulses continuously)
                const blinkAlpha = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() * 0.005 + ant.x));
                ctx.fillStyle = `rgba(239, 68, 68, ${blinkAlpha})`; // Red aviation strobe
                ctx.beginPath();
                ctx.arc(0, -ant.height - 17, isHovered ? 3.5 : 2.5, 0, 2 * Math.PI);
                ctx.fill();

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging, rotationX, speedMultiplierLevel]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = 185;

            mousePos.current.canvasX = x;
            mousePos.current.canvasY = y;

            const distFromCenter = Math.hypot(x - midX, y - midY);
            mousePos.current.isHovered = distFromCenter < radius + 90;

            if (mousePos.current.isHovered) {
                tilt.current.targetX = ((x - midX) / midX) * 0.35;
                tilt.current.targetY = -((y - midY) / midY) * 0.35;
            }
        }

        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX.current;
        setRotationX(currentRotationX.current + deltaX * 0.005);
        dragStartX.current = e.clientX;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        mousePos.current.isHovered = false;
        mousePos.current.canvasX = -999;
        mousePos.current.canvasY = -999;
        tilt.current.targetX = 0;
        tilt.current.targetY = 0;
    };

    return (
        <section className="w-full bg-[#0B0F19] py-20 px-5 sm:px-12 relative overflow-hidden border-t border-b border-white/10">
            <div className="max-w-7xl mx-auto relative">

                {/* Main Dark Obsidian CTA Card */}
                <div className="w-full bg-gradient-to-br from-[#0F172A] via-[#111C33] to-[#0B0F19] rounded-3xl p-8 md:p-14 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-[#1A73E8]/20 blur-[140px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-[#38BDF8]/10 blur-[110px] rounded-full pointer-events-none" />

                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />

                    {/* Left Text Content Panel */}
                    <div className="w-full lg:w-3/5 text-white space-y-6 relative z-20 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A73E8]/20 border border-[#1A73E8]/40 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
                            GLOBALCAST NETWORK
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-[44px] font-extrabold tracking-tight leading-[1.12]">
                                Join Globalcast’s <br />
                                <span className="text-[#38BDF8]">Broadcast Infrastructure</span>
                            </h2>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Expand your media footprint, unlock carrier-grade international satellite uplinks, and scale ultra-low latency cloud pipelines. Connect with our engineering network today.
                            </p>
                        </div>

                        {/* Fixed-Height HUD Display Box */}
                        <div className="w-full max-w-xl min-h-[58px] flex items-center text-left bg-black/40 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md">
                            <div className="w-full">
                                <div ref={hudContainerRef} style={{ display: "none" }}>
                                    <p ref={hudNameRef} className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8]"></p>
                                    <p ref={hudTextRef} className="text-xs text-slate-200 font-mono mt-0.5 line-clamp-1"></p>
                                </div>
                                <p ref={hudPlaceholderRef} className="text-[11px] text-[#38BDF8]/70 font-mono italic">
                                    * Hover spacecrafts to view telemetry links
                                </p>
                            </div>
                        </div>

                        {/* Speed Controls */}
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10">
                                <span className="text-[10px] font-mono text-slate-400 px-2 uppercase tracking-wider">Speed:</span>
                                {[
                                    { label: "Stop", speed: 0 },
                                    { label: "1x", speed: 1 },
                                    { label: "2x", speed: 2 },
                                    { label: "3x", speed: 3 },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => setSpeedMultiplierLevel(item.speed)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer outline-none ring-0 focus:outline-none ${
                                            speedMultiplierLevel === item.speed
                                                ? "bg-[#1A73E8] text-white shadow-none"
                                                : "text-slate-300 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <a
                                href="tel:+92512261175"
                                className="w-full sm:w-auto flex items-center justify-center bg-white/[0.04] hover:bg-[#1A73E8] text-white border border-white/15 hover:border-[#1A73E8] rounded-lg px-6 h-11 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                            >
                                Call Now: +92-51-2261175
                            </a>
                            <a
                                href="/services"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#38BDF8] hover:text-white transition-colors py-3 group"
                            >
                                Explore Infrastructure
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#38BDF8]" />
                            </a>
                        </div>
                    </div>

                    {/* Right Interactive Canvas View Panel with Centered Globe & Bottom Antennas */}
                    <div className="w-full lg:w-2/5 flex justify-center relative z-10 lg:h-[520px]">
                        <div
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={handleMouseLeave}
                            className="w-[480px] h-[520px] lg:absolute lg:-top-6 lg:-right-6 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                        >
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(56,189,248,0.2)]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}