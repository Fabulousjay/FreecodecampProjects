import clsx from "clsx";
import React, { FC, memo, useCallback } from "react";
import { FiEdit2 as EditIcon, FiSave as SaveIcon } from "react-icons/fi";
import { FormFieldActionType } from "./types";

export interface EditableFormProps {
  mode?: FormFieldActionType;
}

const status = (mode: FormFieldActionType) => mode === "edit";

/**
 * TODO:
 *
 * - Convert form to use redux and register all the fields in the form; pass the mode as a parameter to the form
 * - The editable form should control the mode of the fields
 * - When the edit button is clicked the mode is changed to edit
 * - When the focus is gone from the form, the mode is changed to view
 */
export const EditableForm: FC<EditableFormProps> = memo(
  ({ children = [], mode = "view" }) => {
    // Since mode right now is a binary choice; view => false, edit => true
    const handleSubmit = useCallback((event) => {
      event.preventDefault();
    }, []);

    return (
      <div className="form form--editable editable-form">
        <span
          className={clsx(
            "editable-form__wrapper",
            status(mode) && "editable-form__wrapper--active",
          )}
        >
          {status(mode) ? (
            <SaveIcon
              className="editable-form__action"
            />
          ) : (
            <EditIcon
              className="editable-form__action"
            />
          )}
          <form onSubmit={handleSubmit}>{children}</form>
        </span>
      </div>
    );
  },
);
