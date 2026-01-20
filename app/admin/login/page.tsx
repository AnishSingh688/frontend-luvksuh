"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-amber-100/40 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-brand-ramblue mb-2">
                        Admin Login
                    </h1>
                    <p className="text-slate-600">
                        Luv Kush Pratisthan Management System
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-3xl p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-amber-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                                placeholder="admin@luvkushpratisthan.org"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-amber-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-full px-6 py-3 bg-brand-ramblue text-white font-semibold hover:shadow-lg shadow transition disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center bg-white/50 backdrop-blur rounded-full py-2 px-6 inline-block mx-auto border border-amber-100 shadow-sm mx-auto flex w-max">
                    <Link
                        href="/"
                        className="text-sm font-medium text-brand-ramblue hover:text-brand-saffron transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
