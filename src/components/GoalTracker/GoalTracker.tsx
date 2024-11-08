import styles from "./GoalTracker.module.css";
import { IGoalTracker } from "@/interfaces";
import { useGoalTracker } from "@/hooks";

export const GoalTracker = ({ goal, completed }: IGoalTracker) => {
  const { progress, message } = useGoalTracker({ goal, completed });

  return (
    <div
      className={styles["container"]}
      role="region"
      aria-labelledby="goal-title"
    >
      <div id="goal-title" className={styles["goal"]}>
        Goal: {completed} / {goal}
      </div>
      <div className={styles["message"]} aria-live="polite">
        {message}
      </div>
      <div
        className={styles["progressBarContainer"]}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${progress}% completed`}
      >
        <div
          className={styles["progressBar"]}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
