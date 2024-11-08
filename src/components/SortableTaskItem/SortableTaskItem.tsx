import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { TaskItem } from "@/components";
import { ISortableTaskItem } from "@/interfaces";

export const SortableTaskItem = ({
  item,
  index,
  handleDeleteItem,
  toggleComplete,
  handleEditItem,
}: ISortableTaskItem) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    gridColumn: "span 2",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem
        text={item.text}
        completed={item.completed}
        onDelete={() => handleDeleteItem(index)}
        onToggleComplete={() => toggleComplete(index)}
        onEdit={(newText) => handleEditItem(index, newText)}
      />
    </div>
  );
};
