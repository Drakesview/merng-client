import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const ApolloServer = () => {
  const httpLink = createHttpLink({
    uri: "https://desolate-wave-28028.herokuapp.com/",
  });

  const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return{
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });



  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloServer;
