import { useState, useEffect } from "react";
import { IItem } from "@/interfaces";
import {
  BsEmojiGrinFill,
  BsEmojiGrimaceFill,
  BsEmojiFrownFill,
} from "react-icons/bs";

export const useMoodState = (
  items: IItem[],
  styles: { [key: string]: string }
) => {
  const [mood, setMood] = useState<"happy" | "neutral" | "sad">("sad");
  const completedCount = items.filter((item) => item.completed).length;

  useEffect(() => {
    if (completedCount <= 0) {
      setMood("sad");
    } else if (completedCount === items.length) {
      setMood("happy");
    } else {
      setMood("neutral");
    }
  }, [items, completedCount]);

  const backgroundClass =
    mood === "happy"
      ? styles["background-happy"]
      : mood === "neutral"
      ? styles["background-neutral"]
      : styles["background-sad"];

  const moodIcon =
    mood === "happy" ? (
      <BsEmojiGrinFill className={styles.icon} />
    ) : mood === "neutral" ? (
      <BsEmojiGrimaceFill className={styles.icon} />
    ) : (
      <BsEmojiFrownFill className={styles.icon} />
    );

  return { mood, backgroundClass, moodIcon };
};
