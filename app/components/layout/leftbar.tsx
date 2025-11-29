
import { INote } from "../../types/note"
// import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

import AddNoteButton from "../AddButton";
import NotesList from "../Notelist";
import { NotepadText } from "lucide-react";
import Note from "@/app/lib/model/note";




export default async function LeftbarUI() {
    // const notes = await getNotes();
    const { userId } = await auth() as { userId?: string };

    if (!userId) {
        return <p className="p-4 text-gray-500">Sign in to see your notes</p>;
    }

    const notes: INote[] = await Note.find({ userId }).sort({ updatedAt: -1 }).lean();

    return (
        <aside className="fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-[#f3efe2] border-r border-gray-500 flex flex-col shadow-sm">

            <div className=" border-b border-gray-100">
                <div className="flex gap-8">

                    <div className="flex w-full flex-col   ">

                        <div className="w-full p-5.5 bg-[#f3efe2] flex justify-center items-center ">
                            <h1 className="text-amber-900 font font-bold text-3xl"> Zenpad</h1>
                        </div>

                        <div className="flex gap-3 items-center p-6">
                            <NotepadText color="black" />
                            <p className="text-[17px] font-semibold text-gray-900">MY NOTES</p>
                        </div>

                    </div>

                    {/* <span className="text-black text-2xl">⌄
                    </span> */}


                </div>

                {/* <SignInButton/> */}

                <div className="px-3  relative">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#f3efe2] border border-gray-700 rounded-xl focus:outline-none text-gray-700 placeholder:text-gray-400"
                    />


                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-2">
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
