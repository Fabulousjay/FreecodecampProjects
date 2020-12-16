import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AppStateContext } from "../../provider";

export const SignUpGraphQL: React.FC = () => {
  const history = useHistory();
  const { gqlError } = useContext(AppStateContext);
  const REGISTER = gql`
    mutation register(
      $email: String!
      $password: String!
      $name: String!
      $password_confirmation: String!
    ) {
      register(
        input: {
          email: $email
          password: $password
          name: $name
          password_confirmation: $password_confirmation
        }
      ) {
        tokens {
          access_token
        }
      }
    }
  `;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmation] = useState("");
  const [show, setShow] = useState(false);
  const [register] = useMutation(REGISTER);

  return (
    <div>
      <div>Register page</div>
      {show ? <div>{gqlError.msg}</div> : undefined}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setShow(false);
            const { data } = await register({
              variables: { name, email, password, password_confirmation },
            });
            if (data === undefined || data?.register === undefined)
              throw new Error("Invalid credentials");
            history.replace(`/login`);
          } catch (err) {
            setShow(true);
          }
        }}
      >
        <div>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div></div>
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
        <div>
          <input
            value={password_confirmation}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => {
              setConfirmation(e.target.value);
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
