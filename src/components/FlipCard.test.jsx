import { render, screen, fireEvent } from "@testing-library/react";
import FlipCard from "./FlipCard";

test("clicking the card flips it", () => {
  render(<FlipCard term="Wallet" definition="Stores keys" group="Web 3" />);
  const card = screen.getByRole("button");
  expect(card).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(card);
  expect(card).toHaveAttribute("aria-pressed", "true");
});
