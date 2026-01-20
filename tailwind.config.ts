import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-display)", "serif"],
                body: ["var(--font-body)", "system-ui", "sans-serif"],
            },
            colors: {
                brand: {
                    saffron: "#FF9933",
                    forest: "#14532D",
                    ramblue: "#1E3A8A",
                    gold: "#E0B95D",
                },
            },
            boxShadow: {
                glow: "0 0 0 3px rgba(224, 185, 93, 0.35)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(-4px)" },
                    "50%": { transform: "translateY(6px)" },
                },
                rise: {
                    "0%": { opacity: "0", transform: "translateY(14px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { opacity: "0.7" },
                    "50%": { opacity: "1" },
                    "100%": { opacity: "0.7" },
                },
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                rise: "rise 0.8s ease-out both",
                shimmer: "shimmer 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
