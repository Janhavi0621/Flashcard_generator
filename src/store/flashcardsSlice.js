import { createSlice } from "@reduxjs/toolkit";

export const STORAGE_KEY = "flashcards";

export const loadFlashcards = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const slice = createSlice({
  name: "flashcards",
  initialState: { items: loadFlashcards() },
  reducers: {
    addFlashcard: (state, { payload }) => {
      state.items.unshift({ id: Date.now().toString(), ...payload });
    },
    deleteFlashcard: (state, { payload }) => {
      state.items = state.items.filter((c) => c.id !== payload);
    },
  },
});

export const { addFlashcard, deleteFlashcard } = slice.actions;
export default slice.reducer;
