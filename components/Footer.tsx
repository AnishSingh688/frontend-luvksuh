"use client";

import { useEffect, useState } from "react";

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="border-t border-amber-200/60 bg-white/70">
            <div className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-2 gap-6 items-center">
                <p className="text-sm text-slate-600">
                    © {year || "2026"} Luv Kush Pratisthan. All rights reserved.
                </p>
                <div className="sm:text-right text-sm text-slate-600">

                </div>
            </div>
        </footer>
    );
}
