import { screen, render } from "@testing-library/react";

import { IBook } from "../types";
import BookCard from "../components/BookCard";
import { dateFormatter, getNameFirstCharacter } from "../../../lib/utils";

const sampleBookDetails: IBook = {
  id: 1,
  name: "Harry potter",
  author: "J. K. Rowling",
  createdAt: new Date(),
  description:
    "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
};

describe("Book Card", () => {
  test("Render Book card correctly if book details present", () => {
    render(<BookCard bookDetails={sampleBookDetails} />);
    expect(screen.getByText(sampleBookDetails.name)).toBeInTheDocument();
    expect(screen.getByText(sampleBookDetails.author)).toBeInTheDocument();

    expect(screen.getByText(/Harry Potter is a series/)).toBeInTheDocument();
    const formattedDate: string = dateFormatter(
      sampleBookDetails.createdAt,
      "MMMM Do YYYY"
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("Render avatar correctly", () => {
    render(<BookCard bookDetails={sampleBookDetails} />);
    const avatar: HTMLElement = screen.getByLabelText("author-logo");
    expect(avatar).toHaveTextContent(
      getNameFirstCharacter(sampleBookDetails?.author)
    );
  });

  test("Render Empty if book details is empty", () => {
    render(<BookCard bookDetails={{} as IBook} />);
    const bookCard: HTMLElement | null = screen.queryByLabelText("book-card");
    expect(bookCard).toBeNull();
  });
});
