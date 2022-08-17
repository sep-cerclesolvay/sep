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
  cogOutline,
  cogSharp,
  logInSharp,
  logInOutline,
  fileTrayStackedOutline,
  fileTrayStackedSharp,
} from 'ionicons/icons';
import classes from './Menu.module.scss';
import { VFC } from 'react';
import { useUser } from 'redux/userSlice';

interface MenuEntry {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  separatorAfter?: boolean;
}

const anonPages: MenuEntry[] = [
  {
    title: 'Se Connecter',
    url: '/connexion/',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
];

const userPages: MenuEntry[] = [
  {
    title: 'Stock',
    url: '/stock/',
    iosIcon: fileTrayStackedOutline,
    mdIcon: fileTrayStackedSharp,
  },
  {
    title: 'Packs',
    url: '/packs/',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp,
  },
  {
    title: 'Ventes',
    url: '/ventes/',
    iosIcon: cartOutline,
    mdIcon: cartSharp,
  },
  {
    title: 'Entrées',
    url: '/entrees/',
    iosIcon: fileTrayOutline,
    mdIcon: fileTrayFullSharp,
    separatorAfter: true,
  },
  {
    title: 'Admin Panel',
    url: '/admin/',
    iosIcon: cogOutline,
    mdIcon: cogSharp,
    separatorAfter: true,
  },
];

const Menu: VFC = () => {
  const location = useLocation();
  const user = useUser();

  const pages = user.data ? userPages : anonPages;

  return (
    <IonMenu contentId="main" type="overlay" className={classes.menu}>
      <IonContent>
        <IonList>
          {user.data && (
            <>
              <div className={classes.user_box}>
                <IonNote>
                  Bonjour, <strong>{user.data.name}</strong>
                </IonNote>
              </div>
              <hr />
            </>
          )}
          <div className={classes.brand_box}>
            <IonListHeader>SEP</IonListHeader>
            <IonNote>Solvay Entraide et Publication</IonNote>
          </div>
          <hr />
          {pages.map((menuEntry) => {
            return (
              <>
                <IonMenuToggle key={menuEntry.url} autoHide={false}>
                  <IonItem
                    className={location.pathname === menuEntry.url ? classes.selected : undefined}
                    routerLink={menuEntry.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon slot="start" ios={menuEntry.iosIcon} md={menuEntry.mdIcon} />
                    <IonLabel>{menuEntry.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
                {menuEntry.separatorAfter && <hr />}
              </>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
