import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "classnames";
import React from "react";
import SiteSelector from "../../../_comp/SiteSelector/SiteSelector";
import AppBar from "@material-ui/core/AppBar";
const drawerWidth = 240;
interface Props {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "10px 25px",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    siteSelector: {},
  }),
);

export default function Header({ className }: Props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={clsx(className, classes.root)}>
        <SiteSelector className={classes.siteSelector} />
      </div>
    </AppBar>
  );
}
