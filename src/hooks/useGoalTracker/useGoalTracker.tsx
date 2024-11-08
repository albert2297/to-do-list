import { IGoalTracker } from "@/interfaces";

export const useGoalTracker = ({ goal, completed }: IGoalTracker) => {
  const progress = goal === 0 ? 0 : (completed / goal) * 100;

  const message =
    completed <= 0
      ? "No tasks completed"
      : completed >= goal
      ? "You did it, now enjoy the success!"
      : "Keep going!";

  return { progress, message };
};
