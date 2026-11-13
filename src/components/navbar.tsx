"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-xs">
      {/* 1. Functional Top Announcement Strip */}
      <div className="bg-[#0B0F19] text-white py-3 px-4 sm:px-6 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-sans">
          {/* Left Side: Functional Email & Phone */}
          <div className="flex items-center gap-6 text-slate-300">
            <a
              href="mailto:info@theglobalcast.com?subject=Inquiry%20Regarding%20Globalcast%20Services&body=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20broadcast%20solutions."
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>Send Mail: info@theglobalcast.com</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:+92511112278"
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>Call Now: +92-51-111-CAST</span>
            </a>
          </div>

          {/* Right Side: Quick Links */}
          <div className="flex items-center gap-6 font-medium text-slate-400">
            <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#DADCE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C63.2435 90 74.8878 83.5049 82 73.6667" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" />
                  <path d="M50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70C56.5 70 62.2 66.8 66 61.8" stroke="#1A73E8" strokeWidth="12" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-[#202124] tracking-wider text-sm sm:text-base leading-tight font-sans">
                  GLOBALCAST
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#1A73E8] font-bold tracking-[0.2em] uppercase font-sans">
                  TECHNICAL SOLUTIONS
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1.5">

                {/* Direct Link: Home */}
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="px-3.5 py-2 text-sm font-semibold text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg transition-all inline-block cursor-pointer"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Direct Link: About */}
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="px-3.5 py-2 text-sm font-semibold text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg transition-all inline-block cursor-pointer"
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                {/* Dropdown: Services (With matching soft blue hover background & cursor pointer) */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className="px-3.5 py-2 text-sm font-semibold text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg bg-transparent data-[state=open]:bg-[#E8F0FE] data-[state=open]:text-[#1A73E8] transition-all flex items-center gap-1.5 font-sans cursor-pointer [&>svg]:inline-block [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-[#5F6368] [&>svg]:ml-0.5">
                    Services
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="!bg-white !p-4 !m-0 !border-0 !shadow-2xl !rounded-2xl border border-[#DADCE0]/80">
                    <div className="w-[540px] grid grid-cols-2 gap-3">
                      <Link href="/services/sports" className="group p-3.5 rounded-xl bg-white hover:bg-[#E8F0FE]/40 border border-[#DADCE0]/60 hover:border-[#1A73E8] transition-all duration-200">
                        <div className="font-bold text-sm text-[#202124] mb-1 group-hover:text-[#1A73E8] transition-colors">
                          Sports Production
                        </div>
                        <p className="text-xs text-[#5F6368] leading-relaxed">
                          Multi-camera live sports coverage and real-time graphics.
                        </p>
                      </Link>

                      <Link href="/services/cloud" className="group p-3.5 rounded-xl bg-white hover:bg-[#E8F0FE]/40 border border-[#DADCE0]/60 hover:border-[#1A73E8] transition-all duration-200">
                        <div className="font-bold text-sm text-[#202124] mb-1 group-hover:text-[#1A73E8] transition-colors">
                          Cloud Media Workflows
                        </div>
                        <p className="text-xs text-[#5F6368] leading-relaxed">
                          Automated media asset management and IP video distribution.
                        </p>
                      </Link>

                      <Link href="/services/satellite" className="group p-3.5 rounded-xl bg-white hover:bg-[#E8F0FE]/40 border border-[#DADCE0]/60 hover:border-[#1A73E8] transition-all duration-200">
                        <div className="font-bold text-sm text-[#202124] mb-1 group-hover:text-[#1A73E8] transition-colors">
                          Satellite & Teleport Uplink
                        </div>
                        <p className="text-xs text-[#5F6368] leading-relaxed">
                          Global satellite uplinks with 99.99% operational SLA uptime.
                        </p>
                      </Link>

                      <Link href="/services/consulting" className="group p-3.5 rounded-xl bg-white hover:bg-[#E8F0FE]/40 border border-[#DADCE0]/60 hover:border-[#1A73E8] transition-all duration-200">
                        <div className="font-bold text-sm text-[#202124] mb-1 group-hover:text-[#1A73E8] transition-colors">
                          Engineering Systems Design
                        </div>
                        <p className="text-xs text-[#5F6368] leading-relaxed">
                          Turnkey studio integration and master control setup.
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Link: Portfolio */}
                <NavigationMenuItem>
                  <Link
                    href="/our-work"
                    className="px-3.5 py-2 text-sm font-semibold text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg transition-all inline-block cursor-pointer"
                  >
                    Portfolio
                  </Link>
                </NavigationMenuItem>

                {/* Direct Link: Team */}
                <NavigationMenuItem>
                  <Link
                    href="/our-team"
                    className="px-3.5 py-2 text-sm font-semibold text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-lg transition-all inline-block cursor-pointer"
                  >
                    Team
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="group bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold shadow-xs hover:shadow-md rounded-lg px-6 h-11 transition-all duration-300 text-sm flex items-center gap-2 cursor-pointer"
              onClick={() => window.location.href = '/contact'}
            >
              <span>Get Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </Button>
          </div>

          {/* Mobile Professional Hamburger Drawer Trigger */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                className="group inline-flex items-center justify-center text-[#202124] bg-slate-50 hover:bg-[#E8F0FE] w-10 h-10 rounded-xl border border-[#DADCE0] transition-all cursor-pointer shadow-2xs"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#1A73E8] transition-transform group-hover:scale-105" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-white border-[#DADCE0] text-[#202124] w-[320px] sm:w-[380px] p-0 flex flex-col justify-between shadow-2xl overflow-y-auto [&>button:last-child]:hidden"
              >
                {/* Drawer Top Header */}
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
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Menu Section */}
                  <div className="p-5">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Main Menu
                    </p>
                    <nav className="flex flex-col gap-1">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between"
                      >
                        <span>Home</span>
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between"
                      >
                        <span>About</span>
                      </Link>

                      {/* Smooth Mobile Services Accordion */}
                      <div>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span>Services</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-[#1A73E8]' : ''}`} />
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'grid-rows-[1fr] opacity-100 py-1' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                          <div className="overflow-hidden">
                            <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1.5 border-l-2 border-[#1A73E8] ml-3 my-1 bg-slate-50/60 rounded-r-lg">
                              <Link
                                href="/services"
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 px-3 rounded-md text-xs font-bold text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between"
                              >
                                <span>All Services →</span>
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
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between"
                      >
                        <span>Portfolio</span>
                      </Link>
                      <Link
                        href="/our-team"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-all flex items-center justify-between"
                      >
                        <span>Team</span>
                      </Link>
                    </nav>

                    <div className="my-5 border-t border-[#DADCE0]" />

                    {/* Chamber Services Quick Cards Grid */}
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Chamber Services
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

                    {/* Functional Contact Rows inside Drawer (Symmetrical Icon Pill Style) */}
                    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                      <a
                        href="mailto:info@theglobalcast.com?subject=Inquiry%20Regarding%20Globalcast%20Services&body=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20broadcast%20solutions."
                        className="group flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-[#1A73E8] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-[#1A73E8]/40 transition-colors">
                          <Mail className="w-4 h-4 text-[#1A73E8]" />
                        </div>
                        <span className="truncate">info@theglobalcast.com</span>
                      </a>

                      <a
                        href="tel:+92511112278"
                        className="group flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-[#1A73E8] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-[#1A73E8]/40 transition-colors">
                          <Phone className="w-4 h-4 text-[#1A73E8]" />
                        </div>
                        <span>+92-51-111-CAST</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Fixed Action Button */}
                <div className="p-5 border-t border-[#DADCE0] bg-white sticky bottom-0">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = '/contact';
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
      </div>
    </header>
  );
}