import { IonAlert, IonButton, NavContext, useIonRouter } from '@ionic/react';
import Page from 'components/Page';
import ScannerBox from 'components/ScannerBox';
import environment from 'environment';
import { useContext, useEffect, useState, VFC } from 'react';
import { useToast } from '@agney/ir-toast';
import classes from './Scanner.module.scss';
import { useAppDispatch } from 'redux/hooks';
import { add, loadBasket } from 'redux/basketSlice';

const Scanner: VFC = () => {
  const [showQrOverride, setShowQrOverride] = useState(false);
  const navContext = useContext(NavContext);
  const router = useIonRouter();
  const Toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBasket());
  }, [dispatch]);

  const handleScan = (result: string, onlyValue = false) => {
    const { QR_CODE_URL } = environment;

    if (result.startsWith(QR_CODE_URL) || onlyValue) {
      const qrCodeData = onlyValue ? result : result.replace(QR_CODE_URL, '');

      if (qrCodeData) {
        const qrCodeDataParts = qrCodeData.split(':');
        if (qrCodeDataParts.length === 2) {
          const [type, id] = qrCodeDataParts;
          if (type === 'product') {
            dispatch(add({ id: parseInt(id), name: 'test', buy_price: '3', sell_price: '5', quantity: 1 }));
          }
          // navContext.navigate('/qr/' + qrCodeDataParts.join('/'));
          navContext.navigate('/ventes/pannier');
          return;
        }
      }
    }

    Toast.error('QrCode non supporté');
  };

  return (
    <Page
      title="Scan"
      backButton={true}
      defaultBackUrl="/ventes"
      backText={router.routeInfo.pushedByRoute === '/ventes/pannier' ? 'Pannier' : 'Ventes'}
    >
      <div className={classes.scanner}>
        <div>
          <ScannerBox enableOnlyOnRoute="/ventes/scanner" onScan={handleScan} />
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
