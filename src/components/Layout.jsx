import { NavLink } from "react-router-dom";

const tab = ({ isActive }) =>
  `pb-2 text-sm border-b-2 ${isActive ? "border-brand text-brand font-medium" : "border-transparent text-slate-500"}`;

export default function Layout({ title, children, showTabs = true }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-lg font-bold mb-3">{title}</h1>
      {showTabs && (
        <nav className="flex gap-6 border-b border-slate-300 mb-6 no-print">
          <NavLink to="/" end className={tab}>Create New</NavLink>
          <NavLink to="/my-flashcards" className={tab}>My Flashcard</NavLink>
        </nav>
      )}
      {children}
    </main>
  );
}
