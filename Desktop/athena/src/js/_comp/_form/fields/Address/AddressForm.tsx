import React, { FC, memo, useCallback } from "react";
import { TextField } from "../../fields";
import { FormFieldActionType } from "../../types";

export interface AddressDataProps {
  street1: string;
  street2: string;
  town: string;
  city: string;
  postcode: string;
}

export interface AddressFormProps {
  source: string;
  data: AddressDataProps;
  actionType: FormFieldActionType;
  onChange: (source: string, data: AddressDataProps) => void;
}

export const AddressForm: FC<AddressFormProps> = memo(
  ({ data, actionType = "view", onChange }) => {
    const handleFieldChange = useCallback(
      ({ target: { name, value } }) => {
        onChange(name, { ...data, [name]: value });
      },
      [data],
    );

    return (
      <div className="address-form">
        <TextField
          hideLabel
          type="text"
          mode={actionType}
          source="street1"
          value={data.street1}
          onChange={handleFieldChange}
        />
        <TextField
          hideLabel
          type="text"
          mode={actionType}
          source="street2"
          value={data.street2}
          onChange={handleFieldChange}
        />
        <TextField
          hideLabel
          type="text"
          mode={actionType}
          source="town"
          value={data.town}
          onChange={handleFieldChange}
        />
        <TextField
          hideLabel
          type="text"
          mode={actionType}
          source="city"
          value={data.city}
          onChange={handleFieldChange}
        />
        <TextField
          hideLabel
          type="text"
          mode={actionType}
          source="postcode"
          value={data.postcode}
          onChange={handleFieldChange}
        />
      </div>
    );
  },
);
