"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Member {
    id: string;
    name: string;
    designation: string;
    photoUrl?: string;
    bio?: string;
    order: number;
    contributionAmount?: number;
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-ramblue"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-50/30">
            {/* Header / Nav Back */}
            <div className="bg-white border-b border-amber-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-brand-ramblue font-semibold hover:opacity-80 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-xl font-display font-bold text-brand-ramblue hidden sm:block">
                        All Members
                    </h1>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl text-brand-ramblue mb-4">
                        Our Full Team
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Meet all the amazing people who support and make our work possible.
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-amber-100 flex items-center gap-6 cursor-pointer group"
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 relative rounded-full overflow-hidden bg-slate-100 border-2 border-amber-100 group-hover:border-brand-ramblue transition-colors">
                                {member.photoUrl ? (
                                    <img
                                        src={member.photoUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-brand-ramblue/5 text-brand-ramblue">
                                        <svg className="w-8 h-8 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow text-left">
                                <h3 className="font-display font-semibold text-lg md:text-xl text-brand-ramblue group-hover:text-blue-700 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-brand-saffron font-medium text-sm mt-1 uppercase tracking-wider">
                                    {member.designation}
                                </p>
                            </div>

                            <div className="flex-shrink-0 text-slate-300 group-hover:text-brand-ramblue transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Member Details Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 transition-colors z-10"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="md:w-2/5 relative h-64 md:h-auto bg-slate-100">
                            {selectedMember.photoUrl ? (
                                <img
                                    src={selectedMember.photoUrl}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand-ramblue/5 text-brand-ramblue">
                                    <svg className="w-20 h-20 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:w-3/5 overflow-y-auto max-h-[60vh] md:max-h-auto">
                            <h2 className="text-2xl font-display font-bold text-brand-ramblue">
                                {selectedMember.name}
                            </h2>
                            <p className="text-brand-saffron font-medium text-sm uppercase tracking-wider mt-1 mb-6">
                                {selectedMember.designation}
                            </p>

                            <div className="prose prose-sm text-slate-600">
                                {selectedMember.bio ? (
                                    <p className="whitesapce-pre-wrap">{selectedMember.bio}</p>
                                ) : (
                                    <p className="italic text-slate-400">No biography available.</p>
                                )}
                            </div>
                            {selectedMember.contributionAmount && selectedMember.contributionAmount > 0 && (
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-brand-ramblue uppercase tracking-wider mb-2">
                                        Generous Contribution
                                    </h4>
                                    <p className="text-xl font-semibold text-brand-gold">
                                        NPR {selectedMember.contributionAmount.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Backdrop click to close */}
                    <div
                        className="absolute inset-0 z-[-1]"
                        onClick={() => setSelectedMember(null)}
                    ></div>
                </div>
            )}
        </div>
    );
}
