import { IUseInputFocus } from "@/interfaces";
import { useRef } from "react";

export const useInputFocus = ({ externalRef }: IUseInputFocus) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef || internalRef;

  return inputRef;
};
