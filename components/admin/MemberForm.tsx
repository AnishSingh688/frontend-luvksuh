"use client";

import { useState } from "react";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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

interface MemberFormProps {
    member?: Member;
    onSave: (data: FormData) => Promise<void>;
    onCancel: () => void;
}

function MemberForm({ member, onSave, onCancel }: MemberFormProps) {
    const [formData, setFormData] = useState({
        name: member?.name || "",
        designation: member?.designation || "",
        bio: member?.bio || "",
        order: member?.order?.toString() || "0",
        showOnHome: member?.showOnHome || false,
        contributionAmount: member?.contributionAmount?.toString() || "0",
    });
    const [previewUrl, setPreviewUrl] = useState<string>(member?.photoUrl || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("designation", formData.designation);
            data.append("bio", formData.bio);
            data.append("order", formData.order);
            data.append("showOnHome", formData.showOnHome.toString());
            data.append("contributionAmount", formData.contributionAmount);
            if (selectedFile) {
                data.append("photo", selectedFile);
            }

            await onSave(data);
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
                {member ? "Edit Member" : "Add New Member"}
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                    {previewUrl && (
                        <div className="mb-2">
                            <img src={previewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-full border border-gray-200" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a profile picture.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contribution (NPR)</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-ramblue"
                            value={formData.contributionAmount}
                            onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">Optional.</p>
                    </div>

                    <div className="flex items-center pt-6 col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-brand-ramblue rounded focus:ring-brand-ramblue border-gray-300"
                                checked={formData.showOnHome}
                                onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                            />
                            <span className="text-sm font-medium text-slate-700">Show on Home Page</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-ramblue hover:bg-blue-900 rounded-md transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Member"}
                </button>
            </div>
        </form>
    );
}

export default MemberForm;
