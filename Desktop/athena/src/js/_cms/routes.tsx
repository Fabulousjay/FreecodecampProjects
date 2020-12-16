interface RouteProps {
  name: string;
  path: string;
}

export const routePrefix = "/admin";

export const routes: RouteProps[] = [
  {
    name: "Dashboard",
    path: `${routePrefix}/`,
  },
  {
    name: "Pages",
    path: `${routePrefix}/pages`,
  },
];
