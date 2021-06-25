import { IonApp, IonSpinner } from '@ionic/react';
import { Suspense } from 'react';
import Router from 'router/Router';
import './theme/index.scss';

const App: React.FC = () => {
  return (
    <Suspense fallback={<IonSpinner color="primary" />}>
      <IonApp>
        <Router />
      </IonApp>
    </Suspense>
  );
};

export default App;
