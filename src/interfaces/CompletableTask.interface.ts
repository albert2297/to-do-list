export interface ICompletableTask {
  completed: boolean;
  onToggleComplete: () => void;
}
