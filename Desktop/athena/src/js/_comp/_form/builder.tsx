import React, { FC, memo } from "react";
import { TextField } from "./fields";

// export type FormFieldProps = EmailFieldProps | PasswordFieldProps | TextFieldProps | PasswordRepeatFieldProps;

export interface FormFieldProps {
  type: "email" | "password" | "password_confirmation" | "text";
  source: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValidate?: (status: boolean) => void;
  isValid?: (status: boolean) => void;
  errors?: string[];
}

export const FormField: FC<FormFieldProps> = memo(({ type, ...props }) => {
  let field;

  switch (type) {
    case "email":
      field = <TextField mode="edit" type={type} {...props} />;
      break;
    case "password":
      field = <TextField mode="edit" type={type} {...props} />;
      break;
    case "password_confirmation":
      field = <TextField mode="edit" type="password" {...props} />;
      break;
    default:
      field = <TextField mode="edit" type={type} {...props} />;
      break;
  }

  return field;
});
