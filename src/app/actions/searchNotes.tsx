"use server"

import { auth } from "@clerk/nextjs/server"
import dbConnect from "../../lib/mongoose"
import Note, { INoteDoc } from "../../lib/model/note"
import { INote } from "../../types/note"

const searchNotes = async (formdata: FormData) => {

    const { userId } = await auth()
    console.log("SearchBox called, userId:", userId);
    if (!userId) {
        console.log("No userId, returning empty")
        return []
    }

    const searchQuery = formdata.get('search') as string;
    console.log("Search query:", searchQuery);
    await dbConnect();

    let notesFromDB: INoteDoc[];

    if (searchQuery && searchQuery.trim()) {
        console.log("Searching with query:", searchQuery);
        notesFromDB = await Note.find({
            userId,
            $or: [
                { noteName: { $regex: searchQuery, $options: 'i' } },
                { heading: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        }).sort({ updatedAt: -1 }).lean<INoteDoc[]>();
    } else {
        console.log("Empty query, returning all notes");
        notesFromDB = await Note.find({ userId })
            .sort({ updatedAt: -1 })
            .lean<INoteDoc[]>();
    }

    // Serialize for client
        console.log("Found notes count:", notesFromDB.length);
    const notes: INote[] = notesFromDB.map(note => ({
        _id: note._id.toString(),
        userId: note.userId,
        noteName: note.noteName,
        tags: note.tags,
        heading: note.heading,
        description: note.description,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
    }));

    return notes;

}

export default searchNotes