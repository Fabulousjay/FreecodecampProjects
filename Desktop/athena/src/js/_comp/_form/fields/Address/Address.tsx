import React, { FC, memo, useCallback, useState } from "react";
import { FormFieldActionType } from "../../types";
import { AddressDataProps, AddressForm } from "./AddressForm";

export interface AddressProps {
  source: string;
  value?: AddressDataProps;
  actionType?: FormFieldActionType;
  onChange: (source: string, data: AddressDataProps) => void;
}

const mockAddress: AddressDataProps = {
  street1: "Level 6, First Central 200,",
  street2: "2 Lakeside Drive, Park Royal",
  town: "",
  city: "London",
  postcode: "NW10 7FQ",
};

export const Address: FC<AddressProps> = memo(
  ({ source, actionType = "view", value = mockAddress, onChange }) => {
    const [data, setData] = useState<AddressDataProps>(value);

    const handleFieldChange = useCallback(
      (source, value) => {
        onChange(source, { ...data, [source]: value });
      },
      [source, data, setData],
    );

    return (
      <AddressForm
        data={value}
        source="address"
        actionType={actionType}
        onChange={handleFieldChange}
      />
    );
  },
);
