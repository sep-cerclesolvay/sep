import { IonContent, IonPage } from '@ionic/react';
import { FC } from 'react';

const EmptyPage: FC = ({ children }) => {
  return (
    <IonPage>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default EmptyPage;
