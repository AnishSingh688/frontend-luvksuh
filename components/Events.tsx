"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Call fetch on mount
    useEffect(() => {
        fetchEvents();
    }, []);

    // Re-trigger scroll reveal when events data settles
    useScrollReveal(events.length);

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

    if (loading) {
        return (
            <section id="events" className="py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>Loading events...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="events" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue text-center">
                    Upcoming Events
                </h2>
                <p className="text-center mt-3 text-slate-600">
                    Be a part of our next community gathering.
                </p>

                <div className="mt-10">
                    {events.length === 0 ? (
                        <div className="text-center text-slate-600">
                            No upcoming events at the moment.
                        </div>
                    ) : events.length > 3 ? (
                        <Carousel>
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                            ))}
                        </Carousel>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Event Details Modal */}
            <Modal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                title={selectedEvent?.title}
            >
                {selectedEvent && (
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-brand-gold" />
                                <span className="font-medium">{selectedEvent.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-brand-gold" />
                                <span className="font-medium">{selectedEvent.location}</span>
                            </div>
                        </div>

                        <div className="prose prose-sm max-w-none text-slate-700">
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {selectedEvent.description}
                            </p>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="px-4 py-2 bg-brand-ramblue text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}

// EventCard defined OUTSIDE the component to prevent re-renders losing DOM state
function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
    // Truncate description to 6 words for initial view
    const truncatedDescription = event.description.split(" ").slice(0, 6).join(" ") + (event.description.split(" ").length > 6 ? "..." : "");

    // Check if event is expired
    const eventDate = new Date(event.date);
    const isExpired = eventDate < new Date();

    // Determine border color: Red if expired, Amber if upcoming
    const borderColor = isExpired ? "border-red-300" : "border-amber-200";
    const statusBadge = isExpired ? (
        <span className="text-[10px] uppercase font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-full ml-2">Expired</span>
    ) : null;

    return (
        <article
            className={`reveal rounded-2xl overflow-hidden border ${borderColor} bg-white/70 min-w-[300px] flex-shrink-0 snap-center md:min-w-0 cursor-pointer hover:shadow-lg transition-shadow bg-white`}
            onClick={onClick}
        >
            <div className="p-5">
                <div className="text-xs text-slate-600 flex items-center gap-1 flex-wrap">
                    <span className="font-semibold text-brand-gold">{event.date}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                    {statusBadge}
                </div>
                <h3 className="mt-2 font-semibold text-brand-ramblue group-hover:text-brand-saffron transition-colors">
                    {event.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                    {truncatedDescription}
                </p>
                <div className="mt-4 text-xs font-medium text-brand-ramblue uppercase tracking-wider">
                    Read More &rarr;
                </div>
            </div>
        </article>
    );
}
