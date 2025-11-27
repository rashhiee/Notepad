"use client";

import type { INote } from '../types/note';
import { useState } from "react";
import DeleteNoteButton from "./DeleteNoteButton";
import { SquarePen } from 'lucide-react';
import Navbar from './layout/navbar';
// import { toast } from 'react-toastify';

interface NoteViewed {
    note: INote;
}

export function NoteView({ note }: NoteViewed) {
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        noteName: note.noteName,
        heading: note.heading || "",
        description: note.description || "",
        tags: note.tags.join(", "),
    });


    async function handleSave() {
        const data = new FormData();
        data.append("noteName", form.noteName);
        data.append("heading", form.heading);
        data.append("description", form.description);
        form.tags.split(",").forEach(tag => {
            const t = tag.trim();
            if (t) data.append("tags", t);
        });

        const res = await fetch(`/api/notes/${note._id}`, {
            method: "PUT",
            body: data,
        });

        if (res.status == 200) {
            // toast.success('saved the changes')
            window.location.reload();
        } else {
            alert("Failed to update note");
        }
    }

    const updatedAt = new Date(note.updatedAt ?? "").toISOString().slice(0,19).replace("T"," ")

    return (
        <div className="flex flex-col w-full h-full">
            <Navbar heading={note.noteName || "Untitled Note"} />

            <div className="max-w-4xl mx-auto p-8">

                <div className="bg-white rounded-lg shadow-sm p-6">


                    <div className="flex justify-between items-start mb-6">
                        <div>
                            {!isEditing ? (
                                <>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {note.noteName}
                                    </h1>
                                    {note.heading && (
                                        <h2 className="text-xl text-gray-700">{note.heading}</h2>
                                    )}
                                </>
                            ) : (
                                <>
                                    <input
                                        value={form.noteName}
                                        onChange={(e) => setForm({ ...form, noteName: e.target.value })}
                                        className="border p-2 w-full text-xl text-gray-500 font-semibold"
                                    />
                                    <input
                                        value={form.heading}
                                        onChange={(e) => setForm({ ...form, heading: e.target.value })}
                                        className="border text-gray-500 p-2 w-full mt-2"
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 hover:bg-blue-200 text-blue-500 rounded-sm"
                                    >
                                        <SquarePen width='20px' />
                                    </button>
                                    <DeleteNoteButton noteId={note._id} />
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-black text-white rounded"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>


                    {!isEditing ? (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {note.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3  py-1 bg-gray-500 text-white rounded-sm text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <input
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            className="border text-gray-500 p-2 w-full mb-6"
                            placeholder="tags separated by comma"
                        />
                    )}


                    {!isEditing ? (
                        <div className="prose text-gray-500 max-w-none">
                            <p className="text-gray-700  whitespace-pre-wrap break-words ">
                                {note.description}
                            </p>
                        </div>
                    ) : (
                        <textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            className="border text-gray-500 p-2 w-full"
                            rows={6}
                        />
                    )}


                    <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                         Last updated: {updatedAt}
                    </div>
                </div>
            </div>
        </div>
    );
}
