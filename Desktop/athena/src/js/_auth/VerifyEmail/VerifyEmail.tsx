import { TextField } from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";
import { get, isEmpty } from "lodash";
import React, { FC, memo, useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { CommonProps } from "../../types";
import {
  emailIsAvailable,
  emailIsValid,
  isRequired,
  passwordIsRepeated,
  passwordIsValid,
  ValidationProps,
} from "../../_comp/_form/validation";

const API_URL = process.env.REACT_APP_API_URL;

interface ValidationRulesProps {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  props?: { [key: string]: any };
  validation: any[];
}

const validationRules: ValidationRulesProps[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    required: true,
    props: {},
    validation: [isRequired],
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    props: {},
    validation: [emailIsValid, emailIsAvailable],
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    props: {},
    validation: [passwordIsValid],
  },
  {
    name: "repeatPassword",
    type: "password",
    label: "Repeat Password",
    props: {},
    validation: [passwordIsRepeated],
  },
];

const validate = (formData: { [key: string]: string }) => {
  let errors = {};

  validationRules.map(({ name, validation, required = false }) => {
    const fieldValue = get(formData, name);

    if (fieldValue) {
      validation.map((validateFunc) => {
        const { status, errorText }: ValidationProps = validateFunc(
          name,
          fieldValue,
        );

        if (!status) {
          errors = {
            ...errors,
            [name]: errorText ?? "This field is invalid!!",
          };
        }
      });
    } else if (!fieldValue && required) {
      errors = { ...errors, [name]: "This field is required!!" };
    }
  });

  return errors;
};

const submit = async (formData: any) =>
  await axios
    .post(`${API_URL}/account/security/verify-email`, formData)
    .then(() => {
      /**
       * @TODO
       * if status is 201, automatically log the user in
       * else
       * display error from api
       */
    });
// Can decide to add HOC later

export const VerifyEmail: FC<CommonProps> = memo(({ className }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { search } = useLocation();

  // Get email from url
  const urlParams = new URLSearchParams(search);
  const email = urlParams.get("email");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const errors = validate(formData);

      if (isEmpty(errors)) {
        submit(formData)
          .then(() => {
            // console.log(response);
          })
          .catch(() => {
            // console.log(error);
          });
      } else {
        setErrors(errors);
      }
    },
    [formData],
  );

  const handleFieldChange = useCallback(
    ({ target: { name, value } }) => {
      const data = { ...formData, [name]: value };
      setFormData(data);

      const errors = validate(data);

      if (errors) {
        setErrors(errors);
      } else {
        setEnabled(true);
      }
    },
    [formData],
  );

  const handleCodeResend = useCallback(
    (event) => {
      event.preventDefault();

      axios
        .post("/account/security/resend-verification-code", { email })
        .then(() => {
          /**
           * @TODO: if status === 201 then show confirmation message
           * else show error message and log error
           */
        })
        .catch(() => {
          /**
           * Show error message then log
           */
        });
    },
    [email],
  );

  if (!email) {
    return <Redirect to="login" />;
  }
  return (
    <div className={clsx("signup", className)}>
      <div className="login">
        <div className="login__wrapper">
          <div className="login__header">VERIFY EMAIL</div>
          <form className={clsx("form", "login__form")} onSubmit={handleSubmit}>
            <div className="login__signup">
              <p>We&apos;ve sent you a verification code?</p>
            </div>
            <TextField
              name="verificationCode"
              label="Verification Code"
              type="text"
              fullWidth
              required
              error={!!errors?.verificationCode}
              margin="normal"
              color="primary"
              onChange={handleFieldChange}
              className="form__field"
            />
            <div className="login__signup">
              <button className="button--plain" onClick={handleCodeResend}>
                Resend Code
              </button>
            </div>
            <button
              name="submit"
              type="submit"
              disabled={enabled}
              className="form__submit login__submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});
