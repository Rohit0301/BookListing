import { screen, render } from "@testing-library/react";

import { Books } from "..";
import { IBook } from "../../../types";
import { useBookContext } from "../../../context/bookListing";

jest.doMock("../components/BookCard", () => {
  return jest.fn(({ bookDetails }) => <div>{bookDetails?.name}</div>);
});

jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

const booksList: IBook[] = [
  {
    id: 1,
    name: "Harry potter 1",
    author: "J. K. Rowling",
    createdAt: new Date(),
    description:
      "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
  },
  {
    id: 2,
    name: "Harry potter 2",
    author: "J. K. Rowling",
    createdAt: new Date(),
    description:
      "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
  },
  {
    id: 3,
    name: "Harry potter 3",
    author: "J. K. Rowling",
    createdAt: new Date(),
    description:
      "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
  },
];

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
    (useBookContext as jest.Mock).mockReturnValue({ booksList: booksList });
    render(<Books />);
    expect(screen.queryByText("No Books Found")).toBeNull();
    expect(screen.getByLabelText("books-container")).toBeInTheDocument();
    booksList.forEach((book: IBook) => {
      expect(screen.getByText(book.name)).toBeInTheDocument();
    })
  });
});
