// import SidebarUI from "@/app/components/layout/sidebar";
import LeftbarUI from "@/src/components/layout/leftbar";
import Note, { INoteDoc } from "@/src/lib/model/note";
import dbConnect from "@/src/lib/mongoose";
import { INote } from "@/src/types/note";
import { RedirectToSignIn } from "@clerk/nextjs";
// import Navbar from "@/app/components/layout/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const authResult = await auth();

  // Extract userId as a separate variable
  const userId = authResult.userId;

  // // Debug: Log to see what we have
  // console.log("Auth result:", authResult);
  // console.log("User ID:", userId);
  // console.log("Type of userId:", typeof userId);
  // const notes : INote[] = [];

  if (userId) {
    <RedirectToSignIn />
  }

  await dbConnect();
  const noteOfDB = await Note.find({ userId }).sort({ updatedAt: -1 }).lean<INoteDoc[]>();

  const initialNotes: INote[] = noteOfDB.map(note => ({
    _id: note._id.toString(),
    userId: note.userId,
    noteName: note.noteName,
    tags: note.tags,
    heading: note.heading,
    description: note.description,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));

  return (
    <div className="flex min-h-screen bg-[#f3efe2]">

      <LeftbarUI initialNotes={initialNotes} />

      <div className="flex-1">{children}</div>
    </div>
  );
}
