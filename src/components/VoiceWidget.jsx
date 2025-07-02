import { useState } from "react";
import { Conversation } from "./Conversation";

export function VoiceWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-24 right-4 z-50" // Adjusted right spacing for better fit
    >
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-primaryColor shadow-xl text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:bg-primaryColorHover transition-all border-4 border-bgDark1"
          aria-label="Open voice call widget"
        >
          {/* SVG Call icon for a modern look */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.1"/>
            <path d="M7.5 8.5C8.32843 7.67157 9.67157 7.67157 10.5 8.5L11.5 9.5C12.3284 10.3284 12.3284 11.6716 11.5 12.5L11 13C12.5 15 15 17.5 17 19L17.5 18.5C18.3284 17.6716 19.6716 17.6716 20.5 18.5L21.5 19.5C22.3284 20.3284 22.3284 21.6716 21.5 22.5C19.5 24.5 14.5 19.5 12.5 17.5C10.5 15.5 5.5 10.5 7.5 8.5Z" fill="currentColor"/>
          </svg>
        </button>
      )}
      {open && (
        <div className="relative bg-bgDark1 border border-primaryColor rounded-2xl shadow-2xl p-6 min-w-[320px] max-w-[90vw]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-primaryColor text-lg">Voice Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-2xl text-primaryColor hover:text-primaryColorHover transition"
              aria-label="Close voice call widget"
            >
              ×
            </button>
          </div>
          <Conversation />
        </div>
      )}
    </div>
  );
}