import { IEditableTask, ICompletableTask } from "@/interfaces";

export interface ITaskItems extends IEditableTask, ICompletableTask {
  onDelete: () => void;
}
