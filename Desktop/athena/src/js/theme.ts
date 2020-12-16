import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    include: { [key: string]: any };
    design: {
      font: { [key: string]: any };
      colors: {
        primary: { [key: string]: string };
      };
    };
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    include?: { [key: string]: any };
    design?: {
      font?: { [key: string]: any };
      colors?: {
        primary?: { [key: string]: string };
      };
    };
  }
}

export default createMuiTheme({
  typography: {
    fontFamily: [
      // 'rooney-sans, sans-serif',
      "brandon-grotesque, sans-serif",
    ].join(","),
    fontSize: 16,
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
    },
    h3: {},
    h4: {},
    h5: {
      fontSize: "1.4rem",
    },
    h6: {},
  },
  include: {
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
      color: "#274C77",
      borderColor: "#FFFFFF",
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
        color: "#FFFFFF",
        borderColor: "#274C77",
      },
      "&:hover:before, &:focus": {
        opacity: "1",
        backgroundColor: "#274C77",
        WebkitTransform: "rotate3d(0, 0, 1, 0deg)",
        transform: "rotate3d(0, 0, 1, 0deg)",
        WebkitTransitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
        transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)",
      },
    },
    title: {
      fontWeight: 600,
      letterSpacing: "2px",
    },
    subTitle: {
      fontWeight: 500,
    },
  },
  design: {
    font: {
      brandon: (weight: 400) => ({
        "font-family": '"brandon-grotesque", sans-serif',
        "font-weight": weight,
      }),
      title: '"auto-pro-new", sans-serif',
      regular: "brandon-grotesque",
    },
    colors: {
      primary: {
        width: "1366px",
        blue: "#0889F7",
        orange: "#E8505B",
        darkBlue: "#274C77",
        red: "#E63946",
        honey: "#F7FFF7",
        grey: "#3A3335",
        charcoal: "#2A2D34",
        white: "#FFFFFF",
        offWhite: "#F6F7F8",
      },
    },
  },
});
