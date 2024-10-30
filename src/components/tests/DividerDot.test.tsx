import { render, screen } from "@testing-library/react";
import DividerDot, { SIZES } from "../ui/DividerDot";

describe("DividerDot", () => {
  test("Render small divider dot correctly", () => {
    const size: string = "small";
    render(<DividerDot size={size as any} />);
    const dividerDotElement: HTMLElement = screen.getByLabelText("divider-dot");
    expect(dividerDotElement).toBeInTheDocument();
    expect(dividerDotElement).toHaveStyle({
      width: SIZES[size].width,
      height: SIZES[size].height,
    });
  });
  test("Render medium divider dot correctly", () => {
    const size: string = "medium";
    render(<DividerDot size={size as any} />);
    const dividerDotElement: HTMLElement = screen.getByLabelText("divider-dot");
    expect(dividerDotElement).toBeInTheDocument();
    expect(dividerDotElement).toHaveStyle({
      width: SIZES[size].width,
      height: SIZES[size].height,
    });
  });
  test("Render large divider dot correctly", () => {
    const size: string = "large";
    render(<DividerDot size={size as any} />);
    const dividerDotElement: HTMLElement = screen.getByLabelText("divider-dot");
    expect(dividerDotElement).toBeInTheDocument();
    expect(dividerDotElement).toHaveStyle({
      width: SIZES[size].width,
      height: SIZES[size].height,
    });
  });
});
