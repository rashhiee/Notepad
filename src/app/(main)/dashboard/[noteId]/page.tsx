import dbConnect from "@/src/lib/mongoose";
import Note from "@/src/lib/model/note";
import { notFound } from "next/navigation";
import { NoteView } from "@/src/components/NoteView";
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;



async function getNote(id: string) {
  try {
    await dbConnect();
    const note = await Note.findById(id).lean();
    if (!note) return null;
    return JSON.parse(JSON.stringify(note));
  } catch (error) {
    return null;
  }
}

export default async function NotePage({
  params,
}: {
  params:Promise< { noteId: string }>
}) {
    const {noteId} = await params
  const note = await getNote(noteId);

  if (!note) {
    notFound();
  }

  return <NoteView note={note} />;
}