import { VFC } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import Page from 'components/Page';
import classes from './NotFound.module.scss';

const NotFoundPage: VFC = () => {
  return (
    <Page title="404 Non trouvée">
      <div className={classes.not_found}>
        <div>
          <h1>404</h1>
          <p>La page que vous recherchez n&apos;existe pas ou a été supprimée</p>
        </div>
        <IonButton color="primary" routerLink="/" routerDirection="back" expand="block">
          <IonIcon icon={arrowBackOutline} slot="start" />
          {"Retour à la page d'accueil"}
        </IonButton>
      </div>
    </Page>
  );
};

export default NotFoundPage;
