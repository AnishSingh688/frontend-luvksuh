"use client";

import { useState, useEffect } from "react";
import ProgramForm from "@/components/admin/ProgramForm";

interface Program {
    id: string;
    title: string;
    category: string;
    description: string;
}

export default function ProgramsManagement() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProgram, setEditingProgram] = useState<Program | null>(null);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const res = await fetch("/api/programs");
            const data = await res.json();
            setPrograms(data);
        } catch (error) {
            console.error("Failed to fetch programs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this program?")) return;

        try {
            const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to delete program");
            }
            fetchPrograms();
        } catch (error) {
            console.error("Failed to delete program:", error);
            alert(error instanceof Error ? error.message : "Failed to delete program");
        }
    };

    const handleEdit = (program: Program) => {
        setEditingProgram(program);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingProgram(null);
        fetchPrograms();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-3xl text-brand-ramblue">Programs</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 rounded-full bg-brand-ramblue text-white hover:shadow-lg transition"
                >
                    {showForm ? "Cancel" : "+ New Program"}
                </button>
            </div>

            {showForm && (
                <div className="mb-6">
                    <ProgramForm
                        program={editingProgram}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProgram(null);
                        }}
                    />
                </div>
            )}

            <div className="bg-white/70 backdrop-blur border border-amber-200 rounded-2xl overflow-hidden shadow">
                <table className="w-full">
                    <thead className="bg-brand-ramblue text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No programs found. Create one to get started!
                                </td>
                            </tr>
                        ) : (
                            programs.map((program) => (
                                <tr key={program.id} className="border-t border-amber-200">
                                    <td className="px-6 py-4 font-semibold">{program.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full bg-brand-gold/20 text-xs">
                                            {program.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {program.description.substring(0, 100)}...
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(program)}
                                            className="mr-2 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(program.id)}
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
