import React from 'react'
import { X ,NotepadText} from "lucide-react";
import { useRouter } from "next/navigation";
import { DEFAULT_TAGS } from '../types/note'
import axios from '../lib/axios'

interface AddNoteModalProps {
    onClose: () => void;
}


const AddNoteModel = ({ onClose }: AddNoteModalProps) => {
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const res = await axios.post('/api/notes', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                const newNote = res.data;
                onClose();
                router.push(`/dashboard/${newNote._id}`);
                router.refresh();
            }

        } catch (error) {
            console.error("Failed to create note:", error);
        }
    }



    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white  w-full max-w-md shadow-xl p-5">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className='flex gap-3 items-center'>
                    <NotepadText color='black' width='20px'/>
                    <h2 className="text-lg text-gray-900 font-semibold">Add New Note</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-400"
                    >
                        <X size={20}  />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Note Name 
                        </label>
                        <input
                            type="text"
                            name="noteName"
                            required
                            className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter note name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heading
                        </label>
                        <input
                            type="text"
                            name="heading"
                            className="w-full px-3 py-2 border  text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter heading"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full px-3 py-2  text-gray-500 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter description"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {DEFAULT_TAGS.map((tag) => (
                                <label
                                    key={tag}
                                    className="flex  text-gray-500 items-center gap-2 px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-black"
                                        name="tags"
                                        value={tag}
                                        
                                    />
                                    <span className="text-sm capitalize">{tag}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border  text-gray-500 border-gray-400 rounded-sm hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800"
                        >
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNoteModel