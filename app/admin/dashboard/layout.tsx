"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!session) {
        router.push("/admin/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-amber-100/40">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                            <Image
                                src="/assets/logo.jpg"
                                alt="anish"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl text-brand-ramblue">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-slate-600">{session.user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-full border border-brand-ramblue text-brand-ramblue hover:bg-brand-ramblue hover:text-white transition text-sm"
                        >
                            Back to Website
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                            className="px-4 py-2 rounded-full border border-brand-ramblue text-brand-ramblue hover:bg-brand-ramblue hover:text-white transition text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Navigation */}
                <nav className="mb-8 flex gap-4">
                    <Link
                        href="/admin/dashboard"
                        className="px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:bg-brand-ramblue hover:text-white transition"
                    >
                        Overview
                    </Link>
                    <Link
                        href="/admin/dashboard/programs"
                        className="px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:bg-brand-ramblue hover:text-white transition"
                    >
                        Programs
                    </Link>
                    <Link
                        href="/admin/dashboard/events"
                        className="px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:bg-brand-ramblue hover:text-white transition"
                    >
                        Events
                    </Link>
                    <Link
                        href="/admin/dashboard/gallery"
                        className="px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:bg-brand-ramblue hover:text-white transition"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/admin/dashboard/members"
                        className="px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:bg-brand-ramblue hover:text-white transition"
                    >
                        Members
                    </Link>
                </nav>

                {/* Content */}
                {children}
            </div>
        </div>
    );
}
