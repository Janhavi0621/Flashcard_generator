import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store";
import CreateFlashcard from "./CreateFlashcard";

const setup = () =>
  render(
    <Provider store={store}>
      <MemoryRouter><CreateFlashcard /></MemoryRouter>
    </Provider>
  );

test("add more adds a term row, trash removes it", () => {
  setup();
  expect(screen.getAllByLabelText(/Enter Term/)).toHaveLength(1);
  fireEvent.click(screen.getByText("+ Add more"));
  expect(screen.getAllByLabelText(/Enter Term/)).toHaveLength(2);
  fireEvent.click(screen.getByLabelText("Delete term 2"));
  expect(screen.getAllByLabelText(/Enter Term/)).toHaveLength(1);
});

test("edit icon focuses the term input", () => {
  setup();
  fireEvent.click(screen.getByLabelText("Edit term 1"));
  expect(screen.getByLabelText(/Enter Term/)).toHaveFocus();
});
