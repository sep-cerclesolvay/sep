import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

const SaleEmpty: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <p>Aucune Vente</p>
      </IonLabel>
    </IonItem>
  );
};

export default SaleEmpty;
