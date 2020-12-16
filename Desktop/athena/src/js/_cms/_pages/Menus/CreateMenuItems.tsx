import axios from "axios";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import * as toastr from "toastr";
import Cookies from "universal-cookie";
import { CommonProps } from "../../../types";
import { FieldProps, SimpleForm } from "../../../_comp/_form/SimpleForm";
import { routePrefix } from "../../routes";

const cookie = new Cookies();
const accessToken = cookie.get("token");
const API_URL = process.env.REACT_APP_API_URL;
const fields: FieldProps[] = [{ source: "name", type: "text", label: "Name" }];

export const CreateItems: FC<CommonProps> = () => {
  const history = useHistory();

  const handleSubmit = (data: { [key: string]: any }) => {
    const url = `${API_URL}/menus`;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          history.push(`${routePrefix}/menu`);
        }
        return response;
      })
      .catch((error) => {
        toastr.error(error);
      });
  };
  return <SimpleForm fields={fields} onSubmit={handleSubmit} />;
};
