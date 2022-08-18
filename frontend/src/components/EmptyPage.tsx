import { IonContent, IonPage } from '@ionic/react';
import { FC, ReactNode } from 'react';

const EmptyPage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <IonPage>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default EmptyPage;
