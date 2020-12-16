import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classnames from "classnames";
import React, { createElement, FC, memo, useCallback } from "react";
import { CommonProps } from "../../types";

export interface ServiceProps extends CommonProps {
  icon: any;
  title: string;
  subTitle: string;
  content: any;
}

interface ComponentProps extends ServiceProps {
  index: number;
  type?: "default" | "expanded" | "condensed";
  onClick: (index: number) => void;
}

const useStyles = (type = "default") => {
  let styles;
  switch (type) {
    case "expanded":
      styles = useExpandedStyles;
      break;
    case "condensed":
      styles = useCondensedStyles;
      break;
    default:
      styles = useDefaultStyles;
      break;
  }

  return styles;
};

const bgColor = "#00BBFF"; // '#F86624';
const textColor = "#2A2D34";

const useDefaultStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: "1.42857",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      display: "flex",
      transition: "background-color .3s ease-in-out",
      height: 450,
      width: "25%",
      borderBottom: 0,
      color: bgColor, // theme.design.colors.primary.blue,
      "&:not(:last-child)": {
        borderRight: "1px solid #C1CAD6", // + theme.design.colors.primary.honey
      },
      "&:hover": {
        color: textColor, // theme.design.colors.primary.blue
        backgroundColor: bgColor, // theme.design.colors.primary.blue
      },
    },
    face: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: 1.42857,
      margin: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      cursor: "pointer",
      overflow: "hidden",
      // transition: 'all .3s ease-in-out',
      height: "100%",
      boxShadow: "none!important",
      zIndex: 2,
      width: "100%",
      padding: "120px 30px 20px",
      "&:hover > svg": {
        top: "-5px",
        transition: "all .3s ease-in-out",
      },
    },
    faceActive: {},
    info: {
      overflow: "hidden",
    },
    iconWrapper: {
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      speak: "none",
      textTransform: "none",
      "-webkit-font-smoothing": "antialiased",
      letterSpacing: ".035em",
      fontSize: "2.7em",
      display: "block",
      width: "100%",
      marginBottom: "20px",
      position: "relative",
      transition: "all .3s ease-in-out",
      top: "-5px",
    },
    icon: {
      fontSize: "1em",
    },
    title: {
      "-webkit-font-smoothing": "antialiased",
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      lineHeight: "2.2em",
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: 30,
      minWidth: 200,
      fontSize: "1.3em",
      color: theme.design.colors.primary.grey,
      "& >h2": {
        fontWeight: 500,
        margin: 0,
        textAlign: "left",
        letterSpacing: ".035em",
        fontFamily: "brandon-grotesque",
      },
    },
    subTitle: {
      "-webkit-font-smoothing": "antialiased",
      color: textColor,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "1.42857",
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      display: "block",
      minWidth: 220,
    },
    content: {
      display: "none",
    },
  }),
);

const useExpandedStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      "-webkit-font-smoothing": "antialiased",
      color: textColor,
      fontSize: 16,
      lineHeight: "1.42857",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      transition: "width .3s ease-in-out",
      height: 450,
      borderBottom: 0,
      zIndex: 3,
      display: "flex",
      width: "70%",
      outline: "none",
      boxShadow: "0 30px 40px -30px rgba(0,0,0,.5),0 0 10px 0 rgba(0,0,0,.1)",
    },
    face: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: 1.42857,
      margin: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      cursor: "pointer",
      overflow: "hidden",
      transition: "all .3s ease-in-out",
      height: "100%",
      boxShadow: "none!important",
      background: bgColor, // theme.design.colors.primary.darkBlue,
      zIndex: 2,
      width: "35%",
      padding: "120px 30px 20px",
      minWidth: 334,
      maxWidth: 334,
    },
    info: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: "1.42857",
      margin: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      alignItems: "center",
      width: "65%",
      borderLeft: 0,
      borderRight: 0,
      padding: "0 40px",
      position: "static",
      display: "flex",
      zIndex: 1,
      overflow: "hidden",
    },
    iconWrapper: {
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      font: "normal normal normal 14px/1 eveIcons",
      speak: "none",
      textTransform: "none",
      "-webkit-font-smoothing": "antialiased",
      letterSpacing: ".035em",
      fontSize: "2.7em",
      display: "block",
      width: "100%",
      marginBottom: "20px",
      position: "relative",
      transition: "all .3s ease-in-out",
      top: "-5px",
    },
    icon: {
      fontSize: "1em",
    },
    title: {
      "-webkit-font-smoothing": "antialiased",
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      lineHeight: "2.2em",
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: 30,
      minWidth: 200,
      fontSize: "1.3em",
      "& >h2": {
        fontWeight: 500,
        margin: 0,
        textAlign: "left",
        letterSpacing: ".035em",
        fontFamily: "brandon-grotesque",
      },
    },
    subTitle: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 20,
      fontWeight: 300,
      lineHeight: "1.42857",
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      display: "block",
      minWidth: 220,
    },
    content: {
      "-webkit-font-smoothing": "antialiased",
      lineHeight: "1.42857",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      width: "100%",
      position: "relative",
      fontSize: "1.14em",
      transition: "all .3s ease-in-out",
      opacity: 1,
      transitionDelay: ".4s",
      top: 0,
      "& a": {
        color: theme.design.colors.primary.red,
        fontWeight: 700,
      },
    },
  }),
);

