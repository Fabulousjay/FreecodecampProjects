import React, { FC, useEffect, useState } from "react";
import { CommonProps } from "../../../types";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { convertFromApiCollectionToListCollection } from "../../../_helpers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { List } from "../../../_comp/List";
import { Button } from "@material-ui/core";

const GET_CUSTOMERS = gql`
  query Get_customers {
    customers {
      data {
        id
        firstname
        lastname
        email
        phone
      }
    }
  }
`;

export const ListCustomers: FC<CommonProps> = () => {
  const [customerCollection, setCustomerCollection] = useState([]);
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setCustomerCollection(data?.customers?.data);
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div> {error.message} </div>;
  }
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => history.push("/admin/customers/create")}
      >
        Create
      </Button>
      <List
        headers={["First name", "Lastname", "Email"]}
        collection={convertFromApiCollectionToListCollection(
          customerCollection,
          ["firstname", "lastname", "email"],
        )}
      />
    </>
  );
};
