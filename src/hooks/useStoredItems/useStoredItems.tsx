import { useState, useEffect } from "react";
import { IItem } from "@/interfaces";

export const useStoredItems = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("todo-items");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        }
      } catch (error) {
        console.error("Error parsing items from localStorage:", error);
      }
    }
  }, []);

  return { items, setItems };
};
