import { IonButton, IonFab, IonFabButton, IonIcon, IonItem, useIonLoading, useIonRouter } from '@ionic/react';
import Page from 'components/Page';
import { qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { useEffect, useState, VFC } from 'react';
import { initializeNewSale, save, selectBasket } from 'redux/basketSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import BasketEmpty from './BasketEmpty';
import BasketLoading from './BasketLoading';
import BasketRemoveItem from './BasketRemoveItem';
import classes from './Basket.module.scss';
import StateAwareList from 'components/StateAwareList';
import BasketItem from './BasketItem';
import { EditableSaleItem } from 'types/SaleItem';
import { removeDecimalZeros } from 'utils/math';
import PaymentPrompt from './PaymentPrompt';
import { loadPaymentMethods } from 'redux/paymentMethodSlice';
import { add } from 'redux/salesSlice';

const Basket: VFC = () => {
  const [removeSaleItem, setRemoveSaleItem] = useState<EditableSaleItem | undefined>();
  const [showPaymentPrompt, setShowPaymentPrompt] = useState<boolean>(false);
  const [present, dismiss] = useIonLoading();
  const router = useIonRouter();

  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (basket.data?.saved) {
      dismiss();
      if (basket.data.initial) dispatch(add(basket.data.initial));
      dispatch(initializeNewSale());
      router.push('/ventes');
    }
  }, [basket, dismiss, dispatch, router]);

  useEffect(() => {
    dispatch(loadPaymentMethods());
  }, [dispatch]);

  useEffect(() => {
    if (!basket.isLoading && !basket.data) dispatch(initializeNewSale());
  }, [basket, dispatch]);

  const handleRemoveButtonClick = (saleItem: EditableSaleItem) => {
    setRemoveSaleItem(saleItem);
  };

  const handleSaveButtonClick = () => {
    setShowPaymentPrompt(true);
  };

  return (
    <Page title="Pannier">
      <div className={classes.basket}>
        <p>Total: {removeDecimalZeros(basket.data?.editable.total || '0')}€</p>
        <StateAwareList
          state={{ isLoading: basket.isLoading, items: basket.data?.editable.items, error: basket.error }}
          renderItem={(saleItem) => (
            <BasketItem saleItem={saleItem} onRemoveButtonClick={handleRemoveButtonClick.bind(this, saleItem)} />
          )}
          keyResolver={(product) => `${product.id}`}
          loadingComponent={<BasketLoading />}
          emptyComponent={<BasketEmpty />}
          renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
        />
        <div className={classes.save_btn}>
          <IonButton
            expand="block"
            onClick={handleSaveButtonClick}
            disabled={!basket.data || basket.data.editable.items.length === 0}
          >
            Sauvegarder
          </IonButton>
        </div>
      </div>
      <BasketRemoveItem saleItem={removeSaleItem} onDidDismiss={() => setRemoveSaleItem(undefined)} />
      <PaymentPrompt
        open={showPaymentPrompt}
        onDidDismiss={() => setShowPaymentPrompt(false)}
        onDidFinish={() => {
          dispatch(save());
          present({ message: 'Enregistrement...' });
          setShowPaymentPrompt(false);
        }}
      />
      <IonFab className={classes.scanner_btn} vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ventes/scanner">
          <IonIcon ios={qrCodeOutline} md={qrCodeSharp} />
        </IonFabButton>
      </IonFab>
    </Page>
  );
};

export default Basket;
