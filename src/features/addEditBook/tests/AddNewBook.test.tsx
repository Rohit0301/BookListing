import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import AddEditBookModal from "../components/AddEditBookModal";
import { useBookContext } from "../../../context/bookListing";

// Mock the useBookContext hook to control its behavior in tests
jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

describe("Add New Book", () => {
  const mockAddNewBook = jest.fn();
  test("Render Add Book button correctly", () => {
    render(<AddEditBookModal title="Add Book" okText="Add Book" />);
    expect(
      screen.getByRole("button", { name: "Add Book" })
    ).toBeInTheDocument();
  });

  test("Render Add New Book modal correctly", async () => {
    const user = userEvent.setup();
    render(
      <AddEditBookModal
        title="Add Book"
        okText="Add Book"
        buttonText="Add New Book"
      />
    );
    const buttonElement: HTMLElement = screen.getByRole("button", {
      name: "Add New Book",
    });
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);

    // Verify that required fields are displayed within the modal
    expect(screen.getByText("Book Name")).toBeInTheDocument();
    expect(screen.getByText("Author Name")).toBeInTheDocument();
    expect(screen.getByText("Book Description")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("validates required fields and shows error messages", async () => {
    const user = userEvent.setup();
    render(
      <AddEditBookModal
        title="Add Book"
        okText="Add Book"
        buttonText="Add New Book"
      />
    );

    const buttonElement: HTMLElement = screen.getByRole("button", {
      name: "Add New Book",
    });
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);

    // Validate "Book Name" field by typing and clearing
    const nameInputElement: HTMLElement = screen.getByLabelText("Book Name");
    await user.type(nameInputElement, "abc");
    expect(nameInputElement).toHaveValue("abc");
    await user.clear(nameInputElement);

    // Validate "Author Name" field with invalid input
    const authorInputElement: HTMLElement =
      screen.getByLabelText("Author Name");
    await user.type(authorInputElement, "abc1");
    expect(authorInputElement).toHaveValue("abc1");

    // Validate "Book Description" field with invalid length
    const descriptionInputElement: HTMLElement =
      screen.getByLabelText("Book Description");
    await user.type(descriptionInputElement, "abc");
    expect(descriptionInputElement).toHaveValue("abc");
    await user.clear(descriptionInputElement);
    await user.type(descriptionInputElement, "A".repeat(501));
    await user.click(screen.getByRole("button", { name: "Add Book" }));

    // Attempt form submission with errors and check for error messages
    expect(
      screen.getByText("Please enter a valid book name")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Author name must contain letters, spaces, and periods only"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Description must be less than 500 characters")
    ).toBeInTheDocument();
  });

  test("AddNewBook form submission", async () => {
    const user = userEvent.setup();
    (useBookContext as jest.Mock).mockReturnValue({
      addNewBook: mockAddNewBook,
    });
    render(
      <AddEditBookModal
        title="Add Book"
        okText="Add Book"
        buttonText="Add New Book"
      />
    );
    const buttonElement: HTMLElement = screen.getByRole("button", {
      name: "Add New Book",
    });
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);

    // Fill out form fields with valid data
    await user.type(screen.getByLabelText("Book Name"), "Abc");
    await user.type(screen.getByLabelText("Author Name"), "Def");
    await user.type(screen.getByLabelText("Book Description"), "Ghi");
    await user.click(screen.getByRole("button", { name: "Add Book" }));

    // Check that addNewBook was called with correct data
    expect(mockAddNewBook).toHaveBeenCalledWith({
      name: "Abc",
      author: "Def",
      description: "Ghi",
      id: expect.any(String),
      createdAt: expect.any(Date),
    });
  });
});
