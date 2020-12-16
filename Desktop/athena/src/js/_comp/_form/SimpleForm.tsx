import clsx from "clsx";
import React, { FC, memo, useCallback, useState } from "react";
import { FormField } from "./builder";

export interface FieldProps {
  source: string;
  type: "email" | "password" | "password_confirmation" | "text";
  label: string;
}

interface SimpleFormProps {
  data?: { [key: string]: any };
  errors?: { [key: string]: string[] };
  fields: FieldProps[];
  onSubmit?: (data: { [key: string]: any }) => void;
}

export const SimpleForm: FC<SimpleFormProps> = memo(
  ({ data, fields, onSubmit, errors }) => {
    const [formData, setFormData] = useState<
      { [key: string]: any } | undefined
    >(data);

    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();

        if (onSubmit && formData) {
          onSubmit(formData);
        }
      },
      [formData],
    );

    const handleFieldChange = useCallback(
      ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
      },
      [setFormData, formData],
    );

    return (
      <form className={clsx("form", "login__form")} onSubmit={handleSubmit}>
        {fields.map(({ source, ...props }, index) => {
          const apiErrors: string[] | undefined = errors
            ? errors[source]
            : undefined;

          const value = formData ? formData?.[source] : undefined;

          return (
            <FormField
              key={index}
              source={source}
              errors={apiErrors}
              value={value}
              onChange={handleFieldChange}
              {...props}
            />
          );
        })}
        <button
          name="submit"
          type="submit"
          className="form__submit login__submit"
        >
          Submit
        </button>
      </form>
    );
  },
);
