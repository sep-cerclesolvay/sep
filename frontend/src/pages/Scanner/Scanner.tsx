import { IonAlert, IonButton, NavContext } from '@ionic/react';
import Page from 'components/Page';
import ScannerBox from 'components/ScannerBox';
import environment from 'environment';
import { useContext, useState, VFC } from 'react';
import { useToast } from '@agney/ir-toast';
import classes from './Scanner.module.scss';

const Scanner: VFC = () => {
  const [showQrOverride, setShowQrOverride] = useState(false);
  const navContext = useContext(NavContext);
  const Toast = useToast();

  const handleScan = (result: string, onlyValue = false) => {
    const { QR_CODE_URL } = environment;

    const qrRoute = '/qr/';
    const qrRouteFull = QR_CODE_URL + qrRoute;

    if ((qrRouteFull && result.startsWith(qrRouteFull)) || onlyValue) {
      const qrUuid = onlyValue ? result : result.replace(qrRouteFull, '');

      if (qrUuid) {
        navContext.navigate(qrRoute + qrUuid);
      }
    } else {
      Toast.error('QrCode non supporté');
    }
  };

  return (
    <Page title="Scan" className={classes.scanner}>
      <div>
        <ScannerBox enableOnlyOnRoute="/ventes/scanner" onScan={handleScan} />
      </div>
      <div className={classes.tips_and_manual}>
        <p className={classes.tips}>Dirigez votre téléphone vers un QR Code</p>
        <p>ou</p>
        <IonButton onClick={() => setShowQrOverride(true)} expand="block">
          Entez un code manuellement
        </IonButton>
      </div>
      <IonAlert
        isOpen={showQrOverride}
        onDidDismiss={() => {
          setShowQrOverride(false);
        }}
        header={'Alert'}
        subHeader={'Entrez la valeur du QR code'}
        cssClass={classes.alert}
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
              handleScan(value.qrCodeInputValue, true);
            },
          },
        ]}
      />
    </Page>
  );
};

export default Scanner;
