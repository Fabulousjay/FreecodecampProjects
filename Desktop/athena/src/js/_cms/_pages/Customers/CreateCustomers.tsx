import React, { FC } from "react";
import { CommonProps } from "../../../types";
import { FieldProps, SimpleForm } from "../../../_comp/_form/SimpleForm";
import { gql, useMutation } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { routePrefix } from "../../routes";

const ADD_CUSTOMER = gql`
  mutation createCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
  ) {
    createCustomer(
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
export const CreateCustomers: FC<CommonProps> = () => {
  const history = useHistory();
  const [
    createCustomer,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(ADD_CUSTOMER);
  const fields: FieldProps[] = [
    { source: "firstname", type: "text", label: "First Name" },
    { source: "lastname", type: "text", label: "Last Name" },
    { source: "email", type: "text", label: "Email" },
    { source: "phone", type: "text", label: "Phone Number" },
  ];

  const handleSubmit = (data: { [key: string]: any }) => {
    createCustomer({
      variables: {
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
      {" "}
      {mutationLoading && (
        <p>
          <CircularProgress />
        </p>
      )}
      {mutationError && <p> console.log(data);Error :( Please try again</p>}
      <SimpleForm fields={fields} onSubmit={handleSubmit} />{" "}
    </>
  );
};
