import { TextField as MuiTextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { isValidEmail } from "../checkers";
import { CommonTexFieldProps } from "./types";

export type EmailFieldProps = CommonTexFieldProps & {
  type: "email";
  isValid?: (status: boolean) => void;
};

export const EmailField = ({
  source,
  onChange,
  isValid,
  variant,
  onBlur,
  onValidate,
  ...props
}: EmailFieldProps) => {
  const handleValidity = useCallback(({ target: { value } }) => {
    if (isValid) {
      isValid(isValidEmail(value));
    }
  }, []);

  const handleFieldChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(source, event.target.value);
      }

      if (onValidate) {
        isValidEmail(event.target.value) ? onValidate(true) : onValidate(false);
      }
    },
    [onChange, onValidate, source],
  );

  return (
    <MuiTextField
      required
      fullWidth
      name={source}
      margin="normal"
      color="primary"
      className="form__field"
      onChange={handleFieldChange}
      variant={variant ?? "standard"}
      onBlur={handleValidity && onBlur}
      {...props}
    />
  );
};
