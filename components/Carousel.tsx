"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CarouselProps {
    children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of width
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative group">
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide py-4 px-2"
                style={{ scrollBehavior: "smooth" }}
            >
                {children}
            </div>

            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 p-2 rounded-full shadow-lg border border-amber-100 text-brand-ramblue opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:scale-110 z-10"
                aria-label="Previous"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 p-2 rounded-full shadow-lg border border-amber-100 text-brand-ramblue opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:scale-110 z-10"
                aria-label="Next"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );
}
