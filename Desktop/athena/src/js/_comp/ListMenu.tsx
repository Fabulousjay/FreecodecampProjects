import React, { FC, useEffect, useState } from "react";

import { CommonProps } from "../types";
import { List } from "./List";
import { convertFromApiCollectionToListCollection } from "../_helpers/convertFromApiCollectionToListCollection";
import CircularProgress from "@material-ui/core/CircularProgress";
import { gql, useQuery } from "@apollo/client";

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

export const ListMenu: FC<CommonProps> = () => {
  const [menuCollection, setMenuCollection] = useState([]);

  const { loading, error, data } = useQuery(GET_MENUS);

  useEffect(() => {
    setMenuCollection(data?.user?.currentSite?.typeable?.menus);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    <div> {error.message} </div>;
  }
  
  return (
    <List
      headers={["Name", "ID"]}
      collection={convertFromApiCollectionToListCollection(menuCollection, [
        "name",
        "menuID",
      ])}
    />
  );
};
