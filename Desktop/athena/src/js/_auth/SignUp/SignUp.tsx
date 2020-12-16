import React, { useState, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../images/bike-guy.svg";
import { TextField } from "@material-ui/core";
import { emailIsValid, passwordIsValid } from "../../_comp/_form/validation";

export const SignUp: React.FC = () => {
  const REGISTER = gql`
    mutation register(
      $email: String!
      $password: String!
      $firstname: String!
      $lastname: String!
      $password_confirmation: String!
    ) {
      register(
        input: {
          email: $email
          password: $password
          firstname: $firstname
          lastname: $lastname
          password_confirmation: $password_confirmation
        }
      ) {
        status
      }
    }
  `;

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [formError, setFormError] = useState<{ [key: string]: any }>({});
  const [password, setPassword] = useState(Boolean);
  const [email, setEmail] = useState(Boolean);
  const [passwordConfirmation, setPasswordConfirmation] = useState(Boolean);
  const [formSubmit] = useState(false);
  const [register] = useMutation(REGISTER);

  const handleFieldChange = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });

      let emailValid: boolean;
      let passwordValid: boolean;
      switch (e.target.name) {
        case "email":
          emailValid = emailIsValid(e.target.value).status;
          if (emailValid) {
            setEmail(false);
            setFormError({ ...formError, email: "" });
          } else {
            setEmail(true);
            setFormError({ ...formError, email: "Invalid Email" });
          }
          break;
        case "password":
          passwordValid = passwordIsValid(e.target.value).status;
          if (passwordValid) {
            setPassword(false);
            setFormError({ ...formError, password: "" });
          } else {
            setPassword(true);
            setFormError({ ...formError, password: "Password is not strong" });
          }
          break;
        case "password_confirmation":
          if (formData.password === e.target.value) {
            setPasswordConfirmation(false);
            setFormError({ ...formError, password_confirmation: "" });
          } else {
            setPasswordConfirmation(true);
            setFormError({
              ...formError,
              password_confirmation: "Password mismatch",
            });
          }
          break;
        default:
          break;
      }
    },
    [formData],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setPasswordConfirmation(true);
      setFormError({
        ...formError,
        password_confirmation: "Password mismatch",
      });
    } else {
      register({
        variables: {
          firstname: formData?.firstname,
          lastname: formData?.lastname,
          email: formData?.email,
          password: formData?.password,
          password_confirmation: formData?.password_confirmation,
        },
      });
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    imageBox: {
      backgroundColor: "rgba(229, 229, 229, 0.41)",
    },
    image: {
      height: "80%",
      width: "80%",
      left: 601,
      top: 247,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(5, 5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    social: {
      marginBottom: theme.spacing(3),
      display: "flex",
      alignItems: "center",
    },
    social2: {
      paddingLeft: theme.spacing(6),
      textAlign: "center",
    },
    logo: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      marginLeft: theme.spacing(5),
      textAlign: "left",
    },
    textfield: {
      marginBottom: "10px",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Typography
          className={classes.logo}
          color="primary"
          component="h1"
          variant="h4"
        >
          ZEUS
        </Typography>
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.textfield}
              value={formData.firstname}
              inputProps={{
                minLength: 3,
              }}
              variant="outlined"
              required
              fullWidth
              helperText={formError.firstname}
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              onChange={handleFieldChange}
            />
            <TextField
              className={classes.textfield}
              value={formData.lastname}
              inputProps={{
                minLength: 3,
              }}
              variant="outlined"
              fullWidth
              required
              id="last"
              label="Last Name"
              name="lastname"
              helperText={formError.lastname}
              autoComplete="lastname"
              onChange={handleFieldChange}
            />
            <TextField
              className={classes.textfield}
              value={formData.email}
              variant="outlined"
              fullWidth
              required
              label="Email Address"
              name="email"
              helperText={formError.email}
              error={email}
              autoComplete="email"
              onChange={handleFieldChange}
            />
            <TextField
              variant="outlined"
              className={classes.textfield}
              value={formData.password}
              fullWidth
              required
              error={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={formError.password}
              autoComplete="current-password"
              onChange={handleFieldChange}
            />
            <TextField
              variant="outlined"
              className={classes.textfield}
              value={formData.password_confirmation}
              required
              fullWidth
              name="password_confirmation"
              label="Repeat Password"
              type="password"
              helperText={formError.password_confirmation}
              error={passwordConfirmation}
              id="password_confirmation"
              autoComplete="current-password"
              onChange={handleFieldChange}
            />
            <Button
              disabled={formSubmit}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>

          <Grid container justify="center" alignItems="center">
            <div className={classes.social}>
              <Grid item xs={12}>
                <Typography component="h1" variant="body1">
                  Or Sign Up with
                </Typography>
              </Grid>
            </div>
          </Grid>

          <Grid container justify="space-around" alignItems="center">
            <Grid item xs alignItems="center">
              <Link className={classes.social2} href="#" variant="body2">
                Facebook
              </Link>
            </Grid>
            <Grid item xs>
              <Link className={classes.social2} href="#" variant="body2">
                Instagram
              </Link>
            </Grid>
            <Grid item xs>
              <Link className={classes.social2} href="#" variant="body2">
                Twitter
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={false} sm={6} md={7} className={classes.imageBox}>
        <img src={Logo} className={classes.image} alt="React Logo" />
      </Grid>
    </Grid>
  );
};
