import { CirclePlus , Bolt , Info ,User ,NotepadText} from "lucide-react";

export default function SidebarUI() {
    return (
        <aside className="fixed lg:static inset-y-0 left-0 z-40 w-[240px] bg-white border-r border-gray-100 flex flex-col shadow-sm">

            
            <div className="p-6 border-b border-gray-100">
                <div className="flex gap-8">

                    <div className="flex items-center gap-3">
                        <User color="black" width='20px'/>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">hafeez</p>
                            {/* <p className="text-xs text-gray-500">hafeez@gmail.com</p> */}
                        </div>

                    </div>

                    {/* <span className="text-black text-2xl">⌄
                    </span> */}


                </div>

                
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

            </div>

            
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex gap-3 items-center ">
                <NotepadText color="black" width='20px'/>
                <h4 className="text-sm mt-2 font-semibold text-black uppercase tracking-wider">
                    My Notes
                </h4>
                </div>

                {/* <div className="text-center text-sm text-gray-500 py-8">
                    No notes yet.
                </div> */}
            </div>

            {/* Footer Items */}
            <div className="border-t border-gray-100 p-3 space-y-1.5">
                <div className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    
                    <CirclePlus color="black" width='20px'/>
                    <span className="text-gray-900">
                        Add New Folder
                    </span>
                </div>

                <div className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <Bolt color="black" width='20px'/>
                    <span className="text-black text-sm group-hover:text-gray-900">
                        Settings
                    </span>
                </div>

                <div className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <Info color="black" width='20px' />
                    <span className="text-black text-sm group-hover:text-gray-900">
                        Help & support
                    </span>
                </div>
            </div>
        </aside>
    );
}
