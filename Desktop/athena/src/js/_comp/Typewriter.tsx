import { createStyles, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import React, { FC, memo } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    line: {
      position: "relative",
      top: "50%",
      width: "24em",
      margin: "0 auto",
      borderRight: "2px solid rgba(255,255,255,.75)",
      fontSize: "180%",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      transform: "translateY(-50%)",
    },
    animTypewriter: {
      animation:
        "typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 500ms steps(44) infinite normal",
    },
    "@keyframes typewriter": {
      from: { width: 0 },
      to: { width: "24em" },
    },
    "@keyframes blinkTextCursor": {
      from: { borderRightColor: "rgba(255,255,255,.75)" },
      to: { borderRightColor: "transparent" },
    },
  }),
);
interface TypewriterProps {
  words: string[];
}

export const Typewriter: FC<TypewriterProps> = memo(() => {
  const classes = useStyles();

  return <div className={classnames(classes.line, classes.animTypewriter)} />;
});
