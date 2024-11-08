import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import App from "./App";
import { useIsReady, useMoodState, useStoredItems } from "@/hooks";

vi.mock("react-confetti", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-confetti" />,
}));

vi.mock("@/hooks", async () => {
  const actual = await vi.importActual<typeof import("@/hooks")>("@/hooks");
  return {
    ...actual,
    useIsReady: vi.fn(),
    useMoodState: vi.fn(),
    useStoredItems: vi.fn(),
  };
});

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing if isReady is false", () => {
    (useIsReady as Mock).mockReturnValue(false);
    (useStoredItems as Mock).mockReturnValue({ items: [], setItems: vi.fn() });
    (useMoodState as Mock).mockReturnValue({
      mood: "happy",
      backgroundClass: "happy-background",
    });

    const { container } = render(<App />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders TodoList and Celebration components when isReady is true", () => {
    (useIsReady as Mock).mockReturnValue(true);
    (useStoredItems as Mock).mockReturnValue({
      items: [],
      setItems: vi.fn(),
    });
    (useMoodState as Mock).mockReturnValue({
      mood: "happy",
      backgroundClass: "happy-background",
    });

    render(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("celebration")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-confetti")).toBeInTheDocument();
  });
});
