import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

const BasketEmpty: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <p>Le panier est vide</p>
      </IonLabel>
    </IonItem>
  );
};

export default BasketEmpty;
