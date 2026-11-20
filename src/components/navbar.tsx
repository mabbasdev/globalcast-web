"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  ChevronDown,
  HelpCircle,
  Briefcase,
  MessageSquare,
  Building,
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* 1. Functional Top Announcement Strip */}
      <div
        className={`py-3 px-4 sm:px-6 border-b transition-all duration-500 hidden sm:block ${isScrolled
          ? "bg-[#0B0F19] text-white border-white/10 shadow-xs"
          : "bg-black/40 backdrop-blur-md text-slate-200 border-white/10"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-6 text-slate-300">
            <a
              href="mailto:info@theglobalcast.com?subject=Inquiry%20Regarding%20Globalcast%20Services"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Send Mail: info@theglobalcast.com</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:+92511112278"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Call Now: +92-51-111-CAST</span>
            </a>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-300">
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            {/* <Link href="/feedback" className="hover:text-white transition-colors">
              Feedback
            </Link> */}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`relative transition-all duration-500 border-b ${isScrolled
          ? "bg-white/95 backdrop-blur-md border-[#DADCE0] shadow-md"
          : "bg-[#0B0F19]/50 backdrop-blur-md border-white/10 shadow-lg"
          }`}
        onMouseLeave={() => setServicesDropdownOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {/* <svg
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
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <g transform="scale(0.3333333333333333)">
                    <path d="M238 49L202 86C188 72 171 65 151 65C111 65 80 96 80 137C80 159 89 177 105 193L150 239L113 278L62 225C39 202 27 172 27 139C27 68 82 13 151 13C184 13 215 26 238 49Z" fill="url(#paint0_linear_1_12)" />
                    <path d="M137 138H223C246 138 264 156 264 179C264 190 259 202 251 210L189 279H113L204 187H187C159 187 137 165 137 138Z" fill="url(#paint1_linear_1_12)" />
                    <path d="M137 138H223C223 165 205 187 187 187C159 187 137 165 137 138Z" fill="url(#paint2_linear_1_12)" />
                    <path opacity="0.88" d="M113 278L150 239L166 223L129 278H113Z" fill="url(#paint3_linear_1_12)" />
                    <path opacity="0.58" d="M203 187C215 175 222 159 223 138C233 138 241 141 248 146C242 164 227 181 207 190L203 187Z" fill="#4B98BF" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_1_12" x1="27" y1="13" x2="285.266" y2="218.638" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#71B7E2" />
                      <stop offset="1" stopColor="#5C9DD0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_12" x1="113" y1="279" x2="253.67" y2="128.354" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7CD7E3" />
                      <stop offset="1" stopColor="#A0E8E9" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_1_12" x1="137" y1="138" x2="179.153" y2="211.983" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#71B7E2" />
                      <stop offset="1" stopColor="#5C9DD0" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_1_12" x1="113" y1="278" x2="167.962" y2="225.036" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3977AC" />
                      <stop offset="1" stopColor="#73B8DC" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span
                  className={`font-extrabold tracking-wider text-sm sm:text-base leading-tight font-sans transition-colors ${isScrolled ? "text-[#202124]" : "text-white"
                    }`}
                >
                  GLOBALCAST
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#38BDF8] font-bold tracking-[0.2em] uppercase font-sans">
                  TECHNICAL SOLUTIONS
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${isScrolled
                ? "text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${isScrolled
                ? "text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
            >
              About
            </Link>

            {/* Centered Mega-Dropdown Trigger */}
            <div
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="py-2"
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${isScrolled
                  ? servicesDropdownOpen
                    ? "bg-[#E8F0FE] text-[#1A73E8]"
                    : "text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                  : servicesDropdownOpen
                    ? "bg-white/15 text-white"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>

            <Link
              href="/our-work"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${isScrolled
                ? "text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
            >
              Portfolio
            </Link>

            <Link
              href="/team"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${isScrolled
                ? "text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
            >
              Team
            </Link>
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              type="button"
              onClick={() => router.push("/contact")}
              className="group bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold shadow-xs hover:shadow-md rounded-lg px-6 h-11 transition-all duration-300 text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Get Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </Button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                className={`group inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all cursor-pointer shadow-2xs ${isScrolled
                  ? "text-[#202124] bg-slate-50 hover:bg-[#E8F0FE] border-[#DADCE0]"
                  : "text-white bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md"
                  }`}
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#38BDF8] transition-transform group-hover:scale-105" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-white border-[#DADCE0] text-[#202124] w-[320px] sm:w-[380px] p-0 flex flex-col justify-between shadow-2xl overflow-y-auto [&>button:last-child]:hidden"
              >
                <div>
                  <div className="p-5 border-b border-[#DADCE0] flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0B0F19] flex items-center justify-center text-white font-black text-sm">
                        G
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-xs tracking-wider">
                          GLOBALCAST
                        </span>
                        <span className="text-[9px] text-[#1A73E8] font-bold tracking-widest uppercase">
                          TECHNICAL SOLUTIONS
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Main Menu
                    </p>
                    <nav className="flex flex-col gap-1">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                      >
                        Home
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                      >
                        About
                      </Link>

                      <div>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span>Services</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-[#1A73E8]" : ""
                              }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${mobileServicesOpen
                            ? "grid-rows-[1fr] opacity-100 py-1"
                            : "grid-rows-[0fr] opacity-0 overflow-hidden"
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1.5 border-l-2 border-[#1A73E8] ml-3 my-1 bg-slate-50/60 rounded-r-lg">
                              <Link
                                href="/services"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-bold text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                              >
                                All Services →
                              </Link>
                              <Link
                                href="/services/sports"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                              >
                                Sports Production
                              </Link>
                              <Link
                                href="/services/cloud"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                              >
                                Cloud Media Workflows
                              </Link>
                              <Link
                                href="/services/satellite"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                              >
                                Satellite & Teleport Uplink
                              </Link>
                              <Link
                                href="/services/consulting"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-medium text-slate-600 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                              >
                                Engineering Systems Design
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/our-work"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                      >
                        Portfolio
                      </Link>
                      <Link
                        href="/team"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all"
                      >
                        Team
                      </Link>
                    </nav>

                    <div className="my-5 border-t border-[#DADCE0]" />

                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Quick Links
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      <Link
                        href="/faqs"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-xl border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE]/30 transition-all flex items-center gap-2.5"
                      >
                        <HelpCircle className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-xs font-semibold text-slate-700">FAQs</span>
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-xl border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE]/30 transition-all flex items-center gap-2.5"
                      >
                        <MessageSquare className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-xs font-semibold text-slate-700">Contact</span>
                      </Link>

                      <Link
                        href="/careers"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-xl border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE]/30 transition-all flex items-center gap-2.5"
                      >
                        <Briefcase className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-xs font-semibold text-slate-700">Careers</span>
                      </Link>

                      <Link
                        href="/feedback"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-xl border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE]/30 transition-all flex items-center gap-2.5"
                      >
                        <Building className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-xs font-semibold text-slate-700">Feedback</span>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                      <a
                        href="mailto:info@theglobalcast.com"
                        className="group flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-[#1A73E8] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-[#1A73E8]" />
                        </div>
                        <span className="truncate">info@theglobalcast.com</span>
                      </a>

                      <a
                        href="tel:+92511112278"
                        className="group flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-[#1A73E8] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-[#1A73E8]" />
                        </div>
                        <span>+92-51-111-CAST</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-[#DADCE0] bg-white sticky bottom-0">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/contact");
                    }}
                    className="group w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold h-11 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Services</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Centered Mega-Dropdown Panel (High Opacity + Brand Hover Styles) */}
        <div
          onMouseEnter={() => setServicesDropdownOpen(true)}
          onMouseLeave={() => setServicesDropdownOpen(false)}
          className={`hidden md:block absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${servicesDropdownOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <div className="w-[660px] rounded-2xl bg-[#0B0F19]/98 backdrop-blur-3xl border border-white/20 shadow-2xl p-7">
            <div className="grid grid-cols-2 gap-6">
              {/* Column 1 */}
              <div>
                <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#38BDF8] pb-3 mb-3 border-b border-white/10">
                  BROADCAST & PRODUCTION
                </div>
                <div className="space-y-2">
                  <Link
                    href="/services/sports"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block group p-3 rounded-xl border border-transparent hover:border-[#1A73E8]/40 hover:bg-[#1A73E8]/10 transition-all duration-200"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      Sports Production & OB Vans
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Multi-camera live sports coverage and real-time graphics
                    </p>
                  </Link>

                  <Link
                    href="/services/consulting"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block group p-3 rounded-xl border border-transparent hover:border-[#1A73E8]/40 hover:bg-[#1A73E8]/10 transition-all duration-200"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      Engineering Systems Design
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Turnkey studio integration and master control setup
                    </p>
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#38BDF8] pb-3 mb-3 border-b border-white/10">
                  CLOUD & INFRASTRUCTURE
                </div>
                <div className="space-y-2">
                  <Link
                    href="/services/cloud"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block group p-3 rounded-xl border border-transparent hover:border-[#1A73E8]/40 hover:bg-[#1A73E8]/10 transition-all duration-200"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      Cloud Media Workflows
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Automated media asset management and IP distribution
                    </p>
                  </Link>

                  <Link
                    href="/services/satellite"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block group p-3 rounded-xl border border-transparent hover:border-[#1A73E8]/40 hover:bg-[#1A73E8]/10 transition-all duration-200"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      Satellite & Teleport Uplink
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Global C/Ku band uplinks with 99.99% SLA uptime
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}