import { IonItem, IonLabel } from '@ionic/react';
import { FC } from 'react';

export interface EmptyProps {
  message: string;
}

const Empty: FC<EmptyProps> = ({ message }) => {
  return (
    <IonItem>
      <IonLabel>
        <p>{message}</p>
      </IonLabel>
    </IonItem>
  );
};

export default Empty;
