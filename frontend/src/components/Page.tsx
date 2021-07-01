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

export interface PageProps {
  title: string;
  backButton?: boolean;
  backUrl?: string;
  backText?: string;
  headerEndButtons?: React.ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ title, backButton = false, backUrl = '/', backText, className, children }) => {
  const { name } = useParams<{ name: string }>();
  if (!title) title = name;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {backButton ? (
              <>
                <IonBackButton className="ios-only" defaultHref={backUrl} text={backText} />
                <IonBackButton className="md-only" defaultHref={backUrl} />
              </>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" size="small" shape="round">
              <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
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
