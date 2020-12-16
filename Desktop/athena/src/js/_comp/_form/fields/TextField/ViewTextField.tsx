import clsx from "clsx";
import React, { FC, memo } from "react";
import { CommonTextFieldProps } from "./types";

export interface ViewTextFieldProps extends CommonTextFieldProps {
  mode: "view";
}

export const ViewTextField: FC<ViewTextFieldProps> = memo(
  ({ className, value }) => (
    <div className={clsx("input__wrapper", className)}>
      <p className={clsx("input__text")}>{value}</p>
    </div>
  ),
);
