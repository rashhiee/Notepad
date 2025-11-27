import dbConnect from "@/app/lib/mongoose";
import Note from "@/app/lib/model/note";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params:Promise< { noteId: string }> }
) {
  try {
    const { noteId } = await params;
    await dbConnect();
    // const {userId} =await auth();
    

    const note = await Note.findById(noteId).lean()

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid note ID" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params:Promise< { noteId: string }> }
) {
  try {
     const { noteId } = await params;
    await dbConnect();

    const formData = await req.formData();

    const noteName = formData.get("noteName") as string;
    const heading = formData.get("heading") as string;
    const description = formData.get("description") as string;

 
    const tagsData = formData.getAll("tags");
    let tags: string[] = [];

    if (tagsData.length > 0) {
     
      tags = tagsData.map(tag => String(tag).trim()).filter(Boolean);
    } else {
  
      const tagsString = formData.get("tags") as string;
      if (tagsString) {
        tags = tagsString.split(",").map(tag => tag.trim()).filter(Boolean);
      }
    }

    const updateData: any = {};
    if (noteName) updateData.noteName = noteName;
    if (heading) updateData.heading = heading;
    if (description) updateData.description = description;
    if (tags.length > 0) updateData.tags = tags;

    const note = await Note.findByIdAndUpdate(
      noteId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(note,{status:200});
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request,{ params} : { params: Promise<{ noteId: string }> }) {
  //   { params }: { params: { noteId: string } }
  // ) {
  // const params = await context;

  try {
    const { noteId } =  await params;
    console.log("here", noteId)

    await dbConnect();


    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 400 }
    );
  }
}