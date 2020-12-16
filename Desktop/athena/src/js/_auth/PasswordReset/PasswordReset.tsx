import { TextField } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, memo, useCallback } from "react";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../../../sass/cms/style.scss";

export const PasswordReset: FC = memo(() => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__header">Password Reset</div>
        <form className={clsx("form", "login__form")} onSubmit={handleSubmit}>
          <div className="login__logo">
            <FiLock />
          </div>
          <h2 className="title">Trouble Logging In?</h2>
          <h5 className="sub-title">
            Enter your username or email and we&apos;ll send you a link to get
            back into your account.
          </h5>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            color="primary"
            className="form__field"
          />
          <button
            name="submit"
            type="submit"
            className="form__submit login__submit"
          >
            Send Login Link
          </button>
        </form>
        <Link to="/login" className="login__footer">
          Back To Login
        </Link>
      </div>
    </div>
  );
});
