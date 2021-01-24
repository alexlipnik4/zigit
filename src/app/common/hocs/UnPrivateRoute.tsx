import Cookies from 'js-cookie';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnPrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = Cookies.get('access_token');

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: '/info', state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRoute;
