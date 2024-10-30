import userEvent from "@testing-library/user-event";
import TextInput from "../ui/TextInput";
import { render, screen } from "@testing-library/react";

describe("TextInput", () => {
  const mockChange = jest.fn();
  test("Render text input and label correctly", () => {
    render(
      <TextInput
        id="Sample"
        label="Sample label"
        value="Sample"
        onChange={mockChange}
      />
    );
    const textFieldElement: HTMLElement = screen.getByRole("textbox");
    expect(textFieldElement).toBeInTheDocument();
    expect(textFieldElement).toHaveValue("Sample");
    expect(screen.getByText("Sample label")).toBeInTheDocument();
  });

  test("Change input text when user is typing", async () => {
    const user = userEvent.setup();
    render(
      <TextInput id="Sample" label="Sample label" onChange={mockChange} />
    );
    const textFieldElement: HTMLElement = screen.getByRole("textbox");
    await user.type(textFieldElement, "Abc");
    expect(textFieldElement).toHaveValue("Abc");
  });

  test("Render textArea if we pass props multiline", () => {
    render(
      <TextInput
        id="Sample"
        label="Sample label"
        multiline
        onChange={mockChange}
      />
    );
    const textAreaElement: HTMLElement = screen.getByRole("textbox");
    expect(textAreaElement).toBeInTheDocument();
  });
});
