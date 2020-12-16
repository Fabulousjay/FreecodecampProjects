import { startCase } from "lodash";
import React, { FC, memo } from "react";
import { CommonTextFieldProps } from "./types";

export interface EditTextFieldProps extends CommonTextFieldProps {
  errors?: string[];
  mode: "edit";
  label?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Controlled Input field
 */
export const EditTextField: FC<EditTextFieldProps> = memo(
  ({
    source,
    type,
    errors,
    disabled = false,
    value,
    onChange,
    label,
    placeholder,
    hideLabel,
  }) => {
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
          value={value}
          disabled={disabled}
          className="input input__textfield input--edit"
          // onBlur={handleBlur} TODO: handle blur
          onChange={onChange}
          placeholder={placeholder ?? startCase(label ?? source)}
        />
        <div className="errors">
          {errors?.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
        </div>
      </div>
    );
  },
);
