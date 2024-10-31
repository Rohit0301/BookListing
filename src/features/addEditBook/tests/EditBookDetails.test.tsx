import { render, screen } from "@testing-library/react";
import AddEditBookModal from "../components/AddEditBookModal";
import userEvent from "@testing-library/user-event";
import { useBookContext } from "../../../context/bookListing";
import { mockBooksList } from "../../../constants/mock";

jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

describe("Edit Book Details", () => {
  const mockEditBookDetials = jest.fn();
  test("Render Edit icon button correctly", () => {
    render(
      <AddEditBookModal
        title="Edit Book details"
        buttonText="edit-modal-btn"
        okText="Edit Book"
      />
    );
    expect(screen.getAllByLabelText("edit-modal-btn")[0]).toBeInTheDocument();
  });

  test("Render Edit modal book details correctly", async () => {
    const user = userEvent.setup();
    render(
      <AddEditBookModal
        title="Edit Book details"
        buttonText="edit-modal-btn"
        okText="Edit Book"
        bookDetails={mockBooksList[0]}
      />
    );
    const buttonElement: HTMLElement = screen.getByRole("button", {
      name: "edit-modal-btn",
    });
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);
    expect(screen.getByLabelText("Book Name")).toHaveValue(
      mockBooksList[0].name
    );
    expect(screen.getByLabelText("Author Name")).toHaveValue(
      mockBooksList[0].author
    );
    expect(screen.getByLabelText("Book Description")).toHaveValue(
      mockBooksList[0].description
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit Book" })).toBeEnabled();
  });

  test("EditBookDetials form submission", async () => {
    const user = userEvent.setup();
    (useBookContext as jest.Mock).mockReturnValue({
       editBookDetails: mockEditBookDetials,
    });
    render(
      <AddEditBookModal
        title="Edit Book details"
        buttonText="edit-modal-btn"
        okText="Edit Book"
        bookDetails={mockBooksList[0]}
      />
    );
    const buttonElement: HTMLElement = screen.getByLabelText("edit-modal-btn");
    expect(buttonElement).toBeInTheDocument();
    await user.click(buttonElement);

    await user.clear(screen.getByLabelText("Book Name"));
    await user.type(screen.getByLabelText("Book Name"), "Updated Name");
    await user.click(screen.getByRole("button", { name: "Edit Book" }));

    expect(mockEditBookDetials).toHaveBeenCalledWith({
        name: "Updated Name",
        id: mockBooksList[0].id,
        author: mockBooksList[0].author,
        description: mockBooksList[0].description,
        createdAt: mockBooksList[0].createdAt,
      });
  });
});
