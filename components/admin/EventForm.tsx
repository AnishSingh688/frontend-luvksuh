"use client";

import { useState, FormEvent } from "react";

interface Event {
    id?: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

interface EventFormProps {
    event: Event | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
    const [formData, setFormData] = useState<Event>(
        event || { title: "", date: "", location: "", description: "" }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const url = event ? `/api/events/${event.id}` : "/api/events";
            const method = event ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to save event");
            }

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl p-6 shadow">
            <h3 className="font-semibold text-lg text-brand-ramblue mb-4">
                {event ? "Edit Event" : "New Event"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Date
                    </label>
                    <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        placeholder="e.g., Sep 28, 2025"
                        className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Event"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 rounded-full border border-slate-300 hover:bg-slate-50 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
