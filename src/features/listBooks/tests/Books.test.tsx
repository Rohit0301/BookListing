import { screen, render } from "@testing-library/react";

import { Books } from "..";
import { IBook } from "../../../types";
import { mockBooksList } from "../../../constants/mock";
import { useBookContext } from "../../../context/bookListing";

// Mock BookCard component to simplify rendering in tests
jest.doMock("../components/BookCard", () => {
  return jest.fn(({ bookDetails }) => <div>{bookDetails?.name}</div>);
});

// Mock useBookContext to control its return values in each test
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
    // Check that "No Books Found" message is displayed
    expect(screen.getByText("No Books Found")).toBeInTheDocument();
    expect(screen.queryByLabelText("books-container")).toBeNull();
  });

  test("Render book list correctly", async () => {
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });
    render(<Books />);
    expect(screen.queryByText("No Books Found")).toBeNull();
    expect(screen.getByLabelText("books-container")).toBeInTheDocument();
    // Check that each book name from the mockBooksList appears in the document
    mockBooksList.forEach((book: IBook) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    });
  });
});
