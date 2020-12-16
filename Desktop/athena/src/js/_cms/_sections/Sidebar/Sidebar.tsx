import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "classnames";
import React, { createElement, FC, memo } from "react";
import { FaFileInvoice as InvoiceIcon } from "react-icons/fa";
import {
  FiAperture as ApertureIcon,
  FiBook as BookIcon,
  FiLayout as LayoutIcon,
  FiMenu as MenuIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { CommonProps } from "../../../types";

interface PathProps {
  icon: any;
  name: string;
  route?: string;
  items?: PathProps[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },

    drawerPaper: {
      width: drawerWidth,
    },

    header: {},

    body: {},
  }),
);

const ADMIN_URI = process.env.REACT_APP_ADMIN_URI ?? "/admin";

const paths: PathProps[] = [
  {
    name: "Dashboard",
    icon: LayoutIcon,
    route: "/",
  },
  {
    name: "Menus",
    icon: MenuIcon,
    route: "/menu",
  },
  {
    name: "Orders",
    icon: BookIcon,
    route: "/orders",
  },
  {
    name: "Invoices",
    icon: InvoiceIcon,
    items: [
      {
        name: "Invoice",
        icon: InvoiceIcon,
        route: "/resources/invoice",
      },
    ],
  },
  {
    name: "Payments",
    icon: ApertureIcon,
    route: "/learning-plan",
  },

  {
    name: "Site Setting",
    icon: SettingsIcon,
    route: "/setting",
  },
];

const getRoute = (route?: string) =>
  route ? `${ADMIN_URI + route}` : "/dashboard";

interface SideLinksProps {
  className?: string;
}

const SideLinks: FC<SideLinksProps> = ({ className }) => {
  return (
    <div className={clsx("sidebar", className)}>
      <div className="sidebar__logo">ZINOX MEDIA</div>
      <ul className="sidebar__list">
        {paths.map(({ name, icon, route, items }, index) => (
          <li key={index} className="sidebar__list-item">
            {items ? (
              <div className="sidebar__link sidebar__link--extended">
                <span className="sidebar__icon">{createElement(icon)}</span>
                <span className="sidebar__link-title">{name}</span>
                <ul className="sidebar__list sidebar__link-list">
                  {items.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      className="sidebar__link"
                      activeClassName="sidebar__link--active"
                      exact
                      to={getRoute(item?.route)}
                    >
                      <span className="sidebar__icon">
                        {createElement(item.icon)}
                      </span>
                      <span className="sidebar__link-title">{item.name}</span>
                    </NavLink>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                key={index}
                className="sidebar__link"
                activeClassName="sidebar__link--active"
                exact
                to={`${ADMIN_URI + route}`}
              >
                <span className="sidebar__icon">{createElement(icon)}</span>
                <span className="sidebar__link-title">{name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Sidebar: FC<CommonProps> = memo(() => {
  const classes = useStyles();

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <SideLinks />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          <SideLinks />
        </Drawer>
      </Hidden>
    </nav>
  );
});
