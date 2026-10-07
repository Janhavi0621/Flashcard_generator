import { Routes, Route, Navigate } from "react-router-dom";
import CreateFlashcard from "./pages/CreateFlashcard";
import MyFlashcards from "./pages/MyFlashcards";
import FlashcardDetails from "./pages/FlashcardDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateFlashcard />} />
      <Route path="/my-flashcards" element={<MyFlashcards />} />
      <Route path="/flashcard/:id" element={<FlashcardDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
