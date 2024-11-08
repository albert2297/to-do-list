import { IUseFormValidation } from "@/interfaces";
import { useState } from "react";

export const useFormValidation = ({
  inputValue,
  handleFormSubmit,
  isInputEmptyInitialValue,
}: IUseFormValidation) => {
  const [isInputEmpty, setIsInputEmpty] = useState(isInputEmptyInitialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      if (handleFormSubmit) {
        handleFormSubmit(e);
      }
    }
  };

  return { isInputEmpty, handleSubmit };
};
