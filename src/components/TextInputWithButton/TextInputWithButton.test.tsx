import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TextInputWithButton } from "./TextInputWithButton";
import "@testing-library/jest-dom";

describe("TextInputWithButton Component", () => {
  const handleFormSubmit = vi.fn();
  const onChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and button with correct placeholders and button content", () => {
    render(
      <TextInputWithButton
        inputValue=""
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
        buttonContent={<span>Submit</span>}
      />
    );

    const input = screen.getByPlaceholderText("Add a new task");
    expect(input).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("calls onChange when typing in the input", () => {
    render(
      <TextInputWithButton
        inputValue=""
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    );

    const input = screen.getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New text" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("calls handleFormSubmit when submitting the form", () => {
    render(
      <TextInputWithButton
        inputValue="Valid input"
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    );

    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);

    expect(handleFormSubmit).toHaveBeenCalled();
  });

  it("shows error message when input is empty and form is submitted", () => {
    render(
      <TextInputWithButton
        inputValue=""
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    );

    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("role", "alert");
  });

  it("sets aria-invalid to true when input is empty", () => {
    render(
      <TextInputWithButton
        inputValue=""
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
        isInputEmptyInitialValue={true}
      />
    );

    const input = screen.getByPlaceholderText("Add a new task");

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not show error message when input has value", () => {
    render(
      <TextInputWithButton
        inputValue="Valid input"
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    );

    const errorMessage = screen.queryByText("This field is required");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
