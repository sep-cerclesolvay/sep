import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

const BasketEmpty: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <p>Aucun Produit</p>
      </IonLabel>
    </IonItem>
  );
};

export default BasketEmpty;
