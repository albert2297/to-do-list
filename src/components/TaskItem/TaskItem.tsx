import styles from "./TaskItem.module.css";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { MdDeleteForever, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import { ITaskItems } from "@/interfaces";
import { TextInputWithButton } from "@/components";
import { useTaskItem } from "@/hooks";

export const TaskItem = ({
  text,
  onDelete,
  completed,
  onToggleComplete,
  onEdit,
}: ITaskItems) => {
  const {
    isEditing,
    currentText,
    inputRef,
    handleEditClick,
    handleSaveClick,
    handleInputBlur,
    handleInputKeyDown,
    handleToggleComplete,
    handleInputOnChange,
  } = useTaskItem({ text, completed, onEdit, onToggleComplete });

  return (
    <div
      className={!isEditing ? styles["container"] : styles["full-container"]}
      role="listitem"
      aria-live="polite"
    >
      <div
        className={
          !isEditing ? styles["like-container"] : styles["like-full-container"]
        }
      >
        {!isEditing && (
          <span
            onClick={handleToggleComplete}
            role="checkbox"
            aria-checked={completed}
            aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {completed ? (
              <IoMdCheckbox className={styles["iconLike"]} />
            ) : (
              <MdCheckBoxOutlineBlank className={styles["iconLike"]} />
            )}
          </span>
        )}

        {isEditing ? (
          <TextInputWithButton
            isInputEmptyInitialValue={false}
            inputValue={currentText}
            inputRef={inputRef}
            onChange={(e) => handleInputOnChange(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            customButtomClass={styles["button"]}
            customErrorMessageClass={styles["errorMessage"]}
            buttonContent={
              <FaCheck
                className={styles["iconSave"]}
                onClick={handleSaveClick}
                aria-label="Save changes"
              />
            }
          />
        ) : (
          <span
            className={
              !completed ? styles["text"] : styles["text-line-through"]
            }
            onClick={handleToggleComplete}
            role="text"
            aria-label={completed ? "Completed task" : "Incomplete task"}
          >
            {text}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className={styles["actionContainer"]}>
          <FaRegEdit
            className={styles["iconEdit"]}
            onClick={handleEditClick}
            aria-label="Edit task"
          />
          <MdDeleteForever
            className={styles["iconDelete"]}
            onClick={onDelete}
            aria-label="Delete task"
          />
        </div>
      )}
    </div>
  );
};
