import React, { useState, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import { Grid, TextField, Button } from "@material-ui/core";
import image from "../../../images/bike-guy.svg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import { emailIsValid } from "../../_comp/_form/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
// import { useLoading } from "js/_helpers";

const cookies = new Cookies();

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
  forgot: {
    marginLeft: theme.spacing(50),
  },
}));

export const Login: React.FC = () => {
  const classes = useStyles();

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

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "email" && !emailIsValid(value).status) {
        setErrors({ ...errors, email: "Oops your email address is invalid" });
      } else {
        delete errors?.email;
        setErrors(errors);
      }

      setEmail(value);
    },
    [errors, setEmail, setErrors],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // setShow(false);
    await login({
      variables: { username: email, password },
    })
      .then(({ data }) => {
        const tokens = data.login ?? null;

        if (tokens) {
          const { access_token, refresh_token, expires_in } = tokens;
          const expiry_date = new Date();
          expiry_date.setSeconds(
            expiry_date.getSeconds() + parseInt(expires_in),
          );

          cookies.set("access_token", access_token, {
            path: "/",
            expires: expiry_date,
          });

          cookies.set("refresh_token", refresh_token, {
            path: "/",
            expires: expiry_date,
          });
        }
      })
      .catch((error: AxiosError) => {
        toast?.error(error.message);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.textfield}
              name="email"
              value={email}
              placeholder="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              error={!!errors?.email}
              label="Email Address"
              onChange={handleChange}
            />
            <TextField
              className={classes.textfield}
              id="password"
              value={password}
              placeholder="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              required
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Button className={classes.forgot}>Forgot Password</Button>
          </form>
          <Grid container justify="center" alignItems="center">
            <div className={classes.social}>
              <Grid item xs={12}>
                <Typography component="h1" variant="body1">
                  Or Login with
                </Typography>
              </Grid>
            </div>
          </Grid>
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs>
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
        <img src={image} className={classes.image} alt="Bicycle Image" />
      </Grid>
    </Grid>
  );
};
