import { screen, render } from "@testing-library/react";

import { Books } from "..";
import { IBook } from "../../../types";
import { mockBooksList } from "../../../constants/mock";
import { useBookContext } from "../../../context/bookListing";

jest.doMock("../components/BookCard", () => {
  return jest.fn(({ bookDetails }) => <div>{bookDetails?.name}</div>);
});

jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

describe("Books Listing", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders NoBooksFound component when bookList is empty", () => {
    (useBookContext as jest.Mock).mockReturnValue({ bookList: [] });
    render(<Books />);
    expect(screen.getByText("No Books Found")).toBeInTheDocument();
    expect(screen.queryByLabelText("books-container")).toBeNull();
  });

  test("Render book list correctly", async () => {
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });
    render(<Books />);
    expect(screen.queryByText("No Books Found")).toBeNull();
    expect(screen.getByLabelText("books-container")).toBeInTheDocument();
    mockBooksList.forEach((book: IBook) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    })
  });
});
