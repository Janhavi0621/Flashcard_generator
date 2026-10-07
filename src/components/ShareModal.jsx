import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function ShareModal({ link, onClose }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this link:", link);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 no-print" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Share flashcard</h2>
          <button onClick={onClose} aria-label="Close"><FiX /></button>
        </div>
        <div className="flex gap-2">
          <input readOnly value={link} className="flex-1 border rounded px-3 py-2 text-sm" aria-label="Flashcard link" />
          <button onClick={copy} className="bg-brand text-white text-sm rounded px-4">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