const useCondensedStyles = makeStyles(() =>
  createStyles({
    main: {
      "-webkit-font-smoothing": "antialiased",
      color: bgColor,
      fontSize: 16,
      lineHeight: "1.42857",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      transition: "width .5s ease-in-out",
      height: 450,
      borderBottom: 0,
      zIndex: 3,
      display: "flex",
      width: "10%",
      outline: "none",
      "&:not(:first-child)": {
        borderLeft: "1px solid #C1CAD6",
      },
    },
    face: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: 1.42857,
      margin: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      position: "relative",
      cursor: "pointer",
      overflow: "hidden",
      transition: "all .3s ease-in-out",
      height: "100%",
      boxShadow: "0 0 40px -30px transparent,0 0 10px 0 transparent",
      zIndex: 1,
      width: "100%",
      padding: "120px 25px 30px",
      minWidth: "auto!important",
      maxWidth: "100%!important",
    },
    info: {
      "-webkit-font-smoothing": "antialiased",
      fontSize: 16,
      lineHeight: "1.42857",
      margin: 0,
      boxSizing: "border-box",
      letterSpacing: ".035em",
      alignItems: "center",
      width: "65%",
      borderLeft: 0,
      borderRight: 0,
      padding: "0 40px",
      position: "absolute",
      display: "flex",
      zIndex: -1,
      overflow: "hidden",
    },
    iconWrapper: {
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      font: "normal normal normal 14px/1 eveIcons",
      speak: "none",
      textTransform: "none",
      "-webkit-font-smoothing": "antialiased",
      letterSpacing: ".035em",
      fontSize: "2.7em",
      display: "block",
      width: "100%",
      marginBottom: "20px",
      position: "relative",
      transition: "all .3s ease-in-out",
      top: "-5px",
    },
    icon: {
      width: "100%",
      fontSize: "1em",
    },
    title: {
      color: textColor,
      transformOrigin: "bottom left",
      transform: "rotate(90deg) translateY(50%)",
      width: "100%",
      position: "absolute",
      top: 100,
      left: "50%",
      "-webkit-font-smoothing": "antialiased",
      cursor: "pointer",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      lineHeight: "1.8em",
      fontWeight: 700,
      letterSpacing: "1px",
      minWidth: 260,
      fontSize: ".95em",
      "& >h2": {
        fontWeight: 400,
        textAlign: "left",
        fontFamily: "brandon-grotesque",
      },
    },
    subTitle: {
      display: "none",
    },
    content: {
      display: "none",
    },
  }),
);

export const Service: FC<ComponentProps> = memo(
  ({ title, subTitle, icon, className, onClick, index, type }) => {
    const classes = useStyles(type)();

    const handleClick = useCallback(() => {
      onClick(index);
    }, [index, onClick]);

    return (
      <div
        className={classnames(className, classes.main)}
        onClick={handleClick}
      >
        <div className={classes.face}>
          <div className={classes.iconWrapper}>
            {createElement(icon, { className: classes.icon })}
          </div>
          <div className={classes.title}>
            <h2>{title}</h2>
          </div>
          {subTitle && <div className={classes.subTitle}>{subTitle}</div>}
        </div>
        <div className={classes.info}>
          <div className={classes.content}>
            <p>
              We believe that returning something should be as easy as buying
              it.
            </p>
            <p>
              If you want to return the bed frame, you have a 14-day return
              policy. The bed frame must be returned unused and in the original
              packaging.
            </p>
            <p>
              Full details can be found on our{" "}
              <a href="../../../refunds-returns">refund and returns page</a>.
            </p>
          </div>
        </div>
      </div>
    );
  },
);
