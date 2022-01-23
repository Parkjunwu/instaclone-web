import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Header from './components/Header';
import Layout from './components/Layout';
import routes from './routes';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Profile from './screens/Profile';
import SignUp from './screens/SignUp';
import { darkTheme, GlobalStyle, lightTheme } from './styles';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode?lightTheme:darkTheme}>
        <GlobalStyle/>
          <Router>
            <Switch>
              <Route path={routes.home} exact >
                {isLoggedIn?(
                <Layout>
                  <Home />
                </Layout>
                ):<Login />}
              </Route>
              {!isLoggedIn?<Route path={routes.signUp} exact >
                <SignUp />
              </Route> : null}
              <Route path="/users/:userName" >
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route>
                <NotFound/>
              </Route>
              
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
