import { MouseEvent } from "react";
import CustomButton from "../ui/CustomButton";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Close as CloseIcon } from "@mui/icons-material";

describe("CustomButton", () => {
  // Mock function to simulate button click events
  const mockOnClick = jest.fn((event: MouseEvent<HTMLButtonElement>) =>
    event.preventDefault()
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders a button with a label and no Icon is provided", async () => {
    const user = userEvent.setup();
    render(
      <CustomButton label="Click Me" onClick={mockOnClick} color="primary" />
    );

    // Find button by role and check if it is in the document
    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");

    // Simulate a user click and verify if onClick was called
    await user.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("renders an IconButton when Icon is provided", async () => {
    const user = userEvent.setup();
    render(
      <CustomButton
        label="Close"
        Icon={<CloseIcon />}
        onClick={mockOnClick}
        color="secondary"
      />
    );

    // Find the icon button by role and check its classes
    const iconButtonElement = screen.getByRole("button", { name: /Close/i });
    expect(iconButtonElement).toBeInTheDocument();
    expect(iconButtonElement).toHaveClass("MuiIconButton-root");

    // Simulate a user click and verify if onClick was called
    await user.click(iconButtonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
