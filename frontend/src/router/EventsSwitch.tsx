import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from 'pages/ErrorPages';
import Scanner from 'pages/Scanner';
import RestrictedRoute, { AccessLevel } from './RestrictedRoute';
import Login from 'pages/Login';
import { useUser } from 'redux/userSlice';
import { FC } from 'react';
import Events from 'pages/Events';

const EventsSwitch: FC = () => {
  const user = useUser();

  return (
    <Switch>
      <RestrictedRoute
        path="/connexion/"
        accessLevel={AccessLevel.ANONYM}
        redirectTo="/events/"
        exact={true}
        strict={true}
      >
        <Login />
      </RestrictedRoute>
      <RestrictedRoute path="/events/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Events />
      </RestrictedRoute>
      <RestrictedRoute path="/events/:id/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Scanner />
      </RestrictedRoute>
      <Route
        path="/"
        exact={true}
        strict={false}
        render={() => (user.data ? <Redirect to="/events/" /> : <Redirect to="/connexion/" />)}
      />
      <Route component={NotFound} exact={false} strict={false} />
    </Switch>
  );
};

export default EventsSwitch;
