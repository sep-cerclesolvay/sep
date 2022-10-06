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
import { cogOutline, cogSharp, logInSharp, logInOutline, openOutline } from 'ionicons/icons';
import classes from './Menu.module.scss';
import { Fragment, FC } from 'react';
import { useUser } from 'redux/userSlice';
import Version from '../Version';
import { MenuEntry } from './MenuEntry';
import { entries } from '@/menu/entries';

const anonPages: MenuEntry[] = [
  {
    title: 'Se Connecter',
    url: '/connexion/',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
];

const userPages: MenuEntry[] = [
  ...entries,
  {
    title: 'Admin Panel',
    url: '/admin/',
    iosIcon: cogOutline,
    mdIcon: cogSharp,
    separatorBefore: true,
    external: true,
  },
];

const Menu: FC = () => {
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
              <Fragment key={menuEntry.url}>
                {menuEntry.separatorBefore && <hr />}
                <IonMenuToggle autoHide={false}>
                  <IonItem
                    className={location.pathname === menuEntry.url ? classes.selected : undefined}
                    href={menuEntry.url}
                    routerLink={!menuEntry.external ? menuEntry.url : undefined}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon slot="start" ios={menuEntry.iosIcon} md={menuEntry.mdIcon} />
                    <IonLabel>{menuEntry.title}</IonLabel>
                    {menuEntry.external && <IonIcon slot="end" ios={openOutline} md={openOutline} />}
                  </IonItem>
                </IonMenuToggle>
              </Fragment>
            );
          })}
          <hr />
          <IonNote className={classes.version_box}>
            <Version />
          </IonNote>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
