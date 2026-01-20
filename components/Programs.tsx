"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Carousel from "./Carousel";

interface Program {
    id: string;
    title: string;
    category: string;
    description: string;
}

export default function Programs() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    // Call fetch on mount
    useEffect(() => {
        fetchPrograms();
    }, []);

    // Re-trigger scroll reveal when programs data settles
    useScrollReveal(programs.length);

    const fetchPrograms = async () => {
        try {
            const res = await fetch("/api/programs");
            const data = await res.json();
            setPrograms(data);
        } catch (error) {
            console.error("Failed to fetch programs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="programs" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>Loading programs...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="programs" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue text-center">
                    Programs
                </h2>
                <p className="text-center mt-3 text-slate-600 max-w-2xl mx-auto">
                    Focused initiatives that create measurable impact.
                </p>

                <div className="mt-12">
                    {programs.length === 0 ? (
                        <div className="text-center text-slate-600">
                            No programs available at the moment.
                        </div>
                    ) : programs.length > 3 ? (
                        <Carousel>
                            {programs.map((program) => (
                                <ProgramCard key={program.id} program={program} />
                            ))}
                        </Carousel>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {programs.map((program) => (
                                <ProgramCard key={program.id} program={program} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

const ProgramCard = ({ program }: { program: Program }) => (
    <div className="reveal rounded-2xl p-6 bg-amber-50 border border-amber-200 min-w-[300px] flex-shrink-0 snap-center md:min-w-0">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-brand-ramblue">
                {program.title}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-brand-gold/20 text-brand-ramblue">
                {program.category}
            </span>
        </div>
        <p className="mt-2 text-sm text-slate-700">
            {program.description}
        </p>
    </div>
);
