import {ApolloClient, createHttpLink, InMemoryCache, makeVar, NormalizedCacheObject, StoreObject} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const TOKEN = "TOKEN"
const DARK_MODE = "DARK_MODE"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token:string) => {
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
};
export const logUserOut = (history?:{replace:Function}) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history?.replace();
  // window.location.reload();
  client.resetStore()
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE,"enable")
  darkModeVar(true)
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE)
  darkModeVar(false)
};

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV==="production" ? "https://dashboard.heroku.com/apps/instaclonecloneclone/graphql" : "http://localhost:4000/graphql",
})
const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem(TOKEN)
  return {
    headers:{
      ...headers,
      token
    }
  }
})

export const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies:{
      User:{
        keyFields:(object) => `User:${object.userName}`
      }
    }
  }),
});