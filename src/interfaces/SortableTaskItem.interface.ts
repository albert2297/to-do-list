import { IItem } from "@/interfaces";

export interface ISortableTaskItem {
  item: IItem;
  index: number;
  handleDeleteItem: (index: number) => void;
  toggleComplete: (index: number) => void;
  handleEditItem: (index: number, newText: string) => void;
}
