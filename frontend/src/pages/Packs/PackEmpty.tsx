import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

const PackEmpty: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <p>Aucun Pack</p>
      </IonLabel>
    </IonItem>
  );
};

export default PackEmpty;
