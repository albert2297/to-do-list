import styles from "./TextInputWithButton.module.css";
import { ITextInputWithButton } from "@/interfaces";
import { useFormValidation, useInputFocus } from "@/hooks";

export const TextInputWithButton = ({
  inputRef,
  inputValue,
  isInputEmptyInitialValue = false,
  handleFormSubmit = () => {},
  onChange,
  onBlur,
  onKeyDown,
  customErrorMessageClass = "",
  customFormClass = "",
  customButtomClass = "",
  placeholder = "Add a new task",
  buttonContent = <span className={styles["plus"]}>+</span>,
}: ITextInputWithButton) => {
  const finalInputRef = useInputFocus({ externalRef: inputRef });
  const { isInputEmpty, handleSubmit } = useFormValidation({
    inputValue,
    handleFormSubmit,
    isInputEmptyInitialValue,
  });

  return (
    <>
      <form
        className={`${styles["container"]} ${customFormClass}`}
        onSubmit={handleSubmit}
        aria-describedby="error-message"
      >
        <div className={styles["input-container"]}>
          <input
            ref={finalInputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            className={styles["input"]}
            aria-label={placeholder}
            aria-invalid={isInputEmpty}
            aria-describedby={isInputEmpty ? "error-message" : undefined}
          />
          <button
            type="submit"
            className={`${styles["button"]} ${customButtomClass}`}
            aria-label="Submit"
          >
            {buttonContent}
          </button>
        </div>
      </form>
      {isInputEmpty && (
        <span
          id="error-message"
          className={`${styles["errorMessage"]} ${customErrorMessageClass}`}
          role="alert"
          aria-live="assertive"
        >
          This field is required
        </span>
      )}
    </>
  );
};
