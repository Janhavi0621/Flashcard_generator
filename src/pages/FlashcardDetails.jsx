import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiShare2, FiPrinter } from "react-icons/fi";
import Layout from "../components/Layout";
import FlipCard from "../components/FlipCard";
import ShareModal from "../components/ShareModal";

export default function FlashcardDetails() {
  const { id } = useParams();
  const card = useSelector((s) => s.flashcards.items.find((c) => c.id === id));
  const [index, setIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);

  if (!card) {
    return (
      <Layout title="Flashcard" showTabs={false}>
        <p>Flashcard not found. <Link className="text-brand underline" to="/my-flashcards">Back to My Flashcards</Link></p>
      </Layout>
    );
  }

  const term = card.terms[index];
  const last = card.terms.length - 1;

  return (
    <Layout title={card.group} showTabs={false}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link to="/my-flashcards" className="inline-flex items-center gap-1 text-sm text-slate-600 mb-2 no-print">
            <FiArrowLeft /> My Flashcards
          </Link>
          <p className="text-sm text-slate-600 max-w-xl">{card.description}</p>
        </div>
        <div className="flex gap-2 no-print">
          <button onClick={() => setShowShare(true)} className="flex items-center gap-2 border rounded px-3 py-2 text-sm bg-white">
            <FiShare2 /> Share
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 border rounded px-3 py-2 text-sm bg-white">
            <FiPrinter /> Print
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        <ul className="bg-white rounded-lg shadow-sm p-3 self-start no-print">
          {card.terms.map((t, i) => (
            <li key={i}>
              <button
                onClick={() => setIndex(i)}
                className={`w-full text-left px-3 py-2 rounded text-sm ${i === index ? "bg-brand text-white" : "hover:bg-slate-100"}`}
              >
                {t.term}
              </button>
            </li>
          ))}
        </ul>

        <div>
          <FlipCard key={index} term={term.term} definition={term.definition} group={card.group} />
          <div className="flex items-center justify-center gap-6 mt-4 no-print">
            <button aria-label="Previous term" disabled={index === 0} onClick={() => setIndex(index - 1)} className="disabled:opacity-30 p-2 bg-white rounded-full shadow-sm">
              <FiChevronLeft />
            </button>
            <span className="text-sm text-slate-600">{index + 1} / {card.terms.length}</span>
            <button aria-label="Next term" disabled={index === last} onClick={() => setIndex(index + 1)} className="disabled:opacity-30 p-2 bg-white rounded-full shadow-sm">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {showShare && <ShareModal link={window.location.href} onClose={() => setShowShare(false)} />}
    </Layout>
  );
}
