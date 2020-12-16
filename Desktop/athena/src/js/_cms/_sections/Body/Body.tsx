import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "classnames";
import { reduce } from "lodash";
import moment from "moment";
import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import { CommonProps } from "../../../types";
import {
  ResourceList,
  ResourceListConfigProps,
} from "../../../_comp/ResourceList";
import { routePrefix } from "../../routes";
import { Invoice } from "../../_pages/Invoice/Invoice";
import { ListItems } from "../../_pages/Menus/ListMenuItems";
import { CreateItems } from "../../_pages/Menus/CreateMenuItems";
import { EditItems } from "../../_pages/Menus/EditMenuItems";
import { CreateCustomers } from "../../_pages/Customers/CreateCustomers";
import { ListCustomers } from "../../_pages/Customers/ListCustomers";
import { EditCustomers } from "../../_pages/Customers/EditCustomers";
import { DeleteCustomers } from "../../_pages/Customers/DeleteCustomers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export interface ResourceConfigProps extends ResourceListConfigProps {
  component: any;
}

const ResourceConfig: ResourceConfigProps[] = [
  {
    source: "invoice",
    component: <Invoice />,
    list: {
      fields: [
        {
          value: (data: any) => data.title,
          label: "Contact",
        },
        {
          value: (data: any) => data.title,
          label: "Subject",
        },
        {
          value: (data: any) =>
            reduce(
              data.items,
              (acc: any, item: any) => acc + item.qty * item.unitPrice,
              0,
            ),
          label: "Total",
        },
        {
          value: (data: any) => moment(data.issue_date).endOf("day").fromNow(),
          label: "Issue Date",
        },
      ],
    },
  },
];

export const Body: FC<CommonProps> = memo(({ className }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={clsx(className, classes.root)}>
        <Switch>
          {ResourceConfig.map((config, index) => (
            <Route key={index} path={`${routePrefix}/${config.source}`}>
              <Switch>
                <Route exact path={`${routePrefix}/${config.source}`}>
                  <ResourceList config={config} />
                </Route>
                <Route exact path={`${routePrefix}/${config.source}/create`}>
                  <Invoice />
                </Route>
                <Route
                  exact
                  path={`${routePrefix}/${config.source}/update/:id`}
                >
                  <Invoice />
                </Route>
              </Switch>
            </Route>
          ))}
          <Route exact path={`${routePrefix}/menu`}>
            <ListItems />
          </Route>
          <Route exact path={`${routePrefix}/menu/create`}>
            <CreateItems />
          </Route>
          <Route exact path={`${routePrefix}/customers/create`}>
            <CreateCustomers />
          </Route>
          <Route exact path={`${routePrefix}/customers/list`}>
            <ListCustomers />
          </Route>
          <Route exact path={`${routePrefix}/menu/edit/:menuID`}>
            <EditItems />
          </Route>
          <Route exact path={`${routePrefix}/customers/edit`}>
            <EditCustomers />
          </Route>
          <Route exact path={`${routePrefix}/customers/delete`}>
            <DeleteCustomers />
          </Route>
        </Switch>
      </div>
    </main>
  );
});
