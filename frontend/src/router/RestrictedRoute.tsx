import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import { Unauthorized } from 'pages/ErrorPages';

export interface RestrictedRouteProps extends RouteProps {
  canAccess: boolean;
  redirectTo?: LocationDescriptor;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children, canAccess, redirectTo, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (canAccess ? children : redirectTo ? <Redirect to={redirectTo} /> : <Unauthorized />)}
    />
  );
};

export default RestrictedRoute;
