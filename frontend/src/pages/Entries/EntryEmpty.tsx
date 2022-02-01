import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

const EntryEmpty: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <p>Aucune Entrée</p>
      </IonLabel>
    </IonItem>
  );
};

export default EntryEmpty;
