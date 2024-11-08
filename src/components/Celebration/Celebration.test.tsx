import { render } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { Celebration } from "./Celebration";
import { useWindowSize } from "react-use";
import { useCelebration } from "@/hooks";
import "@testing-library/jest-dom";

vi.mock("react-use", () => ({
  useWindowSize: vi.fn(),
}));

vi.mock("@/hooks", () => ({
  useCelebration: vi.fn(),
}));

vi.mock("react-confetti", () => ({
  default: () => <div data-testid="mock-confetti" />,
}));

describe("Celebration Component", () => {
  it("renders Confetti when isConfettiVisible is true", () => {
    (useWindowSize as Mock).mockReturnValue({ width: 800, height: 600 });
    (useCelebration as Mock).mockReturnValue({ isConfettiVisible: true });

    const { getByTestId } = render(<Celebration mood="happy" />);
    expect(getByTestId("mock-confetti")).toBeInTheDocument();
  });

  it("does not render Confetti when isConfettiVisible is false", () => {
    (useWindowSize as Mock).mockReturnValue({ width: 800, height: 600 });
    (useCelebration as Mock).mockReturnValue({ isConfettiVisible: false });

    const { queryByTestId } = render(<Celebration mood="sad" />);
    expect(queryByTestId("mock-confetti")).not.toBeInTheDocument();
  });
});
