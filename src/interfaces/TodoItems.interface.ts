import { Dispatch, SetStateAction } from "react";
import { IItem, IItems } from "@/interfaces";

export interface ITodoItems extends IItems {
  setItems: Dispatch<SetStateAction<IItem[]>>;
}
