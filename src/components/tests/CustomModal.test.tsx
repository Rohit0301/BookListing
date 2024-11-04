import { render, screen } from "@testing-library/react";
import CustomModal from "../ui/CustomModal";
import { MouseEvent } from "react";
import userEvent from "@testing-library/user-event";

describe("CustomModal", () => {
  // Mock function to simulate click events for buttons
  const mockOnClick = jest.fn((event: MouseEvent<HTMLButtonElement>) =>
    event.preventDefault()
  );
  test("Render modal button if modal is closed", () => {
    // Check if the button is in the document and has the correct text
    render(<CustomModal title="Sample Modal title" buttonText="Open Modal" />);
    const buttonElement: HTMLElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Open");
    // Ensure the modal title is not visible when the modal is closed
    expect(screen.queryByText("Sample Modal title")).toBeNull();
  });

  test("Open modal and render body and footer correctly", async () => {
    const user = userEvent.setup();
    render(
      <CustomModal
        title="Sample Modal title"
        buttonText="Open Modal"
        modalBody={<div>Modal Body</div>}
        showFooter={true}
      />
    );
    // Simulate clicking the button to open the modal
    const openButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Open Modal",
    });
    await user.click(openButtonElement);
    // Verify that the modal title, body, and footer are rendered correctly
    expect(screen.getByText("Sample Modal title")).toBeInTheDocument();
    expect(screen.getByText("Modal Body")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("Perform cancel button operation correctly", async () => {
    const user = userEvent.setup();
    render(
      <CustomModal
        title="Sample Modal title"
        modalBody={<div>Modal Body</div>}
        showFooter={true}
        onCancel={mockOnClick}
      />
    );
    const openButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Open",
    });
    await user.click(openButtonElement);

    // Check if the cancel button is present and simulate a click
    const cancelButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Cancel",
    });
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    await user.click(cancelButtonElement);
    // Verify that the modal title is not visible after canceling
    expect(screen.queryByText("Sample Modal title")).toBeNull();
  });

  test("Perform save button operation correctly", async () => {
    const user = userEvent.setup();
    render(
      <CustomModal
        title="Sample Modal title"
        modalBody={<div>Modal Body</div>}
        showFooter={true}
        onOk={mockOnClick}
      />
    );
    const openButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Open",
    });
    await user.click(openButtonElement);
    // Check if the save button is present and simulate a click
    const saveButtonElement: HTMLElement = screen.getByRole("button", {
      name: "Save",
    });
    expect(screen.getByText("Save")).toBeInTheDocument();
    await user.click(saveButtonElement);
    // Verify that the modal title is not visible after saving
    expect(screen.queryByText("Sample Modal title")).toBeNull();
  });
});
