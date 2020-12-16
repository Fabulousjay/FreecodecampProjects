import React, { FC, memo } from "react";
import { FormFieldActionType } from "../../types";
import { EditTextField, EditTextFieldProps } from "./EditTextField";
import { ViewTextField, ViewTextFieldProps } from "./ViewTextField";

export type TextFieldProps = (Omit<EditTextFieldProps, "mode"> &
  Omit<ViewTextFieldProps, "mode">) & {
  mode?: FormFieldActionType;
};

export const TextField: FC<TextFieldProps> = memo(
  ({ mode = "view", ...props }) => {
    switch (mode) {
      case "edit":
        return <EditTextField mode={mode} {...props} />;
      default:
        return <ViewTextField mode={mode} {...props} />;
    }
  },
);

export const RTextField: FC<TextFieldProps> = memo(
  ({ mode = "view", ...props }) => {

    switch (mode) {
      case "edit":
        return <EditTextField mode={mode} {...props} />;
      default:
        return <ViewTextField mode={mode} {...props} />;
    }
  },
);
