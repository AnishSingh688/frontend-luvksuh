"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ImageLightbox from "./ImageLightbox";

interface GalleryItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    eventDate?: string;
    order: number;
}

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");

    // Filter gallery items based on active filter
    const filteredItems = activeFilter === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter);

    // Re-trigger scroll reveal when gallery data settles or filter changes
    useScrollReveal(`${activeFilter}-${filteredItems.length}`);

    // Fetch gallery items on mount
    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setGalleryItems(data);
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < filteredItems.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    if (loading) {
        return (
            <section id="gallery" className="py-20 bg-gradient-to-b from-white to-amber-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>Loading gallery...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="py-20 bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue text-center">
                    Our Gallery
                </h2>
                <p className="text-center mt-3 text-slate-600 max-w-2xl mx-auto">
                    Highlights from our past events and programs celebrating our community.
                </p>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-3 mt-8 flex-wrap">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === "all"
                            ? "bg-brand-ramblue text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-gray-100"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveFilter("event")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === "event"
                            ? "bg-brand-ramblue text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-gray-100"
                            }`}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setActiveFilter("program")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === "program"
                            ? "bg-brand-ramblue text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-gray-100"
                            }`}
                    >
                        Programs
                    </button>
                </div>

                {/* Gallery Grid */}
                <div className="mt-12">
                    {filteredItems.length === 0 ? (
                        <div className="text-center text-slate-600">
                            No gallery items available.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item, index) => (
                                <GalleryCard
                                    key={item.id}
                                    item={item}
                                    onClick={() => setSelectedIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && filteredItems[selectedIndex] && (
                <ImageLightbox
                    isOpen={selectedIndex !== null}
                    onClose={() => setSelectedIndex(null)}
                    imageUrl={filteredItems[selectedIndex].imageUrl}
                    title={filteredItems[selectedIndex].title}
                    description={filteredItems[selectedIndex].description}
                    eventDate={filteredItems[selectedIndex].eventDate}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    hasPrevious={selectedIndex > 0}
                    hasNext={selectedIndex < filteredItems.length - 1}
                />
            )}
        </section>
    );
}

// GalleryCard component defined outside to prevent re-renders
function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
    return (
        <article
            className="reveal group cursor-pointer rounded-2xl overflow-hidden border border-amber-200 bg-white hover:shadow-xl transition-all duration-300"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <span className="absolute top-3 right-3 text-xs uppercase font-bold bg-brand-gold text-white px-3 py-1 rounded-full">
                    {item.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">
                {item.eventDate && (
                    <p className="text-xs text-brand-gold font-semibold mb-2">
                        {item.eventDate}
                    </p>
                )}
                <h3 className="font-semibold text-lg text-brand-ramblue group-hover:text-brand-gold transition-colors line-clamp-2">
                    {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {item.description}
                </p>
                <div className="mt-4 text-xs font-medium text-brand-ramblue uppercase tracking-wider">
                    View Details →
                </div>
            </div>
        </article>
    );
}
