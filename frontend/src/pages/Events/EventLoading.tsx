import { IonCard, IonCardHeader, IonCardTitle, IonSkeletonText } from '@ionic/react';
import { FC } from 'react';

const EntryLoading: FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <IonSkeletonText animated style={{ width: '45%', height: '19px', margin: '2px' }} />
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default EntryLoading;
