import { Checkbox, FormControlLabel } from "@material-ui/core";
import { startCase } from "lodash";
import React, { useCallback } from "react";

export const CheckboxField = ({ source, label, onChange }: any) => {
  const handleFieldChange = useCallback(
    ({ target: { checked } }) => {
      if (onChange) {
        onChange(source, checked);
      }
    },
    [onChange, source],
  );

  return (
    <FormControlLabel
      control={
        <Checkbox name={source} color="primary" onChange={handleFieldChange} />
      }
      label={label ?? startCase(source)}
    />
  );
};
