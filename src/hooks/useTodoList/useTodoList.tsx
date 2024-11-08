import {
  useSensor,
  useSensors,
  MouseSensor,
  UniqueIdentifier,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useTodoItems } from "@/hooks";
import { ITodoItems } from "@/interfaces";

export const useTodoList = ({ items, setItems }: ITodoItems) => {
  const {
    inputValue,
    isInputEmpty,
    handleDeleteItem,
    handleEditItem,
    handleFormSubmit,
    handleInputOnChange,
    toggleComplete,
    completedCount,
  } = useTodoItems({ items, setItems });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: { id: UniqueIdentifier };
    over: { id: UniqueIdentifier } | null;
  }) => {
    if (active.id !== over?.id && over !== null) {
      const oldIndex = items.findIndex(
        (_, index) => index === Number(active.id)
      );
      const newIndex = items.findIndex((_, index) => index === Number(over.id));
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  return {
    inputValue,
    isInputEmpty,
    handleDeleteItem,
    handleEditItem,
    handleFormSubmit,
    handleInputOnChange,
    toggleComplete,
    completedCount,
    sensors,
    handleDragEnd,
  };
};
