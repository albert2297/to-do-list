import { useState, useRef, useEffect } from "react";
import { IUseTaskItem } from "@/interfaces";

export const useTaskItem = ({
  text,
  onEdit,
  onToggleComplete,
}: IUseTaskItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleComplete = () => onToggleComplete();

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    if (currentText.trim()) {
      onEdit(currentText);
    } else {
      setCurrentText(text);
    }
    setIsEditing(false);
  };

  const handleInputBlur = () => {
    handleSaveClick();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleInputOnChange = (value: string) => {
    setCurrentText(value);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return {
    isEditing,
    currentText,
    inputRef,
    handleEditClick,
    handleSaveClick,
    handleInputBlur,
    handleInputKeyDown,
    handleToggleComplete,
    handleInputOnChange,
  };
};
