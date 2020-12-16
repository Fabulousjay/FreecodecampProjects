import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Header from "../header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Body } from "../Body/Body";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },

    header: {},

    body: {},
  }),
);

export const Base = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header className={classes.header} />

      <Sidebar />

      <Body className={classes.body} />
    </div>
  );
};
