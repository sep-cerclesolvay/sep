import { IonAlert, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from 'components/Menu';
import { FC, Suspense, useRef, useState } from 'react';
import LeavePrompt from 'components/LeavePrompt';
import { useAppDispatch } from 'redux/hooks';
import { initializeNewSale } from 'redux/basketSlice';
import AliasSwitch from '@/router/switch';

const Router: FC = () => {
  const dispatch = useAppDispatch();
  const [leaveConfirmMessage, setLeaveConfirmMessage] = useState<string>();
  const confirmCallback = useRef<(ok: boolean) => void>();

  return (
    <IonReactRouter
      getUserConfirmation={(message, callback) => {
        setLeaveConfirmMessage(message);
        confirmCallback.current = (ok: boolean) => {
          if (ok) dispatch(initializeNewSale());
          callback(ok);
        };
      }}
    >
      <Suspense>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <AliasSwitch />
          </IonRouterOutlet>
        </IonSplitPane>
      </Suspense>
      <IonAlert
        isOpen={!!leaveConfirmMessage}
        message={leaveConfirmMessage}
        buttons={[
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              confirmCallback.current && confirmCallback.current(false);
            },
          },
          {
            text: 'Oui, quitter la page',
            role: 'destructive',
            handler: () => {
              confirmCallback.current && confirmCallback.current(true);
            },
          },
        ]}
        onDidDismiss={() => setLeaveConfirmMessage(undefined)}
      />
      <LeavePrompt />
    </IonReactRouter>
  );
};

export default Router;
