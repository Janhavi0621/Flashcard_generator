import { configureStore } from "@reduxjs/toolkit";
import flashcards, { STORAGE_KEY } from "./flashcardsSlice";

const store = configureStore({ reducer: { flashcards } });

// Persist to localStorage on every change
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().flashcards.items));
  } catch (e) {
    console.error("Could not save flashcards", e);
  }
});

export default store;
