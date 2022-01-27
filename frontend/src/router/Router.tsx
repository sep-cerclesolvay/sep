import { IonAlert, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from 'components/Menu';
import { NotFound } from 'pages/ErrorPages';
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
import { useRef, useState } from 'react';
import LeavePrompt from 'components/LeavePrompt';
import { useAppDispatch } from 'redux/hooks';
import { initializeNewSale } from 'redux/basketSlice';

const Router: React.VFC = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const [leaveConfirmMessage, setLeaveConfirmMessage] = useState<string>();
  const confirmCallback = useRef<(ok: boolean) => void>();

  return (
    <IonReactRouter
      getUserConfirmation={(message, callback) => {
        setLeaveConfirmMessage(message);
        confirmCallback.current = (ok: boolean) => {
          if (ok) dispatch(initializeNewSale());
          callback(ok);
        };
      }}
    >
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <RestrictedRoute path="/qr/:slug/:base58Id" canAccess={!!user.data} exact={true} strict={true}>
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
            {user.data ? <Redirect to="/stock" /> : <Redirect to="/connexion" />}
          </Route>
          <Route component={NotFound} exact={false} strict={false} />
        </IonRouterOutlet>
      </IonSplitPane>
      <IonAlert
        isOpen={!!leaveConfirmMessage}
        message={leaveConfirmMessage}
        buttons={[
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              confirmCallback.current && confirmCallback.current(false);
            },
          },
          {
            text: 'Oui, quitter la page',
            role: 'destructive',
            handler: () => {
              confirmCallback.current && confirmCallback.current(true);
            },
          },
        ]}
        onDidDismiss={() => setLeaveConfirmMessage(undefined)}
      />
      <LeavePrompt />
    </IonReactRouter>
  );
};

export default Router;
