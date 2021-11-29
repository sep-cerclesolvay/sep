import { IonRefresher, IonRefresherContent } from '@ionic/react';
import { useEffect, useRef, VFC } from 'react';

export interface RefresherProps {
  isLoading: boolean;
  onRefresh: () => void;
  disabled?: boolean;
}

const Refresher: VFC<RefresherProps> = ({ isLoading, onRefresh, disabled }) => {
  const ref = useRef<HTMLIonRefresherElement>(null);
  useEffect(() => {
    if (!isLoading) ref.current?.complete();
  }, [isLoading]);

  return (
    <IonRefresher ref={ref} slot="fixed" onIonRefresh={onRefresh} disabled={disabled}>
      <IonRefresherContent />
    </IonRefresher>
  );
};

export default Refresher;
