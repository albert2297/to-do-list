import styles from "./Mood.module.css";
import { IItems } from "@/interfaces";
import { useMoodState } from "@/hooks";

export const Mood = ({ items }: IItems) => {
  const { moodIcon, backgroundClass } = useMoodState(items, styles);

  return (
    <div
      className={`${styles["container"]} ${backgroundClass}`}
      role="img"
      aria-label="Mood indicator"
    >
      {moodIcon}
    </div>
  );
};
