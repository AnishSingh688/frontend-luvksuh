"use client";

import { useEffect, useState } from "react";

interface Stats {
    programs: number;
    events: number;
    members: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ programs: 0, events: 0, members: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [programsRes, eventsRes, membersRes] = await Promise.all([
                fetch("/api/programs"),
                fetch("/api/events"),
                fetch("/api/members"),
            ]);

            const programs = await programsRes.json();
            const events = await eventsRes.json();
            const members = await membersRes.json();

            setStats({
                programs: programs.length,
                events: events.length,
                members: members.length,
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        }
    };

    return (
        <div>
            <h2 className="font-display text-3xl text-brand-ramblue mb-6">
                Welcome to Admin Dashboard
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl p-6 shadow">
                    <div className="text-4xl font-bold text-brand-ramblue mb-2">
                        {stats.programs}
                    </div>
                    <div className="text-slate-600">Total Programs</div>
                </div>

                <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl p-6 shadow">
                    <div className="text-4xl font-bold text-brand-ramblue mb-2">
                        {stats.events}
                    </div>
                    <div className="text-slate-600">Total Events</div>
                </div>

                <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl p-6 shadow">
                    <div className="text-4xl font-bold text-brand-ramblue mb-2">
                        {stats.members}
                    </div>
                    <div className="text-slate-600">Total Members</div>
                </div>
            </div>

            <div className="mt-8 bg-white/70 backdrop-blur border border-amber-200 rounded-2xl p-6 shadow">
                <h3 className="font-semibold text-lg text-brand-ramblue mb-4">
                    Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="/admin/dashboard/programs"
                        className="px-4 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                    >
                        Manage Programs
                    </a>
                    <a
                        href="/admin/dashboard/events"
                        className="px-4 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                    >
                        Manage Events
                    </a>
                    <a
                        href="/admin/dashboard/members"
                        className="px-4 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                    >
                        Manage Members
                    </a>
                </div>
            </div>
        </div>
    );
}
