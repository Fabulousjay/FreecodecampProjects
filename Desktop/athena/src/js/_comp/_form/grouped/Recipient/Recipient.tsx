import React, { FC, memo, useCallback } from "react";
import { EditableForm } from "../../EditableForm";
import { Address as AddressInput, AddressDataProps } from "../../fields";
import { RTextField } from "../../fields/TextField";

export interface RecipientProps {
  name: string;
  address: AddressDataProps;
  email: string;
  phone: string;
}

export const Recipient: FC = memo(() => {
  const handleChange = useCallback(() => {
    return;
  }, []);
  const handleAddressChange = useCallback(() => {
    return;
  }, []);

  return (
    <EditableForm>
      <RTextField source="name" hideLabel onChange={handleChange} />
      <AddressInput source="address" onChange={handleAddressChange} />
      <RTextField source="email" hideLabel />
      <RTextField source="phone" hideLabel />
    </EditableForm>
  );
});
