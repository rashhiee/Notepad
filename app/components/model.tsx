"use client";
// import React from "react";

export default function Modal({ open, onClose, children }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 text-xl"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
