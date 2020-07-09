import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ authToken, user }) => (
      <Route
        {...rest}
        render={props => {
          if (Object.keys(rest).includes("page")) props.page = rest.page;
          if (Object.keys(rest).includes("pageProps")) props.pageProps = rest.pageProps;

          const authorized = (!rest.authorizedRole || user?.hasRole(rest.authorizedRole))
          return (authToken && authorized) ? (
            <Component {...props} user={user} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }}
      />
    )}
  </AuthContext.Consumer>
);

export default PrivateRoute;
