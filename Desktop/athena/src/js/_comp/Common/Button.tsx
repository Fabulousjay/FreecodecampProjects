import {
  Button as MButton,
  ButtonProps as MButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import classnames from "classnames";
import React, { FC, memo } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: 50,
      fontWeight: 600,
      padding: "8px 20px",
      position: "relative",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: theme.design.colors.primary.white,
      borderRadius: 4,
      border: `4px solid ${theme.design.colors.primary.white}`,

      overflow: "hidden",
      "-webkit-transition": "border-color 0.3s, background-color 0.3s",
      transition: "border-color 0.3s, background-color 0.3s",
      "-webkit-transition-timing-function": "cubic-bezier(0.2, 1, 0.3, 1)",
      transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",

      zIndex: 1,
      float: "left",
      display: "block",
      background: "none",
      verticalAlign: "middle",
      "-webkit-backface-visibility": "hidden",
      "-moz-osx-font-smoothing": "grayscale",
      "&:after": {
        top: 0,
        left: 0,
        opacity: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        content: "attr(data-text)",
        transform: "translate3d(0, 25%, 0)",
        "-webkit-transform": "translate3d(0, 25%, 0)",
      },
      "&:hover": {
        backgroundPosition: "0 100%",
        color: theme.design.colors.primary.blue,
        // background: theme.design.colors.primary.white,
        // borderColor: theme.design.colors.primary.white,
      },
    },
    "@keyframes gradient": {
      from: { width: 0 },
      to: { width: "100%" },
    },
    anim: {
      zIndex: 1,
      padding: "8px 25px",
      background: "none",
      overflow: "hidden",
      position: "relative",
      verticalAlign: "middle",
      MozOsxFontSmoothing: "grayscale",
      "-webkit-backface-visibility": "hidden",
      color: theme.design.colors.primary.darkBlue,
      borderColor: theme.design.colors.primary.white,
      transition: "border-color 0.3s, color 0.3s",
      "-webkit-transition": "border-color 0.3s, color 0.3s",
      "-webkit-transition-timing-function": "cubic-bezier(0.2, 1, 0.3, 1)",
      transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
      border: "4px solid",
      fontWeight: 600,
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontSize: 16,
      "&::before": {
        content: "''",
        position: "absolute",
        top: "0",
        left: "0",
        width: "150%",
        height: "100%",
        background: "#37474f",
        zIndex: "-1",
        WebkitTransform: "rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0)",
        transform: "rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0)",
        WebkitTransformOrigin: "0% 100%",
        transformOrigin: "0% 100%",
        WebkitTransition:
          "-webkit-transform 0.3s, opacity 0.3s, background-color 0.3s",
        transition: "transform 0.3s, opacity 0.3s, background-color 0.3s",
      },
      "&:hover, &:focus": {
        color: theme.design.colors.primary.white,
        borderColor: theme.design.colors.primary.darkBlue,
      },
      "&:hover:before, &:focus": {
        opacity: "1",
        backgroundColor: theme.design.colors.primary.darkBlue,
        WebkitTransform: "rotate3d(0, 0, 1, 0deg)",
        transform: "rotate3d(0, 0, 1, 0deg)",
        WebkitTransitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
        transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
      },
    },
  }),
);

interface ButtonProps extends Omit<MButtonProps, "endIcon" | "startIcon"> {
  className?: string;
  icon?: MButtonProps["endIcon"];
}

export const Button: FC<ButtonProps> = memo(
  ({ className, icon, children, ...props }) => {
    const classes = useStyles();

    return (
      <MButton
        endIcon={icon}
        className={classnames(classes.anim, className)}
        {...props}
      >
        {children}
      </MButton>
    );
  },
);
