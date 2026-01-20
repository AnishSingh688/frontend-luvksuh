"use client";

import { Fragment, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl transform transition-all p-6 animate-rise">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-display text-brand-ramblue font-semibold">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[70vh]">
                    {children}
                </div>
            </div>
        </div>
    );
}
