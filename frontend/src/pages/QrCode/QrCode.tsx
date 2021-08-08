import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonSkeletonText } from '@ionic/react';
import Page from 'components/Page';
import { useEffect, useState, VFC } from 'react';
import QRCodeGenerator from 'react-qr-code';
import { useParams } from 'react-router';
import { useAppDispatch } from 'redux/hooks';
import { loadQrCode, useQrCode } from 'redux/qrCodeSlice';
import classes from './QrCode.module.scss';

const QrCode: VFC = () => {
  const { id } = useParams<{ id: string }>();
  const [size, setSize] = useState(256);
  const qrCode = useQrCode();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQrCode(parseInt(id)));
  }, [id, dispatch]);

  const onImageDownload = () => {
    const svg = document.getElementById('QRCode');
    if (svg) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        img.onload = () => {
          canvas.width = size;
          canvas.height = size;
          ctx.fillStyle = '#fff';
          ctx.drawImage(img, size / 17, size / 17, size - (size / 17) * 2, size - (size / 17) * 2);
          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = 'QRCode';
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    }
  };

  return (
    <Page title="Qr Code" backButton={true} defaultBackUrl="/stock" backText={'Stock'}>
      <div className={classes.qr_code_page}>
        <IonItem>
          <IonLabel>Size</IonLabel>
          <IonSelect
            interface="popover"
            placeholder={'Size'}
            value={`${size}`}
            onIonChange={(e) => setSize(parseInt(e.detail.value))}
          >
            <IonSelectOption value="64">x64</IonSelectOption>
            <IonSelectOption value="128">x128</IonSelectOption>
            <IonSelectOption value="256">x256</IonSelectOption>
            <IonSelectOption value="512">x512</IonSelectOption>
            <IonSelectOption value="1024">x1024</IonSelectOption>
            <IonSelectOption value="2048">x2048</IonSelectOption>
          </IonSelect>
        </IonItem>
        <div className={classes.content}>
          <h2 style={{ color: !qrCode.isLoading && qrCode.error ? 'var(--ion-color-danger, #f00)' : undefined }}>
            {qrCode.isLoading && <IonSkeletonText animated style={{ width: '75%', height: '26px', margin: 'auto' }} />}
            {qrCode.error ? qrCode.error : qrCode.data?.name}
          </h2>
          <div className={classes.qr_code_container} style={{ padding: `${size / 17}px` }}>
            <QRCodeGenerator
              id="QRCode"
              value={`sep:product:${id}`}
              size={size - 17}
              fgColor={qrCode.isLoading || qrCode.error ? '#fff' : undefined}
            />
          </div>
        </div>

        <IonButton expand="block" onClick={onImageDownload}>
          Télécharger le QR Code
        </IonButton>
      </div>
    </Page>
  );
};

export default QrCode;
