import dbConnect from "@/app/lib/mongoose";
import  { INote } from "../../types/note"
import Note from "@/app/lib/model/note";
// import { Plus } from "lucide-react";
import AddNoteButton from "../AddButton";
import NotesList from "../Notelist";
import { NotepadText } from "lucide-react";
// import { SignInButton } from "@clerk/nextjs";



export async function getNotes() :Promise<INote[]> {
    try {
        await dbConnect();
        const notes = await Note.find().sort({updated:-1}).lean();
           return JSON.parse(JSON.stringify(notes));
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        return [];
    }
}

export default async function LeftbarUI() {
    const notes = await getNotes();
    return (
        <aside className="fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-white border-r border-gray-100 flex flex-col shadow-sm">


            <div className="p-6 border-b border-gray-100">
                <div className="flex gap-8">

                    <div className="flex flex-col items-center gap-5 ">

                        <div>
                            <h1 className="text-amber-900 mb-5 text-3xl"> Zenpad</h1>
                        </div>

                        <div className="flex gap-3 items-center">
                            <NotepadText color="black" />
                            <p className="text-[17px] font-semibold text-gray-900">MY NOTES</p>
                        </div>

                    </div>

                    {/* <span className="text-black text-2xl">⌄
                    </span> */}


                </div>

                {/* <SignInButton/> */}

                 <div className="relative mt-5">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="w-full pl-4 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-700 placeholder:text-gray-400"
                    />

                    
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>
                </div>


               <AddNoteButton />

            </div>
              
              <NotesList notes={notes} />

        </aside>
    );
}
