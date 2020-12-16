import {
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import jssPluginExtend from "jss-plugin-extend";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import Cookies from "universal-cookie";
import "../sass/style.scss";
import theme from "./theme";
import { PasswordReset, VerifyEmail, Login, SignUp } from "./_auth";
import { Cms, routePrefix, MenuPage } from "./_cms";

const jss = create({
  plugins: [...jssPreset().plugins, jssPluginExtend()],
});

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const isLoggedIn = (): boolean => {
    const cookie = new Cookies();

    /**
     * check if user is valid
     */
    return !!cookie.get("token");
  };

  const renderApp = () =>
    isLoggedIn() ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );

  return <Route {...rest} render={renderApp} />;
};

interface Props {
  className?: string;
}

const App: React.FC<Props> = () => {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute path={`${routePrefix}`}>
              <Cms />
            </PrivateRoute>
            <Route exact path={"/login"}>
              <Login />
            </Route>
            <Route exact path={"/verify-email"}>
              <VerifyEmail />
            </Route>
            <Route exact path={"/forgot-password"}>
              <PasswordReset />
            </Route>
            <Route exact path={"/register"}>
              <SignUp />
            </Route>
            <Route exact path={"/menu-page"}>
              <MenuPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};
export default App;
