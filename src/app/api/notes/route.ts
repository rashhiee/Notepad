import dbConnect from "@/src/lib/mongoose";
import { NextResponse } from "next/server";
import Note from "@/src/lib/model/note";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        await dbConnect();

        const {userId} = await auth()

         if(!userId){
            return new Response(
                JSON.stringify({error:'unathorized'}),{status:401}
            )
        }   

        const res = await Note.find({userId}).sort({ updatedAt: -1 })
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json(
            { error: "dont get notes" }, { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { userId } = await auth();
        if(!userId){
            return new Response(
                JSON.stringify({error:'unathorized'}),{status:401}
            )
        }
        const form = await req.formData();

        const noteName = form.get("noteName") as string
        const heading = form.get("heading") as string
        const description = form.get("description") as string
        const tagsData = form.getAll("tags");
        let tags: string[] = [];

        if (tagsData.length > 0) {
            tags = tagsData.map(tag => String(tag).trim()).filter(Boolean);
        } else {
            const tagsString = form.get("tags") as string;
            if (tagsString) {
                tags = tagsString.split(",").map(tag => tag.trim()).filter(Boolean);
            }
        }

        if (!noteName) {
            return NextResponse.json(
                { error: "Note name is required" },
                { status: 400 }
            );
        }

        const res = await Note.create({

           userId, noteName, tags, heading, description
        })

        return NextResponse.json(res, { status: 201 });

    } catch (error: any) {
        console.log("SERVER ERROR:", error);
        return NextResponse.json(
            { error: error.message ?? "Internal error" },
            { status: 500 }
        );
    }
}