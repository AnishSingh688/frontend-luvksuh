"use client";

import { useEffect } from "react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ImageLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
    description: string;
    eventDate?: string;
    onPrevious?: () => void;
    onNext?: () => void;
    hasPrevious?: boolean;
    hasNext?: boolean;
}

export default function ImageLightbox({
    isOpen,
    onClose,
    imageUrl,
    title,
    description,
    eventDate,
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
}: ImageLightboxProps) {
    // Handle ESC key press
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close"
            >
                <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {hasPrevious && onPrevious && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
                    aria-label="Previous"
                >
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
            )}

            {hasNext && onNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
                    aria-label="Next"
                >
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            )}

            {/* Content Container */}
            <div
                className="max-w-7xl mx-auto px-4 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="relative aspect-video lg:aspect-square">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="text-white space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-gold">
                                {title}
                            </h2>
                            {eventDate && (
                                <p className="text-sm text-gray-300 mt-2">
                                    {eventDate}
                                </p>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
