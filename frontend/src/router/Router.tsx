import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from 'components/Menu';
import NotFound from 'pages/NotFound';
import Stock from 'pages/Stock/Stock';
import Sales from 'pages/Sales';
import Entries from 'pages/Entries';
import Basket from 'pages/Basket';
import Scanner from 'pages/Scanner';
import EntryForm from 'pages/EntryForm';
import RestrictedRoute from './RestrictedRoute';
import QrCode from 'pages/QrCode';
import useUser from 'hooks/useUser';
import Login from 'pages/Login';

const Router: React.VFC = () => {
  const user = useUser();
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/qr" component={QrCode} exact={true} strict={true} />
          <Route path="/qr/:id" component={QrCode} exact={true} strict={true} />
          <RestrictedRoute path="/connexion" canAccess={!user} redirectTo="/stock" component={Login} />
          <RestrictedRoute path="/stock" canAccess={!!user} component={Stock} />
          <RestrictedRoute path="/ventes" canAccess={!!user} component={Sales} />
          <RestrictedRoute path="/ventes/pannier" canAccess={!!user} component={Basket} />
          <RestrictedRoute path="/ventes/scanner" canAccess={!!user} component={Scanner} />
          <RestrictedRoute path="/ventes/:id/pannier" canAccess={!!user} component={Basket} />
          <RestrictedRoute path="/ventes/:id/scanner" canAccess={!!user} component={Scanner} />
          <RestrictedRoute path="/entrees" canAccess={!!user} component={Entries} />
          <RestrictedRoute path="/entrees/ajouter" canAccess={!!user} component={EntryForm} />
          <RestrictedRoute path="/entrees/:id" canAccess={!!user} component={EntryForm} />
          <Route path="/" exact={true} strict={false}>
            {user ? <Redirect to="/stock" /> : <Redirect to="/qr" />}
          </Route>
          <Route component={NotFound} exact={false} strict={false} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default Router;
