import { IonButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import useBreakpoints from 'hooks/useBreakpoints';
import { pencilOutline, pencilSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import { FC } from 'react';
import classes from './EditDeleteIonItem.module.scss';

export interface EditDeleteIonItemProps {
  editButton?: boolean;
  onClickEditButton?: () => void;
  deleteButton?: boolean;
  onClickDeleteButton?: () => void;
}

const EditDeleteIonItem: FC<EditDeleteIonItemProps> = ({
  children,
  editButton = false,
  onClickEditButton = () => {
    return;
  },
  deleteButton = false,
  onClickDeleteButton = () => {
    return;
  },
}) => {
  const { minBreakpoint } = useBreakpoints();
  return (
    <IonItemSliding disabled={minBreakpoint('md') ? true : false}>
      <IonItem>
        <IonLabel className={classes.ion_label}>
          <div className={classes.content}>
            <div>{children}</div>
            {editButton && (
              <IonButton className={classes.button} onClick={onClickEditButton}>
                <IonIcon slot="icon-only" ios={pencilOutline} md={pencilSharp} />
              </IonButton>
            )}
            {deleteButton && (
              <IonButton className={classes.button} onClick={onClickDeleteButton} color="danger">
                <IonIcon slot="icon-only" ios={trashBinOutline} md={trashBinSharp} />
              </IonButton>
            )}
          </div>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        {editButton && (
          <IonItemOption onClick={onClickEditButton}>
            <IonIcon slot="icon-only" ios={pencilOutline} md={pencilSharp} />
          </IonItemOption>
        )}
        {deleteButton && (
          <IonItemOption onClick={onClickDeleteButton} color="danger">
            <IonIcon slot="icon-only" ios={trashBinOutline} md={trashBinSharp} />
          </IonItemOption>
        )}
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditDeleteIonItem;
