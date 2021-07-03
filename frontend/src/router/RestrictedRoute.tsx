import { ComponentType, VFC } from 'react';
import { StaticContext } from 'react-router';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';

export interface RestrictedRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<RouteComponentProps<any, StaticContext, unknown>> | ComponentType<any>;
  canAccess: boolean;
  redirectTo?: LocationDescriptor;
}

const RestrictedRoute: VFC<RestrictedRouteProps> = ({
  component: Component,
  canAccess,
  redirectTo = '/connexion',
  ...props
}) => {
  return (
    <Route
      exact={true}
      strict={true}
      {...props}
      render={(props) => (canAccess ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  );
};

export default RestrictedRoute;
