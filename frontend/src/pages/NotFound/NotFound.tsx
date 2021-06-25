import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import Page from 'components/Page';
import classes from './NotFound.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <Page title="404 Not Found" className={classes.not_found}>
      <h1>404</h1>
      <p>Not found</p>
      <IonButton color="primary" routerLink="/" routerDirection="back">
        <IonIcon icon={arrowBackOutline} slot="start" />
        {"Retour à la page d'accueil"}
      </IonButton>
    </Page>
  );
};

export default NotFoundPage;
