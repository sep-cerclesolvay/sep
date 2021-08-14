import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { logOutOutline, logOutSharp, logInOutline, logInSharp } from 'ionicons/icons';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { logout, useUser } from 'redux/userSlice';
import classes from './Page.module.scss';

export interface PageProps {
  title: string;
  backButton?: boolean;
  defaultBackUrl?: string;
  backText?: string;
  headerEndButtons?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, backButton = false, defaultBackUrl = '/', backText, children }) => {
  const ionContentRef = useRef<HTMLIonContentElement>(null);
  const { name } = useParams<{ name: string }>();
  const user = useUser();
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = 'main { overflow-y: auto!important; }';
    ionContentRef.current?.shadowRoot?.appendChild(style);
  }, []);

  const handleLogoutClick = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!title) title = name;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {backButton ? (
              <>
                <IonBackButton className="ios-only" defaultHref={defaultBackUrl} text={backText} />
                <IonBackButton className="md-only" defaultHref={defaultBackUrl} />
              </>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            {user.data ? (
              <IonButton fill="clear" size="small" shape="round" className={classes.logout} onClick={handleLogoutClick}>
                <span>Se déconnecter</span>
                <IonIcon slot="end" ios={logOutOutline} md={logOutSharp} />
              </IonButton>
            ) : (
              <IonButton fill="clear" size="small" shape="round" className={classes.logout} routerLink="/connexion">
                <span>Se Connecter</span>
                <IonIcon slot="end" ios={logInOutline} md={logInSharp} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={ionContentRef}>
        <IonHeader>
          {/* <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar> */}
        </IonHeader>
        <IonRefresher slot="fixed" disabled={true}>
          <IonRefresherContent />
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Page;
