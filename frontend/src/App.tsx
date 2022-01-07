import { IonApp } from '@ionic/react';
import Router from 'router/Router';
import { ToastProvider } from '@agney/ir-toast';
import './theme/index.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useEffect } from 'react';
import { loadUser, selectUser } from 'redux/userSlice';
import LoadingBar from 'components/LoadingBar';
import WaitingServerConnection from 'pages/WaitingServerConnection';

const App: React.FC = () => {
  const asyncUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <IonApp>
      <ToastProvider value={{ duration: 2000 }}>
        <LoadingBar show={asyncUser.isLoading} />
        {asyncUser.isLoading ? <WaitingServerConnection /> : <Router />}
      </ToastProvider>
    </IonApp>
  );
};

export default App;
