import React, { FC } from "react";
import { CommonProps } from "../../../types";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { routePrefix } from "../../routes";
import CircularProgress from "@material-ui/core/CircularProgress";

import { FieldProps, SimpleForm } from "../../../_comp/_form/SimpleForm";

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;

export const DeleteCustomers: FC<CommonProps> = () => {
  const history = useHistory();
  const [
    updateCustomer,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(DELETE_CUSTOMER);
  const fields: FieldProps[] = [{ source: "id", type: "text", label: "ID" }];

  const handleSubmit = (data: { [key: string]: any }) => {
    updateCustomer({
      variables: {
        id: data?.id,
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
