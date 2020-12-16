import { createStyles, makeStyles } from "@material-ui/core";
import React, { FC, memo } from "react";

interface SnackbarProps {
  timeout?: number;
  message: string;
  showCloseButton?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    "@keyframes fade": {
      "0%": {
        opacity: 0,
        top: 110,
      },
      "25%": {
        opacity: 0.25,
      },
      "50%": {
        opacity: 0.5,
      },
      "75%": {
        opacity: 0.75,
      },
      "100%": {
        top: 100,
        opacity: 1,
      },
    },
    root: {
      display: "inline",
      textAlign: "center",
      boxShadow: "0 0 1px 2px #274C77",
      padding: "7px 10px",
      position: "fixed",
      top: 100,
      right: 40,
      background: "#274C77",
      color: "#fff",
      borderColor: "#274C77",
      border: "2px solid #274C77",
      borderRadius: 2,
      animationName: "$fade",
      animationDuration: ".5s",
    },
  }),
);

export const Snackbar: FC<SnackbarProps> = memo(
  ({ message, showCloseButton }) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        {message}
        {showCloseButton && <span>x</span>}
      </div>
    );
  },
);
