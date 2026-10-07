import { useState } from "react";
import TopicImage from "./TopicImage";

export default function FlipCard({ term, definition, group }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "Show term" : "Show definition"}
      aria-pressed={flipped}
      className="flip-scene w-full h-80 block text-left"
    >
      <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-face bg-white shadow-sm p-5 flex flex-col">
          <TopicImage topic={term} group={group} className="h-44 w-full object-cover rounded" />
          <h2 className="text-xl font-bold mt-4">{term}</h2>
          <span className="text-xs text-slate-500 mt-auto">Click to see the definition</span>
        </div>
        <div className="flip-face flip-back bg-brand text-white shadow-sm p-8 flex flex-col justify-center">
          <p className="text-xs opacity-80 mb-2">{term}</p>
          <p className="text-lg leading-relaxed">{definition}</p>
        </div>
      </div>
    </button>
  );
}
