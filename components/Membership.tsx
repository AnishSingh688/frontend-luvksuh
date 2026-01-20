"use client";

import { useState, FormEvent } from "react";

export default function Membership() {
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
        e.currentTarget.reset();
    };

    return (
        <div className="reveal">
            <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue">
                Become a Member
            </h2>
            <p className="mt-2 text-slate-700">
                Join hands to uplift the Kushwaha Samaj. Membership is open to all
                who support our mission.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-3 max-w-xl">
                <input
                    required
                    name="name"
                    placeholder="Full name"
                    className="rounded-xl border border-amber-200 px-4 py-3 bg-white/80"
                />
                <input
                    required
                    name="phone"
                    placeholder="Phone"
                    className="rounded-xl border border-amber-200 px-4 py-3 bg-white/80"
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="rounded-xl border border-amber-200 px-4 py-3 bg-white/80"
                />
                <textarea
                    name="message"
                    placeholder="Message (optional)"
                    className="rounded-xl border border-amber-200 px-4 py-3 bg-white/80"
                ></textarea>
                <button className="w-max rounded-full px-6 py-3 bg-brand-ramblue text-white hover:shadow-lg shadow">
                    Apply
                </button>
                {showMessage && (
                    <p className="text-sm text-green-700">
                        Thank you. Your membership request has been recorded.
                    </p>
                )}
            </form>
        </div>
    );
}
