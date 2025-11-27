import dbConnect from "@/app/lib/mongoose";
import Note from "@/app/lib/model/note";
import { notFound } from "next/navigation";
import { NoteView } from "@/app/components/NoteView";
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