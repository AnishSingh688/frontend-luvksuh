"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-amber-200/60">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <a href="#home" className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-brand-saffron transition-transform group-hover:scale-105">
                            <Image
                                src="/assets/uploads/logo/transparent_logo.png"
                                alt="Luv Kush Pratisthan Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-display text-xl font-bold text-brand-ramblue">
                            Luv Kush Pratisthan
                        </span>
                    </a>
                </div>
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link href="/#about" className="hover:text-brand-ramblue">About</Link>
                    <Link href="/#programs" className="hover:text-brand-ramblue">Programs</Link>
                    <Link href="/#events" className="hover:text-brand-ramblue">Events</Link>
                    <Link href="/#gallery" className="hover:text-brand-ramblue">Gallery</Link>
                    <Link href="/#contact" className="hover:text-brand-ramblue">Contact</Link>
                    <Link
                        href="/admin/login"
                        className="text-sm px-3 py-1 rounded-full border border-brand-ramblue text-brand-ramblue hover:bg-brand-ramblue hover:text-white transition"
                        title="Admin Login"
                    >
                        Admin
                    </Link>
                    <Link
                        href="/#donate"
                        className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-saffron to-brand-gold px-4 py-2 text-brand-ramblue shadow hover:shadow-lg transition-shadow"
                        title="Support our work"
                    >
                        <span className="font-semibold">Donate</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 016.5 4 5.5 5.5 0 0112 6.09 5.5 5.5 0 0117.5 4 4.5 4.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </Link>
                </nav>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg border border-amber-200"
                    aria-label="Open menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-amber-200/60 bg-white/80">
                    <div className="max-w-7xl mx-auto px-4 py-3 grid gap-3">
                        <Link href="/#about" className="py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/#programs" className="py-2" onClick={() => setMobileMenuOpen(false)}>Programs</Link>
                        <Link href="/#events" className="py-2" onClick={() => setMobileMenuOpen(false)}>Events</Link>
                        <Link href="/#gallery" className="py-2" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
                        <Link href="/#contact" className="py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        <Link href="/admin/login" className="py-2 text-brand-ramblue font-medium" onClick={() => setMobileMenuOpen(false)}>Admin Login</Link>
                        <Link
                            href="/#donate"
                            className="inline-flex w-max items-center gap-2 rounded-full bg-gradient-to-r from-brand-saffron to-brand-gold px-4 py-2 text-brand-ramblue shadow"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Donate
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
