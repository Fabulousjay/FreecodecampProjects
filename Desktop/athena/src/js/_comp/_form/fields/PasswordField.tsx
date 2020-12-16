import { TextField as MuiTextField } from "@material-ui/core";
import { startCase } from "lodash";
import React, { useCallback } from "react";
import { isValidPassword } from "../checkers";
import { CommonTexFieldProps } from "./types";

export type PasswordFieldProps = CommonTexFieldProps & {
  type: "password";
};

export const PasswordField = ({
  label,
  source,
  onChange,
  variant,
  onValidate,
  ...props
}: PasswordFieldProps) => {
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
      label={label ?? startCase(source)}
      margin="normal"
      color="primary"
      variant={variant ?? "standard"}
      onChange={handleFieldChange}
      className="form__field"
      {...props}
    />
  );
};
