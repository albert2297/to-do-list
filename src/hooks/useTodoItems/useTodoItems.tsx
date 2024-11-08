import { ITodoItems } from "@/interfaces";
import { useState, useEffect } from "react";

export const useTodoItems = ({ items, setItems }: ITodoItems) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todo-items", JSON.stringify(items));
    }
  }, [items]);

  const handleDeleteItem = (index: number): void => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("todo-items", JSON.stringify(updatedItems));
  };

  const handleEditItem = (index: number, newText: string): void => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, text: newText } : item
    );
    setItems(updatedItems);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      const updatedItems = [...items, { text: inputValue, completed: false }];
      setItems(updatedItems);
      setInputValue("");
    }
  };

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.trim()) {
      setIsInputEmpty(false);
    }
  };

  const toggleComplete = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const completedCount = items.filter((item) => item.completed).length;

  return {
    items,
    inputValue,
    isInputEmpty,
    setInputValue,
    handleDeleteItem,
    handleEditItem,
    handleFormSubmit,
    handleInputOnChange,
    toggleComplete,
    completedCount,
  };
};
