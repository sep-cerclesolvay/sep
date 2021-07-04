import { IonApp } from '@ionic/react';
import Router from 'router/Router';
import { ToastProvider } from '@agney/ir-toast';
import './theme/index.scss';

const App: React.FC = () => {
  return (
    <IonApp>
      <ToastProvider value={{ duration: 2000 }}>
        <Router />
      </ToastProvider>
    </IonApp>
  );
};

export default App;
