import { renderHook } from "@testing-library/react";
import { useMoodState } from "./useMoodState";
import { describe, it, expect } from "vitest";
import {
  BsEmojiGrinFill,
  BsEmojiGrimaceFill,
  BsEmojiFrownFill,
} from "react-icons/bs";
import { IItem } from "@/interfaces";

describe("useMoodState Hook", () => {
  const styles = {
    "background-happy": "happy-background",
    "background-neutral": "neutral-background",
    "background-sad": "sad-background",
    icon: "mood-icon",
  };

  it("sets mood to 'sad' and uses sad icon when no tasks are completed", () => {
    const items = [{ completed: false }, { completed: false }] as IItem[];
    const { result } = renderHook(() => useMoodState(items, styles));

    expect(result.current.mood).toBe("sad");
    expect(result.current.backgroundClass).toBe(styles["background-sad"]);
    expect(result.current.moodIcon.type).toBe(BsEmojiFrownFill);
  });

  it("sets mood to 'happy' and uses happy icon when all tasks are completed", () => {
    const items = [{ completed: true }, { completed: true }] as IItem[];
    const { result } = renderHook(() => useMoodState(items, styles));

    expect(result.current.mood).toBe("happy");
    expect(result.current.backgroundClass).toBe(styles["background-happy"]);
    expect(result.current.moodIcon.type).toBe(BsEmojiGrinFill);
  });

  it("sets mood to 'neutral' and uses neutral icon when some tasks are completed", () => {
    const items = [{ completed: true }, { completed: false }] as IItem[];
    const { result } = renderHook(() => useMoodState(items, styles));

    expect(result.current.mood).toBe("neutral");
    expect(result.current.backgroundClass).toBe(styles["background-neutral"]);
    expect(result.current.moodIcon.type).toBe(BsEmojiGrimaceFill);
  });
});
