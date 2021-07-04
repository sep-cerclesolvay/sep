import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import Page from 'components/Page';
import { addCircleOutline, addCircleSharp } from 'ionicons/icons';
import { VFC } from 'react';

const Sales: VFC = () => {
  return (
    <Page title="Ventes">
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ventes/scanner">
          <IonIcon ios={addCircleOutline} md={addCircleSharp} />
        </IonFabButton>
      </IonFab>
    </Page>
  );
};

export default Sales;
