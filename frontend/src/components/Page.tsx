import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { logOutOutline, logOutSharp } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import classes from './Page.module.scss';

export interface PageProps {
  title: string;
  backButton?: boolean;
  defaultBackUrl?: string;
  backText?: string;
  headerEndButtons?: React.ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({
  title,
  backButton = false,
  defaultBackUrl = '/',
  backText,
  className,
  children,
}) => {
  const { name } = useParams<{ name: string }>();
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
            <IonButton fill="clear" size="small" shape="round" className={classes.logout}>
              <span>Se déconnecter</span>
              <IonIcon slot="end" ios={logOutOutline} md={logOutSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader>
          {/* <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar> */}
        </IonHeader>
        <div className={className}>{children}</div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
