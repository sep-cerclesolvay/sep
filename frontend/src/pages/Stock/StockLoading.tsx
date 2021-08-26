import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSkeletonText } from '@ionic/react';
import { VFC } from 'react';
import classes from './Stock.module.scss';

const BasketLoading: VFC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <IonSkeletonText animated style={{ width: '35%', height: '20px' }} />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className={classes.item}>
          <IonSkeletonText animated style={{ width: '50%' }} />
          <IonSkeletonText animated style={{ width: '50%' }} />
          <IonSkeletonText animated style={{ width: '50%' }} />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default BasketLoading;
