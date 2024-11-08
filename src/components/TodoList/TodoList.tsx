import styles from "./TodoList.module.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  GoalTracker,
  Header,
  Mood,
  TextInputWithButton,
  SortableTaskItem,
} from "@/components";
import { ITodoItems } from "@/interfaces";
import { useTodoList } from "@/hooks";

export const TodoList = ({ items, setItems }: ITodoItems) => {
  const {
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
  } = useTodoList({ items, setItems });

  return (
    <div
      className={styles["container"]}
      role="main"
      aria-labelledby="todo-list-header"
    >
      <div className={styles["goal-container"]}>
        <Header title={"To-do List"} />
        <GoalTracker goal={items.length} completed={completedCount} />
      </div>
      <div className={`${styles["mood-container"]}`} aria-live="polite">
        <Header title={"Mood"} showIcon={false} />
        <Mood items={items} />
      </div>
      <TextInputWithButton
        isInputEmptyInitialValue={isInputEmpty}
        inputValue={inputValue}
        customFormClass={`${styles["form"]}`}
        handleFormSubmit={handleFormSubmit}
        onChange={handleInputOnChange}
        aria-label="Add a new task"
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={items.map((_, index) => index.toString())}
        >
          {items.map((item, index) => (
            <SortableTaskItem
              key={`${item.text}-${index}`}
              item={item}
              index={index}
              handleDeleteItem={handleDeleteItem}
              toggleComplete={toggleComplete}
              handleEditItem={handleEditItem}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
