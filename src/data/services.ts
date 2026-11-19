import {
    Video,
    Server,
    Wifi,
    Cpu,
    Globe,
    Activity,
} from "lucide-react";

export interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    tags: string[];
    badge: string;
    href: string;
    isLinkEnabled: boolean;
    highlights: string[];
}

export const servicesData: ServiceItem[] = [
    {
        id: "sports-production-ob-vans",
        title: "Sports Production & OB Vans",
        subtitle: "Multi-camera live coverage",
        description:
            "Turnkey multi-camera live sports coverage, custom OB vans, and real-time graphics for premier athletic leagues.",
        icon: Video,
        tags: ["SDI/IP", "Live Graphics", "Replay"],
        badge: "4K/8K HDR",
        href: "/services/sports",
        isLinkEnabled: false,
        highlights: [
            "Multi-camera live field switching & instant replay servers",
            "Mobile OB van signal routing & low-latency comms",
            "Real-time broadcast graphics & HDR color pipelines",
        ],
    },
    {
        id: "cloud-media-workflows",
        title: "Cloud Media Workflows",
        subtitle: "Automated asset management",
        description:
            "Automated Media Asset Management (MAM), transcoding pipelines, and ultra-low-latency SRT/RIST IP distribution.",
        icon: Server,
        tags: ["Cloud MAM", "OTT Playout"],
        badge: "<50ms",
        href: "/services/cloud",
        isLinkEnabled: false,
        highlights: [
            "Automated ingest, indexing & cloud MAM storage",
            "Resilient SRT/RIST contribution & ABR OTT playout",
            "Scalable transcoding & multi-destination routing",
        ],
    },
    {
        id: "satellite-teleport-uplink",
        title: "Satellite & Teleport Uplink",
        subtitle: "Global C/Ku band links",
        description:
            "Global C-band and Ku-band earth station teleports and redundant fiber-to-satellite distribution.",
        icon: Wifi,
        tags: ["C/Ku Band", "DSNG", "Redundancy"],
        badge: "99.99% SLA",
        href: "/services/satellite",
        isLinkEnabled: false,
        highlights: [
            "Dedicated C-band and Ku-band uplink & downlink capacity",
            "Redundant fiber-to-teleport and DSNG field paths",
            "Carrier-grade failover & signal integrity assurance",
        ],
    },
    {
        id: "engineering-systems-design",
        title: "Engineering Systems Design",
        subtitle: "Turnkey studio integration",
        description:
            "End-to-end broadcast systems integration, Master Control Room (MCR) commissioning, and SMPTE ST 2110 IP setup.",
        icon: Cpu,
        tags: ["MCR Playout", "Studio Design"],
        badge: "ST 2110",
        href: "/services/consulting",
        isLinkEnabled: false,
        highlights: [
            "Master Control Room (MCR) & studio architecture design",
            "SMPTE ST 2110 uncompressed IP & hybrid SDI integration",
            "Signal rack engineering, commissioning & documentation",
        ],
    },
    {
        id: "corporate-hybrid-events",
        title: "Corporate & Hybrid Events",
        subtitle: "High-definition live summits",
        description:
            "Immersive multi-stream digital broadcasting for corporate summits and hybrid global conferences.",
        icon: Globe,
        tags: ["Keynote", "Secure Gateways"],
        badge: "LIVE FEED",
        href: "/services/corporate",
        isLinkEnabled: false,
        highlights: [
            "Multi-camera keynote switching & hybrid stage feeds",
            "Encrypted contribution & controlled distribution gateways",
            "Redundant encoding for uninterrupted global livestreams",
        ],
    },
    {
        id: "noc-telemetry",
        title: "24/7 NOC & Telemetry",
        subtitle: "Continuous signal monitoring",
        description:
            "Round-the-clock Network Operations Center (NOC) monitoring, signal diagnostics, and fault-tolerant telemetry.",
        icon: Activity,
        tags: ["24/7 NOC", "Telemetry"],
        badge: "ACTIVE",
        href: "/services/noc",
        isLinkEnabled: false,
        highlights: [
            "Continuous 24/7 stream, bitrate & signal health monitoring",
            "Real-time telemetry alerts & rapid fault isolation",
            "Structured incident response & SLA uptime reporting",
        ],
    },
];