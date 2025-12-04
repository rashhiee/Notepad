"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddNoteModel from "./AddNoteModel";

export default function AddNoteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-3">
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-3 py-2 mt-3 bg-[#f3efe2] border-1 border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 transition w-full"
      >
        <Plus color="gray" width="20px" />
        <span className="text-gray-700">Add New Notes</span>
      </button>

      {isOpen && <AddNoteModel onClose={() => setIsOpen(false)} />}
    </div>
  );
}

