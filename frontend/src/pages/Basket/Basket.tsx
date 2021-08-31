import { IonButton, IonFab, IonFabButton, IonIcon, IonItem } from '@ionic/react';
import Page from 'components/Page';
import { qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { useEffect, useState, VFC } from 'react';
import { clear, selectBasket } from 'redux/basketSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import BasketEmpty from './BasketEmpty';
import BasketLoading from './BasketLoading';
import BasketRemoveItem from './BasketRemoveItem';
import classes from './Basket.module.scss';
import StateAwareList from 'components/StateAwareList';
import BasketItem from './BasketItem';
import { SaleItem } from 'types/SaleItem';
import { removeDecimalZeros } from 'utils/math';

const Basket: VFC = () => {
  const [removeSaleItem, setRemoveSaleItem] = useState<SaleItem | undefined>();
  const basket = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (basket.isLoading) dispatch(clear());
  }, [basket, dispatch]);

  const handleRemoveButtonClick = (saleItem: SaleItem) => {
    setRemoveSaleItem(saleItem);
  };

  return (
    <Page title="Pannier">
      <div className={classes.basket}>
        <p>Total: {removeDecimalZeros(basket.data?.total || '0')}€</p>
        <StateAwareList
          state={{ isLoading: basket.isLoading, items: basket.data?.items, error: basket.error }}
          renderItem={(saleItem) => (
            <BasketItem saleItem={saleItem} onRemoveButtonClick={handleRemoveButtonClick.bind(this, saleItem)} />
          )}
          keyResolver={(product) => `${product.id}`}
          loadingComponent={<BasketLoading />}
          emptyComponent={<BasketEmpty />}
          renderError={(error) => <IonItem>Error: {JSON.stringify(error, undefined, 2)}</IonItem>}
        />
        <div className={classes.save_btn}>
          <IonButton expand="block">Sauvegarder</IonButton>
        </div>
      </div>
      <BasketRemoveItem saleItem={removeSaleItem} onDidDismiss={() => setRemoveSaleItem(undefined)} />
      <IonFab className={classes.scanner_btn} vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ventes/scanner">
          <IonIcon ios={qrCodeOutline} md={qrCodeSharp} />
        </IonFabButton>
      </IonFab>
    </Page>
  );
};

export default Basket;
