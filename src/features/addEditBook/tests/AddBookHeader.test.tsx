import { render, screen } from "@testing-library/react";

import AddBookHeader from "..";

describe("Render Add Book Header correctly", () => {
  test("Render Add Book button and header text correctly", () => {
    render(<AddBookHeader />);
    expect(
      screen.getByRole("button", { name: "Add New Book" })
    ).toBeInTheDocument();
    expect(
        screen.getByText("Books List")
      ).toBeInTheDocument();
  });
})