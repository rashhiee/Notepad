import Link from "next/link";
// import Note from "../model/note";
import { INote } from "../types/note"

interface NoteListed {
    notes: INote[];
}

export default function NotesList({ notes }: NoteListed) {
    return (
        <div className="flex-1 overflow-y-auto p-3">
            {notes.length === 0 ? (
                <p className="text-center text-gray-500 text-sm mt-4">
                    No notes yet. Create your first note!
                </p>
            ) : (
                <div className="space-y-2">
                    {notes.map((note) => (
                        <Link
                            key={note._id.toString()}
                            href={`/dashboard/${note._id}`}
                            className="block p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                        >
                            <h3 className="font-medium text-gray-900 truncate">
                                {note.noteName}
                            </h3>
                            {note.heading && (
                                <p className="text-sm text-gray-600 truncate mt-1">
                                    {note.heading}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                                {note.tags.slice(0, 2).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 bg-gray-500 text-white rounded-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {note.tags.length > 2 && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                        +{note.tags.length - 2}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}