import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { FC } from 'react';
import { Color } from '@ionic/core/dist/types/interface';
import classes from './Message.module.scss';
import { closeOutline, closeSharp } from 'ionicons/icons';

interface MessageProps {
  onDismiss?: () => void;
  color?: Color;
  disabled?: boolean;
  mode?: 'ios' | 'md';
}

const Message: FC<MessageProps> = ({ onDismiss, color, disabled, mode, children }) => {
  return (
    <IonCard role="alert" color={color} disabled={disabled} mode={mode}>
      <IonCardContent className={classes.container}>
        <div>{children}</div>
        {onDismiss && (
          <IonButton fill="clear" shape="round" size="small" onClick={() => onDismiss()}>
            <IonIcon slot="icon-only" ios={closeOutline} md={closeSharp} />
          </IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Message;
