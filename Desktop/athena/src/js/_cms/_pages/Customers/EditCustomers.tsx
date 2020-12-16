import React, { FC } from "react";
import { CommonProps } from "../../../types";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { routePrefix } from "../../routes";
import CircularProgress from "@material-ui/core/CircularProgress";

import { FieldProps, SimpleForm } from "../../../_comp/_form/SimpleForm";

const EDIT_CUSTOMER = gql`
  mutation updateCustomer(
    $id: ID!
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
  ) {
    updateCustomer(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
    ) {
      id
      uuid
      firstname
      lastname
      email
      phone
      created_at
      updated_at
    }
  }
`;

export const EditCustomers: FC<CommonProps> = () => {
  const history = useHistory();
  const [
    updateCustomer,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(EDIT_CUSTOMER);
  const fields: FieldProps[] = [
    { source: "id", type: "text", label: "ID" },
    { source: "firstname", type: "text", label: "First Name" },
    { source: "lastname", type: "text", label: "Last Name" },
    { source: "email", type: "text", label: "Email" },
    { source: "phone", type: "text", label: "Phone Number" },
  ];

  const handleSubmit = (data: { [key: string]: any }) => {
    updateCustomer({
      variables: {
        id: data?.id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        phone: data?.phone,
      },
    });
    history.push(`${routePrefix}/customers/list`);
  };

  return (
    <>
      {mutationLoading && (
        <p>
          <CircularProgress />
        </p>
      )}
      {mutationError && <p> console.log(data);Error :( Please try again</p>}
      <SimpleForm fields={fields} onSubmit={handleSubmit} />
    </>
  );
};
