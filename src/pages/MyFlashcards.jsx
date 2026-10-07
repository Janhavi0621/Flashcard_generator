import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TopicImage from "../components/TopicImage";
import Layout from "../components/Layout";
import { deleteFlashcard } from "../store/flashcardsSlice";

export default function MyFlashcards() {
  const cards = useSelector((s) => s.flashcards.items);
  const dispatch = useDispatch();

  return (
    <Layout title="Create Flashcard">
      {cards.length === 0 ? (
        <p className="text-slate-500">
          No flashcards yet. <Link className="text-brand underline" to="/">Create your first one.</Link>
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.id} className="bg-white rounded-lg shadow-sm p-5 flex flex-col">
              <TopicImage topic={c.group} className="h-28 w-full object-cover rounded mb-3" />
              <h2 className="font-bold">{c.group}</h2>
              <p className="text-sm text-slate-600 line-clamp-2 mt-1">{c.description}</p>
              <p className="text-xs text-slate-500 mt-2">{c.terms.length} terms</p>
              <div className="flex justify-between mt-4">
                <Link to={`/flashcard/${c.id}`} className="text-sm text-brand font-medium">View cards</Link>
                <button onClick={() => dispatch(deleteFlashcard(c.id))} className="text-sm text-slate-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
