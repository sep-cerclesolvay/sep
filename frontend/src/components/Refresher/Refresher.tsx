import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { useEffect, useRef, VFC } from 'react';

export interface RefresherProps {
  isLoading: boolean;
  onRefresh: () => void;
}

const Refresher: VFC<RefresherProps> = ({ isLoading, onRefresh }) => {
  const ref = useRef<HTMLIonRefresherElement>(null);
  useEffect(() => {
    if (!isLoading) ref.current?.complete();
  }, [isLoading]);

  return (
    <IonRefresher ref={ref} slot="fixed" onIonRefresh={onRefresh}>
      <IonRefresherContent />
    </IonRefresher>
  );
};

export default Refresher;
