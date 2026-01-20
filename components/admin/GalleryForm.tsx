"use client";

import { useState, FormEvent } from "react";

interface GalleryItem {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    eventDate?: string;
    order: number;
}

interface GalleryFormProps {
    item: GalleryItem | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function GalleryForm({ item, onSuccess, onCancel }: GalleryFormProps) {
    const [formData, setFormData] = useState<GalleryItem>(
        item || { title: "", description: "", imageUrl: "", category: "event", order: 0 }
    );
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
        } catch (err) {
            console.error("Upload error:", err);
            setError("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const url = item ? `/api/gallery/${item.id}` : "/api/gallery";
            const method = item ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to save gallery item");
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
                {item ? "Edit Gallery Item" : "New Gallery Item"}
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

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Image URL
                    </label>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                                placeholder="/assets/gallery/image.png"
                                className="flex-1 rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="text-xs">OR Upload:</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-brand-ramblue/10 file:text-brand-ramblue
                                hover:file:bg-brand-ramblue/20"
                            />
                            {uploading && <span className="text-xs text-brand-ramblue animate-pulse">Uploading...</span>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        >
                            <option value="event">Event</option>
                            <option value="program">Program</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Order
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                            required
                            className="w-full rounded-xl border border-amber-200 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Event Date (Optional)
                    </label>
                    <input
                        type="text"
                        value={formData.eventDate || ""}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        placeholder="e.g., March 15, 2025"
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
                        {loading ? "Saving..." : "Save Item"}
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
