import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from 'pages/ErrorPages';
import Stock from 'pages/Stock/Stock';
import Sales from 'pages/Sales';
import Entries from 'pages/Entries';
import Basket from 'pages/Basket';
import Scanner from 'pages/Scanner';
import RestrictedRoute, { AccessLevel } from './RestrictedRoute';
import QrCode from 'pages/QrCode';
import Login from 'pages/Login';
import { useUser } from 'redux/userSlice';
import Packs from 'pages/Packs';
import { FC } from 'react';

const SEPSwitch: FC = () => {
  const user = useUser();

  return (
    <Switch>
      <RestrictedRoute path="/qr/:slug/:base58Id/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <QrCode />
      </RestrictedRoute>
      <RestrictedRoute
        path="/connexion/"
        accessLevel={AccessLevel.ANONYM}
        redirectTo="/stock/"
        exact={true}
        strict={true}
      >
        <Login />
      </RestrictedRoute>
      <RestrictedRoute path="/stock/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Stock />
      </RestrictedRoute>
      <RestrictedRoute path="/packs/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Packs />
      </RestrictedRoute>
      <RestrictedRoute path="/ventes/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Sales />
      </RestrictedRoute>
      <RestrictedRoute path="/ventes/pannier/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Basket />
      </RestrictedRoute>
      <RestrictedRoute path="/ventes/scanner/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Scanner />
      </RestrictedRoute>
      <RestrictedRoute
        path="/ventes/:id/pannier/"
        accessLevel={AccessLevel.AUTHENTICATED}
        component={Basket}
        exact={true}
        strict={true}
      >
        <Basket />
      </RestrictedRoute>
      <RestrictedRoute path="/ventes/:id/scanner/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Scanner />
      </RestrictedRoute>
      <RestrictedRoute path="/entrees/" accessLevel={AccessLevel.AUTHENTICATED} exact={true} strict={true}>
        <Entries />
      </RestrictedRoute>
      <Route
        path="/"
        exact={true}
        strict={false}
        render={() => (user.data ? <Redirect to="/stock/" /> : <Redirect to="/connexion/" />)}
      />
      <Route component={NotFound} exact={false} strict={false} />
    </Switch>
  );
};

export default SEPSwitch;
