"use client";

import { useState, useEffect } from "react";
import EventForm from "@/components/admin/EventForm";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export default function EventsManagement() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to delete event");
            }
            fetchEvents();
        } catch (error) {
            console.error("Failed to delete event:", error);
            alert(error instanceof Error ? error.message : "Failed to delete event");
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingEvent(null);
        fetchEvents();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-3xl text-brand-ramblue">Events</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                >
                    {showForm ? "Cancel" : "+ New Event"}
                </button>
            </div>

            {showForm && (
                <div className="mb-6">
                    <EventForm
                        event={editingEvent}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingEvent(null);
                        }}
                    />
                </div>
            )}

            <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl overflow-hidden shadow">
                <table className="w-full">
                    <thead className="bg-brand-ramblue text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Location</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    No events found. Create one to get started!
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event.id} className="border-t border-amber-200">
                                    <td className="px-6 py-4 font-semibold">{event.title}</td>
                                    <td className="px-6 py-4 text-sm">{event.date}</td>
                                    <td className="px-6 py-4 text-sm">{event.location}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {event.description.substring(0, 80)}...
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="mr-2 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
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
    );
}
