import React, { createContext, useState, ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import Cookies from "universal-cookie";
import { setContext } from "@apollo/client/link/context";

const initial = {
  gqlError: { msg: "" },
};

export const AppStateContext = createContext(initial);

function AppStateProvider({ children }: { children: ReactNode }) {
  // app state
  const cookies = new Cookies(); // eslint-disable-next-line
  const [gqlError, setGQLError] = useState({ msg: "" });

  // apollo client
  const cache = new InMemoryCache({});
  const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPH_QL_URL });

  const authLink = setContext((_, { headers }) => {
    const token = cookies.get("token");

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  return (
    <AppStateContext.Provider
      value={{
        gqlError,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
