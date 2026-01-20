"use client";

import { useEffect } from "react";
import Image from "next/image";
import { shootArrow } from "@/utils/shootArrow";

export default function Hero() {
    useEffect(() => {
        // Make shoot function available globally for the button
        (window as any).shoot = shootArrow;
    }, []);

    return (
        <section id="home" className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated arrow flying across a gentle path */}
                <div className="arrow-flight w-[200%] -left-1/2 absolute top-10 opacity-80">
                    <svg width="100%" height="140" viewBox="0 0 1800 140" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF9933" />
                                <stop offset="100%" stopColor="#E0B95D" />
                            </linearGradient>
                        </defs>
                        <path id="flightPath" d="M 0 70 C 300 10, 600 130, 900 70 S 1500 130, 1800 70" fill="none" stroke="none" />
                        <g id="arrow">
                            {/* shaft */}
                            <rect x="-60" y="-2" width="80" height="4" fill="url(#arrowGrad)" rx="2" />
                            {/* head */}
                            <polygon points="20,0 0,8 0,-8" fill="url(#arrowGrad)" />
                            {/* fletching */}
                            <polygon points="-60,0 -75,10 -75,-10" fill="#1E3A8A" />
                            <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                                <mpath href="#flightPath" />
                            </animateMotion>
                        </g>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 grid md:grid-cols-2 items-center gap-10">
                <div className="relative z-10">
                    <h1 className="font-display text-4xl md:text-6xl text-brand-ramblue leading-tight">
                        Luv & Kush
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-brand-gold">
                            Inspiration for Service
                        </span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-prose">
                        Luv Kush Pratisthan advances education, health, and opportunity for
                        the Kushwaha Samaj. Rooted in the virtues of Luv and Kush, we work
                        for unity, dignity, and sustainable progress.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href="https://www.facebook.com/luvkush.pratisthan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full px-6 py-3 bg-brand-ramblue text-white hover:shadow-lg shadow transition"
                        >
                            Join the Samaj
                        </a>
                        <button
                            onClick={shootArrow}
                            className="rounded-full px-6 py-3 bg-gradient-to-r from-brand-saffron to-brand-gold text-brand-ramblue font-semibold hover:shadow-lg shadow"
                        >
                            Shoot Hope →
                        </button>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                        <div className="reveal">
                            <div className="text-3xl font-bold text-brand-ramblue">25+</div>
                            <div className="text-sm">Scholarships</div>
                        </div>
                        <div className="reveal">
                            <div className="text-3xl font-bold text-brand-ramblue">15+</div>
                            <div className="text-sm">Health Camps</div>
                        </div>
                        <div className="reveal">
                            <div className="text-3xl font-bold text-brand-ramblue">1,000+</div>
                            <div className="text-sm">Beneficiaries</div>
                        </div>
                    </div>
                </div>

                {/* Bow illustration */}
                <div className="relative md:block hidden">
                    <div className="absolute -inset-8 bg-gradient-to-tr from-amber-100 via-transparent to-transparent rounded-[2rem] blur-2xl"></div>
                    <div className="relative rounded-3xl p-6 bg-white/70 border border-amber-200 shadow-lg animate-float">
                        {/* Stylized bow & string using SVG */}
                        <Image src="/assets/uploads/logo/logo2.png" alt="Community" width={800} height={600} className="w-full h-80 object-contain bg-white" />
                        {/* <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8B4513" />
                                    <stop offset="50%" stopColor="#D2691E" />
                                    <stop offset="100%" stopColor="#8B4513" />
                                </linearGradient>

                                <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#475569" />
                                    <stop offset="100%" stopColor="#94a3b8" />
                                </linearGradient>
                            </defs>

                            <path d="M100 60 L60 180 L100 300" fill="none" stroke="#64748b" strokeWidth="2" />

                            <path d="M100 60 C 180 60, 260 120, 260 180 C 260 240, 180 300, 100 300"
                                fill="none"
                                stroke="url(#bowGrad)"
                                strokeWidth="12"
                                strokeLinecap="round" />

                            <rect x="245" y="165" width="20" height="30" rx="4" fill="#312e81" />

                            <g transform="translate(180, 180)">
                                <rect x="-120" y="-1.5" width="240" height="3" fill="#451a03" />

                                <path d="M120 0 L145 -10 L145 10 Z" fill="url(#metalGrad)" transform="rotate(180 132.5 0)" />

                                <path d="M-110 0 L-130 -12 L-115 -1.5 Z" fill="#ef4444" />
                                <path d="M-110 0 L-130 12 L-115 1.5 Z" fill="#ef4444" />
                            </g>
                        </svg> */}
                        <p className="mt-4 text-center text-sm text-slate-600">
                            Symbol of courage, focus, and harmony.
                        </p>
                    </div>
                </div>
            </div>


            {/* Shoot arrow template (handled by JS) */}
            <div
                dangerouslySetInnerHTML={{
                    __html: `
            <template id="arrowTemplate">
              <svg class="shoot-arrow" viewBox="0 0 160 20">
                <defs>
                  <linearGradient id="shootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF9933" />
                    <stop offset="100%" stop-color="#E0B95D" />
                  </linearGradient>
                </defs>
                <rect x="10" y="8" width="120" height="4" fill="url(#shootGrad)" rx="2" />
                <polygon points="130,10 118,16 118,4" fill="url(#shootGrad)" />
                <polygon points="10,10 0,18 0,2" fill="#1E3A8A" />
              </svg>
            </template>
          `
                }}
            />
        </section >
    );
}
