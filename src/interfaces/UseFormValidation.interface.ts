export interface IUseFormValidation {
  inputValue: string;
  handleFormSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  isInputEmptyInitialValue?: boolean;
}
