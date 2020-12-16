import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AppStateContext } from "../../provider";
import { routePrefix } from "../../_cms/routes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const LoginGraphQL: React.FC = () => {
  const history = useHistory();
  const { gqlError } = useContext(AppStateContext);

  const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        access_token
        refresh_token
        expires_in
        token_type
        user {
          id
          email
          name
          created_at
          updated_at
        }
      }
    }
  `;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [login] = useMutation(LOGIN);

  return (
    <div>
      <div>Login page</div>
      {show ? <div>{gqlError.msg}</div> : undefined}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setShow(false);
            const { data } = await login({ variables: { username, password } });
            if (
              data === undefined ||
              data?.login === undefined ||
              data.login?.access_token === undefined
            ) {
              throw new Error("Invalid credentials");
            } else {
              const now = new Date();
              cookies.set("token", data.login.access_token, {
                path: "/",
                expires: new Date(now.getFullYear(), now.getMonth() + 1, 1),
              });
              history.push(routePrefix);
            }
          } catch (err) {
            setShow(true);
          }
        }}
      >
        <div>
          <input
            value={username}
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
