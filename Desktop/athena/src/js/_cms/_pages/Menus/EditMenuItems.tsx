import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as toastr from "toastr";
import { CommonProps } from "../../../types";
import { FieldProps, SimpleForm } from "../../../_comp/_form/SimpleForm";
import { routePrefix } from "../../routes";
import { useHistory } from "react-router-dom";
import {
  getUserToken,
  getResourceCrudUrl,
  GET_COLLECTION_ITEM,
  PUT_COLLECTION_ITEM,
} from "../../../_helpers";

const accessToken = getUserToken();
const fields: FieldProps[] = [{ source: "name", type: "text", label: "Name" }];

/**
 * TODO: Change file name to Menu
 * TODO: Use graphql instead of axios
 */
export const EditItems: FC<CommonProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<{ [key: string]: number }>();
  const { menuID } = useParams<{ menuID?: string }>();
  const history = useHistory();

  useEffect(() => {
    const url = getResourceCrudUrl({
      type: GET_COLLECTION_ITEM,
      params: { resource: "menu", identifier: menuID },
    });

    if (url) {
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setFormData(response.data);
            setIsLoading(false);
          }
          return response;
        })
        .catch((error) => {
          toastr.error(error);
        });
    }
  }, []);

  const handleSubmit = (data: { [key: string]: any }) => {
    const url = getResourceCrudUrl({
      type: PUT_COLLECTION_ITEM,
      params: { resource: "menu", identifier: menuID },
    });

    if (url) {
      axios
        .put(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            history.push(`${routePrefix}/menu`);
          }
          return response;
        })
        .catch((error) => {
          toastr.error(error);
        });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return <SimpleForm data={formData} fields={fields} onSubmit={handleSubmit} />;
};
