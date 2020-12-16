import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";
import { startCase } from "lodash";
import React, { FC, memo, useCallback } from "react";
import { isValidEmail } from "../checkers";
import { CommonTexFieldProps } from "./types";

export type TextFieldProps = CommonTexFieldProps & {
  type: MuiTextFieldProps["type"];
};

export interface ZTextFieldProps {
  mode: "view" | "edit";
}

export const ZTextField: FC<any> = memo(
  ({ mode, value, source, onChange, onValidate, ...props }) => {

    switch (mode) {
      case "edit":
        return (
          <ITextField
            source={source}
            value={value}
            onChange={onChange}
            onValidate={onValidate}
            {...props}
          />
        );
      default:
        return (
          <div className="input input__textfield input--view">{value}</div>
        );
    }
  },
);

const ITextField: FC<any> = memo(
  ({
    source,
    type,
    disabled = false,
    onChange,
    label,
    placeholder,
    hideLabel = false,
  }) => {
    const handleChange = useCallback(
      ({ target: { name, value } }) => {
        onChange(name, value);
      },
      [onChange],
    );

    const handleBlur = useCallback(() => {
      return;
    }, []);

    return (
      <div className="input__wrapper">
        {!hideLabel && (
          <label aria-label={source} htmlFor={source}>
            {label ?? startCase(source)}
          </label>
        )}
        <input
          type={type}
          name={source}
          disabled={disabled}
          className="input input__textfield input--edit"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder ?? startCase(label ?? source)}
        />
      </div>
    );
  },
);

export const TextField = ({
  source,
  label,
  onChange,
  variant,
  onValidate,
  ...props
}: TextFieldProps) => {
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
      name={source}
      label={label ?? startCase(source)}
      fullWidth
      margin="normal"
      color="primary"
      onChange={handleFieldChange}
      variant={variant ?? "standard"}
      className="form__field"
      {...props}
    />
  );
};
