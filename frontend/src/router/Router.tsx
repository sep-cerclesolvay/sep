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
import Login from 'pages/Login';
import { useUser } from 'redux/userSlice';
import Packs from 'pages/Packs';

const Router: React.VFC = () => {
  const user = useUser();
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <RestrictedRoute path="/qr/:slug/:id" canAccess={!!user.data} exact={true} strict={true}>
            <QrCode />
          </RestrictedRoute>
          <RestrictedRoute path="/connexion" canAccess={!user.data} redirectTo="/stock" exact={true} strict={true}>
            <Login />
          </RestrictedRoute>
          <RestrictedRoute path="/stock" canAccess={!!user.data} exact={true} strict={true}>
            <Stock />
          </RestrictedRoute>
          <RestrictedRoute path="/packs" canAccess={!!user.data} exact={true} strict={true}>
            <Packs />
          </RestrictedRoute>
          <RestrictedRoute path="/ventes" canAccess={!!user.data} exact={true} strict={true}>
            <Sales />
          </RestrictedRoute>
          <RestrictedRoute path="/ventes/pannier" canAccess={!!user.data} exact={true} strict={true}>
            <Basket />
          </RestrictedRoute>
          <RestrictedRoute path="/ventes/scanner" canAccess={!!user.data} exact={true} strict={true}>
            <Scanner />
          </RestrictedRoute>
          <RestrictedRoute
            path="/ventes/:id/pannier"
            canAccess={!!user.data}
            component={Basket}
            exact={true}
            strict={true}
          >
            <Basket />
          </RestrictedRoute>
          <RestrictedRoute path="/ventes/:id/scanner" canAccess={!!user.data} exact={true} strict={true}>
            <Scanner />
          </RestrictedRoute>
          <RestrictedRoute path="/entrees" canAccess={!!user.data} exact={true} strict={true}>
            <Entries />
          </RestrictedRoute>
          <RestrictedRoute path="/entrees/ajouter" canAccess={!!user.data} exact={true} strict={true}>
            <EntryForm />
          </RestrictedRoute>
          <RestrictedRoute path="/entrees/:id" canAccess={!!user.data} exact={true} strict={true}>
            <EntryForm />
          </RestrictedRoute>
          <Route path="/" exact={true} strict={false}>
            {user.data ? <Redirect to="/stock" /> : <Redirect to="/qr" />}
          </Route>
          <Route component={NotFound} exact={false} strict={false} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default Router;
