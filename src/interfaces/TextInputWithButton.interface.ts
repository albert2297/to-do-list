export interface ITextInputWithButton {
  inputValue: string;
  handleFormSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  customFormClass?: string;
  customErrorMessageClass?: string;
  customButtomClass?: string;
  placeholder?: string;
  buttonContent?: React.ReactNode;
  isInputEmptyInitialValue?: boolean;
}
