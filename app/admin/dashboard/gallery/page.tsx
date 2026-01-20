"use client";

import { useState, useEffect } from "react";
import GalleryForm from "@/components/admin/GalleryForm";

interface GalleryItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    eventDate?: string;
    order: number;
}

export default function GalleryManagement() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gallery item?")) return;

        try {
            const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to delete item");
            }
            fetchItems();
        } catch (error) {
            console.error("Failed to delete item:", error);
            alert(error instanceof Error ? error.message : "Failed to delete item");
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingItem(null);
        fetchItems();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-3xl text-brand-ramblue">Gallery</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                >
                    {showForm ? "Cancel" : "+ New Item"}
                </button>
            </div>

            {showForm && (
                <div className="mb-6">
                    <GalleryForm
                        item={editingItem}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingItem(null);
                        }}
                    />
                </div>
            )}

            <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-brand-ramblue text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Image</th>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Event Date</th>
                                <th className="px-6 py-3 text-left">Order</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No gallery items found. Create one to get started!
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item.id} className="border-t border-amber-200">
                                        <td className="px-6 py-4">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold">{item.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-brand-gold/20 text-brand-ramblue text-xs font-semibold">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">{item.eventDate || "-"}</td>
                                        <td className="px-6 py-4 text-sm">{item.order}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="mr-2 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
