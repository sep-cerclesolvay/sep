import { IonItem, IonLabel } from '@ionic/react';
import { VFC } from 'react';

export interface EmptyProps {
  message: string;
}

const Empty: VFC<EmptyProps> = ({ message }) => {
  return (
    <IonItem>
      <IonLabel>
        <p>{message}</p>
      </IonLabel>
    </IonItem>
  );
};

export default Empty;
