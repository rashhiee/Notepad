"use client";

import axios from '../lib/axios'
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

export default  function DeleteNoteButton({ noteId }: { noteId: string }) {
    const router = useRouter();

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this note?")) return;

        try {

            const res = await axios.delete(`/api/notes/${noteId}`)

            if (res.status === 200) {
                // toast.error('your note is deleted')
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2  text-black font-bold hover:text-red-500 rounded-sm  flex items-center gap-2"
        >
            <Trash2 size={16} />
            
        </button>
    );
}