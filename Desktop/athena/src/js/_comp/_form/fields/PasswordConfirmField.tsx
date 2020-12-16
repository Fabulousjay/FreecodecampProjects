import { TextField as MuiTextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { isValidPassword } from "../checkers";
import { CommonTexFieldProps } from "./types";

export interface PasswordConfirmFieldProps extends CommonTexFieldProps {
  type: "confirmPassword";
}

export const PasswordConfirmField = ({
  source,
  variant,
  onChange,
  onValidate,
  ...props
}: PasswordConfirmFieldProps) => {
  const handleFieldChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(source, event.target.value);
      }

      if (onValidate) {
        isValidPassword(event.target.value)
          ? onValidate(true)
          : onValidate(false);
      }
    },
    [onChange, onValidate, source],
  );

  return (
    <MuiTextField
      name={source}
      fullWidth
      required
      margin="normal"
      color="primary"
      onChange={handleFieldChange}
      variant={variant ?? "standard"}
      className="form__field"
      {...props}
    />
  );
};
