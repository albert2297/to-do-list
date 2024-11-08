export interface IEditableTask {
  text: string;
  onEdit: (newText: string) => void;
}
