"use client"
import { INote } from "../../types/note"
// import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

import AddNoteButton from "../AddButton";
import NotesList from "../Notelist";
import { NotepadText } from "lucide-react";
// import Note from "@/app/lib/model/note";
// import dbConnect from "@/app/lib/mongoose";
import { ChangeEvent, ReactElement, useState, useTransition , useRef , useEffect } from "react";
import searchNotes from "../../app/actions/searchNotes";


interface leftBarProps {
    initialNotes : INote[]
}


export default  function LeftbarUI({initialNotes}:leftBarProps) {
    // const notes = await getNotes();

    const [notes,setNotes] = useState<INote[]>(initialNotes);
      const [isPending, startTransition] = useTransition()
      const [searchQuery , setSearchQuery] = useState("")
       const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    //    useEffect(() => {
    //      if(timeoutRef.current){
    //         clearTimeout(timeoutRef.current)
    //      }

    //    },[])

    const handleSearch = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
      console.log("Search input changed:", query);

         if(timeoutRef.current){
         clearTimeout(timeoutRef.current)
         }   
   
         timeoutRef.current = setTimeout(async () => {
             const formData = new FormData();
             formData.append('search', query);
       
             startTransition( async ()=> {
               const result = await searchNotes(formData)
               // console.log("Results:", result.length);
               setNotes(result)
             })
            
         }, 400);

    }

    // const { userId } = await auth() as { userId?: string };

    // if (!userId) {
    //     return <p className="p-4 text-gray-500">Sign in to see your notes</p>;
    // }

    // await dbConnect()

    // const notes: INote[] = await Note.find({ userId }).sort({ updatedAt: -1 }).lean();

    return (
        <aside className="fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-[#f3efe2] border-r border-gray-500 flex flex-col shadow-sm">

            <div className=" border-b border-gray-100">
                <div className="flex gap-8">

                    <div className="flex w-full flex-col   ">

                        <div className="w-full p-5.5 bg-[#f3efe2] flex  gap-1 items-center ">
                            <img src="/notepadlogo.jpg" alt="zenpad" className="h-15"/>
                            <h1 className="text-[#511a02] font font-bold text-3xl"> Zenpad</h1>
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
                    {/* <form action=""  > */}
                    <input
                        type="text"
                        name="search"
                         onChange={handleSearch}
                         onFocus={(e) => e.target.value = " "}
                        placeholder="Search…"
                        className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#f3efe2] border border-gray-700  rounded-xl focus:outline-none text-gray-700 placeholder:text-gray-400"
                        // aria-disabled={isPending}
                    />


                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-2">
                    {
                        isPending ? (
                             <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        ):(

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
                        )
                    }
                    </div>

                    {/* </form> */}
                </div>


                <AddNoteButton />

            </div>

            <NotesList notes={notes} />

        </aside>
    );
}
