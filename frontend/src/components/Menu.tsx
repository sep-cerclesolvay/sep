import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  fileTrayOutline,
  fileTrayFullSharp,
  cartOutline,
  cartSharp,
  cubeOutline,
  cubeSharp,
  logInSharp,
  logInOutline,
  fileTrayStackedOutline,
  fileTrayStackedSharp,
} from 'ionicons/icons';
import classes from './Menu.module.scss';
import { VFC } from 'react';
import { useUser } from 'redux/userSlice';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const anonPages: AppPage[] = [
  {
    title: 'Se Connecter',
    url: '/connexion',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
];

const userPages: AppPage[] = [
  {
    title: 'Stock',
    url: '/stock',
    iosIcon: fileTrayStackedOutline,
    mdIcon: fileTrayStackedSharp,
  },
  {
    title: 'Packs',
    url: '/packs',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp,
  },
  {
    title: 'Ventes',
    url: '/ventes',
    iosIcon: cartOutline,
    mdIcon: cartSharp,
  },
  {
    title: 'Entrées',
    url: '/entrees',
    iosIcon: fileTrayOutline,
    mdIcon: fileTrayFullSharp,
  },
];

const Menu: VFC = () => {
  const location = useLocation();
  const user = useUser();

  const pages = user.data ? userPages : anonPages;

  return (
    <IonMenu contentId="main" type="overlay" className={classes.menu}>
      <IonContent>
        <IonList className={classes.inbox_list}>
          {user.data?.name}
          <IonListHeader>SEP</IonListHeader>
          <IonNote>Solvay Entraide et Publication</IonNote>
          {pages.map((appPage) => {
            return (
              <IonMenuToggle key={appPage.url} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? classes.selected : undefined}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
