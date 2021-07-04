import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/react';
import Page from 'components/Page';
import { qrCodeOutline, qrCodeSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import { VFC } from 'react';

const Basket: VFC = () => {
  return (
    <Page title="Pannier">
      <IonList>
        <IonItemSliding disabled={false}>
          <IonItem>
            <IonLabel>
              Item{' '}
              <IonButton>
                <IonIcon slot="icon-only" ios={trashBinOutline} md={trashBinSharp} />
              </IonButton>
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption>
              <IonIcon slot="icon-only" ios={trashBinOutline} md={trashBinSharp} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      </IonList>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ventes/scanner">
          <IonIcon ios={qrCodeOutline} md={qrCodeSharp} />
        </IonFabButton>
      </IonFab>
    </Page>
  );
};

export default Basket;
