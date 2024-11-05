import { Books } from "../../listBooks";
import DeleteModal from "../components/DeleteModal";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { mockBooksList } from "../../../constants/mock";
import { useBookContext } from "../../../context/bookListing";

// Mock the DeleteModal component to customize its rendering behavior during tests
jest.doMock("../components/DeleteModal", () => {
  return jest.fn(({bookId, renderButtonComponent }) => (
    <div><span>{bookId}</span> {renderButtonComponent}</div>
  ));
});


// Mock the book context to control its values in the tests
jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

describe("Delete Modal", () => {
  const mockRemoveBookFromList = jest.fn();
  const mockBookId = "abc-123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render delete icon correctly", async () => {
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });

     // Render the Books component and verify the delete icon is present
    render(<Books />);
    expect(screen.getAllByLabelText("open-delete-modal-btn")[0]).toBeInTheDocument();
  });

  test("Render delete modal correctly", async () => {
    const user = userEvent.setup();
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });
    // Render the Books component, then simulate a user clicking the delete icon
    render(<Books />);
    const deleteIcon: HTMLElement = screen.getAllByLabelText("open-delete-modal-btn")[0];
    await user.click(deleteIcon);
    expect(
      screen.getByText("Are you sure you want to delete this book?")
    ).toBeInTheDocument();
  });

  test("Delete book from the list", async () => {
    const user = userEvent.setup();
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList, removeBookFromList: mockRemoveBookFromList });
    render(<DeleteModal bookId={mockBookId} />);
    // Open the delete modal by clicking the delete button
    const openModal: HTMLElement = screen.getByLabelText("open-delete-modal-btn");
    await user.click(openModal);
    const deleteButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Delete",
    });
    await user.click(deleteButtonElement);
    // Verify that the remove function was called with the correct book ID
    expect(mockRemoveBookFromList).toHaveBeenCalledWith(mockBookId);
  });
});
