"use client";

import { useEffect } from "react";

export function useScrollReveal(dep?: any) {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("is-visible");
                });
            },
            { threshold: 0.15 }
        );

        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => {
            obs.observe(el);
        });

        return () => {
            revealElements.forEach((el) => {
                obs.unobserve(el);
            });
        };
    }, [dep]); // Re-run when dependency changes
}
