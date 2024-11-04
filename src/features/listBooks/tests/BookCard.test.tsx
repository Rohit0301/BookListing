import { screen, render } from "@testing-library/react";

import { IBook } from "../../../types";
import BookCard from "../components/BookCard";
import { dateFormatter, getNameFirstCharacter } from "../../../lib/utils";
import { mockBooksList } from "../../../constants/mock";

const sampleBookDetails: IBook = mockBooksList[0];

describe("Book Card", () => {
  test("Render Book card correctly if book details present", () => {
    render(<BookCard bookDetails={sampleBookDetails} />);

    // Verify book name and author appear on the card
    expect(screen.getByText(sampleBookDetails.name)).toBeInTheDocument();
    expect(screen.getByText(sampleBookDetails.author)).toBeInTheDocument();

    // Check that the description is correctly displayed in the card
    expect(screen.getByText(/Harry Potter is a series/)).toBeInTheDocument();

    // Format date and verify it appears on the card
    const formattedDate: string = dateFormatter(
      sampleBookDetails.createdAt,
      "MMMM Do YYYY"
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("Render avatar correctly", () => {
    render(<BookCard bookDetails={sampleBookDetails} />);
    // Verify avatar displays the first character of the author's name
    const avatar: HTMLElement = screen.getByLabelText("author-logo");
    expect(avatar).toHaveTextContent(
      getNameFirstCharacter(sampleBookDetails?.author)
    );
  });

  test("Render Empty if book details is empty", () => {
    render(<BookCard bookDetails={{} as IBook} />);
    // Verify that the card is not rendered if book details are empty
    const bookCard: HTMLElement | null = screen.queryByLabelText("book-card");
    expect(bookCard).toBeNull();
  });
});
