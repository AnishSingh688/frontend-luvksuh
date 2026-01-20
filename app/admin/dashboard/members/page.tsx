"use client";

import { useEffect, useState } from "react";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import MemberForm from "@/components/admin/MemberForm";

interface Member {
    id: string;
    name: string;
    designation: string;
    photoUrl?: string;
    bio?: string;
    order: number;
    showOnHome: boolean;
    contributionAmount?: number;
}

export default function AdminMembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMember, setCurrentMember] = useState<Member | undefined>(undefined);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/members");
            const data = await res.json();

            if (Array.isArray(data)) {
                setMembers(data);
            } else {
                console.error("API returned non-array data:", data);
                setMembers([]);
            }
        } catch (error) {
            console.error("Failed to fetch members:", error);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (memberData: FormData) => {
        try {
            const method = currentMember ? "PUT" : "POST";
            const url = currentMember
                ? `/api/members/${currentMember.id}`
                : "/api/members";

            const res = await fetch(url, {
                method,
                body: memberData,
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentMember(undefined);
                fetchMembers();
            } else {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.details
                    ? `${errorData.error}: ${errorData.details}`
                    : (errorData.error || res.statusText);
                alert(`Failed to save member: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error saving member:", error);
            alert(`Error saving member: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;

        try {
            const res = await fetch(`/api/members/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchMembers();
            } else {
                alert("Failed to delete member");
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl font-bold text-slate-800">Manage Members</h1>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentMember(undefined);
                            setIsEditing(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-ramblue text-white rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Member
                    </button>
                )}
            </div>

            {isEditing ? (
                <MemberForm
                    member={currentMember}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsEditing(false);
                        setCurrentMember(undefined);
                    }}
                />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Designation
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Home?
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contrib.
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                {member.photoUrl ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={member.photoUrl} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">N/A</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.designation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.showOnHome ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                No
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        NPR {member.contributionAmount?.toLocaleString() || '0'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                setCurrentMember(member);
                                                setIsEditing(true);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                        No members found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
