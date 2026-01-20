"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Member {
    id: string;
    name: string;
    designation: string;
    photoUrl?: string;
    bio?: string;
    order: number;
    showOnHome: boolean;
}

import Carousel from "./Carousel";

// ... (imports remain)

export default function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch("/api/members");
                if (res.ok) {
                    const data = await res.json();
                    setMembers(data);
                }
            } catch (error) {
                console.error("Failed to fetch members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return null;
    if (members.length === 0) return null;

    // Filter members to show only those marked for home page
    const displayMembers = members.filter((member) => member.showOnHome);

    return (
        <section id="members" className="py-20 bg-amber-50/50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue">
                    Our Team
                </h2>
                <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                    The dedicated individuals working behind the scenes to drive our mission forward.
                </p>

                <div className="mt-12">
                    {/* Mobile: Carousel View */}
                    <div className="md:hidden">
                        <Carousel>
                            {displayMembers.map((member) => (
                                <div key={member.id} className="min-w-[280px] snap-center">
                                    <MemberCard member={member} />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    {/* Desktop: Grid View */}
                    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {displayMembers.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <Link
                        href="/members"
                        className="inline-flex items-center gap-2 rounded-full bg-brand-ramblue px-8 py-3 text-white shadow hover:shadow-lg hover:bg-brand-ramblue/90 transition-all font-semibold"
                    >
                        See All Members
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function MemberCard({ member }: { member: Member }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-amber-100 group text-left h-full">
            <div className="aspect-[3/4] relative overflow-hidden bg-slate-100">
                {member.photoUrl ? (
                    <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-ramblue/5 text-brand-ramblue">
                        <svg className="w-20 h-20 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-4 text-center">
                <h3 className="font-display font-semibold text-lg text-brand-ramblue">
                    {member.name}
                </h3>
                <p className="text-brand-saffron font-medium text-sm mt-1 uppercase tracking-wider">
                    {member.designation}
                </p>
            </div>
        </div>
    );
}
