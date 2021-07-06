import { IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { VFC } from 'react';

const BasketLoading: VFC = () => {
  return (
    <IonItem>
      <IonLabel>
        <h2>
          <IonSkeletonText animated style={{ width: '50%' }} />
        </h2>
        <p>
          <IonSkeletonText animated style={{ width: '80%' }} />
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default BasketLoading;
