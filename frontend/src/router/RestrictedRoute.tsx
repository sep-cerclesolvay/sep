import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';

export interface RestrictedRouteProps extends RouteProps {
  canAccess: boolean;
  redirectTo?: LocationDescriptor;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children, canAccess, redirectTo = '/connexion', ...props }) => {
  return <Route {...props} render={() => (canAccess ? children : <Redirect to={redirectTo} />)} />;
};

export default RestrictedRoute;
