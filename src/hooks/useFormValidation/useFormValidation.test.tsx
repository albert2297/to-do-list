import { renderHook, act } from "@testing-library/react";
import { useFormValidation } from "./useFormValidation";
import { describe, expect, it, vi } from "vitest";
import { FormEvent } from "react";

describe("useFormValidation Hook", () => {
  it("sets isInputEmpty to true if input is empty on submit", () => {
    const handleFormSubmit = vi.fn();
    const { result } = renderHook(() =>
      useFormValidation({
        inputValue: "",
        handleFormSubmit,
        isInputEmptyInitialValue: false,
      })
    );

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.isInputEmpty).toBe(true);
    expect(handleFormSubmit).not.toHaveBeenCalled();
  });

  it("sets isInputEmpty to false and calls handleFormSubmit if input is not empty", () => {
    const handleFormSubmit = vi.fn();
    const { result } = renderHook(() =>
      useFormValidation({
        inputValue: "Test input",
        handleFormSubmit,
        isInputEmptyInitialValue: false,
      })
    );

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.isInputEmpty).toBe(false);
    expect(handleFormSubmit).toHaveBeenCalled();
  });

  it("maintains initial state of isInputEmpty when input is not empty", () => {
    const handleFormSubmit = vi.fn();
    const { result } = renderHook(() =>
      useFormValidation({
        inputValue: "Non-empty",
        handleFormSubmit,
        isInputEmptyInitialValue: false,
      })
    );

    expect(result.current.isInputEmpty).toBe(false);
  });
});
