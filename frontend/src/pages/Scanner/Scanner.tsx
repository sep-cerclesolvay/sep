import { IonAlert, IonButton } from '@ionic/react';
import Page from 'components/Page';
import ScannerBox from 'components/ScannerBox';
import { useState, FC } from 'react';
import classes from './Scanner.module.scss';

export interface ScannerProps {
  onScan: (result: string, isShortName?: boolean) => void;
  backButton?: boolean;
  defaultBackUrl?: string;
  backText?: string;
  enableOnlyOnRoute?: RegExp;
}

const Scanner: FC<ScannerProps> = ({ onScan, backButton = false, defaultBackUrl, backText, enableOnlyOnRoute }) => {
  const [showQrOverride, setShowQrOverride] = useState(false);

  return (
    <Page title="Scan" backButton={backButton} defaultBackUrl={defaultBackUrl} backText={backText}>
      <div className={classes.scanner}>
        <div>
          <ScannerBox enableOnlyOnRoute={enableOnlyOnRoute} onScan={onScan} />
        </div>
        <div className={classes.tips_and_manual}>
          <p className={classes.tips}>Dirigez votre appareil vers un QR Code</p>
          <p>ou</p>
          <IonButton onClick={() => setShowQrOverride(true)} expand="block">
            Entez un code manuellement
          </IonButton>
        </div>
      </div>
      <IonAlert
        isOpen={showQrOverride}
        onDidDismiss={() => {
          setShowQrOverride(false);
        }}
        header={'Alert'}
        message={'Entrez la valeur du QR code'}
        inputs={[
          {
            name: 'qrCodeInputValue',
            type: 'text',
            placeholder: 'XXXX',
          },
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: (value) => {
              onScan(value.qrCodeInputValue, true);
            },
          },
        ]}
      />
    </Page>
  );
};

export default Scanner;
