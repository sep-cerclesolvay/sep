import { IonButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import useBreakpoints from 'hooks/useBreakpoints';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import { FC } from 'react';
import { Color } from '@ionic/core/dist/types/interface';
import classes from './EditDeleteIonItem.module.scss';

export interface EditDeleteIonItemProps {
  card?: boolean;
  editButton?: boolean;
  onClickEditButton?: () => void;
  deleteButton?: boolean;
  onClickDeleteButton?: () => void;
  customButtons?: Button[];
}

export interface Button {
  id: string;
  iosIcon: string;
  mdIcon: string;
  onClick: () => void;
  color?: Color;
}

const EditDeleteIonItem: FC<EditDeleteIonItemProps> = ({
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
  const { minBreakpoint } = useBreakpoints();

  let buttons: Button[] = customButtons;

  if (editButton) {
    buttons = [
      ...buttons,
      {
        id: 'edit',
        iosIcon: pencilOutline,
        mdIcon: pencilSharp,
        onClick: onClickEditButton,
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
        onClick: onClickDeleteButton,
        color: 'danger',
      },
    ];
  }

  return (
    <IonItemSliding className={card ? classes.card : undefined} disabled={minBreakpoint('md') ? true : false}>
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

export default EditDeleteIonItem;
