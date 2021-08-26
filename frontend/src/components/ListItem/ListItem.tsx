import { IonButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import useBreakpoints from 'hooks/useBreakpoints';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import { FC, useEffect, useRef } from 'react';
import { Color } from '@ionic/core/dist/types/interface';
import classes from './ListItem.module.scss';

export interface ListItemProps {
  card?: boolean;
  editButton?: boolean;
  onClickEditButton?: () => void;
  deleteButton?: boolean;
  onClickDeleteButton?: () => void;
  customButtons?: ListItemButton[];
}

export interface ListItemButton {
  id: string;
  iosIcon: string;
  mdIcon: string;
  onClick: () => void;
  color?: Color;
}

const ListItem: FC<ListItemProps> = ({
  children,
  card = false,
  editButton = false,
  onClickEditButton = () => {
    return;
  },
  deleteButton = false,
  onClickDeleteButton = () => {
    return;
  },
  customButtons = [],
}) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const { minBreakpoint } = useBreakpoints();
  const small = !minBreakpoint('md');

  useEffect(() => {
    if (!small) {
      ionItemSlidingRef.current?.close();
    }
  }, [small]);

  let buttons: ListItemButton[] = customButtons.map((customButton) => ({
    ...customButton,
    onClick: () => {
      ionItemSlidingRef.current?.close();
      customButton.onClick();
    },
  }));

  if (editButton) {
    buttons = [
      ...buttons,
      {
        id: 'edit',
        iosIcon: pencilOutline,
        mdIcon: pencilSharp,
        onClick: () => {
          ionItemSlidingRef.current?.close();
          onClickEditButton();
        },
      },
    ];
  }

  if (deleteButton) {
    buttons = [
      ...buttons,
      {
        id: 'delete',
        iosIcon: trashBinOutline,
        mdIcon: trashBinSharp,
        onClick: () => {
          ionItemSlidingRef.current?.close();
          onClickDeleteButton();
        },
        color: 'danger',
      },
    ];
  }

  return (
    <IonItemSliding ref={ionItemSlidingRef} className={card ? classes.card : undefined} disabled={small ? false : true}>
      <IonItem className={classes.ion_item}>
        <IonLabel className={classes.ion_label}>
          <div className={classes.content}>
            <div>{children}</div>
            {buttons.map((button) => (
              <IonButton key={button.id} className={classes.button} onClick={button.onClick} color={button.color}>
                <IonIcon slot="icon-only" ios={button.iosIcon} md={button.mdIcon} />
              </IonButton>
            ))}
          </div>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        {buttons.map((button) => (
          <IonItemOption key={button.id} onClick={button.onClick} color={button.color}>
            <IonIcon slot="icon-only" ios={button.iosIcon} md={button.mdIcon} />
          </IonItemOption>
        ))}
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ListItem;
