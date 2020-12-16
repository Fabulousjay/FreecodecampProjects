import { Button } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CommonProps } from "../../../types";
import { List } from "../../../_comp/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import { gql, useQuery } from "@apollo/client";
import { convertFromApiCollectionToListCollection } from "../../../_helpers";

const GET_MENUS = gql`
  query Get_Menus {
    user(id: 3) {
      userID: id

      currentSite {
        typeable {
          __typename
          ... on Restaurant {
            restaurantID: id
            location
            menus {
              menuID: id
              name
              is_active
              menuItems {
                id
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

export const ListItems: FC<CommonProps> = () => {
  const [menuCollection, setMenuCollection] = useState([]);

  const { loading, error, data } = useQuery(GET_MENUS);

  const history = useHistory();

  useEffect(() => {
    if (data) {
      setMenuCollection(data?.user?.currentSite?.typeable?.menus);
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
        onClick={() => history.push("/admin/menu/create")}
      >
        Create
      </Button>
      <List
        headers={["Name"]}
        collection={convertFromApiCollectionToListCollection(menuCollection, [
          "menuID",
          "name",
        ])}
      />
    </>
  );
};
