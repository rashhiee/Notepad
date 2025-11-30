"use client";

import React, { useState } from "react";
import { MoveRight, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
// import axios from "../../lib/axios";
import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";


type NavbarProps = {
    heading: string;
};

const Navbar = ({ heading }: NavbarProps) => {
    
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // const handleLogout = async () => {
    //      await axios.post('/api/auth/logout');
    //      router.push('/auth/login')
    // }

    return (
        <div className="bg-[#f3efe2] border-gray-500 p-5 flex justify-between items-center w-full border-b">


            <div className="flex items-center gap-3">
                <p className="text-xl text-gray-700 font-bold">My Notes</p>
                <MoveRight color="gray" />
                <p className="text-xl text-gray-700">{heading}</p>
            </div>


            <div className="relative mr-5 flex items-center gap-3">


                {/* <User className="text-gray-600" />
                <p className="text-gray-700 font-medium">hafeez</p> */}


                <button
                    onClick={() => setOpen(!open)}
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                >
                    <Menu className="text-gray-600" />
                </button>

                {open && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-lg border p-2 z-50">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                            Settings
                        </button>
                        <button className="w-full text-left px-3 py-4 text-sm text-gray-700 hover:bg-gray-100 rounded">
                            Help & Support
                        </button>
                        {/* <button onClick={handleLogout}  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded">
                            Logout
                        </button> */}
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10"
                                    }
                                }}
                                userProfileProps={{
                                    additionalOAuthScopes: {
                                        google: ['email']
                                    }
                                }}
                                showName={true} // This shows the user's name
                            />
                        </SignedIn>

                    </div>
                )}
            </div>

        </div>
    );
};

export default Navbar;
