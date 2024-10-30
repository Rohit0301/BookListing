import { Books } from "../../listBooks";
import DeleteModal from "../components/DeleteModal";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { mockBooksList } from "../../../constants/mock";
import { useBookContext } from "../../../context/bookListing";

jest.doMock("../components/DeleteModal", () => {
  return jest.fn(({bookId, renderButtonComponent }) => (
    <div><span>{bookId}</span> {renderButtonComponent}</div>
  ));
});

jest.mock("../../../context/bookListing", () => ({
  useBookContext: jest.fn(),
}));

describe("Delete Modal", () => {
  const mockRemoveBookFromList = jest.fn();
  const mockBookId = 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render delete icon correctly", async () => {
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });
    render(<Books />);
    expect(screen.getAllByLabelText("open-delete-modal-btn")[0]).toBeInTheDocument();
  });

  test("Render delete modal correctly", async () => {
    const user = userEvent.setup();
    (useBookContext as jest.Mock).mockReturnValue({ booksList: mockBooksList });
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
    const openModal: HTMLElement = screen.getByLabelText("open-delete-modal-btn");
    await user.click(openModal);
    const deleteButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Delete",
    });
    await user.click(deleteButtonElement);
    expect(mockRemoveBookFromList).toHaveBeenCalledWith(mockBookId);
  });
});
